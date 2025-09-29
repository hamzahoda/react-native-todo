import { create } from "zustand";
import uuid from "react-native-uuid";

const useTodoStore = create((set) => ({
  todos: [
    { id: uuid.v4(), text: "Learn React Native", done: false },
    { id: uuid.v4(), text: "Build Todo App", done: false },
  ],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: uuid.v4(), text, done: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  reorderTodos: (newTodos) =>
    set(() => ({
      todos: newTodos,
    })),
}));

export default useTodoStore;
