import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

// Google API Client Info
const CLIENT_ID = '963784017356-2cd14mnif6naio0q3d43m0e61emf38e6.apps.googleusercontent.com'; 
const API_KEY = 'AIzaSyAqiKoMTQBP5eg5RrkIue_XvTECNFyC3Zs'; 
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'; 

const Authentication = () => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [
          'https://sheets.googleapis.com/$discovery/rest?version=v4', 
        ],
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      console.log('User signed in');
      // Call API functions here
    });
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('User signed out');
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In with Google</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Authentication;
