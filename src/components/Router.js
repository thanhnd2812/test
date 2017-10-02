import React from "react";
import { AsyncStorage } from "react-native";
import { Scene, Router, Stack, Actions } from "react-native-router-flux";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import AlbumList from "./AlbumList";
import { CURRENT_USER } from "./constants";

const RouterComponent = () => (
  <Router>
    <Scene hideNavBar={true}>
      <Scene key="auth" initial>
        <Scene key="login" component={LoginForm} title="Log In" />
        <Scene key="signup" component={SignUpForm} title="Sign Up" />
      </Scene>
      <Scene key="main">
        <Scene
          key="albumlist"
          component={AlbumList}
          title="Albums"
          onRight={() => {
            AsyncStorage.removeItem(CURRENT_USER);
            Actions.auth();
          }}
          rightTitle="Log Out"
        />
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
