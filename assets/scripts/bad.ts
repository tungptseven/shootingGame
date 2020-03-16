// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bad extends cc.Component {
    action: cc.ActionInterval
    
    // LIFE-CYCLE CALLBACKS:

    moveToPLayer() {
        let moveAction = cc.moveTo(3, this.node.parent.getChildByName('soldier').position.x, this.node.parent.getChildByName('soldier').position.y)
        return moveAction
    }

    onLoad() { 
        this.action = this.moveToPLayer()
        this.node.runAction(this.action)
    }

    start () {

    }

    // update (dt) {}
}
