import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import { WeatherWidget } from 'react-native-weather';
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAa8LL5i7gX2OtHuHfxc_ZJe7PMXXmi8EQ",
  authDomain: "datacollector-18b4f.firebaseapp.com",
  databaseURL: "https://datacollector-18b4f.firebaseio.com",
  projectId: "datacollector-18b4f",
  storageBucket: "datacollector-18b4f.appspot.com",
  messagingSenderId: "622640505219"
});
var db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings);

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

  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    db.collection("users").add({
      name: value.name,
      email: value.email,
      major: value.major,
      subscribe: value.subscribe
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.setState({ value: null })
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      },
    });
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

        <WeatherWidget
          api={"4dc6527f121fa835f86ad34a1ae3eb7a"}
          lat={"33.748997"}
          lng={"-84.387985"}
        />
      </View>


    );
  }
}
