import { _decorator, Component, Node, UITransform, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgController')
export class BgController extends Component {
    speed: number = 500 //每秒移动距离
    canvasHeight: number = null //屏幕高度，用于计算背景图片的重置触发点和重置后的初始位置

    start() {
        this.canvasHeight = find('Canvas').getComponent(UITransform).height
    }

    update(deltaTime: number) {
        // 自动向下移动
        this.node.setPosition(0, this.node.position.y - deltaTime * this.speed)

        // 移动到超出屏幕后，跳转到屏幕上方循环播放
        // 这里有个小trick，如果背景图片的高度正常是屏幕高度，拼接处会出现一条黑线。为了避免出现这条黑线，最好让图片比屏幕高一点点
        if (this.node.position.y < -this.canvasHeight) {
            this.node.setPosition(0, this.canvasHeight)
        }
    }
}

