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

console.log(crearTablaDeValores(2, 3, 100))
function crearTablaDeValores(start, end, length) {
    const xList = Array.from({ length }, (x, i) => {
        const unit = start + (end - start) / length * i
        return rounder(unit, 100)
    })
    xList.push(end)
    const yList = xList.map((x) => { return rounder((3 * (x ** 2)), 100) })
    return { xList, yList }
}

function drawAxis(currentPx, halfPx) {
    const check = Math.fround(currentPx)
    ctx.beginPath()
    ctx.lineWidth = 3
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

function rounder(number, qtyToRound) {
    return Math.round(number * qtyToRound) / qtyToRound
}