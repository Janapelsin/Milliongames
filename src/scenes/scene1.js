let player
let cursors
let key_Q

export default class Scene1 extends Phaser.Scene {
   
    constructor() {
        super({ key: 'Scene1'})

    }

    preload() {
        this.load.image('bg', '../../assets/bg.png')
        this.load.image('shortborder', '../../assets/shortborder.png')
        this.load.image('longborder', '../../assets/longborder.png')
        this.load.image('player', '../../assets/player.png')
    }

    create() {
        this.add.image(400,300,'bg')
        let walls
        walls = this.physics.add.staticGroup()

        walls.create(400, 20, 'longborder')
        walls.create(400, 580, 'longborder')
        walls.create(20, 300, 'shortborder')
        walls.create(780, 300, 'shortborder')

        
        player = this.physics.add.sprite(400, 300, 'player')
        player.setCollideWorldBounds(true)
        player.body.allowGravity =false

        this.physics.add.collider(player, walls)

        cursors = this.input.keyboard.createCursorKeys();
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    }

    update(delta) {
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