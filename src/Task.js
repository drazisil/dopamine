import {randomUUID} from 'node:crypto'
/**
 * A task
 */
export class Task {
    id = randomUUID()
    title = ''
    body = ''
    done = false

    /**
     * A task
     * @param {object} param0 
     * @param {string} param0.title
     * @param {string} param0.body
     */
    constructor({title, body}) {
        this.title = title
        this.body = body
    }
}