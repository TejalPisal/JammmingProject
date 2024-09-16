const clientId = 'c94185ddc90c4a759cf0efb62cd635bb';
const redirectUri = 'https://www.tejalJammmingProject.surge.sh';

let accessToken = '';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Extract access token from URL
        const urlParams = window.location.href.match(/access_token=([^&]*)/);
        const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (urlParams && expiresIn) {
            accessToken = urlParams[1];

            // Clear the access token after it expires
            window.setTimeout(() => accessToken = '', Number(expiresIn[1]) * 1000);

            // This will clear the URL parameters to avoid parsing them again
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        // If no access token, redirect for authentication
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = authUrl;
    },

    async search(term) {
        const accessToken = this.getAccessToken(); // Get access token here
        const headers = { Authorization: `Bearer ${accessToken}` };

        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        try {
            const response = await fetch(searchUrl, { headers });
            const jsonResponse = await response.json();

            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        } catch (error) {
            console.error('Failed to search:', error);
        }
    },

    async savePlaylist(playlistName, trackUris) {
        // Check if playlist name or track URIs are missing
        if (!playlistName || !trackUris.length) {
            return; // Exit if arguments are invalid
        }

        // Get the user's access token
        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        // Getting  user's Spotify ID
        const userIdResponse = await fetch('https://api.spotify.com/v1/me', { headers });
        const userIdJson = await userIdResponse.json();
        const userId = userIdJson.id;

        // Creating a new playlist in the user's account
        const createPlaylistResponse = await fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: playlistName, 
                    public: true 
                })
            }
        );
        const createPlaylistJson = await createPlaylistResponse.json();
        const playlistId = createPlaylistJson.id;

        //Add tracks to the newly created playlist
        await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    uris: trackUris 
                })
            }
        );
    }
};

export default Spotify;
