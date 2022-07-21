// Example of Spotify URI ==> spotify:track:6p97hkQab7XlZFLRI8OO1B
const clientId = "34e952052f3f4f479a6c65a59156d860"; // Change to your Client ID.
// const redirectUri = 'http://localhost:3000/';
const redirectUri = "http://kiatbordin-jammming.netlify.app"; //  Change to your redirect uRL.

let accessToken ;

const Spotify = {

    getAccessToken() {
        if(accessToken) { // do works if accessToken has already set. 
            return accessToken;
        }
        // This tasks below will check for accessToken match.
        // Check the accessToken and Expired-in from the current opening uRL.
        // using window.location.href will give you a current url string that you're opening.

        // Example of returned uRL
        // https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if( accessTokenMatch && expiresInMatch ) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]); // Using Number's Method to convert to number type

            //Tasks below will Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired

            // Set timeout using number of seconds from expiresIn to clear the accessToken value.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            //  history.pushState below add histories entries and clear all values in the uRL
            //  Example of uRL result after pushstates below ==> https://example.com/
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            // Will redirect to your redirect uRL in case you don't have an accessToken
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            // alert(jsonResponse);
            return jsonResponse.tracks.items.map( track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name,trackUris){
        if(!name || !trackUris.length) { 
            return 
        }
        const accessToken = Spotify.getAccessToken(); // Get current user access token (at the time we saved.)
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId ;

        // Make a request that returns the user’s Spotify username and get the user's ID.
        return fetch("https://api.spotify.com/v1/me", { headers: headers })
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            userId = jsonResponse.id;
            return fetch(
              //  create a new playlist in the user's account and return back the playlist id
              `https://api.spotify.com/v1/users/${userId}/playlists`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: name }),
              }
            )
              .then((response) => response.json())
              .then((jsonResponse) => {
                const playlistId = jsonResponse.id;
                //  create a new playlist with the track URIs in the user's account and return back the playlist id
                return fetch(
                  `https://api.spotify.com/v1/users/{${userId}}/playlists/${playlistId}/tracks`,
                  {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ uris: trackUris }),
                  }
                );
              });
          });

    }
};

export default Spotify;
