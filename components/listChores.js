import React from 'react';
import { StyleSheet, Text, View, ScrollView, Navigator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ListChores extends React.Component {
  static navigationOptions = {
    title: 'Chores',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.header}>Sarah</Text>
          <Ionicons name="ios-people-outline" size={40} color="rgb(0,206,209)" />
        </View>
        <ScrollView>
          <View>
            <Chore what="Sweeping" when="Saturday" />
            <Chore what="Pay Bills" when="Sunday" />
            <Chore what="Laundry" when="Monday" />
            <Chore what="Vacuum" when="Monday" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Chore extends React.Component {
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
