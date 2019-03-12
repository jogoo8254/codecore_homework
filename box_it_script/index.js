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
function drawTopBorder(n,beginning='\u250C',ending='\u2510'){
    return `${beginning}${drawLine(n)}${ending}`
}
// To do
function drawMiddleBorder(n,beginning,ending='|'){
    return `${beginning}${drawLine(n)}${ending}`
}
// To do
function drawBottomBorder(n,beginning='\u2514',ending='\u2518'){
    return `${beginning}${drawLine(n)}${ending}`
}
// To do
function drawBarsAround(s,beginning='|',ending='|'){
    return `${beginning}${s}${ending}`
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

    let output=drawTopBorder(n=firstSet_maxLength,beginning='\u250C',ending='\u252c')+drawTopBorder(secondSet_maxLength,beginning='')
    for(let i=0; i<fileContents.length; i++){
        let firstSetSpaces = getRemainingSpaces(firstSet_maxLength,firstSet[i])
        let secondSetSpaces = getRemainingSpaces(secondSet_maxLength,secondSet[i])
        output+='\n'+drawBarsAround(firstSet[i]+firstSetSpaces)+drawBarsAround(n=(secondSet[i]+secondSetSpaces),beginning='')
        if(i !== fileContents.length-1){
           output+='\n'+drawMiddleBorder(firstSet_maxLength,beginning='|',ending='\u253c')+drawMiddleBorder(secondSet_maxLength,beginning='')
        }
    }
    output+='\n'+drawBottomBorder(firstSet_maxLength,beginning='\u2514',ending='\u2534')+drawBottomBorder(secondSet_maxLength,beginning='')
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
    // console.log(fileContents)
    // boxIt(fileContents)
})
