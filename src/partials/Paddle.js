import {SVG_NS} from '../settings'

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 40
        this.score = 0

        document.addEventListener('keydown', event => {
            console.log(event)
            switch(event.key) {
                case up:
                    this.up()
                    break
                case down:
                    this.down()
                    break
            }
        })
    }

    up() {
        this.y = Math.max(0,this.y - this.speed)
        console.log('up')
    }
    down() {
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed)
        console.log('down')
    }

    coordinates(x, y, width, height) {
        let leftX = x
        let rightX = x + width
        let topY = y
        let bottomY = y + height
        return[leftX, rightX, topY, bottomY]
    }

    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect')
        rect.setAttributeNS(null, 'fill', '#049CD8')
        rect.setAttributeNS(null, 'width', this.width)
        rect.setAttributeNS(null, 'height', this.height)
        rect.setAttributeNS(null, 'x', this.x)
        rect.setAttributeNS(null, 'y', this.y)
        svg.appendChild(rect)

    }




}