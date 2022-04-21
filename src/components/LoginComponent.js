import React, { Component } from 'react';
import Alert from "@mui/material/Alert";
import { Redirect } from 'react-router-dom';
//import { Form, Field } from "react-final-form";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


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
            loading: false
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
        const { dispatch, history } = this.props;
        if (this.checkBtn.context._errors.length === 0) {
           this.props.createUser(this.state.name, this.state.surname)
                .then(() => {
                    <Redirect to="/home" />
                    window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
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
            return <Redirect to="/home" />;
        }
        const required = value => {
            if (!value) {
                return (
                    <div className="alert alert-danger" role="alert">
                        This field is required!
                    </div>
                );
            }
        };
        const error = () => {
            if (this.props.user.error) {
                return (
                    <Alert severity="error" sx={{ mt: 1 }}>
                        {this.props.user.error.response.message}
                    </Alert>
                );
            } else {
                return <div></div>;
            }
        };
        return (
            <div className="col-md-12">
        <div className="card card-container">
                <h1>Please Log In</h1>
                {error()}
                <Form
                    onSubmit={this.handleLogin}
                    ref={c => { this.form = c; }}
                >
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Surname</label>
                        <Input
                            type="text"
                            className="form-control"
                            value={this.state.surname}
                            onChange={this.onChangeSurname}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {this.props.user.error&& (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.props.user.error.response.message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => { this.checkBtn = c; }}
                    />
                </Form>

               
            </div>
            </div>
        );
    }

}

export default Login;
