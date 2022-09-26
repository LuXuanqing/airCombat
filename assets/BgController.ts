import { _decorator, Component, Node, UITransform, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgController')
export class BgController extends Component {
    speed: number = 500 //每秒移动距离
    canvasHeight: number = null //背景图片高度，用于计算背景重置后初始化的位置

    start() {
        this.canvasHeight = find('Canvas').getComponent(UITransform).height
    }

    update(deltaTime: number) {
        console.log(this.name)
        // 自动向下移动
        this.node.setPosition(0, this.node.position.y - deltaTime * this.speed)


        // FIXME: 拼接出有一条黑线，并且移动不够顺滑
        // 移动到超出屏幕后，跳转到屏幕上方循环播放
        if (this.node.position.y < -this.canvasHeight) {
            this.node.setPosition(0, this.canvasHeight)
        }
    }


}

