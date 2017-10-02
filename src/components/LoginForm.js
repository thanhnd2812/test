import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, Card, CardSection, Input, Spinner } from './common';
import { validateEmail } from '../utils';
import { CURRENT_USER } from './constants';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  componentWillMount() {

  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    if (email && password && validateEmail(email)) {
      AsyncStorage.getItem(CURRENT_USER)
        .then((userString) => {
          const user = JSON.parse(userString)
          if (!user) {
            this.setState({ 
              error: 'Please sign up for an account.', 
              loading: false 
            });
            return;
          }
          if (user.email === email && user.password === password) {
            this.onLoginSuccess();
          } else {
            this.onLoginFail();
          }
        })
      
    } else {
      this.onValidateFail();
    }
  }

  onSignUpPress() {
    Actions.signup();
  }

  onLoginSuccess() {
    setTimeout(() => {
      Actions.main();
    }, 3000);
  }

  onLoginFail() {
    setTimeout(() => {
      this.setState({ 
        error: 'Authentication failed.', 
        loading: false 
      });
    }, 3000);
  }

  onValidateFail() {
    this.setState({ 
      error: 'Please enter email and password.', 
      loading: false 
    });
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <CardSection>
          <Spinner size='small' />
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Log in
        </Button>
        <Button onPress={this.onSignUpPress.bind(this)}>
          Sign up
        </Button>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            label="Email"
            placeholder="your@email.com" 
          />
        </CardSection>

        <CardSection>
          <Input 
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            label="password"
            placeholder="enter your password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        {this.renderButton()}
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
