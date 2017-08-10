import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class ChoreDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.uid,
      id: '',
      who: '',
      what: '',
      when: ''
    }
  }

  componentWillMount(){
    const { state } = this.props.navigation;
    //this.setState({id: state.params.id});
    firebase.database().ref(this.state.userId + '/' + state.params.id).once('value')
    .then(function(snapshot) {
      this.setState({
        id: state.params.id,
        who: snapshot.val().who,
        what: snapshot.val().what,
        when: snapshot.val().when,
      })
    }.bind(this));
  }

  static navigationOptions = {
    title: 'Chore Details',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.commands}>
          <Text>Chore:</Text>
          <Text>{this.state.what}</Text>
        </View>
        <View style={styles.commands}>
          <Text>Assigned To:</Text>
          <Text>{this.state.who}</Text>
        </View>
        <View style={styles.commands}>
          <Text>Due:</Text>
          <Text>{this.state.when}</Text>
        </View>
        <View style={styles.commands}>
          <Button onPress={this._edit.bind(this)} title="Edit" />
          <Button onPress={this._delete.bind(this)} title="Delete" />
        </View>
      </View>
    );
  }

  _edit(){
    this.props.navigation.navigate('EditChore', {who: this.state.who, what: this.state.what, when: this.state.when, id: this.state.id});
  }

  _delete(){
    firebase.database().ref(this.state.userId + '/' + this.state.id).remove();
    this.props.navigation.goBack();
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  commands: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }
});
