import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Logo from './assets/logo.png';
import EmailIcon from './assets/email.png';
import PasswordIcon from './assets/password.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  performLogin = async () => {
    const {email, password} = this.state;
    const {navigation} = this.props;

    try {
      this.setState({loading: true});
      const req = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
      });
      const resp = await req.json();

      const {token} = resp;
      if (token) {
        //save token in storage
        await AsyncStorage.setItem('token', token); //  Can the person utilize local storages?? Yeah
        //navigate to profile screen
        navigation.replace('profile', {token}); // Can the person pass data between screens?? Yeah
      } else {
        //error logging in
        Alert.alert('Error', 'Email or password is incorrect!');
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={Logo}
            style={{width: 250, height: 140, marginTop: 150}}
          />
          <View
            style={{
              width: '90%',
              marginTop: 30,
            }}>
            <View style={styles.inputContainer}>
              <Image source={EmailIcon} style={styles.iconStyles} />
              <TextInput
                style={{
                  flex: 1,
                  height: 50,
                }}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize={'none'}
                onChangeText={email => this.setState({email})}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image source={PasswordIcon} style={styles.iconStyles} />
              <TextInput
                style={{
                  flex: 1,
                  height: 50,
                }}
                placeholder="Password"
                secureTextEntry
                onChangeText={password => this.setState({password})}
              />
            </View>

            <TouchableOpacity
              onPress={this.performLogin}
              disabled={loading}
              style={styles.buttonStyles}>
              <Text style={{color: 'white', fontSize: 18}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  iconStyles: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  buttonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30363B',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
});

export default Login;
