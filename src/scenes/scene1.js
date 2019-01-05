
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1'})
    }
    preload() {
        this.load.image('sky', 'assets/sky.png')
    }

    create() {
        this.image = this.add.image(400, 300, 'sky')
    }
}