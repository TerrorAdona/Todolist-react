import { useEffect, useState } from "react";
import TodoItem from "../TodoItem"; // ajuste le chemin selon ton projet
import { Construction } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  texte: string;
  priority: Priority;
};

export default function TodoPage() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  // Chargement initial depuis le localStorage
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  // Sauvegarde automatique dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      texte: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
  }

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
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  }

  // Filtrage des tâches selon la priorité
  let filteredTodos: Todo[] = [];
  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  // Compteurs pour l’affichage
  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const moyenneCount = todos.filter((t) => t.priority === "Moyenne").length;
  const basseCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-5 bg-base-300 p-5 rounded-2xl">
        {/* Barre d’ajout */}
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            name="priority"
            id="priority"
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>
            Ajouter
          </button>
        </div>

        {/* Filtres et actions */}
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${
                  filter === "Tous" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Tous")}
              >
                Tous ({totalCount})
              </button>
              <button
                className={`btn btn-soft ${
                  filter === "Urgente" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Urgente")}
              >
                Urgente ({urgentCount})
              </button>
              <button
                className={`btn btn-soft ${
                  filter === "Moyenne" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Moyenne")}
              >
                Moyenne ({moyenneCount})
              </button>
              <button
                className={`btn btn-soft ${
                  filter === "Basse" ? "btn-primary" : ""
                }`}
                onClick={() => setFilter("Basse")}
              >
                Basse ({basseCount})
              </button>
            </div>
            <button
              className="btn btn-primary"
              disabled={selectedTodos.size === 0}
              onClick={finishSelection}
            >
              Finir la sélection ({selectedTodos.size})
            </button>
          </div>

          {/* Liste des tâches */}
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
              <Construction
                strokeWidth={1}
                className="w-16 h-16 text-primary mx-auto"
              />
              <div className="text-center text-sm mt-4 text-lg">
                Aucune tâche à afficher.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
