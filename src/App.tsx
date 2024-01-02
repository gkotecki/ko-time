import { For, ParentProps, createSignal } from 'solid-js'

const [savedTasks, setSavedTasks] = createSignal<any[]>(
  JSON.parse(localStorage.getItem('tasks') || '[]'),
)

export function App() {
  return (
    <div class="flex h-full min-h-screen w-full gap-4 bg-gray-300 p-4">
      <TaskManagement />
      <Calendar />
    </div>
  )
}

function TaskManagement() {
  const [val, setVal] = createSignal('')

  return (
    <div class="flex flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-lg">
      <h1 class="whitespace-nowrap text-center">Task Management</h1>

      <For each={savedTasks()}>
        {item => (
          <div class="flex gap-4">
            <Task label={item} hours={1} />
            <button
              class="min-w-16 rounded border bg-red-600/90 p-1 text-white"
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
        <input
          class="flex-1 rounded border border-gray-800/30 p-1"
          value={val()}
          onChange={e => setVal(e.currentTarget.value)}
        />
        <button
          class="min-w-16 rounded border bg-green-600/90 p-1 text-white"
          onClick={() => {
            const tasks = [...savedTasks(), val()]
            setSavedTasks(tasks)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            setVal('')
          }}>
          Add
        </button>
      </div>
    </div>
  )
}

function Calendar() {
  const [days, setDays] = createSignal(new Array(31).fill('').map((_, i) => i + 1))

  return (
    <div class="flex w-full flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-lg">
      <section class="flex justify-around">
        <h1 class="text-center">
          {new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center">
          {new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center">
          {new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
      </section>

      <div class="grid grid-cols-7 gap-1">
        <For each={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}>
          {item => <div class="text-center">{item}</div>}
        </For>
        <For each={days()}>
          {item => (
            <CalendarDay day={item}>
              <Task label="aaa" />
              <Task label="bbb" />
            </CalendarDay>
          )}
        </For>
      </div>
    </div>
  )
}

function CalendarDay({ day = 0, children = null }: ParentProps<{ day: number }>) {
  return (
    <span class="flex flex-col items-center justify-center gap-1 rounded-md bg-gray-100 p-1 text-xs shadow-md">
      {day}
      {children}
    </span>
  )
}

function Task({ label = 'task', hours = 1 }) {
  return (
    <div class="flex w-full items-center justify-between rounded bg-gray-50 px-2 py-px text-xs shadow">
      <span>{label}</span>
      <span>{hours}h</span>
    </div>
  )
}
