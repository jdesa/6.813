// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

var userenglishword;
var englishword;
var lang_to		= "English";
var lang_from		= "Spanish";
var current_dict	= dicts[lang_to][lang_from];
// keys: words in @lang_to, values: corresponding words in @lang_from 	


$(function() {
	
	$('#lang_to').text(lang_to);
	$('#lang_from').text(lang_from);

	var spanishword = getspanishword();

	document.getElementById("inputbox").focus();

    $('#inputbox').keypress(function(e) {
        if (e.which == 13) { //13 is the keycode for 'enter'
        	userenglishword = $('#inputbox').val();
         	spanishword = submitanswer(spanishword);
         	this.value = "";
            return false; //required to properly reset the textbox
        }
	});

	$("#inputbox").autocomplete({
		source:Object.keys(current_dict),
		minLength:2,
	    select: function(event, ui) {   
	    	userenglishword = ui.item.label;
	    	//takes current autocomplete menu contents
         	spanishword = submitanswer(spanishword); 
         	this.value = "";
    		return false;
        }
    });

	$("#answerbutton").click(function(){
		userenglishword = $('#inputbox').val();
		spanishword = submitanswer(spanishword);
	});

});

function getspanishword() {
	var current_dict_keys = Object.keys(current_dict);
	var current_dict_size = current_dict_keys.length;
	var random_index = Math.floor(current_dict_size*Math.random());
	englishword = current_dict_keys[random_index];
	var spanishword = current_dict[englishword];
	$('#randomword').text(spanishword);
	return spanishword;
}

function submitanswer(spanishword){
	var translationcorrect = checktranslation(englishword, userenglishword);
	translationcorrect ? addrowcorrect(spanishword, userenglishword) : addrowincorrect(spanishword, userenglishword, englishword);	
	var spanishword = refreshgame();
	return spanishword;
};

function checktranslation(spanishword, englishword){
	return spanishword == englishword;
};

function addrowcorrect(spanishword, userenglishword){ 
	$("#start").prepend(
		"<tr class='row blue'>"+ 
			"<td>"+spanishword+"</td>"+ 
			"<td>"+userenglishword+"</td>"+ 
			"<td><span class='ui-icon ui-icon-check'></span></td>"+ 
		"</tr>"); 
}; 

function addrowincorrect(spanishword, userenglishword, trueenglishword){ 
	$("#start").prepend(
		"<tr class='row red'>"+ 
			"<td>"+spanishword+"</td>"+ 
			"<td><span class='strikethrough'>"+userenglishword+"</span></td>"+ 
			"<td>"+trueenglishword+"</td>"+ 
		"</tr>"); 
}; 

function refreshgame(){
	var spanishword = getspanishword()
	$('#randomword').text(spanishword);
	document.getElementById("inputbox").focus();
	$('#inputbox').val('');
	$('#inputbox').autocomplete( "close" );
	return spanishword;
};





