import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import * as firebase from 'firebase';

import ListChores from './components/listChores';
import SignIn from './components/signin';
import Family from './components/family';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBshI0DN8DmkDTGiq7_Wj1cBAsYnjCtfkk",
    authDomain: "chore-share.firebaseapp.com",
    databaseURL: "https://chore-share.firebaseio.com",
    projectId: "chore-share",
    storageBucket: "chore-share.appspot.com",
    messagingSenderId: "607979940389"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <ChoreShare />
    );
  }
}

const ChoreShare = StackNavigator({
  SignIn: {screen: SignIn},
  ListChores: { screen: ListChores},
  Family: {screen: Family}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
