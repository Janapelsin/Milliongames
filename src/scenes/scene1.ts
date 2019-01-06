let player
let enemy
let enemies
let cursors
let walls

export default class Scene1 extends Phaser.Scene {
   
    constructor() {
        super({ key: 'Scene1'})

    }

    preload() {
        this.load.image('bg', '../../assets/bg.png')
        this.load.image('shortborder', '../../assets/shortborder.png')
        this.load.image('longborder', '../../assets/longborder.png')
        this.load.image('player', '../../assets/player.png')
        this.load.image('enemy', '../../assets/enemy.png')
    }

    create() {
        // Background
        this.add.image(400,300,'bg')

        // Walls
        walls = this.physics.add.staticGroup()
        walls.create(400, 20, 'longborder')
        walls.create(400, 580, 'longborder')
        walls.create(20, 300, 'shortborder')
        walls.create(780, 300, 'shortborder')

        // Player     
        player = this.physics.add.sprite(400, 300, 'player')
        player.setCollideWorldBounds(true)
        player.body.allowGravity =false

        // Enemy
        enemies = this.physics.add.group()
        enemies.create(50, 50, 'enemy')
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(true)
                
        
        // Collider
        this.physics.add.collider(player, walls)

        // Input events
        cursors = this.input.keyboard.createCursorKeys ();


    }

    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160)
        } else if (cursors.right.isDown) {
            player.setVelocityX(160)
        } else {
            player.setVelocityX(0)
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160)
        } else if (cursors.down.isDown) {
            player.setVelocityY(160)
        } else {
            player.setVelocityY(0)
        }
    }
}