import { ChangeEvent, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../css/todos.css'

interface ITodo {
  id: string
  text: string
  completed: boolean
}

type FilteredType = 'all' | 'active' | 'completed'

function Todos(): JSX.Element {
  const [todoText, setTodoText] = useState('')
  const [editTodoText, setEditTodoText] = useState('')
  const [isAllCompleted, setIsAllCompleted] = useState(false)

  const [todos, setTodos] = useState<ITodo[]>([])

  const [filteredType, setFilteredType] = useState<FilteredType>('all')

  const [editTodoId, setEditTodoId] = useState('')

  // ✅
  function handleOnChangeInputTodo(e: ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value)
  }

  // ✅

  function handleInputAddTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.key === 'Enter') {
      const newTodo: ITodo = { id: uuidv4(), text: todoText, completed: false }
      setTodos([...todos, newTodo])
      setTodoText('')
    }
  }
  // ✅
  function handleRemoveTodo(todoId: string) {
    const remainedTodos: ITodo[] = todos.filter((todo) => todoId !== todo.id)
    setTodos(remainedTodos)
  }

  // ✅
  function handleUpdateStatus(todoId: string) {
    const updateTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updateTodos)
  }
  // ✅
  function handleClearCompleted() {
    const clearCompleted = todos.filter((todo) => todo.completed !== true)
    setTodos(clearCompleted)
  }

  const activatedTodos = todos.filter((todo) => todo.completed === false)

  // ✅  🥚 EGG
  const filteredTodos: ITodo[] = useMemo(() => {
    if (filteredType === 'all') {
      return todos
    }
    return todos.filter((todo) =>
      filteredType === 'completed' ? todo.completed : !todo.completed
    )
  }, [todos, filteredType])

  function handleChangeEditTodoText(e: ChangeEvent<HTMLInputElement>) {
    setEditTodoText(e.target.value)
  }

  function handleEditTodoText(
    e: React.KeyboardEvent<HTMLInputElement>,
    argTodoId: string
  ) {
    if (e.key === 'Enter') {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === argTodoId) {
          return { ...todo, text: editTodoText }
        }
        return todo
      })
      setTodos(updatedTodos)
      setEditTodoId('')

      //NO NEED TO SET THE "EditTodoText" AGAIN CUZ THE VALUE WILL AUTOMATICALLY CHANGE
      // setEditTodoText('')
    }
  }

  return (
    <div className="todos">
      <h1 className="title-todos">todos</h1>
      <div className="input-new-todo">
        {/* {todos.length > 0 ? (
          <button onClick={handleCompletedAll}>
            {isAllCompleted ? (
              <p className="all-completed">❯</p>
            ) : (
              <p className="all-uncompleted">❯</p>
            )}
          </button>
        ) : (
          <div className="hide-btn-complete-all"></div>
        )} */}
        <div className="hide-btn-complete-all"></div>
        <input
          value={todoText}
          onChange={handleOnChangeInputTodo}
          placeholder="What needs to be done?"
          onKeyUp={(e) => {
            handleInputAddTodo(e)
          }}
        />
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id} className="list">
              <button
                className="check-todo"
                onClick={() => handleUpdateStatus(todo.id)}
              >
                {todo.completed === true ? (
                  <img
                    alt="completed todo"
                    src={`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E`}
                  />
                ) : (
                  <img
                    alt="uncompleted todo"
                    src={`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E`}
                  />
                )}
              </button>

              <div
                className="show-todo-text"
                onDoubleClick={() => {
                  setEditTodoId(todo.id)
                  setEditTodoText(todo.text)
                }}
              >
                {todo.id === editTodoId ? (
                  <input
                    className="input-editing"
                    value={editTodoText}
                    onChange={handleChangeEditTodoText}
                    onKeyUp={(eventKey) =>
                      handleEditTodoText(eventKey, todo.id)
                    }
                  />
                ) : (
                  <div className="todo-text">
                    {todo.completed === true ? (
                      <p className="completed-todo">{todo.text}</p>
                    ) : (
                      <p className="uncompleted-todo">{todo.text}</p>
                    )}
                    {todo.id === editTodoId ? null : (
                      <button
                        onClick={() => handleRemoveTodo(todo.id)}
                        className="delete-btn"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
        <div className="bottom-todo-list">
          <p>
            {activatedTodos.length === 1
              ? `${activatedTodos.length} item left`
              : `${activatedTodos.length} items left`}
          </p>
          <div className="btn-bottom-todo-list">
            <button
              onClick={() => {
                setFilteredType('all')
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilteredType('active')
              }}
            >
              Active
            </button>
            <button
              onClick={() => {
                setFilteredType('completed')
              }}
            >
              Completed
            </button>
          </div>
          <button className="btn-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>
      </ul>
    </div>
  )
}

export default Todos
