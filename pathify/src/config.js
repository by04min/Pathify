module.exports = {
    google: {
      clientID: '963784017356-2cd14mnif6naio0q3d43m0e61emf38e6.apps.googleusercontent.com',
      clientSecret: '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',
      redirectURI: 'http://localhost:5173/callback',
    },
  };


/*
const CLIENT_ID = '963784017356-2cd14mnif6naio0q3d43m0e61emf38e6.apps.googleusercontent.com'; // Replace with your client ID
const API_KEY = 'AIzaSyAqiKoMTQBP5eg5RrkIue_XvTECNFyC3Zs'; // Replace with your API key
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'; // Or modify the scope as needed

const App = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          scope: SCOPES,
        })
        .then(() => {
          // Handle successful initialization
          console.log('Google API initialized');
        })
        .catch((error) => {
          console.error('Error initializing Google API', error);
        });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      <button onClick={handleAuthClick}>Sign In with Google</button>
      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
};
*/