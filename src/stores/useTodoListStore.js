import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
    state: () => ({
        todoList: [],
        id: 0,
    }),
    actions: {
        addTodo(item) {
            this.todoList.push({ item, id: this.id++, completed: false })
            this.saveTodos()
        },
        deleteTodo(itemID) {
            this.todoList = this.todoList.filter(object => object.id !== itemID)
            this.saveTodos()
        },
        toggleCompleted(idToFind) {
            const todo = this.todoList.find((obj) => obj.id === idToFind)
            if (todo) {
                todo.completed = !todo.completed
                this.saveTodos()
            }
        },
        saveTodos(){
            localStorage.setItem('todos', JSON.stringify(this.todoList))
        },
        loadTodos(){
            const todos = JSON.parse(localStorage.getItem('todos'));
            if (todos) {
                this.todoList = todos;
                // Устанавливаем id на максимальное значение, если есть уже существующие задачи
                this.id = Math.max(...todos.map(todo => todo.id)) + 1;
            }
        },
    },
})