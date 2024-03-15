'use strict';

const game = new Phaser.Game(700, 524, Phaser.AUTO, 'game-canvas', { preload, create, update });
const dudespeed = 200;
let dude, cursors, bonus;
let cursor, runright, runleft, chernaliniq, pamet, platforma, firstStage, ghosts, slash, slashAnimation;
let enemy, murdane = 0;
let up = false;
let enemyHealth = 100;
let slashPool = [];

function preload() {
    game.load.spritesheet('dude', 'dude-Gamer.576x9.png', 576 / 9, 112);
    game.load.image("fon", "TheMap.png");
    game.load.image("plat", "chernaliniq.png");
    game.load.image("enemy", "ghostie.png");
    game.load.image("enemy01", "Smeshnik01.png");
    game.load.spritesheet('hit', 'SlashAnimation.png', 896 / 7, 128);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); // Start the Arcade physics system

    platforma = game.add.sprite(0, 180, "plat");
    game.physics.arcade.enable(platforma);
    platforma.body.immovable = true;

    game.stage.backgroundColor = "#fff";
    game.add.sprite(0, 0, "fon");
    game.world.setBounds(0, 0, 3600, 481);

    dude = game.add.sprite(220, 400, "dude");
    dude.anchor.setTo(0.5);
    dude.scale.setTo(1);
    game.physics.arcade.enable(dude);
    dude.body.collideWorldBounds = true;
    firstStage();

    runright = dude.animations.add('right', [5, 6, 7, 8], 999, true);
    runleft = dude.animations.add('left', [0, 1, 2, 3], 999, true);

    game.camera.follow(dude, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);
    cursor = game.input.keyboard.createCursorKeys();
}

firstStage = function () {
    enemy = game.add.sprite(300, 300, 'enemy'); //855,370
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.immovable = true;
};
function update() {
    if (cursor.right.isDown) {
        dude.body.velocity.x = dudespeed;
        dude.animations.play('right');
        pamet = true;
    } else if (cursor.left.isDown) {
        dude.body.velocity.x = -dudespeed;
        dude.animations.play('left');
        pamet = false;
    } else {
        dude.body.velocity.x = 0;
        if (pamet == true) {
            dude.frame = 7;
        }
        if (pamet == false) {
            dude.frame = 2;
        }
    }

    if (cursor.up.isDown) {
        dude.body.velocity.y = -dudespeed;
    } else if (cursor.down.isDown) {
        dude.body.velocity.y = dudespeed;
    } else {
        dude.body.velocity.y = 0;
    }

    game.physics.arcade.collide(dude, platforma);
    game.physics.arcade.collide(dude, enemy, HitEnemy);

    if (enemy.y <= 350 && up == false) {
        enemy.y++;
        if (enemy.y == 350) {
            up = true;
        }
    } else if (enemy.y >= 300 && up == true) {
        enemy.y--;
        if (enemy.y == 300) {
            up = false;
        }
    }
    game.physics.arcade.collide(slash, enemy, HitEnemy);
    }
    const HitEnemy = function() {
        let slash;
        if (slashPool.length > 0) {
            slash = slashPool.pop();
            slash.reset(dude.x + 10, dude.y - 50);
        } else {
            slash = game.add.sprite(dude.x + 10, dude.y - 50, 'hit');
            game.physics.arcade.enable(slash);
            slash.body.allowGravity = false;
            slash.body.collideWorldBounds = true;
            slash.animations.add('hit', [0, 1, 2, 3, 4, 5, 6], 80, false);
        }

        let slashAnimation = slash.animations.play('hit');
        game.physics.arcade.enable(slash);
        slashAnimation.onComplete.add(function () {
            slashPool.push(slash);
            slash.kill();
        }, this);
        console.log("Collision detected between enemy and slash");
        console.log("Enemy health before:", enemyHealth);
        enemyHealth -= 10;
        console.log("Enemy health after:", enemyHealth);
        if (enemyHealth <= 0) {
            console.log("Enemy destroyed!");
            enemy.destroy();
            enemyHealth = 100;
        }
    }