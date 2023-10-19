const elementIds = ["graph", "sim-slider", "sim-quantity"]
const [graphCanvas, slider, numberInput] = elementIds.map(id => { return document.getElementById(id) })
const canvasSize = graphCanvas.width
graphCanvas.height = canvasSize
const [begin, finish] = [0, canvasSize]
const ctx = graphCanvas.getContext("2d")
ctx.font = "16px Arial";
ctx.textAlign = "right"
//Estos de acá abajo tienen valores ajustables.
const [lim1, lim2, accuracy] = [2, 3, 200]
const tov = createTableOfValues(lim1, lim2, accuracy)
const area = tov.yList[tov.yList.length - 1] * (lim2 - lim1)
const separation = { x: 16, y: 16 }
const squareSize = { x: canvasSize / separation.x, y: canvasSize / separation.y }
const [offsetX, offsetY] = [-6 * squareSize.x, 2 * squareSize.y]
const axisOffset = { x: 0 * squareSize.x, y: 0 * squareSize.y }
const scale = { x: 2 / 1, y: 1 / 4 }
const valorReal = 24
//Fin de los valores ajustables.
const halfPx = { x: Math.round(canvasSize / 2 + offsetX), y: Math.round(canvasSize / 2 + offsetY) }
drawSim()

function drawSim() {
    ctx.fillStyle = "#0000ff"
    ctx.fillRect(0, 0, graphCanvas.width, graphCanvas.height)
    ctx.fillStyle = "#fff"
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize.x) {
        drawAxis(currentPx, halfPx, "y", scale)
    }
    for (let currentPx = 0; currentPx <= canvasSize; currentPx += squareSize.y) {
        drawAxis(currentPx, halfPx, "x", scale)
    }
    // console.log(tov)
    drawFunction()
    monteCarlo(tov.xList, tov.yList, numberInput.value)
}
function drawAxis(currentPx, halfPx, dir, scale) {
    const check = Math.fround(currentPx)
    ctx.beginPath()
    ctx.lineWidth = 3
    if (dir == "x") {
        ctx.moveTo(begin, currentPx)
        ctx.lineTo(finish, currentPx)
        const text = ((currentPx - halfPx.x) / separation.x / 2) / scale.x
        if (text) {
            ctx.fillText(text, currentPx, halfPx.y + axisOffset.y + squareSize.y/2);
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
        // console.log(xValue)
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
    const yList = xList.map((x) => rounder(mathFunct(x), 100))
    return { xList, yList }
}
function rounder(number, qtyToRound) {
    return Math.round(number * qtyToRound) / qtyToRound
}
function valueUpdate() {

}
function mathFunct(x) {
    return (3 * x ** 2 + 2*x)
}
function monteCarlo(xValues, yValues, simQty) {
    //CREACIÓN DE VALORES
    const getLast = (list) => list[list.length - 1]
    // const xLast = getLast(xValue)
    const yLast = getLast(yValues)
    // console.log(yValues)
    // console.log(yLast)
    const mcList = []
    let aciertos = 0
    for (let index = 0; index < simQty; index++) {
        const [xIndex, y] = [getRandomIntInclusive(0, xValues.length), getRandomInclusive(0, yLast)]
        const comparedValues = { x: xValues[xIndex], y: yValues[xIndex] }
        //REPRESENTARLOS EN LA GRÁFICA
        const xDraw = xValues[xIndex] * squareSize.x * scale.x + halfPx.x
        const yDraw = y * -squareSize.y * scale.y + halfPx.y
        // console.log(yDraw)
        // console.log(xDraw, yDraw)
        if (y > comparedValues.y) {
            ctx.fillStyle = "#ff9900"
            ctx.fillRect(xDraw, yDraw, -2, -2); // fill in the pixel
        } else {
            aciertos++
            ctx.fillStyle = "#00fefe"
            ctx.fillRect(xDraw, yDraw, 2, 2); // fill in the pixel
        }
        mcList.push(xValues[xIndex], y)
    }
    const passedRatio = aciertos / simQty
    const areaCalculada = passedRatio * area
    const errorPercent = Math.abs(areaCalculada - valorReal) / valorReal * 100
    simResultToDocument(areaCalculada, errorPercent, passedRatio * 100)
    // console.log(mcList)
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function getRandomInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const calc = rounder(Math.random() * (max - min) + min, 1000)
    return calc // The maximum is inclusive and the minimum is inclusive
}
function updateInputs(id, value) {
    var inputs = document.getElementsByClassName("control");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id !== id) {
            inputs[i].value = value;
            // console.log(value)
        }
    }
}
function simResultToDocument(areaFinal, porcentajeDeError, porcentajeAciertos) {
    const [simRes, percentErr, simSuccess] = ["sim-result", "percent-error", "sim-success"].map(el => document.getElementById(el))
    percentErr.innerText = "Porcentaje de error entre valor real y simulación: " + rounder(porcentajeDeError, 100) + "%"
    simRes.innerText = "Resultado aproximado por método de Monte Carlo: " + rounder(areaFinal, 100)
    simSuccess.innerText = "Porcentaje de éxitos: " + rounder(porcentajeAciertos, 100) + "%"
}