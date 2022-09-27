import { _decorator, Component, Node, Prefab, find, UITransform, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemyPrefab: Prefab = null

    canvas: Node = null
    canvasWidth: number = null
    canvasHeight: number = null

    start() {
        this.canvas = find('Canvas')
        this.canvasWidth = this.canvas.getComponent(UITransform).width
        this.canvasHeight = this.canvas.getComponent(UITransform).height

        this.schedule(this.spawnEnemy, 2)
    }

    update(deltaTime: number) {

    }

    spawnEnemy() {
        const enemy = instantiate(this.enemyPrefab)
        enemy.setPosition(this.canvasWidth * Math.random(), this.canvasHeight)
        // enemy.setPosition(100, 100)
        enemy.setParent(this.canvas)
    }
}

