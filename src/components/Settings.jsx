import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { Context } from ".."

const Settings = observer(() => {
    const { store } = useContext(Context)
    const [sizeX, setSizeX] = useState(store.sizeX)
    const [sizeY, setSizeY] = useState(store.sizeY)
    const [mines, setMines] = useState(store.mines)

    const handleNew = () => {
        store.setSizeX(sizeX)
        store.setSizeY(sizeY)
        if (mines > (sizeX * sizeY / 3)) {
            setMines(sizeX * sizeY / 3)
            store.setMines(sizeX * sizeY / 3)
        } else {
            store.setMines(mines)
        }
        store.restart()
    }

    return (
        <div className="settings">
            <div class="sliderContainer">
                <div>Height</div>
                <input type="range" min="4" max="20" value={sizeX} onInput={(e) => setSizeX(e.target.value)} />
                <div>{sizeX}</div>
            </div>
            <div class="sliderContainer">
                <div>Width</div>
                <input type="range" min="4" max="20" value={sizeY} onInput={(e) => setSizeY(e.target.value)} />
                <div>{sizeY}</div>
            </div>
            <div class="sliderContainer">
                <div>Mines</div>
                <input type="range" min="2" max={sizeX * sizeY / 3} value={mines} onInput={(e) => setMines(Number(e.target.value))} />
                <div>{mines}</div>
            </div>
            <btn className="button" onClick={handleNew}>New</btn>
        </div>
    )
})

export default Settings