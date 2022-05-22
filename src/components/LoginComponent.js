import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createUser } from "../redux/ActionCreators";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createUser: (name, surname) => dispatch(createUser(name, surname)),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.state = {
      name: "",
      surname: "",
      user: this.props.user,
      loading: false,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .createUser(this.state.name, this.state.surname)
        .then(() => {
          this.props.history.push("/quizzes");
        })
        .catch((error) => {})
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    if (this.props.user.isAuthUser) {
      return <Redirect to="/quizzes" />;
    }
    const minMaxLength = (value) => {
      if (value.length < 3 || value.length > 12) {
        return (
          <div className="alert alert-danger" role="alert">
            The username must be between 3 and 12 characters.
          </div>
        );
      }
    };
    const required = (value) => {
      if (!value) {
        return (
          <div className="alert alert-danger" role="alert">
            This field is required!
          </div>
        );
      }
    };
    return (
      <div className="container">
        <div className="row">
          <h4>Please Register to Have Access to the Quizzes</h4>
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <Input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                validations={[required, minMaxLength]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Surname</label>
              <Input
                type="text"
                className="form-control"
                value={this.state.surname}
                onChange={this.onChangeSurname}
                validations={[required, minMaxLength]}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block mm-1"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {this.props.user.error && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.props.user.error.response.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
