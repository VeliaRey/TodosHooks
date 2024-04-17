import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ todos, onDeletedTask, onCheckedTask, editTask, editLabel, onTimerStart, onTimerStop }) => {
	TaskList.defaultProps = {
		onCheckedTask: () => {},
		onDeletedTask: () => {},
		editTask: () => {},
	}

	TaskList.propTypes = {
		todos: PropTypes.arrayOf(PropTypes.object),
		onDeletedTask: PropTypes.func,
		onCheckedTask: PropTypes.func,
		editTask: PropTypes.func,
	}

	const elements = todos.map((item) => {
		const { id, ...itemProps } = item

		return (
			<Task
				{...itemProps}
				key={id}
				onDeletedTask={() => onDeletedTask(id)}
				onCheckedTask={() => onCheckedTask(id)}
				editTask={() => editTask(id)}
				editLabel={editLabel}
				onTimerStart={() => onTimerStart(id)}
				onTimerStop={() => onTimerStop(id)}
			/>
		)
	})
	return (
		<section className="main">
			<ul className="todo-list">{elements}</ul>
		</section>
	)
}

export default TaskList
