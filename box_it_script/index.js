#! /usr/bin/env node

/** 
 * Author: Kevin Njunge
 * Assignment: Box-It-Script
 * Due Date: March 15, 2019
 * **/


// #! /usr/bin/env node -> runs env command which finds where 
// node.js is installed and runs it.
// inorder to make file: boxit.js executable with ./ you'll first need
// to run chmod +x boxit.js
// https://jrgraphix.net/r/Unicode/2500-257F

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
function drawTopBorder(n,beginning=box.topLeftCorner,ending=box.topRightCorner){
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
 * @param  {} fileContents
 * boxIt: by calling combination of other functions,
 * it draws a box with list of strings in the input. 
 */
function boxIt(fileContents){
    let firstSet=[],secondSet=[]
    for(let content of fileContents){
        if(content){
            firstSet.push(content.split(',')[0])
            secondSet.push(content.split(',')[1])
        }
    }
    let firstSet_maxLength = getMaxLength(firstSet)
    let secondSet_maxLength = getMaxLength(secondSet)
    let output=drawTopBorder(n=firstSet_maxLength,beginning=box.topLeftCorner,ending=box.middleTopCorner)+drawTopBorder(secondSet_maxLength,beginning='')
    if(firstSet.length || secondSet.length){
        for(let i=0; i<fileContents.length; i++){
            let firstSetSpaces = getRemainingSpaces(firstSet_maxLength,firstSet[i])
            let secondSetSpaces = getRemainingSpaces(secondSet_maxLength,secondSet[i])
            output+=box.newLine+drawBarsAround(firstSet[i]+firstSetSpaces)+drawBarsAround(n=(secondSet[i]+secondSetSpaces),beginning='')
            if(i !== fileContents.length-1){
               output+=box.newLine+drawMiddleBorder(firstSet_maxLength,beginning=box.verticalLine,ending=box.middleLine)+drawMiddleBorder(secondSet_maxLength,beginning='')
            }
        }    
    }
    output+=box.newLine+drawBottomBorder(firstSet_maxLength,beginning=box.bottomLeftCorner,ending=box.middleBottomCorner)+drawBottomBorder(secondSet_maxLength,beginning='')
    return output
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

// grab file name
// https://www.geeksforgeeks.org/javascript-program-to-read-text-file/
const fileName = process.argv[2]
// fetch and read the contents of file
const fs = require('fs')
fs.readFile(fileName,(err, data) =>{
    if(err);
    let fileContents = data.toString().split('\n')
    console.log(boxIt(fileContents))
})
