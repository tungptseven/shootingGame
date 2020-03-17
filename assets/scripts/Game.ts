// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    bullet: cc.Prefab = null

    @property(cc.Prefab)
    badguy: cc.Prefab = null

    @property(cc.Label)
    scoreLabel: cc.Label = null

    @property({type: cc.AudioClip})
    gun = null

    @property
    posX: number = 0

    @property
    posY: number = 0

    @property
    score: number = 0

    // LIFE-CYCLE CALLBACKS:
    spawn(event) {
        let newBullet = cc.instantiate(this.bullet)
        newBullet.setPosition(this.node.getChildByName('soldier').position.x, this.node.getChildByName('soldier').position.y)
        this.node.addChild(newBullet)

        let mousePosition = event.getLocation()
        mousePosition = this.node.convertToNodeSpaceAR(mousePosition)
        this.posX = mousePosition.x
        this.posY = mousePosition.y

        let actionBy = cc.moveTo(0.2, cc.v2(this.posX, this.posY))
        let destruction = cc.callFunc(() => {
            newBullet.destroy()
        }, this)
        let sequence = cc.sequence(actionBy, destruction)
        newBullet.runAction(sequence)
        cc.audioEngine.playEffect(this.gun, false)
    }

    createBad() {
        let newBadGuy = cc.instantiate(this.badguy)
        const positions = [
            cc.v2(-643, 382), cc.v2(570, -486), cc.v2(-627, 21), cc.v2(636, -7),
            cc.v2(643, -382), cc.v2(-570, 486), cc.v2(627, -21), cc.v2(-636, 7),
        ]
        let badGuyPosition = Math.floor(Math.random() * positions.length)
        newBadGuy.setPosition(positions[badGuyPosition])
        this.node.addChild(newBadGuy)
    }

    addScore() {
        this.score += 10
        this.scoreLabel.string = 'SCORE: ' + this.score.toString()
    }

    onLoad() {
        this.node.on('mousedown', this.spawn, this)
        this.schedule(this.createBad, 1, cc.macro.REPEAT_FOREVER, 3)
    }

    start() {

    }

    // update (dt) {}
}
