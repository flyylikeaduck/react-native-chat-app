import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'Becca';
const CHANNEL = 'Reactivate';

export default class App extends React.Component {
  state = {messages: []};

  componentDidMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  render() {
    const {messages} = this.state;

    return (
      <View style={styles.container}>
         <FlatList data={messages} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABD6D9',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
    color: 'steelblue'
  },
  message: {
    fontSize: 18,
    color: '#6F7919',
  },
});
