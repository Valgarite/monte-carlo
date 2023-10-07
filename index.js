const inputs = ["graph", "sim-slider", "sim-quantity"]
const [graphCanvas, slider, numberInput] = inputs.map(id => { return document.getElementById(id) })

const canvasSize = graphCanvas.width
graphCanvas.height = canvasSize
const squareSize = ((canvasSize / 32))
const [offsetX, offsetY] = [squareSize * 2, squareSize * 12] //reemplazar el 0 por un input
const [begin, finish] = [0, canvasSize]
const ctx = graphCanvas.getContext("2d")
console.log(graphCanvas)

drawSim()

function drawSim() {
    const halfPx = { x: Math.round(canvasSize / 2 + offsetY), y: Math.round(canvasSize / 2 - offsetX) }
    console.log(offsetX, offsetY)
    console.log(halfPx)
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize) {
        drawAxis(currentPx, halfPx)
    }
}

drawFunction(2, 3, 100)
function drawFunction(start, end, length) {
    const xList = Array.from({ length }, (x, i) => {
        const unit = start + (end - start) / length * i
        return unit
    })
    console.log(xList)
}

function drawAxis(currentPx, halfPx) {
    const check = Math.round(currentPx)
    ctx.beginPath()
    ctx.moveTo(begin, currentPx)
    ctx.lineTo(finish, currentPx)
    if (halfPx.x == check) { ctx.strokeStyle = "cyan" } else { ctx.strokeStyle = "orange" }
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(currentPx, begin)
    ctx.lineTo(currentPx, finish)
    if (halfPx.y == check) { ctx.strokeStyle = "cyan" } else { ctx.strokeStyle = "orange" }
    ctx.stroke()
}