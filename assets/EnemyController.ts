import { _decorator, Component, Node, SpriteFrame, Sprite, RigidBody2D, Vec2, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property(SpriteFrame)
    boomSprite: SpriteFrame = null

    start() {
        // 监听碰撞
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {

    }

    die() {
        // 速度清零，停止移动
        this.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0)
        // 换成爆炸图片
        this.getComponent(Sprite).spriteFrame = this.boomSprite
        // 0.3s后销毁
        this.scheduleOnce(() => { this.node.destroy() }, 0.3)
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact', selfCollider.name, otherCollider.name);
        // 撞上边界障碍物
        if (otherCollider.tag == 3) {
            this.die()
        }
    }
}

