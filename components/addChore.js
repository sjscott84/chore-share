import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch, NativeAppEventEmitter, Picker } from 'react-native';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-datepicker';
import Notifications from 'expo';
import { ModifyDate } from '../libraries/helperFunctions';
//import Permissions from 'expo';
//import RNCalendarReminders from 'react-native-calendar-reminders';
import moment from 'moment';

export default class AddChore extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      what: 'Clean Bathroom',
      who: 'Sarah',
      when: '',
      time: '',
      repeat: 'none',
      notify: false
    }
  }

  componentWillMount() {
    Expo.Notifications.addListener(console.log('We are listening'));
    const currentDate = new Date();
    this.setState({when: moment(currentDate).format("dddd Do MMMM YYYY"), time: moment(currentDate).format("HH:mm") })
  }

  async componentDidMount() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      console.log('We have permission!');
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
        <Text style={styles.label}>Date</Text>
        <DatePicker
          style={{width: 300}}
          date={this.state.when}
          mode="date"
          placeholder="select date"
          format="dddd Do MMMM YYYY"
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
          onDateChange={(date) => {this.setState({when: date, date: date})}} />
        <Text style={styles.label}>Time</Text>
        <TimePicker
          style={{width: 300}}
          date={this.state.time}
          mode="time"
          placeholder="select date"
          format="HH:mm"
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
          onDateChange={(date) => {this.setState({time: date})}} />
        <Text style={styles.label}>Repeat?</Text>
        <Picker
          selectedValue={this.state.repeat}
          onValueChange={(itemValue, itemIndex) => this.setState({repeat: itemValue})}>
          <Picker.Item label="No repeat" value="none" />
          <Picker.Item label="Weekly" value="week" />
          <Picker.Item label="FortNightly" value="fortnight" />
          <Picker.Item label="Monthly" value="month" />
        </Picker>
        <View style={styles.commands}>
          <Text>Turn on notification?</Text>
          <Switch onValueChange = {this._toggleSwitch.bind(this)} value = {this.state.notify}/>
        </View>
        <Button onPress={this._onPress.bind(this)} title="Add" />
      </View>
    );
  }

  _toggleSwitch(){
    if(this.state.notify !== true){
      this.setState({notify: true});
    }else{
      this.setState({notify: false});
    }
  }

  _onPress(){
    userId = firebase.auth().currentUser.uid
    if(this.state.notify){
      const localNotification = {
        title: 'Chore Reminder',
        body: this.state.what
      };
      let date = ModifyDate(this.state.when, this.state.time);
      let dateString = date.toString();
      firebase.database().ref(userId).push({
        what: this.state.what,
        who: this.state.who,
        when: this.state.when,
        notify: this.state.notify,
        notifyWhen: dateString,
        repeat: this.state.repeat
      });
      const schedulingOptions = {
        time: date
      };
      Expo.Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    } else {
      firebase.database().ref(userId).push({
        what: this.state.what,
        who: this.state.who,
        when: this.state.when,
        notify: this.state.notify,
        repeat: this.state.repeat
      });
    }
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
  commands: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
});
