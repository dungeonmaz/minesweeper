import { makeAutoObservable } from 'mobx'

export default class MainStore {
    constructor() {
        this._sizeX = 7
        this._sizeY = 10
        this._grid = this._createGrid()
        this._mines = 5
        this._flags = 0
        this._lose = false
        this._win = false
        this._revealed = 0

        this._addMines(this._mines)

        makeAutoObservable(this)
    }

    get grid() {
        return this._grid
    }

    get lose() {
        return this._lose
    }

    get win() {
        return this._win
    }

    get flags() {
        return this._flags
    }

    get mines() {
        return this._mines
    }
    
    setMines(mines) {
        this._mines = mines
    }

    get sizeX() {
        return this._sizeX
    }

    setSizeX(sizeX) {
        this._sizeX = sizeX
    }

    get sizeY() {
        return this._sizeY
    }

    setSizeY(sizeY) {
        this._sizeY = sizeY
    }

    _createGrid = () => {
        let row = []
        for (let i = 0; i < this._sizeX; i++) {
            let col = []
            for (let j = 0; j < this._sizeY; j++) {
                col.push({
                    x: i,
                    y: j,
                    value: 0,
                    flag: false,
                    mine: false,
                    reveal: false,
                })
            }
            row.push(col)
        }
        return row
    }

    _addMine = (x, y) => {
        const tile = this._grid[x][y]
        if (tile.mine) return false

        tile.mine = true

        const neighbours = this._findNeighbours(x, y)
        neighbours.forEach((el) => {
            this._grid[el.x][el.y].value += 1
        })
        return true
    }

    _findNeighbours = (x, y) => {
        const rowLimit = this._sizeX - 1
        const columnLimit = this._sizeY - 1
        const neighbours = []

        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, rowLimit); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, columnLimit); j++) {
                if (i !== x || j !== y) {
                    neighbours.push({ x: i, y: j })
                }
            }
        }
        return neighbours
    }

    _addMines = (minesCount) => {
        let mines = 0
        console.log(minesCount)
        while (true) {
            let randX = Math.floor(Math.random() * this._sizeX)
            let randY = Math.floor(Math.random() * this._sizeY)
            if (this._addMine(randX, randY)) {
                mines += 1
                if (mines === minesCount) return
            }
        }
    }

    _revealAll = () => {
        for (let i = 0; i < this._sizeX; i++) {
            for (let j = 0; j < this._sizeY; j++) {
                this._grid[i][j].reveal = true
            }
        }
    }

    _checkWin = () => {
        this._revealed += 1
        if (this._revealed === this._sizeX * this._sizeY - this._mines) {
            this._win = true
        }
    }

    switchFlag = (x, y) => {
        const tile = this._grid[x][y]
        if (tile.reveal) return
        if (tile.flag) {
            this._flags -= 1
            tile.flag = false
        } else {
            this._flags += 1
            tile.flag = true
        }
    }

    revealNeighbours = (x, y) => {
        const tile = this._grid[x][y]
        if (!tile.reveal) return
        const neighbours = this._findNeighbours(x, y)
        neighbours.forEach((el) => {
            this.revealTile(el.x, el.y)
        })
    }

    revealTile = (x, y) => {
        const tile = this._grid[x][y]

        if (tile.flag) return

        if (tile.reveal) return
        tile.reveal = true

        if (tile.mine) {
            this._lose = true
            this._revealAll()
        }

        this._checkWin()

        if (tile.value === 0) {
            const neighbours = this._findNeighbours(x, y)
            neighbours.forEach((el) => {
                if (!this._grid[el.x][el.y].mine) {
                    this.revealTile(el.x, el.y)
                }
            })
        }
    }

    restart = () => {
        this._grid = this._createGrid()
        this._flags = 0
        this._lose = false
        this._win = false
        this._revealed = 0

        this._addMines(this._mines)
    }
}