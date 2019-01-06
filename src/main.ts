import 'phaser';
import Scene1 from './scenes/scene1';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            },
        }
    },
    scene: [
        Scene1,
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
