
export default class Scene1 extends Phaser.Scene {
   
    constructor() {
        super({ key: 'Scene1'})
    }

    preload() {
        this.load.image('bg', '../../assets/bg.png')
        this.load.image('shortborder', '../../assets/shortborder.png')
        this.load.image('longborder', '../../assets/longborder.png')
    }

    create() {
        this.add.image(400,300,'bg')
        let walls
        walls = this.physics.add.staticGroup()

        walls.create(400, 20, 'longborder')
        walls.create(400, 580, 'longborder')
        walls.create(20, 300, 'shortborder')
        walls.create(780, 300, 'shortborder')
    }
}