import {describe, it} from 'mocha'
import {expect} from 'chai'
import { Task } from '../src/Task.js'

describe('Task', function() {
    it('should be an object', function() {
        // arrange
        const newTask = new Task({title: 'empty Task', body: 'task body'})

        // assert
        expect(newTask).is.instanceOf(Task)
    })
})
