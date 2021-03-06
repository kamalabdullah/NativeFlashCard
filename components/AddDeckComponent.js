import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { grey, green, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { addNewDeck } from '../utils/_DATA';

export class AddDeckComponent extends Component {

  state = {
    name: '',
  }

  handleChange = (name) => {
    this.setState({ name });
  }

  handleSubmit = () => {
    this.props.addDeck(this.state.name);
    addNewDeck(this.state.name);
    this.setState({ name:'' });
    this.props.navigation.navigate('DeckCard', { 
      title: this.state.name
    })
  }

  render() {
    const disabled = (this.state.name === '') ? true : false
    return (
      <View style={styles.wrapper}>
        <View style={{ height: 60 }} />
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Deck Name: </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <TextInput  style={styles.input}
                      placeholder="Deck Name*"
                      autoFocus={true}
                      returnKeyType="done"
                      value={this.state.name}
                      onChangeText={this.handleChange}
                      onSubmitEditing={this.handleSubmit}/>
        </View>
        <TouchableOpacity style={[styles.submitBtn, disabled && styles.btnDisabled]} onPress={this.handleSubmit} disabled={disabled && disabled}>
          <Text style={[ styles.btnText ]}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect( null, { addDeck })(AddDeckComponent);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16
  },
  label: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: white,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    fontSize: 20,
    height: 50,
    marginBottom: 0
  },
  submitBtn: {
    height: 50,
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: green
  },
  btnText: {
    color: white,
    fontSize: 20
  },
  btnDisabled: {
    backgroundColor: '#ccc'
  }
});