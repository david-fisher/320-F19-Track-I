import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';


export default function App() {

  return (
    <View style={styles.container}>
      <Image
        source = {require('./assets/orchardWatch.png')}
      />
      <TextInput 
        style = {styles.inputBox}
        placeholder = 'Access Code'
        secureTextEntry = {true}
        keyboardType = 'number-pad'
        textAlign = {'center'}
        placeholderTextColor = {'gray'}
      />
      <Button
        style = {styles.submitButton}
        title = 'Submit'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40, 
    width: Dimensions.get('window').width - 40, 
    borderColor: 'black', 
    borderWidth: 1,
  },
});
