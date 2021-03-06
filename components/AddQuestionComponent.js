import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { grey, green, white } from '../utils/colors';
import { addQuestionAction } from '../actions/index';
import { addQuestionAPI } from '../utils/_DATA';

export class AddQuestionComponent extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    this.props.addQuestionAction(this.props.title, {
      question: this.state.question, 
      answer: this.state.answer
    });
    addQuestionAPI(this.props.title, {
      question: this.state.question, 
      answer: this.state.answer
    });
    this.props.navigation.navigate('DeckCard', { 
      title: this.props.title
    })
  }
  render() {
    const disabled = (this.state.question === '' || this.state.answer === '') ? true : false
    
    return (
      <View style={styles.wrapper}>
        <View style={{ height: 60 }} />
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Question: </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <TextInput  style={[styles.input, {marginBottom: 16}]}
                      placeholder="Question...*"
                      autoFocus={true}
                      returnKeyType="done"
                      value={this.state.question}
                      onChangeText={(value) => this.setState({question: value})}
                      onSubmitEditing={this.handleSubmit}/>
          <TextInput  style={styles.input}
                      placeholder="Answer...*"
                      autoFocus={true}
                      returnKeyType="done"
                      value={this.state.answer}
                      onChangeText={(value) => this.setState({answer: value})}
                      onSubmitEditing={this.handleSubmit}/>            
        </View>
        <TouchableOpacity style={[styles.submitBtn, disabled && styles.btnDisabled]} onPress={this.handleSubmit} disabled={disabled && disabled}>
          <Text style={[ styles.btnText ]}>
            Submit Question
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  const title = route.params.title || undefined;
  return {
    title
  };
};
export default connect(mapStateToProps, { addQuestionAction })(AddQuestionComponent);

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
    height: 50
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