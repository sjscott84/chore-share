import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';
import * as firebase from 'firebase';

import ListChores from './components/listChores';
import SignIn from './components/signin';
import Family from './components/family';
import AddChore from './components/addChore';

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
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        //this.props.navigation.navigate('ListChores');
      }
    });
  }

  render() {
    return (
      <RoutesConfig />
    );
  }
}

const RoutesConfig = StackNavigator({
  SignIn: {screen: SignIn},
  ListChores: { screen: ListChores},
  Family: {screen: Family},
  AddChore: {screen: AddChore}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
