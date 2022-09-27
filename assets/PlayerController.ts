import { _decorator, Component, Node, NodeEventType, EventTouch, Vec3, Collider2D, Contact2DType, IPhysics2DContact, Prefab, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(Prefab)
    bulletPrefab: Prefab = null
    @property(Node)
    firePoint: Node = null

    start() {
        // 监听触摸操作
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)

        // 监听碰撞
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // 自动发射子弹
        console.log(this)
        this.schedule(this.fire, 0.2)
    }

    update(deltaTime: number) {

    }

    // 移动到触控位置
    onTouchMove(event: EventTouch): void {
        const location = event.getLocation()
        // console.log(location)
        // FIXME: 在375*667以外的分辨率设备上不跟手
        this.node.setPosition(location.x, location.y)
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact', selfCollider.name, otherCollider.name);
        // 撞上敌机
        if (otherCollider.tag == 1) {
            // TODO: 爆炸效果，重新开始按钮
            console.log('game over')
        }
    }

    die() {
        this.node.destroy()
    }

    fire() {
        const bullet = instantiate(this.bulletPrefab)
        bullet.setPosition(this.node.position)
        bullet.setParent(find('Canvas'))
    }


}
