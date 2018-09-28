var updateDisplay = (title, artist, imageSrc) => {
    $('#title').text(title)
    $('#artist').text(artist)
    $('#cover-art').empty()
    $('#cover-art').append(`<img height=400 width=400 src=${imageSrc}></img>`)
}

window.onSpotifyWebPlaybackSDKReady = () => {
    // To obtain a token, go here and click "Get your web playback sdk access token"
    // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
    const token = 'ACCESS_TOKEN'
    const player = new Spotify.Player({
        name: 'Hueify',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('player_state_changed', ({
        position,
        duration,
        track_window: { current_track }
    }) => {
        updateDisplay(
            current_track.name,
            current_track.artists[0].name,
            current_track.album.images[2].url
        )

        console.log('Currently Playing', current_track);
        console.log('Position in Song', position);
        console.log('Duration of Song', duration);
    });

    // Connect to the player!
    player.connect();
};