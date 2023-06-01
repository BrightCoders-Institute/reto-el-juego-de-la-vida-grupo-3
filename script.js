const columnas = parseFloat(document.getElementById("width-inp").value);
const filas = parseFloat(document.getElementById("height-inp").value);
let isAlive = false;
const tabla = document.getElementById("tablero");

const btn = document.getElementById("btn-create");

let tablero = new Array(filas);
let nuevoTablero = new Array(filas);
for (let i = 0; i < filas; i++) {
  tablero[i] = new Array(columnas).fill(0);
  nuevoTablero[i] = new Array(columnas).fill(0);
}

for (let i = 0; i < filas; i++) {
  for (let j = 0; j < columnas; j++) {
    tablero[i][j] = Math.round(Math.random());
  }
}

function crearTabla() {
  let html = "";
  for (let i = 0; i < filas; i++) {
    html += "<tr>";
    for (let j = 0; j < columnas; j++) {
      if (tablero[i][j] === 1) {
        html += "<td style='background-color: black;'></td>";
      } else {
        html += "<td style='background-color: white;'></td>";
      }
    }
    html += "</tr>";
  }
  tabla.innerHTML = html;
}

function calcularSiguienteEstado() {
  if (isAlive) {
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        const vecinos = contarVecinos(i, j);
        if (tablero[i][j] === 1) {
          if (vecinos < 2 || vecinos > 3) {
            nuevoTablero[i][j] = 0;
          } else {
            nuevoTablero[i][j] = 1;
          }
        } else {
          if (vecinos === 3) {
            nuevoTablero[i][j] = 1;
          } else {
            nuevoTablero[i][j] = 0;
          }
        }
      }
    }

    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        tablero[i][j] = nuevoTablero[i][j];
      }
    }

    crearTabla();
  }
}

function contarVecinos(fila, columna) {
  let contador = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const vecinoFila = fila + i;
      const vecinoColumna = columna + j;
      if (
        vecinoFila >= 0 &&
        vecinoFila < filas &&
        vecinoColumna >= 0 &&
        vecinoColumna < columnas
      ) {
        contador += tablero[vecinoFila][vecinoColumna];
      }
    }
  }
  return contador;
}

btn.addEventListener("click", () => {
  crearTabla();
  isAlive = true;
  setInterval(calcularSiguienteEstado, 500);
});
