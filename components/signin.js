import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login to Chore Share</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput ref='username' style={styles.input} />{/*By default TextInput has no default styling*/}
        {/*<TextInput ref='username' onFocus={this._inputFocused.bind(this, 'username')} style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>{/*By default TextInput has no default styling*/}
        <Text style={styles.label}>Password</Text>
        <TextInput ref='username' style={styles.input} />
        {/*<TextInput ref='password' onFocus={this._inputFocused.bind(this, 'password')}secureTextEntry={true} style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>*/}
        <Button onPress={() => navigate('ListChores')} title="Sign In" />
      </View>
    );
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
