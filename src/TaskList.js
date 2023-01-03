import { Task } from "./Task.js";

export class TaskList {
    /** @type {Task[]} */
    tasksToDo = []

    /** @type {Task[]} */
    tasksDone = []

    countOfDone() {
        return this.tasksDone.length
    }

    /**
     * Add a {@link Task} at a specific index
     * @private 
     * @param {Task[]} tasks - list of tasks to act on
     * @param {Task} task - task to add
     * @param {number} index - index to add task at
     */
    _addTaskAtIndex(tasks, task, index) {
        this.tasksToDo.splice(index, 0, task)
    }

    /**
     * Add a {@link Task} with a priority
     * @param {Task} task 
     * @param {"high" | "medium" | "low" | "none"} priority the default is "none"
     * @returns 
     */
    addTask(task, priority = 'none') {
        const countOfToDo = this.tasksToDo.length

        if (countOfToDo < 4) {
            if (priority === 'high') {
                this.tasksToDo.unshift(task)
                return
            }
            this.tasksToDo.push(task)
            return
        }

        const indices = {
            "high": countOfToDo / 4,
            "medium": countOfToDo / 2,
            "low": (countOfToDo / 4) * 3,
            "none": countOfToDo

        }

        this._addTaskAtIndex(this.tasksToDo, task, indices[priority])
    }

    /**
     * Get a {@link Task} at index
     * @private
     * @param {Task[]} tasks
     * @param {number} index 
     * @returns {Task}
     * @throws {RangeError} 'No task found!'
     */
    _getTaskByIndex(tasks, index) {

        const task = tasks.at(index)

        if (typeof task === "undefined") {
            throw new RangeError('No task found!')
        }
        return task
    }
    
    /**
     * Get a random task from the list of not done tasks
     * @returns {Task}
     */
    getRandomTask() {
        const randomIndex = Math.floor(Math.random() * this.tasksToDo.length);

        return this._getTaskByIndex(this.tasksToDo, randomIndex)
    }

    /**
     * Get the next task from the list of not done taks
     * @returns {Task}
     */
    getNextTask() {
        return this._getTaskByIndex(this.tasksToDo, 0)
    }

    /**
     * Move a task from the not done list to the done list
     * @param {Task} task 
     */
    markTaskDone(task) {
        const taskIndex = this.tasksToDo.findIndex(taskEntry => {
            return taskEntry.id = task.id
        })
        // If we found the task on the not done list, delete it
        if (typeof taskIndex !== "undefined") {
            this.tasksToDo.splice(taskIndex, 1)
        }
        // Add task to done line
        this.tasksDone.push(task)
    }
}