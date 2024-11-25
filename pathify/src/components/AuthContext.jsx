import React, {createContext, useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

// Google API Client Info
const CLIENT_ID = '963784017356-2cd14mnif6naio0q3d43m0e61emf38e6.apps.googleusercontent.com'; 
const API_KEY = 'AIzaSyAqiKoMTQBP5eg5RrkIue_XvTECNFyC3Zs'; 
const SCOPES = 'https://www.googleapis.com/auth/drive.file'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children })=> {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('calling')
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8080/auth/verify-token' , {
        credentials : 'include'
      })
      // .then((response) => response.json())
      .then((data) => data.json())
      .then((data) => { console.log(data); if (data.success) setUser(data.user); })
      .catch((err) => { console.log('Token verification failed: ', err); })
      .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  }

  const logout = (token) => {
    localStorage.removeItem('token', token);
    setUser(null);
  }

  return(
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      { children }
    </AuthContext.Provider>
  )

};


// export const AuthProvider = ({ children }) => {
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   useEffect(() => {
//     const initializeGapiClient = () => {
//       gapi.client
//         .init({
//           apiKey: API_KEY,
//           clientId: CLIENT_ID,
//           scope: SCOPES,
//         })
//         .then(() => {
//           const authInstance = gapi.auth2.getAuthInstance();
//           setIsSignedIn(authInstance.isSignedIn.get());
//           authInstance.isSignedIn.listen((signedIn) => {
//             setIsSignedIn(signedIn);
//           });
//         })
//         .catch((error) => {
//           console.error('Error initializing GAPI client', error);
//         });
//     };

//     gapi.load('client:auth2', initializeGapiClient);
//   }, []);

//   const handleSignIn = () => {
//     gapi.auth2.getAuthInstance().signIn();
//   };

//   const handleSignOut = () => {
//     gapi.auth2.getAuthInstance().signOut();
//   };

//   return (
//     <AuthContext.Provider value={{ isSignedIn, handleSignIn, handleSignOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
