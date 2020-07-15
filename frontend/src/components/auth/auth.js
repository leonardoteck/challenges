import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import '../form/form.css';
import authService from '../../services/auth';
import { httpError } from '../../services/alert';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  register = async () => {
    try {
      const { loggedin } = this.props;
      await authService.register(this.state);
      loggedin();
    } catch (error) {
      httpError();
    }
  }

  submit = async (event) => {
    event.preventDefault();
    try {
      const { loggedin } = this.props;
      await authService.signIn(this.state);
      loggedin();
    } catch (error) {
      httpError();
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Modal>
        <div className="box" augmented-ui="tl-clip br-clip exe">
          <form onSubmit={this.submit} className="form-container">
            <div className="row">
              <div className="field">
                <label>E-mail</label>
                <input
                  value={email}
                  type="email"
                  required
                  onChange={event => this.setState({ email: event.target.value })}
                />
              </div>
              <div className="field" style={{ marginLeft: '4%' }}>
                <label>Senha</label>
                <input
                  value={password}
                  type="password"
                  required
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </div>
            </div>

            <div className="row">
              <button
                className="button"
                augmented-ui="tl-clip br-clip exe"
                type="reset"
                onClick={this.register}
              >
                Registrar
              </button>
              <button
                className="button"
                augmented-ui="tl-clip br-clip exe"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

Auth.propTypes = {
  loggedin: PropTypes.func.isRequired,
};
