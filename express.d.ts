import { TaskList } from "./src/TaskList.js";

declare global {
    namespace Express {
        interface Application {
            taskList: TaskList
        }
    }
}