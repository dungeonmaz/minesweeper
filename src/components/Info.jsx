import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

const Info = observer(() => {
    const { store } = useContext(Context)
    return (
        <div className='info'>
            <div>Mines: {store.mines}</div>
            <div>Flags: {store.flags}</div>
        </div>
    )
})

export default Info