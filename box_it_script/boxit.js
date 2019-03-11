#! /usr/bin/env node
// #! /usr/bin/env node -> runs env command which finds where 
// node.js is installed and runs it.
// inorder to make file: boxit.js executable with ./ you'll first need
// to run chmod +x boxit.js
// https://jrgraphix.net/r/Unicode/2500-257F
// To do
function drawLine(n){
    let line = ''
    for(let i = 0; i<n; i++){
        line += '\u2500'
    }
    return line
}
// To do
function drawTopBorder(n){
    return `\u250C${drawLine(n)}\u2510`
}
// To do
function drawMiddleBorder(n){
    return `|${drawLine(n)}|`
}
// To do
function drawBottomBorder(n){
    return `\u2514${drawLine(n)}\u2518`
}
// To do
function drawBarsAround(s){
    return `|${s}|`
}
// To do
function boxIt(fileContents){
    let firstSet=[],secondSet=[]
    for(let content of fileContents){
        firstSet.push(content.split(',')[0])
        secondSet.push(content.split(',')[1])
    }
 
    let firstSet_maxLength = getMaxLength(firstSet)
    let secondSet_maxLength = getMaxLength(secondSet)

    let output=drawTopBorder(firstSet_maxLength)+drawTopBorder(secondSet_maxLength)
    for(let i=0; i<fileContents.length; i++){
        let firstSetSpaces = getRemainingSpaces(firstSet_maxLength,firstSet[i])
        let secondSetSpaces = getRemainingSpaces(secondSet_maxLength,secondSet[i])

        output+='\n'+drawBarsAround(firstSet[i]+firstSetSpaces)+drawBarsAround(secondSet[i]+secondSetSpaces)
        if(i !== fileContents.length-1){
            output+='\n'+drawMiddleBorder(firstSet_maxLength)+drawMiddleBorder(secondSet_maxLength)
        }
    }
    output+='\n'+drawBottomBorder(firstSet_maxLength)+drawBottomBorder(secondSet_maxLength)
    return output
}

function getRemainingSpaces(maxLength,string){
    let remainingSpaces=''
    for(let i=0; i<(maxLength - string.length); i++){
        remainingSpaces+=' '
    }
    return remainingSpaces
}

function getMaxLength(set){
    let maxLength = 0
    for(let element of set){
        if(element.length > maxLength){
            maxLength=element.length
        }
    }
    return maxLength
}
 
const fileName = process.argv[2]
// https://www.geeksforgeeks.org/javascript-program-to-read-text-file/
const fs = require('fs')
fs.readFile(fileName,(err, data) =>{
    if(err) throw err;
    let fileContents = data.toString().split('\n')
    console.log(boxIt(fileContents))
    // boxIt(fileContents)
})
