class Game {
  constructor (numberOfRows,numberOfColumns,numberOfBombs){
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  playMove (rowIndex,columnIndex){
    this._board.flipTile(rowIndex,columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game Over :( ');
      this._board.print();
    }
    else if (!this._board.hasSafeTiles()){
      console.log('YOU WIN!')
    }
    else {
      console.log('Current Board');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns*numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  //creamos la variable fliptile()
  flipTile(rowIndex,columnIndex){
    if (this.playerBoard[rowIndex][columnIndex]!==' '){
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this._bombBoard[rowIndex][columnIndex]==='B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
    }
    this._numberOfTiles--;
  }

  //creamos una funcion para obtener las bombas adyacentes
  //This will calculate the number of bombs next to the square at the given rowIndex and columnIndex on the provided bombBoard.
  getNumberOfNeighborBombs (rowIndex,columnIndex) {
    //cada array representa una casilla adyacente
    const neighborOffsets = [
      [0,1],
      [0,-1],
      [1,0],
      [-1,0],
      [-1,-1],
      [1,1],
      [1,-1],
      [-1,1]
    ];
    //calcula el numero de filas contando las arrays dentro de bombBoard(array)
    const numberOfRows = this._bombBoard.length;
    //calcula las columnas contando los elementos ' ' dentro de la primera nested array
    const numberOfColumns = this._bombBoard[0].length;
    //numero de bombas descubiertas alrededor ; creamos la variable
    let numberOfBombs = 0;
    //foreach para cada casilla de las 8 alrededor
    neighborOffsets.forEach(offset => {
      //calcula las coordenadas de las casillas adyacentes
      const neighborRowIndex= rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      //Controla que la casilla no esté fuera del tabero
      if (neighborRowIndex>=0&&neighborRowIndex<=numberOfRows&&neighborColumnIndex>=0&&neighborColumnIndex<=numberOfColumns){
        //se ejecuta : en el caso de que la casilla en cuestion contiene una bomba
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex]==='B'){
          //sumamos 1 al contador
          numberOfBombs++;
        }
      }
    });
    //devuelve el numero de bombas como llamada de la funcion
    return numberOfBombs;

  }

  // Comprueba si el jugador ha ganado
  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }
  //le damos formato al tablero
  print(){
   console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  //creamos una constante con la función que generará el tablero, acepta 2 parametros
  static generatePlayerBoard (numberOfRows, numberOfColumns){
    //creamos una array vacía que contiene el tablero
    const board = [];
    //iteramos por el numero de filas
    for (let rowIndex=0;rowIndex<numberOfRows;rowIndex++){
      //creamos una array vacía que contiene una fila
      const row = [];
      //iteramos por el numero de columnas
      for (let cIndex=0;cIndex<numberOfColumns;cIndex++){
        //ponemos un espacio vacío en la fila
        row.push(' ');
      }
      //ponemos la fila en la array del tablero
      board.push(row);
    }
    //devolvemos el tablero como respuesta a la llamada de la función
    return board;
  }

  //Creamos la función que generará las bombas del tablero
  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
    //creamos una array vacía que contiene el tablero
    const board = [];
    //iteramos por el numero de filas
    for (let rowIndex=0;rowIndex<numberOfRows;rowIndex++){
      //creamos una array vacía que contiene una fila
      const row = [];
      //iteramos por el numero de columnas
      for (let cIndex =0;cIndex<numberOfColumns;cIndex++){
        //ponemos un espacio vacío en la fila
        row.push(null);
      }
      //ponemos la fila en la array del tablero
      board.push(row);
    }

    //creamos una variable con el numero de bombas ya colocadas.
    let numberOfBombsPlaced = 0 ;
    //creamos un loop mientras la condicion sea cierta
    while (numberOfBombsPlaced<numberOfBombs){
      //IMPORTANT: The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
      //generamos las bombas automaticamente y sumamos a la variable creada anteriormente
      const randomRowIndex = Math.floor(Math.random()*numberOfRows);
      const randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B'
        numberOfBombsPlaced ++;
      }
    }
    //devolvemos el tablero como respuesta a la llamada de la función
    return board;
  }

}

const g = new Game(3,3,3);
g.playMove(1,1);


//VIEJA VERSION
/*//creamos dos variables que almacenan los parametros para el printBord
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
console.log('Player Board:')
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);

flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board:');
printBoard(playerBoard);
*/
