var state = { 
	prevStream: [],
	
	currentStream: {},
	
	nameArray: []
	
};

function enterTwitchAPI(){ // Accesses Twitch API 
	$.ajax({
    url: 'https://api.twitch.tv/kraken/streams/',
    type: 'GET',
		data: {
        q:$('.js-input').val(),
				game:$('.js-input').val(),
        format: 'json',
				client_id: 'nvl5tgwjcwad86ywzlvhhxrvkerdxc',
				type:'video',
				limit:100
    }, 
  success: function( data ) { // Stores data from Twitch API into prevSteam array inside state object
		var prevSize = data.streams.length;
		var max = data.streams.length - 3;
		var random1 = Math.floor(Math.random()*(max - 4) + 4);
		var random2 = Math.floor(Math.random()*(max - 4) + 4);
		var random3 = Math.floor(Math.random()*(max - 4) + 4);
		if(data.streams.length > 99){
			state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, data.streams[random1].channel.name, data.streams[random2].channel.name, data.streams[random3].channel.name, data.streams[99].channel.name, data.streams[98].channel.name, data.streams[97].channel.name]);
		}else if(data.streams.length < 99 ){
			state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name, data.streams[2].channel.name, data.streams[random1].channel.name, data.streams[random2].channel.name, data.streams[random3].channel.name, data.streams[prevSize-1].channel.name, data.streams[prevSize-2].channel.name, data.streams[prevSize-3].channel.name]);
		}
		var query = $('.js-input').val();
		state.currentStream[query] = data;			
		renderResults(data);
		$('.js-results-top3').show();
		$('.js-results-random').show();
		$('.js-results-last3').show();
	}
	});
}

function searchResults(name, elementClass, elementId, colClass, height){  // function that sets up the video results with element id, video class, element class and name.
	var resultElement = '';
	resultElement += "<div class=" + colClass + ">"+
		"<p class='streamerName ' id =" +name+" onclick='singleVideo(state,event)'>" +name+ "</p>" +
		'<iframe class='+elementClass+
		' id=' +elementId+
		' src= "https://player.twitch.tv/?channel='+name+'&autoplay=false"'+
		' height=' +height+
		' width="100%"'+
		' frameborder="0"'+
		' scrolling="no"'+
		' allowfullscreen="true">'+
   '</iframe>'+
	 '</div>';
	return resultElement;	
}

function renderResults(data){ // actually makes the search results function happen by plugging in all the info.
	var query = $('.js-input').val();
	var resultElement = '';	
	var resultElementRandom = '';
	var resultElementBottom = '';
	if (data.streams.length > 0) {
		resultElement += '<div><span class="topThree">Most Viewers</span></div>';
		resultElement += searchResults(data.streams[0].channel.name,' results', 'tr0', 'colOne', 300); 
		resultElement += searchResults(data.streams[1].channel.name,' results', 'tr1', 'colOne', 300);
		resultElement += searchResults(data.streams[2].channel.name,' results', 'tr2', 'colOne', 300);	
		resultElement += '<hr class="topLine">';
		
		var max = data.streams.length - 3;
		var random1 = Math.floor(Math.random()*(max - 4) + 4)
		var random2 = Math.floor(Math.random()*(max - 4) + 4)
		var random3 = Math.floor(Math.random()*(max - 4) + 4)
		
		resultElementRandom += '<div><span class="randomThree">Random Bunch</span></div>';
		resultElementRandom += searchResults(data.streams[random1].channel.name,' results', 'trR', 'colTwo', 300);
		resultElementRandom += searchResults(data.streams[random2].channel.name,' results', 'trR1', 'colTwo', 300);
		resultElementRandom += searchResults(data.streams[random3].channel.name,' results', 'trR2', 'colTwo', 300);
		resultElementRandom += "<hr class='middleLine'>";
		
		var size = state.currentStream[query].streams.length;
				
		resultElementBottom += '<div><span class="lastThree">Least Viewers</span></div>';		
		resultElementBottom += searchResults(data.streams[size-3].channel.name,' results', 'tr91', 'colThree', 300);
		resultElementBottom += searchResults(data.streams[size-2].channel.name,' results', 'tr92', 'colThree', 300);
		resultElementBottom += searchResults(data.streams[size-1].channel.name,' results', 'tr93', 'colThree', 300);
	}else {
			resultElement += '<p>No results</p>';
		 }
		$('.js-results-top3').html(resultElement);
		$('.js-results-random').html(resultElementRandom);
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
	var resultElementRandom = '';
	var prevResultElementBottom = '';
	var query = $('.js-input').val();
	state.prevStream.forEach(function(key){
		if($('#dropDownMenu option:selected').val() == key['0']){
			prevResultElement += '<div><span class="topThree">Most Viewers</span></div>';
			prevResultElement += searchResults(key['1'],' results', 'tr0', 'colOne', '300');
			prevResultElement += searchResults(key['2'],' results', 'tr1', 'colOne', '300');
			prevResultElement += searchResults(key['3'],' results', 'tr2', 'colOne', '300');
			prevResultElement += '<hr class="topLine">';
		
			prevResultElementRandom += '<div><span class="topThree">Random Bunch</span></div>';
			prevResultElementRandom += searchResults(key["4"],' results', 'trR', 'colOne', '300');
			prevResultElementRandom += searchResults(key["5"],' results', 'trR1', 'colOne', '300');
			prevResultElementRandom += searchResults(key["6"],' results', 'trR2', 'colOne', '300');
			prevResultElementRandom += '<hr class="middleLine">'

			prevResultElementBottom += '<div><span class="lastThree">Least Viewers</span></div>';	
			prevResultElementBottom += searchResults(key['7'],' results', 'tr91', 'colTwo', '300');
			prevResultElementBottom += searchResults(key['8'],' results', 'tr92', 'colTwo', '300');
			prevResultElementBottom += searchResults(key['9'],' results', 'tr93', 'colTwo', '300');
	}
		});
	$('.js-results-top3').html(prevResultElement);
	$('.js-results-random').html(prevResultElementRandom);
	$('.js-results-last3').html(prevResultElementBottom);
}

function singleVideo(state){ // use the event rather than the state or this so i can get to the current target and than the attr    or dedicated selectors
	state.nameArray.push(event.currentTarget.id);
	$('.js-form').hide();
	$('.js-results-top3').hide();
	$('.js-results-random').hide();
	$('.js-results-last3').hide();
	
	state.nameArray.forEach(function(key){
		if(event.currentTarget.id == key){
			var element = '';
			element += searchResults(key,' results', 'tr', 'colSingle', 650);
			element += '<iframe frameborder=""'+
        ' scrolling="yes"'+
        ' id="chat_embed"'+
        ' src="https://www.twitch.tv/'+key+'/chat"'+
        ' height="300px"'+
        ' width=40%">'+
			'</iframe>'
			$('.js-single-video').html(element);
		}
	})
}

$(document).ready(function(){ // event listener for when the form is submitted which is just the search its self.
		
	$('.js-form').submit(function(event){
		event.preventDefault();
		event.stopPropagation();
    enterTwitchAPI();
	});
	
})














