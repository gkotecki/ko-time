import { For, ParentProps, createSignal } from 'solid-js'

const [savedTasks, setSavedTasks] = createSignal<any[]>(
  JSON.parse(localStorage.getItem('tasks') || '[]'),
)

export function App() {
  return (
    <>
      <div class="flex w-full gap-4 p-4">
        <TaskManagement />
        <Calendar />
      </div>
    </>
  )
}

function TaskManagement() {
  let val = ''
  return (
    <div class="flex flex-col gap-4 rounded-lg border p-4">
      <h1 class="whitespace-nowrap text-center">Task Management</h1>

      <For each={savedTasks()}>
        {item => (
          <div class="flex gap-4">
            <Task label={item} hours={1} />
            <button
              class="rounded border bg-red-600 p-1 text-white"
              onClick={() => {
                const tasks = savedTasks().filter(i => i !== item)
                setSavedTasks(tasks)
                localStorage.setItem('tasks', JSON.stringify(tasks))
              }}>
              Del
            </button>
          </div>
        )}
      </For>

      <div class="flex gap-4">
        <input class="flex-1 rounded border p-1" onKeyDown={e => (val = e.currentTarget.value)} />
        <button
          class="rounded border bg-green-600 p-1 text-white"
          onClick={() => {
            const tasks = [...savedTasks(), val]
            setSavedTasks(tasks)
            localStorage.setItem('tasks', JSON.stringify(tasks))
          }}>
          Add
        </button>
      </div>
    </div>
  )
}

function Calendar() {
  const [count, setCount] = createSignal(new Array(31).fill('').map((_, i) => i + 1))

  return (
    <>
      <div class="flex w-full flex-col gap-4 rounded-lg border p-4">
        <h1 class="text-center">{new Date().toLocaleString(undefined, { month: 'long' })}</h1>
        <div class="grid grid-cols-7 gap-1">
          <For each={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}>
            {item => <div class="text-center">{item}</div>}
          </For>
          <For each={count()}>
            {item => (
              <CalendarDay day={item}>
                <Task label="aaa" />
                <Task label="bbb" />
              </CalendarDay>
            )}
          </For>
        </div>
      </div>
    </>
  )
}

function CalendarDay({ day = 0, children = null }: ParentProps<{ day: number }>) {
  return (
    <span class="flex flex-col items-center justify-center gap-1 rounded-md border p-1 text-sm">
      {day}
      {children}
    </span>
  )
}

function Task({ label = 'task', hours = 1 }) {
  return (
    <div class="flex w-full items-center justify-between rounded border bg-blue-600 px-2 py-px text-xs text-white">
      <span>{label}</span>
      <span>{hours}h</span>
    </div>
  )
}
