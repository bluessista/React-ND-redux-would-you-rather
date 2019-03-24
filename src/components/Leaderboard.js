import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render () {
        const sorting = (users) => {
            let userlist = Object.values(users).sort((a, b) => {
              let A = Object.keys(a.answers).length + a.questions.length
              let B = Object.keys(b.answers).length + b.questions.length
              return (B - A)
            });
            return userlist;
          }
        return (
            <div>
                <h3 className='center'>Leaderboard</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Questions Asked</th>
                            <th>Questions Answered</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sorting(this.props.users).map((user) => (
                        <tr key={user.id}>
                            <td><img className='avatarImg' src={user.avatarURL} alt={`Avatar of ${user.name}`}/> {user.name}</td>
                            <td>{user.questions.length}</td>
                            <td>{Object.keys(user.answers).length}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    console.log(users)
    return {
      users
    }
}

export default connect(mapStateToProps)(Leaderboard);