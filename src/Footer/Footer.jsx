import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

const Footer = ({ doneCount, changeStatus, clearCompleted, status }) => {
	Footer.defaultProps = {
		changeStatus: () => {},
		clearCompleted: () => {},
	}

	Footer.propTypes = {
		doneCount: PropTypes.number,
		changeStatus: PropTypes.func,
		clearCompleted: PropTypes.func,
	}

	return (
		<footer className="footer">
			<span className="todo-count">{doneCount} items left</span>
			<TasksFilter changeStatus={changeStatus} status={status} />
			<button className="clear-completed" onClick={() => clearCompleted()}>
				Clear completed
			</button>
		</footer>
	)
}

export default Footer
