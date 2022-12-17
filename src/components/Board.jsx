import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'
import Tile from './Tile'

const Board = observer(() => {
    const { store } = useContext(Context)
    return (
        <div className='board'>
            {store.grid.map((x, index) => (
                <div style={{display:'flex'}} key={index}>
                    {x.map((col) => (
                        <Tile data={col} key={col.x + '_' + col.y}/>
                    ))}
                </div>
            ))}
        </div>
    )
})

export default Board