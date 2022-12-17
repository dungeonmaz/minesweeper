import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

const Tile = observer(({ data }) => {
    const { x, y, value, mine, flag, reveal } = data
    const { store } = useContext(Context)

    const handleLeftClick = () => {
        store.revealTile(x, y)
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        store.switchFlag(x, y)
    }

    const handleDoubleClick = (e) => {
        e.preventDefault()
        store.revealNeighbours(x, y)
    }

    return (
        <div onDoubleClick={handleDoubleClick} onClick={handleLeftClick} onContextMenu={handleRightClick}
            className={`tile ${!flag ? (mine ? 'mine' : `color-${value}`) : 'flag'} ${(x + y) % 2 === 0 ? 'light' : 'dark'}`}>
            {reveal ? (mine ? "X" : value) : (flag && "!")}</div>
    )
})

export default Tile