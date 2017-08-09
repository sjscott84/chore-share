import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class ChoreDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      who: '',
      what: '',
      when: ''
    }
  }

  componentWillMount(){
    const { state } = this.props.navigation;
    //this.setState({id: state.params.id});
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(userId + '/' + state.params.id).once('value')
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
        <Text>{this.state.id}</Text>
        <Text>{this.state.who}</Text>
        <Text>{this.state.what}</Text>
        <Text>{this.state.when}</Text>
        <Button onPress={() => this.props.navigation.navigate('AddChore')} title="Add a Chore" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
