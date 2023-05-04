let canvas = document.getElementById('canvas')
let zoomIn = document.getElementById('zoomIn')
let zoomOut = document.getElementById('zoomOut')
let speedUp = document.getElementById('speedUp')
let zoomDown = document.getElementById('slowDown')
let c = canvas.getContext('2d')
let windowH = window.innerHeight
let windowW = window.innerWidth
canvas.width = windowW
canvas.height = windowH
canvas.style.background = "#000000"
let sun
let sunDiameter = 1391400
let theta = 0
let wscale
let zoom = .4
let warpSpeed = .5

class Body{
    constructor(traits){
        this.name = traits[0]
        this.diameter = traits[1] / 2000 * zoom
        this.rx = traits[2] * wscale 
        this.ry = traits[3] * wscale 
        this.period = traits[4] / 365 * 2 * Math.PI
        this.color = traits[5]
        this.x = 0
        this.y = 0
    }
    update(angle){
        this.x = sun.x + this.rx * Math.cos(2 * Math.PI / this.period * angle)
        this.y = sun.y + this.ry * Math.sin(2 * Math.PI / this.period * angle)
    }
    draw() {
        c.beginPath()
        c.strokeStyle = this.color
        c.lineWidth = 1
        c.ellipse(sun.x, sun.y,this.rx,this.ry, 0, 0, 2 * Math.PI)
        c.stroke()
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI)
        c.fill()
    }
    orbit(angle) {
        this.update(angle)
        this.draw()
    }
}

zoomIn.addEventListener('click', (event)=> {
    zoom = zoom + 0.1
    createBodies()
})

zoomOut.addEventListener('click', (event)=> {
    zoom = zoom - 0.1
    createBodies()
})

speedUp.addEventListener('click', (event)=> {
    warpSpeed = warpSpeed + 0.1
    createBodies()
})

slowDown.addEventListener('click', (event)=> {
    if(warpSpeed > 0){
        warpSpeed = warpSpeed - 0.1
        createBodies()
    }
    if(warpSpeed < 0){
        warpSpeed = 0
    }
})

function windowResize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    createBodies()
}

window.addEventListener('resize', windowResize)

window.addEventListener('scroll', (event)=> {
    console.log(event)
})

function createBodies(){
    wscale = canvas.width / (4540 * 2) * zoom
    sun = new Body(["Sun", sunDiameter / 100, 0, 0, 0, 'yellow'])
    sun.x = canvas.width / 2
    sun.y = canvas.height / 2
    mercury = new Body(["Mercury", 4880, 69.8, 46, 88, 'darkgrey']);
    venus = new Body(["Venus", 12104, 108.9, 107.5, 225, 'purple']);
    earth = new Body(["Earth", 12742, 152.1, 147.1, 365, 'blue']);
    mars = new Body(["Mars", 6780, 249.2, 206.7, 687, 'red']);
    jupiter = new Body(["Jupiter", 139822, 816.6, 740.5, 4333, 'tan']);
    saturn = new Body(["Saturn", 116464, 1514.5, 1352.5, 10759, 'lightgrey']);
    uranus = new Body(["Uranus", 50724, 3008, 2742, 30689, 'cyan']);
    neptune = new Body(["Neptune", 49244, 4540, 4460, 60182, 'blue']);
}

function drawBodies() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    theta = theta + 0.1 * warpSpeed
    sun.draw()
    mercury.orbit(theta)
    venus.orbit(theta)
    earth.orbit(theta)
    mars.orbit(theta)
    jupiter.orbit(theta)
    saturn.orbit(theta)
    uranus.orbit(theta)
    neptune.orbit(theta)
}

function animate(){
    requestAnimationFrame(animate)
    drawBodies()
}

createBodies()
animate()

