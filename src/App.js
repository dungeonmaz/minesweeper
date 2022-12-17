import Board from "./components/Board"
import Extras from "./components/Extras"
import Info from "./components/Info"
import Settings from "./components/Settings"

const App = () => {
  return (
    <div className="screen">
      <Info />
      <Board />
      <Extras />
      <Settings />
    </div>
  )
}

export default App