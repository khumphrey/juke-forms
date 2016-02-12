'use strict';

juke.controller('PlayListCtrl',function(playlist, PlayListFactory, $scope, $state, SongFactory, PlayerFactory){
	// console.log(playlist);
	$scope.playlist = playlist;
	SongFactory.fetchAll()
	.then(function(allSongs) {
		$scope.songs = allSongs;
	})


	$scope.addSong = function(playlistId, song) {
		PlayListFactory.addSongToPlayList(playlistId,song)
		.then(function(addedSong){
	        // console.log(addedSong);
			$scope.playlist.songs.push(addedSong);
			$scope.song ="";
		})
	}

  $scope.deleteSong = function(playlistId, songId) {
  	PlayListFactory.deleteSongFromPlayList(playlistId, songId)
	$scope.playlist.songs.forEach(function(song, i) {
		if (song._id === songId) {
			$scope.playlist.songs = $scope.playlist.songs.slice(0,i).concat($scope.playlist.songs.slice(i+1))
		}
	})

  }

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };



})

juke.controller('PlayListCreateCtrl',function(PlayListFactory, $scope, $state){

	$scope.create = function(playlist) {
		PlayListFactory.createPlayList(playlist)
		.then(function(createdPlaylist) {
			$scope.playList.name ="";
			$state.go('playlist', {'playlistId': createdPlaylist._id})
		})
	}

})

juke.controller('PlayListsCtrl',function(PlayListFactory, $scope){

	PlayListFactory.getAll()
	.then(function(allPlayLists) {
		$scope.playLists = allPlayLists;
	})



})