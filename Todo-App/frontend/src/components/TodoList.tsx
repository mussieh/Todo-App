import { Todo } from "../services/todos";
import TodoItem from "./TodoItem";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

type TodoListProps = {
    todos: Todo[];
    onUpdateTodo: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        todo: Todo
    ) => void;
    onDeleteTodo: (id: string) => void;
    onDragEnd: (result: DropResult) => void;
};

const TodoList = ({
    todos,
    onDragEnd,
    onUpdateTodo,
    onDeleteTodo,
}: TodoListProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <ul
                        className="overflow-y-scroll max-h-[39rem]"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {todos.map((todo, index) => {
                            return (
                                <Draggable
                                    key={todo._id}
                                    draggableId={todo._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TodoItem
                                                todo={todo}
                                                onUpdate={onUpdateTodo}
                                                onDelete={onDeleteTodo}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default TodoList;
