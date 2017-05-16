  var state = {
	prevStream: [],
	
	currentStream: {}
	
};

function enterTwitchAPI(){
	$.ajax({
    url: "https://api.twitch.tv/kraken/streams/",
    type: 'GET',
		data: {
        q:$('.js-input').val(),
				game:$('.js-input').val(),
        format: "json",
				client_id: 'nvl5tgwjcwad86ywzlvhhxrvkerdxc',
				type:'video',
				limit:100
    }, 
  success: function( data ) {
		
		state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, data.streams[99].channel.name, data.streams[98].channel.name, data.streams[97].channel.name]);
	
		var query = $('.js-input').val();
		state.currentStream[query] = data;
		renderResults(data);
		
	}
	});
}

function searchResults(name,elementClass,elementId,videoClass){ 
	var resultElement = "";
	resultElement += "<p class=streamerName>" +name+ "</p>" +
	'<iframe class='+elementClass+
		' id='+elementId+
		' src= "http://player.twitch.tv/?channel='+name+'&autoplay=false"'+
		'height="300"'+
		'width="400"'+
		'frameborder="0"'+
		'scrolling="no"'+
		'allowfullscreen="true">'+
   '</iframe>';
	return resultElement;
		
}


function renderResults(data){
	var query = $('.js-input').val();
	var resultElement = "";	
	if (data.streams.length > 0) {	
		resultElement += searchResults(data.streams[0].channel.name,' results', 'tr0'); 
		resultElement += searchResults(data.streams[1].channel.name,' results', 'tr1');
		resultElement += searchResults(data.streams[2].channel.name,' results', 'tr2');	
				
		var size = state.currentStream[query].streams.length;
				
		resultElement += searchResults(data.streams[size-3].channel.name,' results', 'tr91');
		resultElement += searchResults(data.streams[size-2].channel.name,' results', 'tr92');
		resultElement += searchResults(data.streams[size-1].channel.name,' results', 'tr93');
		
	
				
		}else {
			resultElement += "<p>No results</p>";
		 }
		$('.js-results').html(resultElement);
		
		$('#dropDownMenu').empty();
		Object.keys(state.currentStream).forEach(function(key){
			var previousSearch = state.currentStream[key]
			
			$('#dropDownMenu').append('<option class="dpItem" value="' + previousSearch.streams[0].game + '">' + previousSearch.streams[0].game + '</option>');
			
			});
}

function prevResults(state){
	var prevResultElement = '';
	var query = $('.js-input').val();
	
	if($('#dropDownMenu option:selected').val() == state.prevStream["0"]["0"]){
		
		prevResultElement += searchResults(state.prevStream["0"]["1"],' results', 'tr0');
		prevResultElement += searchResults(state.prevStream["0"]["2"],' results', 'tr1');
		prevResultElement += searchResults(state.prevStream["0"]["3"],' results', 'tr2');
		
		
		prevResultElement += searchResults(state.prevStream["0"]['4'],' results', 'tr91');
		prevResultElement += searchResults(state.prevStream["0"]['5'],' results', 'tr92');
		prevResultElement += searchResults(state.prevStream["0"]['6'],' results', 'tr93');
		
	}else if($('#dropDownMenu option:selected').val() == state.prevStream["1"]["0"]){
		
		prevResultElement += searchResults(state.prevStream["1"]["1"],' results', 'tr0');
		prevResultElement += searchResults(state.prevStream["1"]["2"],' results', 'tr1');
		prevResultElement += searchResults(state.prevStream["1"]["3"],' results', 'tr2');
		
		
		prevResultElement += searchResults(state.prevStream["1"]['4'],' results', 'tr91');
		prevResultElement += searchResults(state.prevStream["1"]['5'],' results', 'tr92');
		prevResultElement += searchResults(state.prevStream["1"]['6'],' results', 'tr93');
		
	}else if($('#dropDownMenu option:selected').val() == state.prevStream["2"]["0"]){
		
		prevResultElement += searchResults(state.prevStream["2"]["1"],' results', 'tr0');
		prevResultElement += searchResults(state.prevStream["2"]["2"],' results', 'tr1');
		prevResultElement += searchResults(state.prevStream["2"]["3"],' results', 'tr2');
		
		
		
		prevResultElement += searchResults(state.prevStream["2"]['4'],' results', 'tr91');
		prevResultElement += searchResults(state.prevStream["2"]['5'],' results', 'tr92');
		prevResultElement += searchResults(state.prevStream["2"]['6'],' results', 'tr93');
	}
	$('.js-results').html(prevResultElement);
}

$(document).ready(function(){
	
	$('.js-form').submit(function(event){
		event.preventDefault();
		event.stopPropagation();
    enterTwitchAPI();
	});
	
})