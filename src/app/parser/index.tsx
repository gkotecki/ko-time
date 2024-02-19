import { Store } from '@/shared/store'

export function Parser() {
  function parseValue(rawInput: string) {
    const parsedValues = rawInput
      .normalize()
      .trim()
      .split(/\r?\n/)
      .slice(1)
      .map(line => {
        const cells = line.split(/\t/)
        return {
          client: cells[0],
          project: cells[1],
          activity: cells[2],
          date: cells[3],
          approvedWork: cells[4],
          approvedExtras: cells[5],
          pendingWork: cells[6],
          pendingExtras: cells[7],
        }
      })

    const hierarchy: any = {}

    for (const { client, project, activity } of parsedValues) {
      hierarchy[client] ??= {}
      hierarchy[client][project] ??= {}
      hierarchy[client][project][activity] ??= { client, project, activity }
    }

    Store.parsedTasks.set(parsedValues)
    Store.taskHierarchy.set(hierarchy)

    console.log(parsedValues)
    console.log(hierarchy)
  }

  return (
    <div class="mt-auto flex flex-col gap-4 rounded-lg bg-gray-400 p-4 shadow-md">
      <h1 class="whitespace-nowrap text-center">Data Parser</h1>
      <textarea
        class="min-h-16 rounded-md border border-gray-800/30 text-[.6em]"
        spellcheck={false}
        onChange={e => parseValue(e.currentTarget.value)}></textarea>
    </div>
  )
}
