import React, {createContext, useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

import { useNavigate } from 'react-router-dom';

// Google API Client Info
const CLIENT_ID = '963784017356-2cd14mnif6naio0q3d43m0e61emf38e6.apps.googleusercontent.com'; 
const API_KEY = 'AIzaSyAqiKoMTQBP5eg5RrkIue_XvTECNFyC3Zs'; 
const SCOPES = 'https://www.googleapis.com/auth/drive.file'; 

export const AuthContext = createContext();

const Authentication = ({children}) => {
  const [isSignedIn, useSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initiliazeGapiClient = () => {
      const start = () => {
        gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4', 
          ],
        })
        .then(() => {
          const authInstance = gapi.Auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen((signedIn) => {
            setIsSignedIn(signedIn);
          })

        });
      }
    };

    gapi.load('client:auth2', initiliazeGapiClient);
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
      <Authentication.Provider value={{isSignedIn, handleSignIn, handleSignOut}}>
        {children}
      </Authentication.Provider>
      <button onClick={handleSignIn}>Sign In with Google (use UCLA email)</button>
      <button onClick={() => navigate('/')}>Back to Home Page</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Authentication;
