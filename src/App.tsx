import { useEffect, useState } from "react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  texte: string;
  priority: Priority
}

function App() {
  const [input, setInput ] = useState("");
  const [priority, setPriority ] = useState<Priority>("Moyenne");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos ] = useState<Todo[]>(initialTodos);

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

  let filteredTodos: Todo[] = [];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
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
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-soft">Toutes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
