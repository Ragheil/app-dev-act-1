import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CreateAccountScreen = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.image} />
        <Text style={styles.title}>PigEx</Text>
      </View>
      <Text style={styles.createAccountText}>Create your account</Text>
      <TextInput placeholder="Fullname" style={styles.input} />
      <TextInput placeholder="Email Address" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} />
      <Text style={styles.orText}>or continue with</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FADBD8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  createAccountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
  },
  link: {
    color: '#0000EE',
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default CreateAccountScreen;
