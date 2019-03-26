
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const welcomeMessage = 'Welcome to Todo CLI!\n--------------------\n'

todoMenuBar(() =>{
    rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit', (answer) => {
        if(answer==='v'){
            viewBar();
        }else if(answer ==='n'){
            addBar();
        }else if(answer==='cX'){
    
        }else if(answer ==='dX'){
        
        }else if(answer==='q'){
         return;
        }
        rl.close();
    });
    todoMenuBar();    
});
let todo_list = [
    "Take out the trash",
    "Buy toothpaste",
    "Buy Snickerdoodles",
    "Fix the climate",
    "Find a cure for aging"]
viewBar(() => {
    // 0 [✓] Take out the trash
    // 1 [✓] Buy toothpaste
    // 2 [ ] Buy Snickerdoodles
    // 3 [ ] Fix the climate
    // 4 [ ] Find a cure for aging
    for(let i=0; i< todo_list.length;i++){
        console.log(`${i} [ ] ${todo_list[i]}`);
    }
});

addBar(()=>{
    rl.question('What?', (answer) => {
        todo_list.push(answer);
        rl.close();
    });    
});


