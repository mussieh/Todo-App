import axios from "axios";
import { API_URL } from "./config";
import { Todo } from "../shared/types/Todo";

export const createTodo = async (name: string): Promise<Todo> => {
    const newTodo = {
        name,
        completed: false,
    };
    return (await axios.post(`${API_URL}/todos`, newTodo)).data;
};
