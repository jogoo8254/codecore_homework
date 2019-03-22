const arguments = process.argv
const x_coord = arguments[2]
const y_coord = arguments[3]
const header = '0 1 2 3 4'
const grid_material = '┼─'
const grid = '0┼─┼─┼─┼─┼\n1┼─┼─┼─┼─┼\n2┼─┼─┼─┼─┼\n3┼─┼─┼─┼─┼\n4┼─┼─┼─┼─┼'
// const turtle_foot_print= '•' // – Starting Location
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
        this.x_direction = 1; // move east by default
        this.y_direction = 0;
        this.turn_left = false;
        this.turn_right = false; // by default at starting point you move forward right
        this.turtle_tracks = [[this.x,this.y]]
    }
    // row to build start point
    // setStartPoint(){
    //     let initial_row=''
    //     for(let i = 0; i < x; i++){
    //         initial_row+=' '
    //     }
    //     initial_row+=turtle_foot_print
    //     return initial_row
    // }
    // update list of turtle tracks with latest coordinates
    generateTurtleTracks(x_direction,continued_point,latest_point){
        let update_x,update_y=0
        for(let i = continued_point;i< latest_point; i++){
            update_x = x_direction ? i : this.x
            update_y = x_direction ? this.y : i
            this.turtle_tracks.push([update_x,update_y])
        }
    }
    updateTurtleTrack(){
        const get_prior_coordinates = this.turtle_tracks.push()
        if(get_prior_coordinates[0]!==this.x){
            if(get_prior_coordinates[0]<this.x){
                generateTurtleTracks(true,(get_prior_coordinates[0]+1),(this.x+1))
                // for(let i =;i< ; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }else{
                generateTurtleTracks(true,this.x,get_prior_coordinates[0])
                // for(let i =this.x; i <get_prior_coordinates[0]; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }
        }else if(get_prior_coordinates[1]!==this.y){
            if(get_prior_coordinates[1]<this.y){
                generateTurtleTracks(false,(get_prior_coordinates[1] +1),(this.y+1))
                // for(let i = get_prior_coordinates[1] +1; i<=this.y; i++){
                //     this.turtle_tracks.push([this.x,i])   
                // }
            }else{
                generateTurtleTracks(false,this.y,get_prior_coordinates[i])
                // for(let i =this.y; i <get_prior_coordinates[1]; i++){
                //     this.turtle_tracks.push([this.x,i])   
                // }
            }
        }
    }
    
    // move forward # steps
    forward(steps){
        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // x_direction=1, // moving in positive direction. -1 moves in negative direction
            // y_direction=0  // -1 is default, indicating moving in x direction. else if 1, then switch to y direction.
                this.x +=steps
            }else if(this.x_direction===-1){
            // west:
            // x_direction=-1,
            // y_direction =0
                this.x -= steps
            }
        }else if(!this.x_direction){
            if(this.y_direction===1){
            // north:
            // x_direction=0,
            // y_direction = 1
                this.y +=steps
            }else if(this.y_direction===-1){
            // south:
            // x_direction = 0
            // y_direction = -1
                this.y_direction -=steps
            }
        }
        updateTurtleTrack()
    }
    // method to turn turtle left
    left(){
        this.left_right = true;
        this.turn_right= false;
        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // x_direction=1, // moving in positive direction. -1 moves in negative direction
            // y_direction=0  // -1 is default, indicating moving in x direction. else if 1, then switch to y direction.
                this.x +=steps
            }else if(this.x_direction===-1){
            // west:
            // x_direction=-1,
            // y_direction =0
                this.x -= steps
            }
        }else if(!this.x_direction){
            if(this.y_direction===1){
            // north:
            // x_direction=0,
            // y_direction = 1
                this.y +=steps
            }else if(this.y_direction===-1){
            // south:
            // x_direction = 0
            // y_direction = -1
                this.y_direction -=steps
            }
        }
    }
    // method to turn turtle right
    right(){
        this.turn_right= true;
        this.turn_left = false;
        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // this.x_direction=1, // moving in positive direction. -1 moves in negative direction
            // this.y_direction=0  // -1 is default, indicating moving in x direction. else if 1, then switch to y direction.
                this.x_direction = 0
                this.y_direction= -1
            }else if(this.x_direction===-1){
            // west:
            // this.x_direction=-1,
            // this.y_direction =0
                this.x_direction = 0
                this.y_direction = 1
            }
        }else if(!this.x_direction){
            if(this.y_direction===1){
            // north:
            // this.x_direction=0,
            // this.y_direction = 1
                this.x_direction = 1
                this.y_direction = 0
            }else if(this.y_direction===-1){
            // south:
            // this.x_direction = 0
            // this.y_direction = -1
                this.x_direction = -1
                this.y_direction = 0
            }
        }
    }
    allPoints(){

    }
    print(){

    }
    move(steps){

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

