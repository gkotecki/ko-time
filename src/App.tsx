import { Calendar } from '@/components/calendar'
import { TaskManagement } from '@/components/task-management'

export function App() {
  return (
    <div class="flex h-full min-h-screen w-full gap-4 bg-gray-300 p-4">
      <TaskManagement />
      <Calendar />
    </div>
  )
}
