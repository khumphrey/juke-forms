'use strict';

juke.factory('PlayListFactory',function($http,SongFactory){
	var cachedPlayList = [];
	var PlayListFactory ={};

	PlayListFactory.createPlayList = function(playlist){
		return $http.post('/api/playlists/', playlist)
		.then(function(response){
			cachedPlayList.push(response.data);
			return response.data;
		})
	}

	PlayListFactory.getAll = function() {
		return $http.get('/api/playlists')
		.then(function(response) {
			angular.copy(response.data, cachedPlayList);
			return cachedPlayList;
		})
	}


	PlayListFactory.fetchById = function(id) {
		return $http.get('/api/playlists/'+id)
		.then(function(playlist) {
			// angular.copy(response.data, cachedPlayList);
			//console.log('festched song', SongFactory.convert(playlist.data));
			 playlist.data.songs.forEach(function(song) {
				return SongFactory.convert(song)
			})
			 return playlist.data;
			
		})
	}

	PlayListFactory.addSongToPlayList = function(playlistId, song) {
		return $http.post('/api/playlists/'+playlistId+'/songs', {song:song})
		.then(function(addedSong) {
			return SongFactory.convert(addedSong.data)
			
		})

	}

	PlayListFactory.deleteSongFromPlayList = function(playlistId, songId) {
		$http.delete('/api/playlists/'+playlistId+'/songs/'+ songId)
	}

	 return PlayListFactory;

})