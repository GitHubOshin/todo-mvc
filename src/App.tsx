// import reactLogo from './assets/react.svg'
import Todos from './components/Todos'
import './index.css'

function App() {
  return (
    <>
      <div className="app">
        <Todos />
        <p className="author">
          Created by{' '}
          <a href="#to-linkedin" target="_blank">
            Ganjanapas Phothong
          </a>
        </p>
      </div>
    </>
  )
}

export default App
