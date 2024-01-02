import { Task } from '@/components/shared/Task'
import { For, ParentProps, createSignal } from 'solid-js'

export function Calendar() {
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
