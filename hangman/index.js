// line => '\u2501'
$(document).ready(() => {
    let index_of_toggled_image=0
    // setting default
    for(let i=1; i<7; i++){
        $(`#hangman-${i}`).toggle()
    }
    const sample_words = {
        "month of the year": ["january","february","march","april","may","june","july","august","september","october","november","december"],
        "day of the week": ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        animal: ["lion","cat","dog","giraffe","elephant","crocodile","antelope","buffalo","mouse","chicken","tortoise","shark","whale","fish","hawk","eagle","tiger","bear","leopard","pigeon","fox"],
        sport: ["basketball","soccer","football","lacrosse","tennis","baseball","hockey","boxing","badminton","dodgeball","golf","squash","softball","volleyball"],
        fruits: ["banana","grapefruit","papaya","pineapple","grape","apple","peach","cherry","mango","pear","blackberry","strawberry","plum","kiwi","watermelon","mandarine","orange"],
        "common word": ["stranger","hello","birthday","life","world","child","man","woman","time","year","friend"]
    }
    // ["birthday","time","person","year","way","day","thing",
    // "man","world","life","hand","part","child","eye","woman",
    // "place","work","week","case","point","company","number",
    // "group","problem","fact","stranger","saturday","monday",
    // "tuesday","wednesday","thursday","friday"]
    const hint = Object.keys(sample_words)[Math.floor(Math.random() * Object.keys(sample_words).length)]
    const choose_random_word = sample_words[hint][Math.floor(Math.random() * sample_words[hint].length)]
    console.log(hint)
    console.log(choose_random_word)
    const number_letters = choose_random_word.length
    let word_to_guess=[]
    
    for(let i =0; i < number_letters; i++){
        word_to_guess.push('&nbsp;&nbsp;')
    }

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
                var audioElement = document.createElement('audio')
                audioElement.setAttribute('src','./sounds/You-lose-sound-effect.mp3')
                $.when(audioElement.play())
                .then(function(){
                    alert('Better luck next time...')})
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
