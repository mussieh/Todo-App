import { useEffect, useState } from "react";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import TodoStatus from "./components/TodoStatus";
import TodoList from "./components/TodoList";

import { DropResult } from "@hello-pangea/dnd";
import {
    FilterType,
    getActiveFilterButtonStyle,
    getAllFilterButtonStyle,
    getCompletedFilterButtonStyle,
} from "./data/constants";

import { createTodo } from "./services/createTodo";
import { updateTodo } from "./services/updateTodo";
import { deleteTodo } from "./services/deleteTodo";
import { getTodos } from "./services/getTodos";
import { Todo } from "./shared/types/Todo";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Loader from "./components/Loader";

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [taskName, setTaskName] = useState<string>("");
    const [filter, setFilter] = useState<FilterType>(FilterType.All);
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        "isDarkMode"
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            const newTodos = await getTodos();
            setTodos(newTodos);
            setIsLoading(false);
        };

        fetchTodos();
    }, [filter]);

    const handleCreateTodo = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            const todo = await createTodo(taskName);
            setTodos([...todos, todo]);
            setTaskName("");
        }
    };

    const handleUpdateTodo = async (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        todo: Todo
    ) => {
        if (
            (event.nativeEvent instanceof KeyboardEvent &&
                event.nativeEvent.key === "Enter") ||
            event.nativeEvent instanceof MouseEvent
        ) {
            await updateTodo(todo);
            const newTodos = todos.slice();
            newTodos.forEach((newTodo) => {
                if (newTodo._id === todo._id) {
                    newTodo._id = todo._id;
                    newTodo.name = todo.name;
                    newTodo.completed = todo.completed;
                }
            });
            setTodos(newTodos);
        }
    };

    const handleDeleteTodo = async (todoId: string) => {
        await deleteTodo(todoId);
        setTodos(todos.filter((todo) => todo._id !== todoId));
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const clearCompleted = () => {
        todos
            .filter((todo) => todo.completed)
            .forEach(async (completedTodo) => {
                await deleteTodo(completedTodo._id);
            });
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const getItemsLeft = () => {
        return todos.filter((todo) => !todo.completed).length;
    };

    const getFilteredTodos = () => {
        if (filter === FilterType.All) {
            return todos;
        } else if (filter === FilterType.Active) {
            return todos.filter((todo) => !todo.completed);
        } else {
            return todos.filter((todo) => todo.completed);
        }
    };

    const getThemeModeStyle = () => {
        return isDarkMode ? "dark" : "";
    };

    return (
        <main
            className={`${getThemeModeStyle()} h-full w-full fixed bg-desktopLight dark:bg-desktopDark bg-no-repeat bg-[length:100%_30rem] sm:bg-mobileLight dark:sm:bg-mobileDark text-[1.8rem] sm:text-[1.2rem] text-darkVeryDarkGrayishBlue2 bg-lightVeryLightGray dark:bg-darkVeryDarkBlue transition-all duration-1000`}
        >
            <section className="max-w-[54rem] w-[90%] mx-auto mt-[5.6rem]">
                <div className="flex justify-between items-center text-white">
                    <p className="text-[4rem] font-bold tracking-[1.5rem]">
                        TODO
                    </p>
                    {isDarkMode ? (
                        <img
                            onClick={() =>
                                setIsDarkMode(
                                    (isDarkMode: boolean) => !isDarkMode
                                )
                            }
                            className="cursor-pointer"
                            src={sunIcon}
                            alt="Sun Icon"
                        />
                    ) : (
                        <img
                            onClick={() =>
                                setIsDarkMode(
                                    (isDarkMode: boolean) => !isDarkMode
                                )
                            }
                            className="cursor-pointer"
                            src={moonIcon}
                            alt="Moon Icon"
                        />
                    )}
                </div>
                <div className="flex items-center gap-[2.4rem] h-[6.4rem] bg-white dark:bg-darkVeryDarkDesaturatedBlue p-[2rem] sm:p-[1.6rem] rounded-lg mt-[3rem]">
                    <div className="w-[2.4rem] h-[2.4rem] sm:w-[2rem] sm:h-[2rem] bg-white dark:bg-darkVeryDarkDesaturatedBlue rounded-full border border-lightVeryLightGrayishBlue dark:border-darkVeryDarkGrayishBlue2"></div>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setTaskName(event.target.value)}
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>
                        ) => handleCreateTodo(event)}
                        className="w-full focus:outline-none tracking-[-0.025rem]
                        dark:bg-darkVeryDarkDesaturatedBlue placeholder:text-lightDarkGrayishBlue dark:placeholder:text-darkGrayishBlue text-lightVeryDarkGrayishBlue dark:text-darkLightGrayishBlue caret-brightBlue"
                        placeholder="Create a new todo..."
                    />
                </div>

                <div className="max-w-[54rem] h-fit rounded-lg bg-white dark:bg-darkVeryDarkDesaturatedBlue mt-[2rem] shadow-2xl">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <TodoList
                            todos={getFilteredTodos()}
                            onUpdateTodo={handleUpdateTodo}
                            onDeleteTodo={handleDeleteTodo}
                            onDragEnd={handleOnDragEnd}
                        />
                    )}

                    <div className="relative top-0 w-full max-w-[54rem]">
                        <TodoStatus
                            filterType={filter}
                            onFilterChange={setFilter}
                            getItemsLeft={getItemsLeft}
                            clearCompleted={clearCompleted}
                        />
                        <div className="hidden sm:flex text-[1.4rem] h-[4.8rem] gap-[1.9rem] text-lightDarkGrayishBlue items-center justify-center bg-white dark:bg-darkVeryDarkDesaturatedBlue mt-[1.6rem] rounded-lg">
                            <button
                                onClick={() => setFilter(FilterType.All)}
                                className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getAllFilterButtonStyle(
                                    filter
                                )}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter(FilterType.Active)}
                                className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getActiveFilterButtonStyle(
                                    filter
                                )}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilter(FilterType.Completed)}
                                className={`font-bold hover:text-lightVeryDarkGrayishBlue hover:dark:text-darkLightGrayishBlueHover ${getCompletedFilterButtonStyle(
                                    filter
                                )}`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>
                <p className="flex items-center justify-center mt-[2rem] text-[1.4rem] tracking-[-0.019rem] text-lightDarkGrayishBlue dark:text-darkVeryDarkGrayishBlue">
                    Drag and drop to reorder list
                </p>
            </section>
        </main>
    );
};

export default App;
