  var state = {
	prevStream: [],
	
	currentStream: {}
	
};

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
function searchQuery(id,data){
	return {id: data};
}
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
  success: function( data ) { // grabbing info from twitch and adding it to result element. \/\/\/
		if(Object.keys(state.currentStream).length > 0) state.prevStream.push(state.currentStream);
		var query = $('.js-input').val();
		state.currentStream[query] = data;
		renderResults(data);
	}
	});
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
		//console.log(Object.keys(state.currentStream));
		$('#dropDownMenu').empty();
		Object.keys(state.currentStream).forEach(function(key){
			var previousSearch = state.currentStream[key]
			console.log(previousSearch);
			
			$('#dropDownMenu').append('<option class="dpItem" value="' + previousSearch.streams[0].game + '">' + previousSearch.streams[0].game + '</option>');
			
			console.log($('#dropDownMenu option:selected').val());
			});
}

function previousResultsZero(state){
	
}
function previousResultsOne(state){
	Object.keys(state.prevStream).forEach(function(key){
	 var prevSearch = state.prevStream[key];
	 var prevSize = prevSearch[Object.keys(prevSearch)[0]].streams.length;
	 var prevResultElement = "";
		
	 if (prevSize > 0) {	
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[0].channel.name,' results', 'tr0'); 
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[1].channel.name,' results', 'tr1');
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[2].channel.name,' results', 'tr2');	
			
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[prevSize-3].channel.name,' results', 'tr91');
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[prevSize-2].channel.name,' results', 'tr92');
		prevResultElement += searchResults(prevSearch[Object.keys(prevSearch)[1]].streams[prevSize-1].channel.name,' results', 'tr93');
	 }else {
		prevResultElement += "<p>No results</p>";
	 }
	 $('.js-prevResults').html(prevResultElement);
  })
}

$(document).ready(function(){
	
	$('.js-form').submit(function(event){
		event.preventDefault();
		event.stopPropagation();
    enterTwitchAPI();
	});
	
	/*$("#dropDownMenu").on("click", function(event){
		$('.js-results').hide();
		previousResultsZero(state);
	});*/
	
	/*$(".dropDownMenu").on("click", ".dpMenu,.dpOne", function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.js-results').hide();
		previousResultsOne(state);
	});*/
})