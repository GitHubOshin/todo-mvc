// import reactLogo from './assets/react.svg'
import Todos from './components/Todos'
import './index.css'

function App() {
  return (
    <>
      <div className="app">
        <Todos />
        <footer className="author">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <b>Ganjanapas Phothong & Her friend</b>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
