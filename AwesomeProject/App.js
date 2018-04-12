/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

const connectionStatusModule = NativeModules.ConnectionStatusModule;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  state = { networkName: null, isConnected: false }
  componentDidMount() {
    this.getNetWorkState();
  }

  getNetWorkState = () => {
    connectionStatusModule.checkConnectionStatus(this.getInfo)
    setTimeout(
      () => this.getNetWorkState(),
      3000
    )
  }

  getInfo = ( networkName, isConnected) => this.setState({ networkName, isConnected });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {'Bienvenido a Native Modules!\nComprobando estado de red...'}
        </Text>
        <Text style={styles.instructions}>
          { this.state.networkName }
        </Text>
        <Text style={styles.instructions}>
          { `STATUS: ${this.state.isConnected ? 'Conectado!' : 'Desconectado!'}` }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
