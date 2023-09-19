export function getSpotifyAccessToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) return token;
  
      const hashParams = new URLSearchParams(window.location.hash.substr(1));
      const newToken = hashParams.get('access_token');
      const expires = hashParams.get('expires_in') || '';
  
      if (newToken) {
        localStorage.setItem('access_token', newToken);
        localStorage.setItem('expires', expires);
        history.replaceState({}, document.title, window.location.pathname);
        return newToken;
      }
  
      return null;
    }
    return null; 
  }