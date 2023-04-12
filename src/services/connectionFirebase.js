//biblioteca do firebase
import firebase from 'firebase/compat/app';
//autenticação de email e senha
import 'firebase/compat/auth';
//trabalha com o banco de dados cirado no firebase
import 'firebase/compat/database';


// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCRSfU9GRv6hoVx1WJI9ROsX3rR3wmdgp4",
    authDomain: "dbapporigami.firebaseapp.com",
    projectId: "dbapporigami",
    storageBucket: "dbapporigami.appspot.com",
    messagingSenderId: "471263778369",
    databaseURL: 'https://dbapporigami-default-rtdb.firebaseio.com/',
    appId: "1:471263778369:web:c7544ad4c5ba7b144998c0"
};

if (!firebase.apps.lenght) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;