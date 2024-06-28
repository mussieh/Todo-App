import axios from "axios";
import { API_URL } from "./config";
import { Todo } from "../shared/types/Todo";

export const deleteTodo = async (todoId: string): Promise<Todo> => {
    return (await axios.delete(`${API_URL}/todos/${todoId}`)).data;
};
