// const arguments = process.argv
// const x_coord = arguments[2]
// const y_coord = arguments[3]
// const header = '0 1 2 3 4'
const empty_trail = '┼─'
// const grid = '0┼─┼─┼─┼─┼\n1┼─┼─┼─┼─┼\n2┼─┼─┼─┼─┼\n3┼─┼─┼─┼─┼\n4┼─┼─┼─┼─┼'
 const turtle_foot_print= '•' // – Starting Location
// const end_point = '*'  // – End Location
// const trail = '-' // trail
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
        // this.turn_left = false;
        // this.turn_right = false; // by default at starting point you move forward right
        this.turtle_tracks = []
        this.max_x_coordinate,this.min_x_coordinate, this.max_y_coordinate,this.min_y_coordinate =0

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
                this.generateTurtleTracks(true,(get_prior_coordinates[0]+1),(this.x+1))
                // for(let i =;i< ; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }else{
                this.generateTurtleTracks(true,this.x,get_prior_coordinates[0])
                // for(let i =this.x; i <get_prior_coordinates[0]; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }
        }else if(get_prior_coordinates[1]!==this.y){
            if(get_prior_coordinates[1]<this.y){
                this.generateTurtleTracks(false,(get_prior_coordinates[1] +1),(this.y+1))
                // for(let i = get_prior_coordinates[1] +1; i<=this.y; i++){
                //     this.turtle_tracks.push([this.x,i])   
                // }
            }else{
                this.generateTurtleTracks(false,this.y,get_prior_coordinates[i])
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

        if(this.x > this.max_x_coordinate){
            this.max_x_coordinate = this.x
        }
        if(this.x < this.min_x_coordinate){
            this.min_x_coordinate = this.x
        }
        if(this.y > this.max_y_coordinate){
            this.max_y_coordinate = this.y
        }
        if(this.y < this.min_y_coordinate){
            this.min_y_coordinate = this.y
        }
        this.updateTurtleTrack()
    }
    // method to turn turtle left
    left(){
        // this.left_right = true;
        // this.turn_right= false;
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
                this.x_direction = -1
                this.y_direction = 0
            }else if(this.y_direction===-1){
            // south:
            // this.x_direction = 0
            // this.y_direction = -1
                this.x_direction = 1
                this.y_direction = 0
            }
        }
    }
    // method to turn turtle right
    right(){
        // this.turn_right= true;
        // this.turn_left = false;
        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // this.x_direction=1, // moving in positive direction. -1 moves in negative direction
            // this.y_direction=0  // -1 is default, indicating moving in x direction. else if 1, then switch to y direction.
                this.x_direction = 0
                this.y_direction= 1
            }else if(this.x_direction===-1){
            // west:
            // this.x_direction=-1,
            // this.y_direction =0
                this.x_direction = 0
                this.y_direction = -1
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
        return this.turtle_tracks
    }
    print(){
            const groupBy = (objectArray) => {
                return objectArray.reduce(function (total, obj) {
                    let key = obj[0];
                    if (!total[key]) {
                        total[key] = [];
                        total[key].push(obj[1]);
                    }else if(!total[key].includes(obj[1])){
                      total[key].push(obj[1])
                    }
                    return total;
                }, {});
            }
            
            let tracksGrouped = groupBy(this.allPoints());
            let outputGrid=[]
            let row = ''
            
            for(let i=this.min_x_coordinate;i<=this.max_x_coordinate;i++){
              for(let j=this.min_y_coordinate;j<=this.max_y_coordinate;j++){
                if(!tracksGrouped[i]){
                  row+='-'
                }else{
                  if(!tracksGrouped[i].includes(j)){
                  row+=empty_trail
                  }else{
                  row+=turtle_foot_print
                  }
                }
              }
              outputGrid.push(row)
                row=''
            }
            console.log(outputGrid.join('\n'))
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


// ---------------------
// const people = [
//     [0,3],[0,4],[0,5],[1,5],[2,5],[2,4],[2,3]
//     ];
//     min_x=0
//     min_y=0
//     max_x=2
//     max_y=5
//     const groupBy = (objectArray) => {
//         return objectArray.reduce(function (total, obj) {
//             let key = obj[0];
//             if (!total[key]) {
//                 total[key] = [];
//                 total[key].push(obj[1]);
//             }else if(!total[key].includes(obj[1])){
//               total[key].push(obj[1])
//             }
//             return total;
//         }, {});
//     }
    
//     let tracksGrouped = groupBy(people);
//     let result=[]
//     let row = ''
    
//     for(let i=min_x;i<=max_x;i++){
//       for(let j=min_y;j<=max_y;j++){
//         if(!tracksGrouped[i]){
//           row+='-'
//         }else{
//           if(!tracksGrouped[i].includes(j)){
//           row+='-'
//           }else{
//           row+='*'
//           }
//         }
//       }
//       result.push(row)
//         row=''
//     }
//     console.log(result.join('\n'))

new Turtle(0, 4)
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print();