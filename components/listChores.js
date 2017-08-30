import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ListView, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import moment from 'moment';
import { ModifyDate } from '../libraries/helperFunctions';

export default class ListChores extends React.Component {
  constructor(props){
    super(props)
    //this.itemsRef = firebase.database().ref();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentWillMount() {
    userId = firebase.auth().currentUser.uid
    firebase.database().ref(userId).once('value')
    .then(function(snap) {
      snap.forEach((child) => {
        var today = moment();
        var schedule = moment(child.val().when, "dddd DDth mmmm YYYY");
        if(today.diff(schedule) > 0){
          if(child.val().repeat === "none") {
            firebase.database().ref(userId + '/' + child.key).remove();
          } else if (child.val().repeat === "week") {
            var addWeek = schedule.add(1, 'week').format();
            var updateWeek = moment(addWeek).format("dddd Do MMMM YYYY");
            firebase.database().ref(userId + '/' + child.key).update({
              when: updateWeek
            });
          } else if (child.val().repeat === "fortnight") {
            var addWeek = schedule.add(2, 'week').format();
            var updateWeek = moment(addWeek).format("dddd Do MMMM YYYY");
            firebase.database().ref(userId + '/' + child.key).update({
              when: updateWeek
            });
          } else {
            var addMonth = schedule.add(1, 'month').format();
            var updateMonth = moment(addMonth).format("dddd Do MMMM YYYY");
            firebase.database().ref(userId + '/' + child.key).update({
              when: updateMonth
            });
          }
        }
      });
    });
  }

  componentDidMount() {
    //this.itemsRef = firebase.database().ref(firebase.auth().currentUser.uid);
    userId = firebase.auth().currentUser.uid
    this._listenForItems(firebase.database().ref(userId));
  }

  static navigationOptions = {
    title: 'Chores',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.header}>Sarah</Text>
          <Ionicons name="ios-people-outline" size={40} color="rgb(0,206,209)" onPress={() => navigate('Family')}/>
        </View>
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => 
          <Chore onPress={this._onPress.bind(this, rowData[2])} what={rowData[0]} when={rowData[1]} id={rowData[2]} /> }/>
      </View>
    );
  }

  _listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push([child.val().what, child.val().when, child.key]);
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  _onPress(id){
    this.props.navigation.navigate('ChoreDetail', {id: id});
  }
}

class Chore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key: this.props.id
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.chore}>
          <Text>{this.props.what}</Text>
          <Text>{this.props.when}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPress(){
    this.props.navigation.navigate('Family');
    console.log('Click');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  chore: {
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
    borderColor: 'rgb(229,234,236)',
    borderWidth: 1,
    padding: 5,
    height: 50
  },
  head: {
    margin: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    color: 'rgb(0,206,209)',
    fontWeight: 'bold',
    fontSize: 30
  }
});
