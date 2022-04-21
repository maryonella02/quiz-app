import React, { useState }from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createUser } from '../redux/ActionCreators';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [name, setUserName] = useState();
    const [surname, setPassword] = useState();
    const [error, setError] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const userError = useSelector(state => state.user, shallowEqual);

    const check = (value) => {
        return /[-A-Za-z0-9]{3,32}/.test(value);
    }
    const handleClick = () => {
        if (check(this.state.name) &&
            check(this.state.surname)) {
            dispatch(createUser(name, surname))
        }
        else {
            setError("Must contain only characters, numbers, underscore or hyphen");
        }
        if (userError.error == null) {
            routeChange();
        }
    }

    const routeChange = () => {
        let path = "/home";
        history.push(path);
    }
    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleClick} >
                <label >
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <div className="alert alert-danger d-flex align-items-center" role="alert" onClick={() => setError(null)}>
                <div>
                    {userError.error || error}
                </div>
            </div>

        </div>
    )
}


