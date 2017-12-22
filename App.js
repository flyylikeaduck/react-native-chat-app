import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';
import ReversedFlatList from 'react-native-reversed-flat-list';

const NAME = 'Becca';
const CHANNEL = 'Reactivate';

export default class App extends React.Component {
  state = {
    messages: [],
    typing: '',
  };

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

  async sendMessage() {

    await send({
      channel: CHANNEL,
      sender: NAME,
      message: this.state.typing
    });

    this.setState({
      typing: ''
    });
  }

  render() {
    const {messages, typing} = this.state;

    return (
      <View style={styles.container}>
        <ReversedFlatList data={messages} renderItem={this.renderItem} />

        <KeyboardAvoidingView style={styles.footer} behavior='padding'>
          <TextInput
            value={typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder='Add your comment'
          />
          <TouchableOpacity onPress={this.sendMessage.bind(this)}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  footer: {
    backgroundColor: '#eee',
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: '#255436',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});
