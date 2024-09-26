import { defineStore } from "pinia";

export interface ToDoItem {
  item: string;
  id: number;
  completed: boolean;
}

export const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todoList: [] as ToDoItem[],
    id: 0,
  }),
  actions: {
    addTodo(item: string) {
      this.todoList.push({ item, id: this.id++, completed: false });
      this.saveTodos();
    },
    deleteTodo(itemID: number) {
      this.todoList = this.todoList.filter((object) => object.id !== itemID);
      this.saveTodos();
    },
    toggleCompleted(idToFind: number) {
      const todo = this.todoList.find((obj) => obj.id === idToFind);
      if (todo) {
        todo.completed = !todo.completed;
      }
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todoList));
    },
    loadTodos() {
      const todos = localStorage.getItem('todos');
      if (todos) {
        try {
          const parsedTodos: ToDoItem[] = JSON.parse(todos);
          this.todoList = parsedTodos;
          // Устанавливаем id на максимальное значение, если есть уже существующие задачи
          this.id = Math.max(...parsedTodos.map(todo => todo.id), 0) + 1;
        } catch (error) {
          console.error("Ошибка при загрузке задач из localStorage:", error);
          this.todoList = []; // Обнуляем список в случае ошибки
          this.id = 0; // Сбрасываем id
        }
      }
    },
  },
});