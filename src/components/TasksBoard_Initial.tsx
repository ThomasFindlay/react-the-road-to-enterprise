import React, { useState } from 'react'
import { boardData } from '../boardData'

type TasksBoardProps = {}

const TasksBoard = (props: TasksBoardProps) => {
  const [board, setBoard] = useState(boardData)
  const [selectedTask, setSelectedTask] = useState<{
    columnIdx: number
    taskIdx: number
  }>()

  const onSelectTask = (columnIdx: number, taskIdx: number) => {
    setSelectedTask({
      columnIdx,
      taskIdx,
    })
  }

  const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTask) return
    const { columnIdx, taskIdx } = selectedTask

    setBoard((board) => {
      return {
        ...board,
        columns: [
          ...board.columns.map((column, _columnIdx) => {
            if (columnIdx !== _columnIdx) {
              return column
            }

            return {
              ...column,
              tasks: column.tasks.map((task, _taskIdx) => {
                if (taskIdx !== _taskIdx) {
                  return task
                }

                return {
                  ...task,
                  name: e.target.value,
                }
              }),
            }
          }),
        ],
      }
    })
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-left">
        <div className="bg-green-700 px-4 py-3">
          <h2 className="font-bold text-green-100">{board.name}</h2>
        </div>
        <div className="p-4 mb-6 grid gap-6 grid-flow-col auto-cols-fr bg-green-50">
          {board.columns.map((column, columnIdx) => {
            return (
              <div key={columnIdx}>
                <h3 className="font-semibold mb-3">{column.name}</h3>
                <div className="space-y-3">
                  {column.tasks.map((task, taskIdx) => {
                    return (
                      <button
                        key={taskIdx}
                        className={`border border-gray-200 p-3 w-full ${
                          columnIdx === selectedTask?.columnIdx &&
                          taskIdx === selectedTask?.taskIdx
                            ? 'bg-green-700 text-green-100'
                            : ''
                        }`}
                        onClick={() => onSelectTask(columnIdx, taskIdx)}
                      >
                        <h4>{task.name}</h4>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div>
          <h2 className="font-semibold mb-4">
            {selectedTask ? 'Update task' : 'Select task'}
          </h2>
          {selectedTask ? (
            <input
              type="text"
              value={
                board.columns[selectedTask.columnIdx].tasks[
                  selectedTask.taskIdx
                ].name
              }
              onChange={onTaskNameChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TasksBoard
