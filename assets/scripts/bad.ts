// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default class Bad extends cc.Component {
    action: cc.ActionInterval

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter(other, self) {
        if (other.tag == 2) {
            this.node.destroy()
            this.node.parent.getComponent('Game').addScore()
        }
        if (other.tag == 1) {
            cc.director.loadScene('Game')
        }
    }

    moveToPLayer() {
        let moveAction = cc.moveTo(3, this.node.parent.getChildByName('soldier').position.x, this.node.parent.getChildByName('soldier').position.y)
        return moveAction
    }

    onLoad() {
        this.action = this.moveToPLayer()
        this.node.runAction(this.action)

        let manager = cc.director.getCollisionManager()
        manager.enabled = true

        cc.director.preloadScene('Game')
    }

    start() {

    }

    // update (dt) {}
}
