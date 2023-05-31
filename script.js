let width = parseFloat(document.getElementById('width-inp').value);
let height = parseFloat(document.getElementById('height-inp').value);

let btn = document.getElementById('btn-create');

let width_array = []

btn.addEventListener('click', () => {
    createGrid(height, width);
});

function getCoords(x, y) {
    let cel = document.getElementById(`cel-${x}-${y}`)

    if (cel.style.background != "black") cel.style.background = "black"
    else cel.style.background = ""
}


function createGrid(height, width) {
    let html = "<table id='grid-table' cellspacing=0 cellpadding=0 >"
    for (let i = 0; i < height; i++) {
        html += "<tr>"
        for (let f = 0; f < width; f++) {
            width_array.push('.');
            html += `<td id="cel-${i}-${f}" onmouseup="getCoords(${i}, ${f})">` + `<input type="checkbox" id="checkInp" onclick="console.log('e')">`
            html += "</td>"
        }
        html += "</tr>"
    }

    html += "</table>"
    let grid = document.getElementById("tablero")
    grid.innerHTML = html
    let gridTable = document.getElementById("grid-table")
    gridTable.style.width = `${25 * width} px`
    gridTable.style.height = `${25 * height} px`
}




