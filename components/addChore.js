import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase';

export default class AddChore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      what: 'Clean Bathroom',
      who: 'Sarah',
      when: 'Sunday'
    }
  }
  static navigationOptions = {
    title: 'Add a Chore',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>What</Text>
        <TextInput ref='what' style={styles.input} onChangeText={(text) => this.setState({what: text})} value={this.state.what}/>
        <Text style={styles.label}>Who</Text>
        <TextInput ref='who' style={styles.input} onChangeText={(text) => this.setState({who: text})} value={this.state.who}/>
        <Text style={styles.label}>When</Text>
        <TextInput ref='when' style={styles.input} onChangeText={(text) => this.setState({when: text})} value={this.state.when}/>
        <Button onPress={this._onPress.bind(this)} title="Add" />    
      </View>
    );
  }

  _onPress(){
    userId = firebase.auth().currentUser.uid
    console.log(userId)
    firebase.database().ref(userId).push({
      what: this.state.what,
      who: this.state.who,
      when: this.state.when
    });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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