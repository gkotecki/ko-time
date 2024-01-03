import { Task } from '@/shared/components/Task'
import { For, ParentProps } from 'solid-js'

const now = new Date()
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

const weekOffset = thisMonth.getDay()

export function Calendar() {
  const daysOfTheMonth = new Array(daysInMonth).fill(0).map((_, i) => i + 1)
  const offsettedDays = [...new Array(weekOffset).fill(0), ...daysOfTheMonth]

  return (
    <div class="flex w-full flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-lg">
      <section class="flex justify-around">
        <h1 class="text-center">
          {lastMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center">
          {thisMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center">
          {nextMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
      </section>

      <div class="grid grid-cols-7 gap-1">
        <For each={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}>
          {item => <div class="text-center">{item}</div>}
        </For>
        <For each={offsettedDays}>
          {(item, index) =>
            item ? (
              <CalendarDay day={item} noWork={index() % 7 === 0 || index() % 7 === 6}>
                <Task label="aaa" />
                <Task label="bbb" />
              </CalendarDay>
            ) : (
              <span />
            )
          }
        </For>
      </div>
    </div>
  )
}

function CalendarDay({
  children,
  day,
  noWork = false,
}: ParentProps<{ day: number; noWork: boolean }>) {
  return (
    <span
      class={`flex flex-col items-center justify-center gap-1 rounded-md bg-gray-100 p-1 text-xs shadow-md ${
        noWork ? 'opacity-40' : ''
      }`}>
      {day.toString().padStart(2, '0')}
      {children}
    </span>
  )
}
