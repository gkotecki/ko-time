import { Task } from '@/shared/components/Task'
import { Store } from '@/store'
import { For, createSignal } from 'solid-js'

export function TaskManagement() {
  const [val, setVal] = createSignal('')

  return (
    <div class="flex flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-lg">
      <h1 class="whitespace-nowrap text-center">Task Management</h1>

      <For each={Store.tasks.get()}>
        {item => (
          <div class="flex gap-4">
            <Task label={item} hours={1} />
            <button
              class="min-w-16 rounded border bg-red-600/90 p-1 text-white"
              onClick={() => {
                const tasks = Store.tasks.get().filter(i => i !== item)
                Store.tasks.set(tasks)
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
            const tasks = [...Store.tasks.get(), val()]
            Store.tasks.set(tasks)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            setVal('')
          }}>
          Add
        </button>
      </div>
    </div>
  )
}
