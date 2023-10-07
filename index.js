const inputs = ["graph", "sim-slider", "sim-quantity"]
const [graphCanvas, slider, numberInput] = inputs.map(id => { return document.getElementById(id) })

const canvasSize = graphCanvas.width
graphCanvas.height = canvasSize
const squareSize = canvasSize / 8
const [offsetX, offsetY] = [squareSize * 0, squareSize * 0]
const ctx = graphCanvas.getContext("2d")
console.log(graphCanvas)

drawSim()

function drawSim() {
    const halfPx = canvasSize / 2
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize) {
        ctx.beginPath()
        const drawingX = { y: currentPx + offsetY, begin: 0 + offsetX, finish: canvasSize + offsetX }
        const drawingY = { x: currentPx + offsetX, begin: 0 + offsetY, finish: canvasSize + offsetY }
        ctx.moveTo(drawingX.begin, drawingX.y)
        ctx.lineTo(drawingX.finish, drawingX.y)
        ctx.moveTo(drawingY.x, drawingY.begin)
        ctx.lineTo(drawingY.x, drawingX.finish)
        if (halfPx == currentPx) {
            ctx.strokeStyle = "cyan"
        } else {
            ctx.strokeStyle = "orange"
        }
        ctx.stroke()
    }
}

drawFunction(2, 3, 50)
function drawFunction(start, end, length) {
    const xList = Array.from({ length }, (x, i) => {
        return (end)
    })
    console.log(xList)
}