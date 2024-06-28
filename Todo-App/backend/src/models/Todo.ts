import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
