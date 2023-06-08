import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [
      {
        id: 1,
        title: 'todo1',
        done: false,
      },
    ],
  }),
  getters: {
    getTodos() {
      return this.todos
    },
  },
  actions: {
    addTodo() {
      this.todos.push({
        id: this.todos.length + 1,
        title: 'todo' + (this.todos.length + 1),
        done: false,
      })
    },
    removeTodo() {
      this.todos.pop()
    },
  },
})
