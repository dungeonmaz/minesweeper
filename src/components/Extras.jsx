import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

const Extras = observer(() => {
    const { store } = useContext(Context)

    return (
        <div className='extras'>
            <div>{store.lose && <div>Lose</div>}</div>
            <div>{store.win && <div>Win</div>}</div>
            <btn className="button" onClick={() => store.restart()}>Restart</btn>
        </div>
    )
})

export default Extras