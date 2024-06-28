import { Request, Response } from "express";

import Todo from "../models/Todo";

export const createTodo = async (req: Request, res: Response) => {
    const { name, completed } = req.body as unknown as {
        name: string;
        completed: boolean;
    };

    const emptyFields: string[] = [];

    if (!name) {
        emptyFields.push("name");
    }
    if (typeof completed !== "boolean") {
        emptyFields.push("completed");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const todo = await Todo.create({ name, completed });
        res.status(200).json(todo);
    } catch (error) {
        const knownError = error as Error;
        res.status(400).json({ error: knownError.message });
    }
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({});

        res.status(200).json(todos);
    } catch (error) {
        const knownError = error as Error;
        res.status(400).json({ error: knownError.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { name, completed } = req.body as unknown as {
        name: string;
        completed: boolean;
    };

    const emptyFields: string[] = [];

    if (!name) {
        emptyFields.push("name");
    }
    if (typeof completed !== "boolean") {
        emptyFields.push("completed");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields", emptyFields });
    }

    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        const knownError = error as Error;
        res.status(400).json({ error: knownError.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        const knownError = error as Error;
        res.status(400).json({ error: knownError.message });
    }
};
