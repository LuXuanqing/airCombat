import { _decorator, Component, Node, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { EnemyController } from './EnemyController';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    speed: number = 900
    start() {
        // console.log(this.getComponent(RigidBody2D))
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact', otherCollider);

        // 子弹命中敌机
        if (otherCollider.tag == 1) {
            // TODO: 计分
            otherCollider.getComponent(EnemyController).die()
        }

        // 直接destroy会报错，不知道为什么这样就可以
        this.scheduleOnce(() => { this.node.destroy() }, 0)
    }


    update(deltaTime: number) {
    }

}

