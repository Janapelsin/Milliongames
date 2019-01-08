let player
let bullets
let enemies
let cursors
let walls
let enemy
let bullet
let physics
let scene
let pointerUse
let pointerX
let pointerY
let lastBulletShot

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
            repeat: 30,
            setXY: { x: 50, y: 50, stepX: 5 },
        })
        enemies.children.iterate((child) => {
            child.setBounce(1)
            child.setCollideWorldBounds(true)
            child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200))
            child.body.allowGravity = false
        })

        // Bullets
        bullets = this.physics.add.group()
        //fireBullets()

        // Colliders with walls
        this.physics.add.collider(player, walls)
        this.physics.add.collider(enemies, walls)
        this.physics.add.collider(bullets, walls)

        // Overlaps
        this.physics.add.overlap(bullets, enemies, bulletHitEnemy, null, this)
        this.physics.add.overlap(player, enemies, enemyHitPlayer, null, this)

        // Input events
        cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', () => {
            pointerUse = pointerUse === true ? false : true
        })

        this.input.on('pointermove', (pointer) => {
            pointerX = pointer.x
            pointerY = pointer.y
        });
    }

    update() {
        if (pointerUse !== true) {
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
        } else if (pointerUse === true) {
            physics.moveTo(player, pointerX, pointerY, 160)
        }

        moveBullet()

        // if last bullet has been shot less than 0.5s before does nothing, else triggers fireBullets
        if (Date.now() - lastBulletShot > 500 || lastBulletShot == undefined) {
            fireBullets()
        }


    }
}

const fireBullets = () => {
    // if there less than 5 bullets and less bullets than enemies
    if (bullets.children.entries.length < enemies.children.entries.length && bullets.children.entries.length < 5) {
        // get closest target => return either index of the enemy or null when no enemy found near the player (3rd param = distance)
        const enemyTargetIndex = getClosestEnemy(player.x, player.y, 200)
        // if there is an enemy within distance create bullet
        if (enemyTargetIndex != null) {
            bullet = bullets.create(player.x, player.y, 'bullet')
            bullet.body.allowGravity = false
            bullet.setData({ enemyTargetIndex: enemyTargetIndex })
            lastBulletShot = Date.now()

        }
    }
}

const moveBullet = () => {
    const range = 250
    // iterates over each bullet
    bullets.children.iterate(child => {
        // to prevent bugs, return nothing when child = undefined
        if (child == undefined) {
            return
        } else {
            const enemyTargetIndex = child.data.values.enemyTargetIndex
            if (enemies.children.entries[enemyTargetIndex] == undefined) {
                child.destroy()
            } else if (Phaser.Math.Distance.Between(player.x, player.y, child.x, child.y) > range) {
                child.destroy()
            } else {
                physics.moveToObject(child, enemies.children.entries[enemyTargetIndex], 400)
            }

        }
    })
}


const getClosestEnemy = (x, y, distance) => {
    var enemyUnits = enemies.getChildren();
    let enemiesPosition: Array<{}> = []
    for (var i = 0; i < enemyUnits.length; i++) {
        const pos = Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y)
        if (pos < distance) {
            enemiesPosition.push(pos)
        } else {
            enemiesPosition.push(1000)
        }
    }
    const lowestPos = Math.min.apply(Math, enemiesPosition)
    if (lowestPos > distance) {
        return null
    } else {
        const indexPos = enemiesPosition.findIndex(i => i == lowestPos)
        return indexPos
    }
}

const bulletHitEnemy = (body1, body2) => {
    // sets new enemy target for each bullet who shared the same target
    const bodyEnemyTargetIndex = body1.getData('enemyTargetIndex')
    bullets.children.iterate(child => {
        const childEnemyTargetIndex = child.getData('enemyTargetIndex')
        if (childEnemyTargetIndex == bodyEnemyTargetIndex) {
            const closestEnemyId = getClosestEnemy(child.x, child.y, 1000)
            child.setData({ enemyTargetIndex: closestEnemyId })
        }
    })
    // body1 = bullet, body2 = enemy
    bullets.remove(body1, true, true)
    enemies.remove(body2, true, true)
    if (enemies.children.entries.length === 0) {
        physics.pause()
        player.setTint(0xff0000);
        setTimeout(() => {
            scene.restart()
        }, 2000)
    }
}

const enemyHitPlayer = () => {
    physics.pause()
    player.setTint(0xff0000);
    setTimeout(() => {
        scene.restart()
    }, 2000)

}

