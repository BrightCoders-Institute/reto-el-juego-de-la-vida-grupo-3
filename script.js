this.btn = document.getElementById("btn-create");


class LifeGame {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.tablero = new Array(filas);
    this.nuevoTablero = new Array(filas);
    this.tabla = document.getElementById("tablero");
    this.isAlive = false;
  }

  createGrid() {
    for (let i = 0; i < this.filas; i++) {
      this.tablero[i] = new Array(this.columnas).fill(0);
      this.nuevoTablero[i] = new Array(this.columnas).fill(0);
    }

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        this.tablero[i][j] = Math.round(Math.random());
      }
    }
  }

  crearTabla() {
    this.createGrid();
    let html = "";
    for (let i = 0; i < this.filas; i++) {
      html += "<tr>";
      for (let j = 0; j < this.columnas; j++) {
        if (this.tablero[i][j] === 1) {
          html += "<td style='background-color: black;'></td>";
        } else {
          html += "<td style='background-color: white;'></td>";
        }
      }
      html += "</tr>";
    }
    this.tabla.innerHTML = html;
  }

  calcularSiguienteEstado() {
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        const vecinos = this.contarVecinos(i, j);
        if (this.tablero[i][j] === 1) {
          if (vecinos < 2 || vecinos > 3) {
            this.nuevoTablero[i][j] = 0;
          } else {
            this.nuevoTablero[i][j] = 1;
          }
        } else {
          if (vecinos === 3) {
            this.nuevoTablero[i][j] = 1;
          } else {
            this.nuevoTablero[i][j] = 0;
          }
        }
      }
    }

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.this.columnas; j++) {
        this.tablero[i][j] = this.nuevoTablero[i][j];
      }
    }

    crearTabla();

  }

  contarVecinos(fila, columna) {
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
          vecinoFila < this.filas &&
          vecinoColumna >= 0 &&
          vecinoColumna < this.columnas
        ) {
          contador += this.tablero[vecinoFila][vecinoColumna];
        }
      }
    }
    return contador;
  }

}


btn.addEventListener("click", () => {
  let instance = new LifeGame(5, 5, 'tablero');
  setInterval(instance.calcularSiguienteEstado(), 500);
  console.log('click');
});
