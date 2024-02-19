import { Parser } from '@/app/parser'
import { Task } from '@/shared/components/Task'
import { Store } from '@/shared/store'
import { For, createSignal } from 'solid-js'

const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()

const lastMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 0)
const thisMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const nextMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 1)

const weekOffset = (d: Date) => thisMonth(d).getDay()
const daysOfTheMonth = (d: Date) => new Array(daysInMonth(d)).fill(0).map((_, i) => i + 1)
const offsettedDays = (d: Date) => [...new Array(weekOffset(d)).fill(0), ...daysOfTheMonth(d)]

export function Calendar() {
  const [now, setNow] = createSignal(new Date())

  return (
    <div class="flex w-full flex-col gap-4 rounded-lg bg-gray-500 p-4 shadow-lg">
      <section class="flex justify-around">
        <h1 class="text-center" onClick={e => setNow(lastMonth(now()))}>
          {lastMonth(now()).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center">
          {thisMonth(now()).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
        <h1 class="text-center" onClick={e => setNow(nextMonth(now()))}>
          {nextMonth(now()).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </h1>
      </section>

      <div class="grid grid-cols-7 gap-1">
        <For each={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}>
          {item => <div class="text-center">{item}</div>}
        </For>
        <For each={offsettedDays(now())}>
          {(item, index) =>
            item ? (
              <CalendarDay now={now()} day={item} noWork={index() % 7 === 0 || index() % 7 === 6} />
            ) : (
              <span />
            )
          }
        </For>
      </div>

      {/* <pre class="text-xs text-white">{JSON.stringify(Store.parsedTasks.get(), null, 4)}</pre> */}

      <Parser />
    </div>
  )
}

function CalendarDay(props: { now: Date; day: number; noWork: boolean }) {
  const paddedDay = () => props.day.toString().padStart(2, '0')
  const date = () =>
    `${paddedDay()}/${(props.now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${props.now.getFullYear()}`

  const tasks = () => Store.parsedTasks.get().filter(task => task.date === date())
  const workedHours = () => tasks().reduce((acc, { totalWork }) => acc + totalWork, 0)

  return (
    <span
      class={`flex flex-col items-center justify-center gap-1 rounded-md bg-gray-400 p-1 text-xs shadow-md ${
        props.noWork ? 'opacity-40' : ''
      } ${
        workedHours() > 0 && workedHours() < 8
          ? 'bg-yellow-400'
          : workedHours() === 8
            ? 'bg-green-400'
            : workedHours() > 8
              ? 'bg-red-400'
              : ''
      }`}>
      {paddedDay()}
      <pre>{workedHours()}h total</pre>
      <For each={tasks()} fallback={<pre>0 tasks</pre>}>
        {task => <Task label={task.project} hours={task.totalWork} />}
      </For>
    </span>
  )
}
