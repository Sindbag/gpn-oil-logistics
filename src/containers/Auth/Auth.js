import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRepoPage } from '../../actions';
import {userAuth} from "../../actions/index"; // eslint-disable-line
import styles from './Auth.scss'; // eslint-disable-line

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleAuthClick(e) {
    e.preventDefault();
    this.props.userAuth(this.state.password === '123', this.state.username);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }


  render() {
    return (
      <div className="login-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
        }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            {this.props.error && <Message>{this.props.error}</Message>}
            <Form size="large" onSubmit={this.handleAuthClick}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />

                <Button color="teal" fluid size="large">Войти</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Auth.propTypes = {
  userAuth: PropTypes.func.isRequired,
  username: PropTypes.string,
  error: PropTypes.string
};

function mapStateToProps(state) {
  const { username, error } = state.authUser;
  return {
    username,
    error
  };
}

export default connect(mapStateToProps, {
  loadRepoPage,
  userAuth,
})(Auth);
