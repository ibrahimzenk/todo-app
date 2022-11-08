import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Learn React",
      completed: false,
    },
  ]);

  const addTodo = (text) => setTodos((prev) => [...prev, { id: uuidv4(), text, completed: false }]);

  const toggleTodo = (id) => {
    const clonedTodos = [...todos];

    const itemIndex = clonedTodos.findIndex((todo) => todo.id === id);
    const item = todos[itemIndex];
    item.completed = !item.completed;

    setTodos(clonedTodos);
  };

  const values = { todos, setTodos, addTodo, toggleTodo };

  return <TodoContext.Provider value={values}>{children} </TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo hook must be call inside TodoProvider");
  }

  return context;
};
