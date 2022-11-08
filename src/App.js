import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskInput: '',
    optionsInput: tagsList[0].optionId,
    taskList: [],
    isActiveId: tagsList[0].optionId,
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeOptions = event => {
    this.setState({optionsInput: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {taskInput, optionsInput, taskList} = this.state

    const newTask = {
      id: v4(),
      task: taskInput,
      optionsId: optionsInput,
    }

    this.setState({taskList: [...taskList, newTask]})
    this.setState({taskInput: ''})
  }

  onClickTags = id => {
    const {taskList} = this.state
    const specificTagItems = taskList.filter(task => task.optionsId === id)
    console.log(specificTagItems)
    this.setState({isActiveId: id})
    this.setState({taskList: [...specificTagItems]})
  }

  render() {
    const {taskInput, optionsInput, isActiveId, taskList} = this.state

    return (
      <div className="app-container">
        <div className="task-create-section-container">
          <h1 className="task-heading">Create a task</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="task-element">
              <label htmlFor="taskInput" className="label-headings">
                Task
              </label>
              <input
                type="text"
                id="taskInput"
                className="input-element"
                value={taskInput}
                onChange={this.onChangeTask}
                placeholder="Enter the task here"
              />
            </div>
            <div className="task-element">
              <label htmlFor="selectInput" className="label-headings">
                Tags
              </label>
              <select
                className="input-element"
                onChange={this.onChangeOptions}
                value={optionsInput}
                id="selectInput"
              >
                {tagsList.map(tag => (
                  <option key={tag.optionId} value={tag.optionId}>
                    {tag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-btn-text" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-list-section-container">
          <h1 className="tags-headings">Tags</h1>
          <ul className="tags-list-container">
            {tagsList.map(tag => (
              <li key={tag.optionId} className="list-item">
                <button
                  type="button"
                  key={tag.optionId}
                  className={
                    tag.optionId === isActiveId ? 'active-btn' : 'tag-btn'
                  }
                  onClick={() => this.onClickTags(tag.optionId)}
                >
                  {tag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="tags-headings">Tasks</h1>
          {taskList.length === 0 ? (
            <p className="no-task-headings">No Tasks Added Yet</p>
          ) : (
            <ul className="new-task-list-container">
              {taskList.map(task => (
                <li key={task.id} className="task-list-item">
                  <p className="task-description">{task.task}</p>
                  <button type="button" className="task-item-btn">
                    {task.optionsId}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
