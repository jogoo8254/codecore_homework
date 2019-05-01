// line => '\u2501'
$(document).ready(() => {
    let index_of_toggled_image=0
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
    const number_letters = choose_random_word.length
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
            if(checkLetter(b_id)){
                addLetterToCorrespondingLine(b_id)
            }else{
                toggleNextImage();
            }
        });
    }
    function checkLetter(letter){
        if(choose_random_word.includes(letter)){
            return true;
        }
        return false;
    }
    function addLetterToCorrespondingLine(letter){
        for(let i = 0; i< number_letters;i++){
            if(choose_random_word[i]===letter){
                let spaces=''
                for(let j = 0; j<=i;j++){
                    spaces+='  '
                }
                $('#input_slot').prepend($(`<div class="letter">${spaces}${letter.toUpperCase()}</div>`))                
            }
        }
    }
    function toggleNextImage(){
        if(index_of_toggled_image!=6){
            $(`#hangman-${index_of_toggled_image}`).toggle()
            index_of_toggled_image +=1;
            $(`#hangman-${index_of_toggled_image}`).toggle()
            if(index_of_toggled_image==6){
                $('.fullbody').append($(`<div class="game_over">GAME OVER</div>`))
            }    
        }
    }
})
