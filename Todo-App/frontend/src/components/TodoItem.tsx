import { useState } from "react";
import checkIcon from "../assets/images/icon-check.svg";
import crossIcon from "../assets/images/icon-cross.svg";
import { Todo } from "../shared/types/Todo";

type TodoItemProps = {
    todo: Todo;
    onUpdate: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        todo: Todo
    ) => void;
    onDelete: (id: string) => void;
};

const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
    const [taskName, setTaskName] = useState<string>(todo.name);
    const [completed, setCompleted] = useState<boolean>(todo.completed);

    const getCheckButtonStyle = () => {
        if (completed) {
            return "bg-gradient-to-br from-skyBlue to-mediumOrchid";
        }
        return "bg-white dark:bg-darkVeryDarkDesaturatedBlue";
    };

    const getInputStyle = () => {
        if (completed) {
            return "line-through text-lightLightGrayishBlue dark:text-darkVeryDarkGrayishBlue";
        }
        return "text-lightVeryDarkGrayishBlue";
    };

    return (
        <>
            <div className="flex items-center gap-[2.4rem] h-[6.4rem] bg-white dark:dark:bg-darkVeryDarkDesaturatedBlue p-[2rem] sm:p-[1.6rem] rounded-lg cursor-pointer">
                <div
                    onClick={(
                        event: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                        onUpdate(event, {
                            _id: todo._id,
                            name: taskName,
                            completed: !completed,
                        });
                        setCompleted((completed) => !completed);
                    }}
                    className="rounded-full flex items-center justify-center hover:bg-gradient-to-b from-skyBlue to-mediumOrchid p-[0.1rem]"
                >
                    <div
                        className={`w-[2.4rem] h-[2.4rem] sm:w-[2rem] sm:h-[2rem]  rounded-full ${getCheckButtonStyle()} border border-lightVeryLightGrayishBlue dark:border-darkVeryDarkGrayishBlue2 hover:border-none flex items-center justify-center`}
                    >
                        <img
                            className={completed ? "" : "hidden"}
                            src={checkIcon}
                            alt="Check Icon"
                        />
                    </div>
                </div>
                <input
                    value={taskName}
                    onKeyDown={(
                        event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                        onUpdate(event, {
                            _id: todo._id,
                            name: taskName,
                            completed: completed,
                        });
                        if (event.key === "Enter") {
                            event.currentTarget.blur();
                        }
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTaskName(event.target.value)
                    }
                    className={`w-full focus:outline-none tracking-[-0.025rem]
                        dark:bg-darkVeryDarkDesaturatedBlue placeholder:text-lightDarkGrayishBlue dark:placeholder:text-darkGrayishBlue caret-brightBlue ${getInputStyle()} dark:text-darkLightGrayishBlue`}
                />
                <button onClick={() => onDelete(todo._id)}>
                    <img id="cross-icon" src={crossIcon} alt="Cross Icon" />
                </button>
            </div>
            <hr className="border-lightVeryLightGrayishBlue dark:border-darkVeryDarkGrayishBlue2" />
        </>
    );
};

export default TodoItem;
