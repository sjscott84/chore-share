import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Family extends React.Component {
  static navigationOptions = {
    title: 'Famly',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Family</Text>
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
