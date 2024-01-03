import { createSignal } from 'solid-js'

const tasks = createSignal<any[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))

export const Store = Object.freeze({
  tasks: Object.freeze({ get: tasks[0], set: tasks[1] }),
})
