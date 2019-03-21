const arguments = process.argv
const x_coord = arguments[2]
const y_coord = arguments[3]
const header = '0 1 2 3 4'
const grid_material = '┼─'
const grid = '0┼─┼─┼─┼─┼\n1┼─┼─┼─┼─┼\n2┼─┼─┼─┼─┼\n3┼─┼─┼─┼─┼\n4┼─┼─┼─┼─┼'
const turtle_foot_print= '•' // – Starting Location
// const end_point = '*'  // – End Location
const trail = '-' // trail
//  0 1 2 3 4
// 0┼─┼─┼─┼─┼
// 1┼─┼─┼─┼─┼
// 2┼─┼─┼─┼─┼
// 3┼─┼─┼─┼─┼
// 4┼─┼─┼─┼─┼

class Turtle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.x_direction = true;
        this.y_direction = false;
        this.left = false;
        this.right = false; // by default at starting point you move forward right
    }
    // row to build start point
    setStartPoint(){
        initial_row=''
        for(let i = 0; i < x; i++){
            initial_row+=' '
        }
        initial_row+=turtle_foot_print
        return initial_row
    }
    // move forward # steps
    forward(steps){
        if(this.left){
        }else if(this.right){

        }
        // else{
        //     // default is moving forward right
        //     // this.x_steps = steps
        // }
        let updated_trail = start_point
        for(let i=0; i< steps*2-1;i++){
            updated_trail+=trail
        }
        updated_trail+= end_point
        this.x = this.x+steps
        return updated_trail;
    }
    // method to turn turtle left
    left(){
        this.left = true;
        this.right = false;  
    }
    // method to turn turtle right
    right(){
        this.right= true;
        this.left = false;
    }
    allPoints(){

    }
    print(){
        
    }
}


// console.log(initialGrid)
// String.prototype.replaceAt=function(index,replacement){
//     return this.substr(0,index) + replacement + this.substr(index + replacement.length);
// }

function drawGrid(x=0,y=0){
    let updated_grid = grid.split('\n')
    updated_row = ''
    for(let i = 0; i < updated_grid.length; i++){
        for(let j = 0; j< updated_grid[i].length;j++){
            if(i ===x && j/2 ===y){
                updated_row = ''
                updated_grid.shift()
                return updated_grid.join('\n');
            }
        }
    }
    return updated_grid.join('\n');
}

const turtle = new Turtle(0,0).forward(3)
console.log(`${header}\n${drawGrid()}`)