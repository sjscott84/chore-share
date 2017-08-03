import * as firebase from 'firebase';

function saveChore(choreObject, assigned, userId){
  firebase.database().ref(userID+'/'+assigned+'/chores').push(choreObject);
}