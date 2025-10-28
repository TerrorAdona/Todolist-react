import { Trash } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  texte: string;
  priority: Priority
}
type Props = { 
  todo: Todo;
  onDelete: () => void;
  isSelected : boolean;
  onToggleSelection : (id: number) => void;
}

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelection }: Props) => {
    return (
        <li className="p-3 ">
            <div className="flex justify-between item-center">
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={isSelected} onChange={() => onToggleSelection(todo.id)} />
                    <span className="texte-md font-bold">
                        <span>{todo.texte}</span>
                    </span>
                    <span className={`badge badge-sm badge-soft ${todo.priority === 'Urgente' ? 'badge-error' : todo.priority === 'Moyenne' ? 'badge-warning' : 'badge-success'}`}>
                        {todo.priority}
                    </span>
                </div>
                <button className="btn btn-sm btn-error btn-soft" onClick={onDelete}>
                    <Trash className="w-4 h-4"/>
                </button>
            </div>
        </li>
    );
}

export default TodoItem;