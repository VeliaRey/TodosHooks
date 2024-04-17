import React, { useState } from 'react'

import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'

const App = () => {
	const [todoData, setTodoData] = useState([])
	const [status, setStatus] = useState('All')

	const createTodoTask = (label, min, sec) => {
		const data = {
			label,
			id: Math.ceil(Math.random() * (1000000 - 100000) - 100000),
			done: false,
			edit: false,
			createDate: new Date(),
			min,
			sec,
			timerStart: false,
			timerID: null,
		}
		return data
	}

	const onDeletedTask = (id) => {
		const idx = todoData.findIndex((el) => el.id === id)

		const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

		setTodoData(newArray)
	}

	const onAddedTask = (text, min, sec) => {
		const newItem = createTodoTask(text, min, sec)

		const newArr = [...todoData, newItem]

		setTodoData(newArr)
	}

	const onCheckedTask = (id) => {
		const doneTask = todoData.map((el) => {
			if (el.id === id) {
				el.done = !el.done
			}
			return el
		})
		setTodoData(doneTask)
	}

	const changeStatus = (value) => {
		setStatus(value)
	}

	const taskFilter = () => {
		if (status === 'Completed') {
			return todoData.filter((el) => el.done === true)
		} else if (status === 'Active') {
			return todoData.filter((el) => el.done === false)
		} else {
			return todoData
		}
	}

	const clearCompleted = () => {
		const newArray = todoData.filter((el) => el.done === false)

		setTodoData(newArray)
	}

	const editTask = (id) => {
		const editingTask = todoData.map((el) => {
			if (el.id === id) {
				el.edit = !el.edit
			}
			return el
		})
		setTodoData(editingTask)
	}

	const editLabel = (label) => {
		const editingLabel = todoData.map((el) => {
			if (el.edit) {
				el.label = label
			}
			return el
		})
		setTodoData(editingLabel)
	}

	const onTimerStart = (id) => {
		const { timerStart, min, sec } = todoData.find((el) => el.id === id)
		if (Number(min) + Number(sec)) {
			if (!timerStart) {
				const timerID = setInterval(
					() =>
						setTodoData((prevState) => {
							const newTodo = prevState.map((todoItem) => {
								if (todoItem.id === id) {
									let stop = todoItem.min + todoItem.sec
									stop -= 1

									if (stop === 0) {
										clearInterval(timerID)
									}

									let seconds = todoItem.sec - 1
									let minutes = todoItem.min

									if (minutes > 0 && seconds < 0) {
										minutes -= 1
										seconds = 59
									}

									if (minutes === 0 && seconds < 0) {
										seconds = 0
										this.onTimerStop(id)
									}

									return {
										...todoItem,
										sec: seconds,
										min: minutes,
									}
								}
								return todoItem
							})

							return newTodo
						}),
					1000
				)

				setTodoData(() => {
					const idx = todoData.findIndex((el) => el.id === id)
					const data = [...todoData]
					data[idx].timerID = timerID
					data[idx].timerStart = true

					return data
				})
			}
		}
	}

	const onTimerStop = (id) => {
		const { timerStart } = todoData.find((el) => el.id === id)
		if (timerStart) {
			const { timerID } = todoData.find((el) => el.id === id)
			setTodoData(() => {
				const idx = todoData.findIndex((el) => el.id === id)
				const data = [...todoData]
				data[idx].timerStart = false

				return data
			})
			clearInterval(timerID)
		}
	}

	const doneCount = todoData.filter((el) => !el.done).length

	return (
		<>
			<NewTaskForm onAddedTask={onAddedTask} />
			<TaskList
				todos={taskFilter()}
				onDeletedTask={onDeletedTask}
				onCheckedTask={onCheckedTask}
				editTask={editTask}
				editLabel={editLabel}
				onTimerStart={onTimerStart}
				onTimerStop={onTimerStop}
			/>
			<Footer doneCount={doneCount} changeStatus={changeStatus} clearCompleted={clearCompleted} status={status} />
		</>
	)
}

export default App
