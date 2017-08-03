import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class SignIn extends React.Component {
  constructor(){
    super();
    this.state = {
      email: 's.j.scott84@gmail.com',
      password: 'C228kp3jE'
    }
  };
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login to Chore Share</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput ref='email' style={styles.input} onChangeText={(text) => this.setState({email: text})} value={this.state.email}/>
        <Text style={styles.label}>Password</Text>
        <TextInput ref='password' secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
        <Button onPress={this._onPress.bind(this)} title="Sign In" />
      </View>
    );
  }

  _onPress(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user){
      console.log('Successful login');
      //this.props.navigation.navigate('ListChores');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    this.props.navigation.navigate('ListChores');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingTop: 50,
    paddingBottom: 60,
    fontSize: 24,
    lineHeight: 33,
    margin: 10,
    alignSelf: 'flex-start',
    color:'rgb(52, 73, 76)',
    fontFamily: 'AppleSDGothicNeo-Medium'
  },
  input: {
    height: 40,
    margin: 6,
    marginBottom: 20,
    paddingLeft: 5,
    borderColor: 'rgb(139, 157, 160)',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch'
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 10,
    color: 'rgb(52, 73, 76)',
    alignSelf: 'flex-start',
    fontFamily: 'AppleSDGothicNeo-SemiBold'
  },
});
