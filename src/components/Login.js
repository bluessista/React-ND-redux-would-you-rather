import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser, clearAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
    state = {
        userSelected: false,
        userId: "",
        loginComplete: false
    }

    componentDidMount() {
        this.props.dispatch(clearAuthedUser(this.state.userId));
    }

    render() {
        const { location } = this.props;
        const lastLocation = location.state;
        const { loginComplete, userId, userSelected } = this.state;

        if (loginComplete && lastLocation) {
            return <Redirect to={lastLocation} />;
        } else if (loginComplete) {
            return <Redirect to="/home" />;
        }

        const loginUser = () => {
        if (!userSelected) {
            alert("Please chose a user to login");
        } else {
            this.setState({ loginComplete: true });
            this.props.dispatch(setAuthedUser(userId));
        }
        }

        const handleSelect = (e) => {
            this.setState({ userSelected: true, userId: e.target.value })
        }

        return (
            <div className="login">
                <h3 className='center'>to login chose a user</h3>
                
                <div className="select-wrapper">
                    <select
                        defaultValue={""}
                        onChange={handleSelect.bind(this)}
                    >
                        <option value="" disabled>
                            Chose user...
                        </option>
                        {this.props.users.map(user => (
                            <option key={user.id}>{user.id}</option>
                        ))}
                    </select>
                    <button
                        onClick={loginUser.bind(this)}
                        className="btn"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    console.log(users)
    return {
        users: Object.values(users)
    };
}

export default connect(mapStateToProps)(Login);