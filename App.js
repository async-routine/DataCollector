import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
// import { Auth } from 'aws-amplify';

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  email: t.String,
  major: t.String,
  subscribe: t.Boolean
});

const options = {
  fields: {
    name: {
      error: 'Please enter your name'
    },
    email: {
      error: 'Please enter your email address'
    },
    major: {
      error: 'Please enter your major'
    },
    subscribe: {
      label: 'Subscribe to our weekly newsletter?',
    },
  },
};

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      value: null
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    this.setState({ value: null })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User}
          value={this.state.value}
          options={options} 
        />

        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});










