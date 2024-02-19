import { Task } from '@/shared/components/Task'
import { Store } from '@/shared/store'
import { For, createSignal } from 'solid-js'

export function TaskManagement() {
  const [val, setVal] = createSignal('')

  return (
    <div class="flex flex-col gap-4 rounded-lg bg-gray-500 p-4 shadow-lg">
      <h1 class="whitespace-nowrap text-center">Task Management</h1>

      {/* <pre>{JSON.stringify(Store.taskHierarchy.get(), null, 2)}</pre> */}

      <For each={Object.keys(Store.taskHierarchy.get())}>
        {client => (
          <div class="flex flex-col gap-2 rounded-md bg-white/20 p-2 shadow-md">
            <label>{client}</label>
            <For each={Object.keys(Store.taskHierarchy.get()[client])}>
              {project => (
                <div class="flex flex-col gap-3 rounded bg-white/20 p-2 shadow">
                  <label>{project}</label>
                  <For each={Object.keys(Store.taskHierarchy.get()[client][project])}>
                    {activity => (
                      <div class="flex gap-4">
                        <Task label={activity} hours={1} />
                      </div>
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
        )}
      </For>

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
