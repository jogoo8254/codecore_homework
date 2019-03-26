
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
        }else if(answer[0]==='c'){
            completeBar(answer)
        }else if(answer[0] ==='d'){
            deleteBar(answer)
        }else if(answer==='q'){
            console.log('See you soon! 😄')
            return;
        }
        rl.close();
    });
    todoMenuBar();    
});
let todo_list = []
let marked=[]
viewBar(() => {
    for(let i=0; i< todo_list.length;i++){
        console.log(`${i} [${marked}] ${todo_list[i]}`);
    }
});

addBar(()=>{
    rl.question('What?', (answer) => {
        todo_list.push(` ${answer}`);
        marked.push(' ')
        rl.close();
    });    
});

completeBar((input)=>{
    let index = parseInt(input.slice(1))
    marked[index]='✓'
})

deleteBar((input)=>{
    let index = parseInt(input.slice(1))
    console.log(`Deleted "${todo_list[index]}"`);
    if(index===0){
        todo_list.shift()
    }else if(index===todo_list.length-1){
        todo_list.pop()
    }else{
        todo_list = todo_list.slice(0,index) + todo_list.slice(iindex+1,todo_list.length)
    }
})
