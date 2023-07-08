/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App'; // old one
import App from './src/App'; // new one one

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
