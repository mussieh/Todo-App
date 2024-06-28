import axios from "axios";
import { API_URL } from "./config";
import { Todo } from "../shared/types/Todo";

export const updateTodo = async (todo: Todo) => {
    return (await axios.patch(`${API_URL}/todos/${todo._id}`, todo)).data;
};
