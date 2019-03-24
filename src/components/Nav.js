import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";

class Nav extends Component {
    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/home' activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        {this.props.authedUser}
                    </li>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            (logout)
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {authedUser, users}
}

export default connect(mapStateToProps)(Nav);