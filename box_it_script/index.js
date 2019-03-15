#! /usr/bin/env node

/** 
 * Author: Kevin Njunge
 * Assignment: Box-It-Script
 * Due Date: March 15, 2019
 * 
 * 
 * 
 * To execute:
 * 1.) cd box_it_script/
 * 2.) run chmod +x index.js to make it executable with ./
 * 3.) to execute the file, either 
 *     a.) run ./index.js <filename> with either .csv or .txt extension to read from file. Or
 *   OR
 *     b.) run ./index.js <string 1> <string 2> ... to read from terminal.
 * 
 * ie.) 
 * 
 * ./index.js
 * ┌┐
 * └┘
 * 
 * ./index.js empty.csv
 * ┌┐
 * └┘
 * 
 * ./index.js 'abc,defg' hijkl,sfsaf abc def
 * ┌─────┬─────┐
 * |abc  |defg |
 * |─────┼─────|
 * |hijkl|sfsaf|
 * |─────┼─────|
 * |abc  |     |
 * |─────┼─────|
 * |def  |     |
 * └─────┴─────┘
 * 
 * ./index.js 'Jon Snow' 'Daenerys Targaryen' 'Arya Stark'
 * ┌──────────────────┐
*  |Jon Snow          |
*  |──────────────────|
*  |Daenerys Targaryen|
*  |──────────────────|
*  |Arya Stark        |
*  └──────────────────┘
* 
* 
* ./index.js twocolumns.csv
* 
* 
* ┌──────────────────┬─────────┐
* |Names             |House    |
* |──────────────────┼─────────|
* |Jon Snow          |Stark    |
* |──────────────────┼─────────|
* |Daenerys Targaryen|Targaryen|
* └──────────────────┴─────────┘
*
*
*
* ./index.js onecolumn.txt
* ┌──────────────────┐
* |Names             |
* |──────────────────|
* |House             |
* |──────────────────|
* |Jon Snow          |
* |──────────────────|
* |Stark             |
* |──────────────────|
* |Daenerys Targaryen|
* |──────────────────|
* |Targaryen         |
* └──────────────────┘
* 
* **/

// #! /usr/bin/env node -> runs env command which finds where 
// node.js is installed and runs it.
// inorder to make file: index.js executable with ./ you'll first need
// to run chmod +x index.js
// https://jrgraphix.net/r/Unicode/2500-257F


// grab file name
// https://www.geeksforgeeks.org/javascript-program-to-read-text-file/
const args = process.argv.slice(2)

// schematic of box
const box ={
    topLeftCorner: '\u250C',
    topRightCorner: '\u2510',
    bottomLeftCorner: '\u2514',
    bottomRightCorner: '\u2518',
    middleTopCorner: '\u252c',
    middleLine:'\u253c',
    middleBottomCorner:'\u2534',
    horizantalLine: '\u2500',
    verticalLine:'|',
    space: ' ',
    newLine:'\n'
}
/**
 * @param  {int} n
 * drawLine: draws line of length n
 */
function drawLine(n){
    let line = ''
    for(let i = 0; i<n; i++){
        line += box.horizantalLine
    }
    return line
}
// To do
/**
 * @param  {int} n
 * @param  {string} beginning='\u250C'
 * @param  {string} ending='\u2510'
 * drawTopBorder: draws top border of length n
 */
function drawTopBorder(n, beginning= box.topLeftCorner, ending=box.topRightCorner){
    return `${beginning}${drawLine(n)}${ending}`
}
/**
 * @param  {int} n
 * @param  {string} beginning = '|'
 * @param  {string} ending='|'
 * drawMiddleBorder: draws middle border of length n
 */
function drawMiddleBorder(n,beginning=box.verticalLine,ending=box.verticalLine){
    return `${beginning}${drawLine(n)}${ending}`
}
/**
 * @param  {int} n
 * @param  {string} beginning='\u2514'
 * @param  {string} ending='\u2518'
 * drawBottomBorder: draws bottom border of length n
 */
function drawBottomBorder(n,beginning=box.bottomLeftCorner,ending=box.bottomRightCorner){
    return `${beginning}${drawLine(n)}${ending}`
}
/**
 * @param  {string} s
 * @param  {string} beginning='|'
 * @param  {string} ending='|'
 * drawBarsAround: draws bars around string s
 */
function drawBarsAround(s,beginning=box.verticalLine,ending=box.verticalLine){
    return `${beginning}${s}${ending}`
}

/**
 * @param  {int} maxLength
 * @param  {string} string
 * getRemainingSpaces: add spaces to input string so 
 * length matches with max length of longest string in list of inputs
 */
function getRemainingSpaces(maxLength,string){
    let remainingSpaces=''
    let lengthOfString = string ? string.length : 0
    for(let i=0; i<(maxLength - lengthOfString); i++){
        remainingSpaces+=' '
    }
    return remainingSpaces
}

/**
 * @param  {[string]} set
 * getMaxLength: returns length of largest element
 * in list
 */
function getMaxLength(set){
    let maxLength = 0
    for(let element of set){
        if(element && element.length > maxLength){
            maxLength=element.length
        }
    }
    return maxLength
}

/**
 * @param  {[string]} content
 * isUndefined: returns true if string is undefined.
 * Else it returns false. 
 */
function isUndefined(content){
    return content === undefined;
}

/**
 * @param  {[string]} content
 * convertIfEmpty: returns string if not undefined.
 * Else it returns '' 
 */
function convertIfEmpty(content){
    return (content ? content : '');
}

/**
 * @param  {[string]} contents
 * @param  {boolean} readFromFileFlag = true
 * boxIt: by calling combination of other functions,
 * it draws a box with list of strings in the input. 
 */
function boxIt(contents){
    let output = ''
    let firstSet=[],secondSet=[]

    for(let content of contents){
        if(content){
            firstSet.push(content.split(',')[0])
            secondSet.push(content.split(',')[1])
        }
    }
    let firstSet_maxLength = getMaxLength(firstSet)
    // if second set exists, include building second column of box
    if(!secondSet.every(isUndefined)){
        let secondSet_maxLength = getMaxLength(secondSet)
        output=drawTopBorder(n=firstSet_maxLength,beginning=box.topLeftCorner,ending=box.middleTopCorner)+drawTopBorder(secondSet_maxLength,beginning='')
        for(let i=0; i<contents.length; i++){
            let firstSetSpaces = getRemainingSpaces(firstSet_maxLength,firstSet[i])
            let secondSetSpaces = getRemainingSpaces(secondSet_maxLength,secondSet[i])
            output+=box.newLine+drawBarsAround(convertIfEmpty(firstSet[i])+firstSetSpaces)+drawBarsAround(n=(convertIfEmpty(secondSet[i])+secondSetSpaces),beginning='')
            if(i !== contents.length-1){
               output+=box.newLine+drawMiddleBorder(firstSet_maxLength,beginning=box.verticalLine,ending=box.middleLine)+drawMiddleBorder(secondSet_maxLength,beginning='')
            }
        }
        output+=box.newLine+drawBottomBorder(firstSet_maxLength,beginning=box.bottomLeftCorner,ending=box.middleBottomCorner)+drawBottomBorder(secondSet_maxLength,beginning='')
    }else{ // else only build first column of box
        output=drawTopBorder(firstSet_maxLength)
        for(let i=0; i<firstSet.length; i++){
            let remainingSpaces=getRemainingSpaces(firstSet_maxLength,contents[i])
            output+=box.newLine+drawBarsAround(convertIfEmpty(contents[i])+remainingSpaces)
            if(i !== contents.length-1){
                output+=box.newLine+drawMiddleBorder(firstSet_maxLength)
            }
        }
        output+=box.newLine+drawBottomBorder(firstSet_maxLength)
    }
    return output
}

// if only one argument is provided in terminal with .csv or .txt extension,
//  then grab contents from file with that name.
// ie.) ./index.js onecolumn.csv will read contents from onecolumn.csv file. 
if(args.length ==1 && (args[0].includes("\.csv") || args[0].includes("\.txt"))){
    const fileName = args[0]
    // fetch and read the contents of file
    const fs = require('fs')
    fs.readFile(fileName,(err, data) =>{
        if(err);
        let fileContents = data.toString().split('\n')
        console.log(boxIt(fileContents))
    })
}else{// else read contents from terminal
    console.log(boxIt(args))
}
