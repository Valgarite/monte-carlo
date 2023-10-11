const inputs = ["graph", "sim-slider", "sim-quantity"]
const [graphCanvas, slider, numberInput] = inputs.map(id => { return document.getElementById(id) })
const canvasSize = graphCanvas.width
graphCanvas.height = canvasSize
const [begin, finish] = [0, canvasSize]
const ctx = graphCanvas.getContext("2d")
ctx.font = "16px Arial";
ctx.fillStyle = "#fff"
//Estos de acá abajo tienen valores ajustables.
const tov = createTableOfValues(2, 3, 100)
const separation = { x: 16, y: 16 }
const squareSize = { x: canvasSize / separation.x, y: canvasSize / separation.y }
const [offsetX, offsetY] = [squareSize.x * -4, squareSize.y * 7]
const halfPx = { x: Math.round(canvasSize / 2 + offsetX), y: Math.round(canvasSize / 2 + offsetY) }
const scale = { x: 2 / 1, y: 1 / 2 }
// drawSim()

function drawSim() {
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize.x) {
        drawAxis(currentPx, halfPx, "y", scale)
    }
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize.y) {
        drawAxis(currentPx, halfPx, "x", scale)
    }
    // console.log(tov)
    drawFunction()
    ctx.beginPath()
    tov.xList.forEach((xValue, i)=>{
        ctx.fillRect(xValue, )
    })
}
function drawAxis(currentPx, halfPx, dir, scale) {
    const check = Math.fround(currentPx)
    const axisOffset = { x: 0 * squareSize.x, y: 0 * squareSize.y }
    ctx.beginPath()
    ctx.lineWidth = 3
    if (dir == "x") {
        ctx.moveTo(begin, currentPx)
        ctx.lineTo(finish, currentPx)
        const text = ((currentPx - halfPx.x) / separation.x / 2) / scale.x
        if (text) {
            ctx.fillText(text, currentPx, halfPx.y + axisOffset.y);
        }
        if (halfPx.y + axisOffset.y == check) { ctx.strokeStyle = "#00ff00" } else { ctx.strokeStyle = "#ff00ff" }
    } else if (dir == "y") {
        ctx.moveTo(currentPx, begin)
        ctx.lineTo(currentPx, finish)
        const text = -((currentPx - halfPx.y) / separation.y / 2) / scale.y
        if (text) {
            ctx.fillText(text, halfPx.x + axisOffset.x, currentPx);
        }
        if (halfPx.x + axisOffset.x == check) { ctx.strokeStyle = "#00ff00" } else { ctx.strokeStyle = "#ff00ff" }
    }
    ctx.stroke()
}
function drawFunction() {
    ctx.beginPath()
    ctx.moveTo((tov.xList[0] * squareSize * scale.x + halfPx.x), (tov.yList[0] * - squareSize * scale.x + halfPx.y))
    tov.xList.forEach((xValue, i) => {
        const x = xValue * squareSize.x * scale.x + halfPx.x
        const y = tov.yList[i] * -squareSize.y * scale.y + halfPx.y
        // console.log(x, y)
        ctx.lineTo(x, y)
        console.log(xValue)
    });
    ctx.strokeStyle = "#FFFF00"
    ctx.stroke()
}
function createTableOfValues(start, end, length) {
    const xList = Array.from({ length }, (x, i) => {
        const unit = start + (end - start) / length * i
        return rounder(unit, 100)
    })
    xList.push(end)
    const yList = xList.map((x) => { return rounder((3 * (x ** 2)), 100) })
    return { xList, yList }
}
function rounder(number, qtyToRound) {
    return Math.round(number * qtyToRound) / qtyToRound
}
function valueUpdate() {
    
}