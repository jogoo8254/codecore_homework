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

    const choose_random_word = "hi"//sample_words[Math.floor(Math.random() * sample_words.length)]
    console.log(choose_random_word)
    const number_letters = choose_random_word.length
    let word_to_guess=[]
    
    for(let i =0; i < number_letters; i++){
        word_to_guess.push('&nbsp;&nbsp;')
    }

    // $('#input_slot').append($(`<div class="lines">${lines.join('&nbsp;')}</div>`))
    // $('#input_slot').prepend($(`<div class="letter"><u>D</u>&nbsp;<u>I</u>&nbsp;<u>S</u>&nbsp;<u>C</u>&nbsp;<u>I</u>&nbsp;<u>P</u>&nbsp;<u>L</u>&nbsp;<u>I</u>&nbsp;<u>N</u>&nbsp;<u>E</u>&nbsp;</div>`))                
    // $('.letters').prepend($(`${outputResult()}`))
    //prepend($(`<div class="letter"><u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u></u>&nbsp;<u>E</u>&nbsp;</div>`))                
    outputResult()
    for(let i=0;i<26;i++){
        const b_id=$('.button')[i].id
        $(`#${b_id}`).click(function(){
            $(`#${b_id}`).css("background-color","salmon");
            if(checkLetter(b_id)){
                addLetterToCorrespondingSpot(b_id)
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
    function addLetterToCorrespondingSpot(letter){
        for(let i = 0; i< number_letters;i++){
            if(choose_random_word[i]===letter){
                word_to_guess[i]=`${letter.toUpperCase()}`
            }
        }
        outputResult()
        if(!word_to_guess.includes('&nbsp;&nbsp;')){
            $.when()
            .then(function(){
                alert('Congratulations! You Win!')
            })
        }
    }

    function toggleNextImage(){
        if(index_of_toggled_image!=6){
            $(`#hangman-${index_of_toggled_image}`).toggle()
            index_of_toggled_image +=1;
            $(`#hangman-${index_of_toggled_image}`).toggle()
            if(index_of_toggled_image==6){
                // $('.fullbody').append($(`<div class="game_over">GAME OVER</div>`))
                $.when()
                .then(function(){
                alert('You Lose! Game Over!!!')})
            }    
        }
    }
    function outputResult(){
        let output=''
        for(let i = 0; i< number_letters; i++){
            output+=`<font id="letter"><u>${word_to_guess[i]}</u></font>\n`
            output+=`<font>&nbsp;</font>\n`
        }
        $(".letters").remove()
        $('#input_slot').append(`<div class="letters"></div>`)
        $('.letters').prepend($(`${output}`))
    }
})
