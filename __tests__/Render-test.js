import 'react-native';
import React from 'react';
import App from '../App';
import SignIn from '../components/signin';
import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('App renders correctly', () => {
  const tree = renderer.create(
    <App  />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sign in renders correctly', () => {
  const tree = renderer.create(
    <SignIn navigation={StackNavigator} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});