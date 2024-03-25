import {describe, it} from 'mocha'
import {expect} from 'chai'
import { TaskList } from '../src/TaskList.js'
import { Task } from '../src/Task.js'
import 'chai/register-should';


describe('TaskList', function() {
    it('should provide a count of items done when lower then 4', function() {
        // arrange
        /** @type {Task} */
        const newTask1 = {
            id: '1',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask2 = {
            id: '2',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask3 = {
            id: '3',
            title: '',
            body: '',
            done: false
        }

        const list = new TaskList()
        
        // act
        list.addTask(newTask1)
        list.addTask(newTask2)
        list.addTask(newTask3)

        list.markTaskDone(newTask2)

        // assert
        expect(list.countOfDone()).to.equal(1)
    })
    it('should provide a count of items done', function() {
        // arrange
        /** @type {Task} */
        const newTask1 = {
            id: '1',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask2 = {
            id: '2',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask3 = {
            id: '3',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask4 = {
            id: '4',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask5 = {
            id: '5',
            title: '',
            body: '',
            done: false
        }
        const list = new TaskList()
        
        // act
        list.addTask(newTask1)
        list.addTask(newTask2)
        list.addTask(newTask3)
        list.addTask(newTask4)
        list.addTask(newTask5)

        list.markTaskDone(newTask3)

        // assert
        expect(list.countOfDone()).to.equal(1)
    })
    it('can add a task at the beginning', function() {
        // arrange 
        /** @type {Task} */
        const newTask3 = {
            id: 'first',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask4 = {
            id: 'second',
            title: '',
            body: '',
            done: false
        }
        /** @type {Task} */
        const newTask2 = {
            id: 'third',
            title: '',
            body: '',
            done: false
        }

        const list = new TaskList()

        // act
        list.addTask(newTask3)
        list.addTask(newTask4, "high")
        list.addTask(newTask2)

        const nextTask = list.getNextTask()

        // assert
        expect(nextTask.id).to.equal('second')
        
    })

it('should throw a RangeError when there are no tasks to do', function() {
    // arrange
    const list = new TaskList()

    // assert
    expect(() => list.getRandomTask()).throws(RangeError)
})
})

