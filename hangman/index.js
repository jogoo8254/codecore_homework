// line => '\u2501'
$(document).ready(() => {
    const sample_words = ["birthday","time","person","year","way","day","thing",
    "man","world","life","hand","part","child","eye","woman",
    "place","work","week","case","point","company","number",
    "group","problem","fact","stranger","saturday","monday",
    "tuesday","wednesday","thursday","friday"]
    const choose_random_word = sample_words[Math.floor(Math.random() * sample_words.length)]
    console.log(choose_random_word)
    const number_letters = choose_random_word.split('').length
    console.log(number_letters)
    const line = '\u2501'
    let lines=''
    //const lines = $(`<div class="lines">${line} ${line} ${line} ${line} ${line} </div>`)
    for(let i =0; i < number_letters; i++){
        lines += `${line} `
        
    }
    $('#input_slot').append($(`<div class="lines">${lines}</div>`))
})