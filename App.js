import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';

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

  render() {
    const {messages, typing} = this.state;

    return (
      <View style={styles.container}>
        <FlatList data={messages} renderItem={this.renderItem} />

        <KeyboardAvoidingView style={styles.footer} behavior='padding'>
          <TextInput
            value={typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder='Add your comment'
          />
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
  }
});
