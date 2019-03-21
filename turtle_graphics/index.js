const arguments = process.argv
const x_coord = arguments[2]
const y_coord = arguments[3]
const header = '0 1 2 3 4'
const gridMaterial = '┼─'
const grid = '0┼─┼─┼─┼─┼\n1┼─┼─┼─┼─┼\n2┼─┼─┼─┼─┼\n3┼─┼─┼─┼─┼\n4┼─┼─┼─┼─┼'
const start_point= '•' // – Starting Location
const end_point = '*'  // – End Location
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
    }
    setStartPoint(){
        
    }
    forward(steps){
        let updated_trail = start_point
        for(let i=0; i< steps*2-1;i++){
            updated_trail+=trail
        }
        updated_trail+= end_point
        this.x = this.x+steps
        return updated_trail;
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