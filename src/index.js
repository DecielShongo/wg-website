import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH7Q9utozvoq2f5EAx5nODFirnxaJN65I",
  authDomain: "wg-website-3e638.firebaseapp.com",
  projectId: "wg-website-3e638",
  storageBucket: "wg-website-3e638.appspot.com",
  messagingSenderId: "21333830902",
  appId: "1:21333830902:web:8e9653862326f3c8b350d7",
  measurementId: "G-GGPLHBVFY4",
  databaseURL: "https://wg-website-3e638-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
const analytics = getAnalytics(cong);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default cong;