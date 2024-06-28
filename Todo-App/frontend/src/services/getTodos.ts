import axios from "axios";
import { API_URL } from "./config";
import { Todo } from "../shared/types/Todo";

export const getTodos = async (): Promise<Todo[]> => {
    return (await axios.get(`${API_URL}/todos`)).data;
};
