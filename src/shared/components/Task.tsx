export function Task({ label = 'task', hours = 1 }) {
  return (
    <div class="flex w-full items-center justify-between rounded bg-gray-300 px-2 py-px text-xs shadow">
      <span>{label}</span>
      <span>{hours}h</span>
    </div>
  )
}
