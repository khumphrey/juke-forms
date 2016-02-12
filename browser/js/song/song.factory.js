'use strict';

juke.factory('SongFactory', function ($http) {
	var SongFactory = {}
	SongFactory.convert = function (song) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      return song;
       };
    SongFactory.fetchAll = function () {
    	return $http.get('/api/songs')
    	.then(function(allSongs) {
    		return allSongs.data.map(function(el){
    			return SongFactory.convert(el)
    		})
    		

    		//return allSongs.data;
    	})
    }
 return SongFactory;

});
