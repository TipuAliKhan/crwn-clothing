import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBu5C1zvOQguBMGkSt2-9yn31owmn_TEUM",
    authDomain: "crwn-db-be3a2.firebaseapp.com",
    databaseURL: "https://crwn-db-be3a2.firebaseio.com",
    projectId: "crwn-db-be3a2",
    storageBucket: "crwn-db-be3a2.appspot.com",
    messagingSenderId: "900042178416",
    appId: "1:900042178416:web:f063baa23bfa9e670499b5",
    measurementId: "G-EKX3079ZP9"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
     }

     return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;