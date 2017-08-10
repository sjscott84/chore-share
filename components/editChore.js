import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker'

export default class EditChore extends React.Component {
  constructor(props){
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      id: state.params.id,
      what: state.params.what,
      who: state.params.who,
      when: state.params.when
    }
  }
  static navigationOptions = {
    title: 'Edit Chore',
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
        <DatePicker
          style={{width: 300}}
          date={this.state.when}
          mode="date"
          placeholder="select date"
          format="dddd Do MMMM"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 6
            },
            dateInput: {
              marginLeft: 40
            }
          }}
          onDateChange={(date) => {this.setState({when: date})}} />
        <Button onPress={this._onPress.bind(this)} title="Update" />
      </View>
    );
  }

  _onPress(){
    userId = firebase.auth().currentUser.uid
    firebase.database().ref(userId+'/'+this.state.id).update({
      what: this.state.what,
      who: this.state.who,
      when: this.state.when
    });
    this.props.navigation.goBack({id: this.state.id});
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
