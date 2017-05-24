  var state = { 
	prevStream: [],
	
	currentStream: {}
	
};

function enterTwitchAPI(){ // Accesses Twitch API 
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
  success: function( data ) { // Stores data from Twitch API into prevSteam array inside state object
		var prevSize = data.streams.length;
		if(data.streams.length > 99){
			state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, data.streams[99].channel.name, data.streams[98].channel.name, data.streams[97].channel.name]);
		}else{
			state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, data.streams[prevSize-1].channel.name, data.streams[prevSize-2].channel.name, data.streams[prevSize-3].channel.name]);
		}
		var query = $('.js-input').val();
		state.currentStream[query] = data;			// line 27 sets the search value to query, line 28 adds the query variable into the current stream and sets it to data.
		renderResults(data);
	}
	});
}

function searchResults(name, elementClass,elementId, colClass){  // function that sets up the video results with element id, video class, element class and name.
	var resultElement = "";
	resultElement += "<div class=" + colClass + ">"+
		"<p class=streamerName>" +name+ "</p>" +
		'<iframe class='+elementClass+
		' id='+elementId+
		' src= "https://player.twitch.tv/?channel='+name+'&autoplay=false"'+
		'height="300"'+
		'width="100%"'+
		'frameborder="0"'+
		'scrolling="no"'+
		'allowfullscreen="true">'+
   '</iframe>'+
	 '</div>';
	return resultElement;
		
}

function renderResults(data){ // actually makes the search results function happen by plugging in all the info.
	var query = $('.js-input').val();
	var resultElement = "";	
	var resultElementBottom = "";
	if (data.streams.length > 0) {	
		resultElement += searchResults(data.streams[0].channel.name,' results', 'tr0', 'colOne'); 
		resultElement += searchResults(data.streams[1].channel.name,' results', 'tr1', 'colOne');
		resultElement += searchResults(data.streams[2].channel.name,' results', 'tr2', 'colOne');	
				
		var size = state.currentStream[query].streams.length;
				
		resultElementBottom += searchResults(data.streams[size-3].channel.name,' results', 'tr91', 'colTwo');
		resultElementBottom += searchResults(data.streams[size-2].channel.name,' results', 'tr92', 'colTwo');
		resultElementBottom += searchResults(data.streams[size-1].channel.name,' results', 'tr93', 'colTwo');
				
		}else {
			resultElement += "<p>No results</p>";
		 }
		$('.js-results-top3').html(resultElement);
		$('.js-results-last3').html(resultElementBottom);
		
		if(state.prevStream.length <= 3){ // adds the currentStream key to the drop down menu, stops after it reaches three
			$('#dropDownMenu').empty();
			state.prevStream.forEach(function(key){
			$('#dropDownMenu').append('<option class="dpItem" value="' + key[0]+ '">' + key[0] + '</option>');
		});
		}else{
			$('#dropDownMenu').empty();
			var prevLength = state.prevStream.length;
			var lastThree = state.prevStream.slice(prevLength -3, prevLength);
			lastThree.forEach(function(key){
				$('#dropDownMenu').append('<option class="dpItem" value="' + key[0]+ '">' + key[0] + '</option>');
			})
		}		
}

function prevResults(state, info){ // fetches the info from the prevStream and plugs it in to search results, this function runs with the onChange set up in the menu drops html.
	var prevResultElement = '';
	var prevResultElementBottom = '';
	var query = $('.js-input').val();
	state.prevStream.forEach(function(key){
		if($('#dropDownMenu option:selected').val() == key["0"]){
			prevResultElement += searchResults(key["1"],' results', 'tr0', 'colOne');
			prevResultElement += searchResults(key["2"],' results', 'tr1', 'colOne');
			prevResultElement += searchResults(key["3"],' results', 'tr2', 'colOne');
	
			prevResultElementBottom += searchResults(key["4"],' results', 'tr91', 'colTwo');
			prevResultElementBottom += searchResults(key["5"],' results', 'tr92', 'colTwo');
			prevResultElementBottom += searchResults(key["6"],' results', 'tr93', 'colTwo');
	}
		});
	$('.js-results-top3').html(prevResultElement);
	$('.js-results-last3').html(prevResultElementBottom);
}

$(document).ready(function(){ // event listener for when the form is submitted which is just the search its self.
	
	$('.js-form').submit(function(event){
		event.preventDefault();
		event.stopPropagation();
    enterTwitchAPI();
	});
	
})