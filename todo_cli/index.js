// Readline module
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
// welcome message
const welcomeMessage = '\n\t\tWelcome to Todo CLI!\n\t\t--------------------\n';
// menu bar
const bar = '(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n'

// To do list class
class Todo_list_application {
// constructor
    constructor(){
        // this will store list of tasks
        this.todo_list = []
    }
    // add function: adds new tasks to todo list
    add(){
        // using readline, asks user in cli what new task to add
        rl.question('What?\n', (new_task) => {
            let task = {};
            task.name = new_task; //the task
            task.completed = false;
            // this.todo_list.push(`${this.todo_list.length}[ ]  ${new_todo}`);
            // push object in todo list with the task and whether its completed or not
            this.todo_list.push(task);
            return this.menu()
        });
    }
    // menu function: displays menu and requests user to choose from given options:
    // n, v, cX, dX, or q
    menu(){
        rl.question(bar, (user_option) => {
            if(user_option==='n'){
                // to add new task to list of tasks
                this.add();
            }else if(user_option==='v'){
                // to view list of tasks
                this.view()
            }else if(user_option[0]==='c'){
                // to mark task complete
                this.complete(parseInt(user_option[1]))
            }else if(user_option[0]==='d'){
                // to delete task
                this.delete(parseInt(user_option[1]))
            }else if(user_option==='q'){
                // to quit
                this.quit()
            }
        });
        return this;
    }
    // view function: display todo list
    view(){
        // console.log(`\n${this.todo_list.join('\n')}\n`)
        if(this.todo_list.length){
            this.todo_list.forEach((item, index) => {
                let status = item.completed ? '[✓] ' : '[ ] '; 
                console.log(index + status + item.name);
            });
        }
        return this.menu()
    }
    // complete function: mark task complete by setting the
    //  completed element in object of the task to true.
    complete(index_to_mark_complete){
        this.todo_list[index_to_mark_complete].completed = true;
        // this.markComplete(this.todo_list[index_to_mark_complete])
        return this.menu();
    }
    // delete function: delete task from to do list
    delete(index_to_remove_task){
        this.todo_list.splice(index_to_remove_task,1)
        return this.menu();
    }
    // quit function: quit the CLI
    quit(){
        rl.close();
        return;
    }
    // markComplete(s){
    //     const marked_complete = s.split("")[1]='✓'
    //     return marked_complete.join('')
    // }
}

console.log(welcomeMessage)
const todo_list = new Todo_list_application
todo_list.menu()
