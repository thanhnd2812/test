import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, Card, CardSection, Input, Spinner } from './common';
import { validateEmail } from '../utils';
import { CURRENT_USER } from './constants';

class SignUpForm extends Component {
  state = { email: '', password: '', confirmPassword: '', error: '', loading: false };

  onButtonPress() {
    const { email, password, confirmPassword } = this.state;

    this.setState({ error: '', loading: true });
    if (email && password && confirmPassword && (password === confirmPassword) && validateEmail(email)) {
      this.onSignUpSuccess();
    } else {
      this.onValidateFail();
    }
  }

  onSignUpSuccess() {
    setTimeout(() => {
      const user = { email: this.state.email, password: this.state.password };
      AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user))
        .then(() =>  Actions.pop())
        .catch(() => this.setState({ 
          error: 'Sign up failed.', 
          loading: false 
        }));
    }, 3000);
  }

  onValidateFail() {
    setTimeout(() => {
      this.setState({ 
        error: 'Please enter email, password and confirm password.', 
        loading: false 
      });
    }, 3000);
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Sign Up
      </Button>
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
            label="Password"
            placeholder="enter your password"
            secureTextEntry
          />
        </CardSection>

        <CardSection>
          <Input 
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            label="Confirm"
            placeholder="confirm your password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
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

export default SignUpForm;
