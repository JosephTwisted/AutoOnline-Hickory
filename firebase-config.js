script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAwr2YfH0y7hCItKEKTncBECvXoV2KxlCM',
    authDomain: 'hickoryonline-7f460.firebaseapp.com',
    projectId: 'hickoryonline-7f460',
    storageBucket: 'hickoryonline-7f460.appspot.com',
    messagingSenderId: '992179493799',
    appId: '1:992179493799:web:c81273cb5859e7575cb482'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Add error handling for Firebase initialization
  if (!app) {
    console.error('Error initializing Firebase');
  }
/script