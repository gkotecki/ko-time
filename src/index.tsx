/* @refresh reload */
import { Calendar } from '@/components/calendar'
import { TaskManagement } from '@/components/task-management'
import { render } from 'solid-js/web'
import './index.css'

function App() {
  return (
    <div class="flex h-full min-h-screen w-full gap-4 bg-gray-300 p-4">
      <TaskManagement />
      <Calendar />
    </div>
  )
}

render(() => <App />, document.getElementById('root')!)
