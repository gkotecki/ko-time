import { Task } from '@/shared/components/Task'
import { Store } from '@/shared/store'
import { For } from 'solid-js'

export function TaskManagement() {
  function hierarchy() {
    return Store.taskHierarchy.get()
  }

  return (
    <div class="flex w-[20vw] min-w-[280px] flex-col gap-4 rounded-lg bg-gray-500 p-4 shadow-lg">
      <h1 class="whitespace-nowrap text-center text-2xl font-bold text-white">Task Summary</h1>

      <For each={Object.keys(hierarchy())}>
        {client => (
          <div class="flex flex-col gap-2 rounded-md bg-white/20 p-2 shadow-md">
            <label>{client}</label>
            <For each={Object.keys(hierarchy()[client])}>
              {project => (
                <div class="flex flex-col gap-3 rounded bg-white/20 p-2 shadow">
                  <label>{project}</label>
                  <For each={Object.entries(hierarchy()[client][project])}>
                    {([key, value]) => (
                      <div class="flex gap-4">
                        <Task label={key} hours={value.totalWork} />
                      </div>
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
