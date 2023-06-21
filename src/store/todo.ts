import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    finishTodo: [
      {
        date: '2022-09-01',
        id: '0',
        child: [
          {
            id: '0',
            time: '09:00',
            event: '写bug',
          },
          {
            id: '1',
            time: '10:00',
            event: '写bug',
          },
        ],
      },
      {
        date: '2022-09-02',
        id: '1',
        child: [
          {
            id: '0',
            time: '09:00',
            event: '不写bug了',
          },
          {
            id: '1',
            time: '10:00',
            event: '写屎山代码',
          },
          {
            id: '2',
            time: '11:00',
            event: '又写bug',
          },
        ],
      },
    ],
    todo: [
      {
        id: '0',
        date: '2022-09-08',
        time: '09:00',
        event: '继续写bug',
      },
      {
        id: '1',
        date: '2022-09-08',
        time: '10:00',
        event: '写一堆bug',
      },
      {
        id: '2',
        date: '2022-09-09',
        time: '09:00',
        event: '找上次的bug',
      },
      {
        id: '3',
        date: '2022-09-10',
        time: '10:00',
        event: '修修bug',
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
