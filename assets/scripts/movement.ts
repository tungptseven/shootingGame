// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Movement extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    positionXY(event) 
    {
        let playerPosition = cc.v2(this.node.position.x, this.node.position.y)
        let mousePosition = event.getLocation()

        mousePosition = this.node.parent.convertToNodeSpaceAR(mousePosition)
        let angle = mousePosition.signAngle(playerPosition)
        let angleD = cc.misc.radiansToDegrees(angle)
        angleD = (angleD * -1) - 45
        this.node.angle = angleD
    }

    onLoad () 
    {
        this.node.parent.on('mousemove', this.positionXY, this)
    }

    start () {

    }

    // update (dt) {}
}
