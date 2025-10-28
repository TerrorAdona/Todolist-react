import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  texte: string;
  priority: Priority
}

function App() {
  const [input, setInput ] = useState("")
  const [priority, setPriority ] = useState<Priority>("Moyenne")

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos ] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Priority | "Tous">("Tous")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") {
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      texte: input.trim(),
      priority: priority
    }

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    console.log(newTodos);
  }

  let filteredTodos: Todo[] = []

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  const urgentCount = todos.filter((t) => t.priority === 'Urgente').length;
  const moyenneCount = todos.filter((t) => t.priority === 'Moyenne').length;
  const basseCount = todos.filter((t) => t.priority === 'Basse').length;
  const totalCount = todos.length;

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  function toggleTodoSelection(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodos(newSelected);
  }

  function finishSelection() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newTodos);
    setSelectedTodos(new Set());
  }

  return (
    <>
    <div className="flex justify-center p-5">
      <ul className="menu menu-horizontal bg-base-200 rounded-box p-2 justify-center gap-2 mb-5">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-5 bg-base-300 p-5 rounded-2xl">
          <div className="flex gap-4">
            <input type="text" className="input w-full" placeholder="Ajouter une tâche..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <select name="priority" id="priority" className="select w-full" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <button className="btn btn-primary" onClick={addTodo}>
              Ajouter
            </button>
          </div>
          <div className="space-y-2 flex-1 h-fit">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-4">
              <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}>Tous ({totalCount})</button>
              <button className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`} onClick={() => setFilter("Urgente")}>Urgente ({urgentCount})</button>
              <button className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`} onClick={() => setFilter("Moyenne")}>Moyenne ({moyenneCount})</button>
              <button className={`btn btn-soft ${filter === "Basse" ? "btn-primary" : ""}`} onClick={() => setFilter("Basse")}>Basse ({basseCount})</button>
            </div>
            <button className="btn btn-primary" disabled={selectedTodos.size === 0} onClick={finishSelection}>Finir la séléction ({selectedTodos.size})</button>
            </div>
            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20">
                {filteredTodos.map((todo) => (
                  <li key={todo.id} className="py-2">
                    <TodoItem 
                    todo={todo} 
                    onDelete={() => deleteTodo(todo.id)} 
                    isSelected={selectedTodos.has(todo.id)} 
                    onToggleSelection={() => toggleTodoSelection(todo.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center flex-col p-5">
                <div>
                  <Construction strokeWidth={1} className="w-16 h-16 text-primary mx-auto"/>
                </div>
                <div className="text-center text-sm mt-4 text-lg">
                  Aucune tâche à afficher.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
