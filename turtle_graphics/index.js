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
        this.turtle_tracks = [[x,y]]
        this.max_x_coordinate=0,this.min_x_coordinate=0, this.max_y_coordinate=0,this.min_y_coordinate =0
        this.get_prior_coordinates = [x,y]
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
    updateXCoordinateIfNegative(){
        if(this.min_x_coordinate <0){
            const remainder = 0 - this.min_x_coordinate
            this.min_x_coordinate +=remainder
            this.max_x_coordinate +=remainder
            this.turtle_tracks.forEach(function(element){
                element[0] +=remainder
            })
        }
        return this;
    }
    updateYCoordinateIfNegative(){
        if(this.min_y_coordinate <0){
            const remainder = 0 - this.min_y_coordinate
            this.min_y_coordinate +=remainder
            this.max_y_coordinate +=remainder
            this.turtle_tracks.forEach(function(element){
                element[1] +=remainder
            })
        }
        return this;
    }
    // update list of turtle tracks with latest coordinates
    generateTurtleTracks(x_direction,continued_point,latest_point){
        let update_x,update_y=0
        for(let i = continued_point;i< latest_point; i++){
            update_x = x_direction ? i : this.x
            update_y = x_direction ? this.y : i
            this.turtle_tracks.push([update_x,update_y])
        }
        return this;
    }
    updateTurtleTrack(){
        // console.log(`get_prior_coordinates ${get_prior_coordinates}`)
        if(this.get_prior_coordinates[0]!==this.x){
            if(this.get_prior_coordinates[0]<this.x){
                this.generateTurtleTracks(true,(this.get_prior_coordinates[0]+1),(this.x+1))
                // for(let i =;i< ; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }else{
                this.generateTurtleTracks(true,this.x,this.get_prior_coordinates[0])
                // for(let i =this.x; i <get_prior_coordinates[0]; i++){
                //     this.turtle_tracks.push([i,this.y])   
                // }
            }
        }else if(this.get_prior_coordinates[1]!==this.y){
            if(this.get_prior_coordinates[1]<this.y){
                this.generateTurtleTracks(false,(this.get_prior_coordinates[1] +1),(this.y+1))
                // for(let i = get_prior_coordinates[1] +1; i<=this.y; i++){
                //     this.turtle_tracks.push([this.x,i])   
                // }
            }else{
                this.generateTurtleTracks(false,this.y,this.get_prior_coordinates[1])
                // for(let i =this.y; i <get_prior_coordinates[1]; i++){
                //     this.turtle_tracks.push([this.x,i])   
                // }
            }
        }
        return this;
    }
    // move forward # steps
    forward(steps){
        console.log(`before updating x: ${this.x}, y: ${this.y}, steps: ${steps}\n`)
        console.log(`x_direction: ${this.x_direction}, y_direction: ${this.y_direction}\n`)
        this.get_prior_coordinates = [this.x,this.y]
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
            if(this.y_direction===-1){
            // north:
            // x_direction=0,
            // y_direction = -1
                this.y -=steps
            }else if(this.y_direction===1){
            // south:
            // x_direction = 0
            // y_direction = 1
                this.y +=steps
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
        this.updateTurtleTrack();
        console.log(`after updating: x: ${this.x}, y: ${this.y}, turtle_tracks: ${this.turtle_tracks.join('->')}`)
        return this;
    }
    // method to turn turtle left
    left(){
        console.log(`before left: ${this.x_direction}, ${this.y_direction}`)
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
            if(this.y_direction===-1){
            // north:
            // this.x_direction=0,
            // this.y_direction = -1
                this.x_direction = -1
                this.y_direction = 0
            }else if(this.y_direction===1){
            // south:
            // this.x_direction = 0
            // this.y_direction = 1
                this.x_direction = 1
                this.y_direction = 0
            }
        }
        console.log(`after left: ${this.x_direction}, ${this.y_direction}`)
        return this;
    }
    // method to turn turtle right
    right(){
        // this.turn_right= true;
        // this.turn_left = false;
        console.log(`before right: ${this.x_direction}, ${this.y_direction}`)

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
            if(this.y_direction===-1){
            // north:
            // this.x_direction=0,
            // this.y_direction = -1
                this.x_direction = 1
                this.y_direction = 0
            }else if(this.y_direction===1){
            // south:
            // this.x_direction = 0
            // this.y_direction = 1
                this.x_direction = -1
                this.y_direction = 0
            }
        }
        console.log(`after right: ${this.x_direction}, ${this.y_direction}`)
        return this;
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
            this.updateXCoordinateIfNegative
            this.updateYCoordinateIfNegative
            const tracksGrouped = groupBy(this.allPoints());
            let outputGrid=[]
            let row = ''
            console.log(this.allPoints())
            console.log(tracksGrouped)
            console.log(`${this.min_x_coordinate}, ${this.min_y_coordinate} -> ${this.max_x_coordinate}, ${this.max_y_coordinate}`)
            for(let j=this.min_y_coordinate;j<=this.max_y_coordinate+1;j++){
              for(let i=this.min_x_coordinate;i<=this.max_x_coordinate+1;i++){
                if(!tracksGrouped[i]){
                  row+='-'
                }else{
                  if(!tracksGrouped[i].includes(j)){
                  row+='-'
                  }else{
                  row+='*'
                  }
                }
              }
              outputGrid.push(row)
                row=''
            }
            console.log(outputGrid.join('\n'))
            return this;
    }
}
// new Turtle(0, 0)
//   .forward(5)
//   .right()
//   .forward(5)
//   .right()
//   .forward(5)
//   .right()
//   .forward(5)
//   .print()

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

// new Turtle(0, 0).forward(3).left().forward(3).print();