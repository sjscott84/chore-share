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
import ChoreDetail from './components/chore';
import EditChore from './components/editChore';

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
    this.state = {
      user: null
    }
  }

  componentWillMount(){
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        this.setState({user: user})
        //this.props.navigation.navigate('ListChores');
      }
    });
  }

  render() {
    if(this.state.user != null){
      return <AuthRoutes />
    }
    return <RoutesConfig />
  }
}

const RoutesConfig = StackNavigator({
  SignIn: {screen: SignIn},
  ListChores: { screen: ListChores},
  Family: {screen: Family},
  AddChore: {screen: AddChore},
  ChoreDetail: {screen: ChoreDetail},
  EditChore: {screen: EditChore}
});

const AuthRoutes = StackNavigator({
  ListChores: { screen: ListChores},
  Family: {screen: Family},
  AddChore: {screen: AddChore},
  ChoreDetail: {screen: ChoreDetail},
  EditChore: {screen: EditChore}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
