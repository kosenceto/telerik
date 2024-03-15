'use strict'
const game = new Phaser.Game(700, 524, Phaser.AUTO, 'game-canvas', { preload, create, update })
const dudespeed=200
let dude, cursors, bonus 
let cursor, runright, runleft, chernaliniq, pamet, platforma, firstStage, ghosts
let enemy,murdane = 0
let up = false
let enemyHealth = 100

function preload() {
    game.load.spritesheet('dude', 'dude-blue.288x40.9x1.png', 288/9, 40)
    game.load.image("fon","map2.png")
    game.load.image("plat","chernaliniq.png")
    game.load.image("enemy", "ghostie.png")
    game.load.image('hit','')
}

function create() {
    

    game.stage.backgroundColor="#fff"
    game.add.sprite(0,0,"fon")
    game.world.setBounds(0,0,2612,524)
    chernaliniq = game.height/2

    platforma = game.add.sprite(0,240,"plat")
    game.physics.arcade.enable(platforma)
    platforma.body.immovable = true

    dude=game.add.sprite(220,400,"dude")
    dude.anchor.setTo(0.5)
    dude.scale.setTo(1)
    game.physics.arcade.enable(dude)
    dude.body.collideWorldBounds=true 
    
    firstStage()
    

    runright = dude.animations.add('right', [5,6,7,8], 80, true) 
    runleft = dude.animations.add('left', [0,1,2,3], 80, true)


    game.camera.follow(dude,Phaser.Camera.FOLLOW_PLATFORMER,0.1,0.1,)
    cursor= game.input.keyboard.createCursorKeys()

   

    
}
firstStage = function(){
    enemy = game.add.sprite(300,380,'enemy')//855,370
    enemy.anchor.setTo(0.5)
    enemy.scale.setTo(0.4)
    game.physics.arcade.enable(enemy)
    enemy.body.immovable = true


    
}


function update(){
    if(cursor.right.isDown){
        dude.body.velocity.x= dudespeed;
        dude.animations.play('right');
        pamet = true

        
    }else if(cursor.left.isDown){
        dude.body.velocity.x=- dudespeed
        dude.animations.play('left')
        pamet = false
    }else{
        dude.body.velocity.x=0
        if(pamet==true){
            dude.frame = 7
        }
        if(pamet==false){
            dude.frame = 2
        }
    }

if(cursor.up.isDown){
        dude.body.velocity.y=-dudespeed
        
    }else if(cursor.down.isDown){
        dude.body.velocity.y=dudespeed

    }else{
        dude.body.velocity.y=0
    }



    game.physics.arcade.collide(dude, platforma)
    
    if(enemy.y<=400&&up==false){
        enemy.y++
        if(enemy.y==400){
            up=true
        }
    } else if(enemy.y>=360&&up==true){
        enemy.y--
        if(enemy.y==360){
            up=false
        }
    }
} 