/**
 * Author: Kevin Njunge
 * Assignment: Turtle Graphics
 * Due Date: 3/22/2019
 * 
 * 
 * 
 * '-' => empt mark
 * '@' => turtle foot mark
 * 
 */
class Turtle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.x_direction = 1; // move east by default
        this.y_direction = 0;
        this.turtle_tracks = [[x,y]]
        this.max_x_coordinate=0,this.min_x_coordinate=0, this.max_y_coordinate=0,this.min_y_coordinate =0
        this.get_prior_coordinates = [x,y]
    }

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
        if(this.get_prior_coordinates[0]!==this.x){
            if(this.get_prior_coordinates[0]<this.x){
                this.generateTurtleTracks(true,(this.get_prior_coordinates[0]+1),(this.x+1))
            }else{
                this.generateTurtleTracks(true,this.x,this.get_prior_coordinates[0])
            }
        }else if(this.get_prior_coordinates[1]!==this.y){
            if(this.get_prior_coordinates[1]<this.y){
                this.generateTurtleTracks(false,(this.get_prior_coordinates[1] +1),(this.y+1))
            }else{
                this.generateTurtleTracks(false,this.y,this.get_prior_coordinates[1])
            }
        }
        return this;
    }

    // move forward # steps
    forward(steps){
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
        // update min x && y, max x && y coordinates to get the latest corresponding value.
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
        // update array with coordinates of all points the turtle walked.
        this.updateTurtleTrack();
        return this;
    }
    // method to turn turtle left
    left(){
        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // this.x_direction=1, // moving in positive x direction. -1 moves in negative direction
            // this.y_direction=0  // moving in positive y direction. -1 moves in negative direction
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
        return this;
    }
    // method to turn turtle right
    right(){

        if(!this.y_direction){
            if(this.x_direction===1){
            // east:
            // this.x_direction=1, // moving in positive x direction. -1 moves in negative direction
            // this.y_direction=0  // moving in positive y direction. -1 moves in negative direction
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
        return this;
    }
    allPoints(){
        return this.turtle_tracks
    }
    print(){
        // groupByXCoordinate function needed to group by elements by first index (x) of
        // each sub array in array
            const groupByXCoordinate = (objectArray) => {
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
            // update x and y coordinates respectfully if negative coordinate is found
            this.updateXCoordinateIfNegative
            this.updateYCoordinateIfNegative

            // group by turtle tracks by x coordinate 
            const tracksGrouped = groupByXCoordinate(this.allPoints());
            let outputGrid=[]
            let row = ''

            // build each row and check if 
            for(let j=this.min_y_coordinate;j<=this.max_y_coordinate+1;j++){
              for(let i=this.min_x_coordinate;i<=this.max_x_coordinate+1;i++){
                if(!tracksGrouped[i]){
                  row+='-'
                }else{
                  if(!tracksGrouped[i].includes(j)){
                  row+='-'
                  }else{
                  row+='@'
                  }
                }
              }
              outputGrid.push(row)
                row=''
            }
            console.log('\n-- BEGIN LOG\n')
            console.log(outputGrid.join('\n'))
            console.log('\n-- END LOG\n\n\n')
            return this;
    }
}
new Turtle(0, 0)
  .forward(5)
  .right()
  .forward(5)
  .right()
  .forward(5)
  .right()
  .forward(5)
  .print()


new Turtle(0, 0).forward(3).left().forward(3).print();

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

const fs = require('fs');

const args = process.argv[2];

// fs.readFile(fileName, (err, data) => {
// 	const fileContents = data.toString();
//     const linesArray = fileContents.split('\n');
// 	linesArray.forEach((line, index) => {
// 		console.log(`${index + 1} | ${line}`);
// 	});
// });

// $ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5
// tX,Y for new Turtle where X & Y are numbers representing the starting x & y coordinates. 
// If this command is not given, begin the turtle at (0, 0).
// fN for forward where N is a number representing how many units the turtle moves forward.
// r for right
// l for left

// if(args){
//     const listOfArguments = args.split('-')
//     const firstArg = listOfArguments[0].split(',').
//     const tX = .split(',')[0].slice(1)

//     const tY = listOfArguments
//     args.forEach(function(element){

//     })
//     const fileName = args[0]
//     // fetch and read the contents of file
//     const fs = require('fs')
//     fs.readFile(fileName,(err, data) =>{
//         if(err);
//         let fileContents = data.toString().split('\n')
//         console.log(boxIt(fileContents))
//     })
// }else{// else read contents from terminal
//     console.log(boxIt(args))
// }