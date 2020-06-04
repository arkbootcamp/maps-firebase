import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD7T0AYBXsstlTHy4AQ8KQtcYI1TdFHYJQ',
  authDomain: 'my-project-94998.firebaseapp.com',
  databaseURL: 'https://my-project-94998.firebaseio.com',
  projectId: 'my-project-94998',
  storageBucket: 'my-project-94998.appspot.com',
  messagingSenderId: '878705652568',
  appId: '1:878705652568:web:91a05bf4e8a786f6972b2d',
  measurementId: 'G-VQ2QT25S2Y',
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
const db = app.database();

export {db};
