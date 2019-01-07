let player
let bullets
let enemies
let cursors
let walls
let enemy
let bullet
let physics
let scene

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
        physics = this.physics
        scene = this.scene

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
        enemies = this.physics.add.group({
            key: 'enemy',
            repeat: 5,
            setXY: { x: 50, y: 50, stepX: 70 },
                    })
        enemies.children.iterate((child) => {
            child.setBounce(1)
            child.setCollideWorldBounds(true)
            child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200))
            child.body.allowGravity = false
        })
        
        // Bullets
        bullets = this.physics.add.group()
        fireBullets()

        // Colliders with walls
        this.physics.add.collider(player, walls)
        this.physics.add.collider(enemies, walls)
        this.physics.add.collider(bullets, walls)

        // Overlaps
        this.physics.add.overlap(bullets, enemies, bulletHitEnemy, null, this)
        this.physics.add.overlap(player, enemies, enemyHitPlayer, null, this)

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
        //moveBullet()
    }
}


const fireBullets = () => {
    bullet = bullets.create(player.x, player.y, 'bullet')
    bullet.body.setVelocity(-200, 0)
    bullet.body.allowGravity = false

    let bullet2 = bullets.create(player.x, player.y, 'bullet')
    bullet2.body.setVelocity(200, 0)
    bullet2.body.allowGravity = false

    let bullet3 = bullets.create(player.x, player.y, 'bullet')
    bullet3.body.setVelocity(0, -200)
    bullet3.body.allowGravity = false

    let bullet4 = bullets.create(player.x, player.y, 'bullet')
    bullet4.body.setVelocity(0, 200)
    bullet4.body.allowGravity = false
    //bullet.setData({ enemyTarget: 'test'})
    setTimeout(() => { fireBullets() }, 1000)
}

const moveBullet = () => {
    //console.log(bullets.children.entries)
    bullets.children.iterate(child => {
        physics.moveToObject(child, enemies, 300)
    })
}

const bulletHitEnemy = (body1, body2) => {
    // body1 = bullet, body2 = enemy
    body1.disableBody(true, true)
    body2.disableBody(true, true)
}

const enemyHitPlayer = () => {
    physics.pause()
    player.setTint(0xff0000);
    setTimeout(() => {
        scene.restart()
    }, 2000)

}