let player
let bullets
let enemies
let cursors
let walls
let enemy
let bullet

export default class Scene1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene1' })

    }

    preload() {
        this.load.image('shortborder', '../../assets/shortborder.png')
        this.load.image('longborder', '../../assets/longborder.png')
        this.load.image('player', '../../assets/player.png')
        this.load.image('enemy', '../../assets/enemy.png')
        this.load.image('bullet', '../../assets/bullet.png')
    }

    create() {
        // Walls
        walls = this.physics.add.staticGroup()
        walls.create(400, 20, 'longborder')
        walls.create(400, 580, 'longborder')
        walls.create(20, 300, 'shortborder')
        walls.create(780, 300, 'shortborder')

        // Player     
        player = this.physics.add.sprite(400, 300, 'player')
        player.setCollideWorldBounds(true)
        player.body.allowGravity = false

        // Enemy
        enemies = this.physics.add.group()
        enemy = enemies.create(50, 50, 'enemy');
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(true)
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 50)
        enemy.body.allowGravity = false

        // Bullets
        bullets = this.physics.add.group()
        fireBullets()
        
        // Colliders with platforms
        this.physics.add.collider(player, walls)
        this.physics.add.collider(enemies, walls)

        // Input events
        cursors = this.input.keyboard.createCursorKeys();



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
        moveBullet(this.physics)
    }
}


const fireBullets = () => {
    console.log('bullet fired')
    //bullet = bullets.create(player.x, player.y, 'bullet')
    //bullet.setVelocity(20, 0)
    bullet = bullets.create(player.x, player.y, 'bullet')
    bullet.body.allowGravity = false
 

    //setTimeout(() => {fireBullets()}, 1000)
}

const moveBullet = (physics) => {
    physics.accelerateToObject(bullet, enemy,50, 50, 50 )
    //bullet.x = enemy.x - 10
    //bullet.y = enemy.y - 10
}