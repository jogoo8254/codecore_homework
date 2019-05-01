// line => '\u2501'
$(document).ready(() => {
    // setting default
    for(let i=1; i<7; i++){
        $(`#hangman-${i}`).toggle()
    }
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
    for(let i =0; i < number_letters; i++){
        lines += `${line} `
    }
    $('#input_slot').append($(`<div class="lines">${lines}</div>`))

    for(let i=0;i<26;i++){
        const b_id=$('.button')[i].id
        $(`#${b_id}`).click(function(){
            $(`#${b_id}`).css("background-color","salmon");
        });
    }
})