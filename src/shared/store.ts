import { createSignal } from 'solid-js'

type ParsedTask = {
  client: string
  project: string
  activity: string
  date: string
  approvedWork: string
  approvedExtras: string
  pendingWork: string
  pendingExtras: string
}

const tasks = createSignal<any[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
const parsedTasks = createSignal<ParsedTask[]>([])
const taskHierarchy = createSignal<any>({})

export const Store = Object.freeze({
  tasks: Object.freeze({ get: tasks[0], set: tasks[1] }),
  parsedTasks: Object.freeze({ get: parsedTasks[0], set: parsedTasks[1] }),
  taskHierarchy: Object.freeze({ get: taskHierarchy[0], set: taskHierarchy[1] }),
})
