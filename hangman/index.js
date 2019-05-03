const sample_words = {
    "Month of the year": ["january","february","march","april","may","june","july","august","september","october","november","december"],
    "Day of the week": ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
    Animal: ["lion","cat","dog","giraffe","elephant","crocodile","antelope","buffalo","mouse","chicken","tortoise","shark","whale","fish","hawk","eagle","tiger","bear","leopard","pigeon","fox"],
    Sport: ["basketball","soccer","football","lacrosse","tennis","baseball","hockey","boxing","badminton","dodgeball","golf","squash","softball","volleyball"],
    Fruit: ["banana","grapefruit","papaya","pineapple","grape","apple","peach","cherry","mango","pear","blackberry","strawberry","plum","kiwi","watermelon","mandarine","orange"],
    "Common word": ["stranger","hello","birthday","life","world","child","man","woman","time","year","friend"]
}
let index_of_toggled_image=0
let word_to_guess=[]
let alreadyPlayed = false;
function resetGame(){
	alreadyPlayed=true;
	// reset word to guess slot
	word_to_guess=[]
	// reset toggling of hangman images
	// 0 => 0-7 toggle
	// else => make hangman-0 the one to show
	if(index_of_toggled_image !=0){
		$(`#hangman-${index_of_toggled_image}`).toggle()
		$(`#hangman-0`).toggle()
	}
	// reset index of toggling image
	index_of_toggled_image=0
	// reset background color for buttons
	for(let i=0;i<26;i++){
        let button= $('.button')[i].id
        $(`#${button}`).off()
		$(`#${button}`).css("background-color","");
    }
	
	// reset hint button
    $('.hint font').remove()
    $('#hint').off()

}
function playGame(){
    $(document).ready(() => {        
        // setting default
		if(!alreadyPlayed){
			for(let i=1; i<7; i++){
				$(`#hangman-${i}`).toggle()
			}			
		}
        const hint = Object.keys(sample_words)[Math.floor(Math.random() * Object.keys(sample_words).length)]
        const choose_random_word = sample_words[hint][Math.floor(Math.random() * sample_words[hint].length)]
        const number_letters = choose_random_word.length
        
        for(let i =0; i < number_letters; i++){
            word_to_guess.push('&nbsp;&nbsp;')
        }
        // initialize empty lines to output solution
        outputResult(word_to_guess)
        $('#hint').click(function(){
			$('.hint font').remove()
            $('.hint').append(`<font size="+2"><strong>${hint}</strong></font>`)
        })
        for(let i=0;i<26;i++){
            const clicked_letter=$('.button')[i].id
            $(`#${clicked_letter}`).click(function(){
                $(`#${clicked_letter}`).css("background-color","salmon");
                if(choose_random_word.includes(clicked_letter)){
                    word_to_guess = addLetterToCorrespondingSpot(choose_random_word,clicked_letter,word_to_guess)
                }else{
                    index_of_toggled_image = toggleNextImage(index_of_toggled_image);
                }
            });
        }
})
}
function addLetterToCorrespondingSpot(selected_word,clicked_letter,current_word){
    let updated_word =current_word
    for(let i = 0; i< current_word.length;i++){
        if(selected_word[i]===clicked_letter){
            updated_word[i]=`${clicked_letter.toUpperCase()}`
        }
    }
    outputResult(updated_word)
    if(!updated_word.includes('&nbsp;&nbsp;')){
        $.when()
        .then(function(){
			alert('Congratulations! You Win!')})
			.then(function(){
				resetGame()
				playGame()
				})
    }
    return updated_word;
}

function toggleNextImage(i){
    let ind_toggled_img = i
    if(ind_toggled_img!=6){
        $(`#hangman-${ind_toggled_img}`).toggle()
        ind_toggled_img +=1;
        $(`#hangman-${ind_toggled_img}`).toggle()
        if(ind_toggled_img==6){
            var audioElement = document.createElement('audio')
            audioElement.setAttribute('src','./sounds/You-lose-sound-effect.mp3')
            $.when(audioElement.play())
            .then(function(){
				alert('Better luck next time...')})
				.then(function(){
					resetGame()
					playGame()
				})
        }    
    }
    return ind_toggled_img;
}
function outputResult(word_to_guess){
    let output=''
    for(let i = 0; i< word_to_guess.length; i++){
        output+=`<font id="letter"><u>${word_to_guess[i]}</u></font>\n`
        output+=`<font>&nbsp;</font>\n`
    }
    $(".letters").remove()
    $('#input_slot').append(`<div class="letters"></div>`)
    $('.letters').prepend($(`${output}`))
}

playGame()
