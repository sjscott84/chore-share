import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ListView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

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
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Chore what={rowData[0]} when={rowData[1]} key={rowData[2]} />}/>
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
}

class Chore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key: this.props.key
    }
  }
  render() {
    return (
      <View style={styles.chore}>
        <Text>{this.props.what}</Text>
        <Text>{this.props.when}</Text>
      </View>
    );
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
