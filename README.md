### FirstCapStone_Twitch
* uses AJAX calls to access twitch API and retrieve information about the streams based on the video game the user searches(specific name for game search)and displays 
the first three and last three streams of the game the user searches.
* Has a drop down menu where the search results are logged, max amount is three, will log the last three search results.
* When one of the options is selected the selected option will be displayed on the page. Working previous menu. 
* Uses state object model for storing of in-app information allows for easier manipulation.
* Allows users to search for a game and find the most popular and least popular streams in means to first three and last three.
* Allows users to watch six different streams.
* Allows users to go through previous searches and pull up info based on selected option.

* Potential features to come: wider search capability, add amount of followers each streamer has, amount of viewers each streamer currently has. Will continue to work on this to improve. 

### AJAX call and state object the project works through vv

```
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
     state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name,
     data.streams[2].channel.name, data.streams[99].channel.name, data.streams[98].channel.name, data.streams[97].channel.name]);
   }else{
   state.prevStream.push([data.streams[0].channel.game, data.streams[0].channel.name, data.streams[1].channel.name,data.streams[2].channel.name, data.streams[prevSize-1].channel.name, data.streams[prevSize-2].channel.name,  data.streams[prevSize3].channel.name]);
    }
    var query = $('.js-input').val();
    state.currentStream[query] = data;// line 27 sets the search value to query, line 28 adds the query
    variable into the current stream and sets it to data.
    renderResults(data);
 }
 });
}
```
