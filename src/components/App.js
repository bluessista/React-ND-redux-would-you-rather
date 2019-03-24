import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';

// components
import Home from './Home';
import QuestionView from './QuestionView';
import Nav from './Nav';
import Login from './Login';
import AddQuestion from './AddQuestion';
import Leaderboard from './Leaderboard';
import ErrorView from './ErrorView';

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          authedUser 
          ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/", state: rest.location.pathname }}
            />
          )
        }
      />
    );
};

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        let { authedUser } = this.props;
        return (
            <Router>
                <Fragment>
                    <LoadingBar className='loadingbar' />
                    <div className='container'>
                        <Nav />
                        <div className='content'>
                            <Switch>
                                <Route path='/' exact component={Login} />
                                <PrivateRoute path='/home' component={Home} authedUser={authedUser} />
                                <PrivateRoute path='/question/:id' component={QuestionView} authedUser={authedUser} />
                                <PrivateRoute path='/add' component={AddQuestion} authedUser={authedUser} />
                                <PrivateRoute path='/leaderboard' component={Leaderboard} authedUser={authedUser} />
                                <PrivateRoute path='/error' component={ErrorView} authedUser={authedUser} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </Router>
        );
  }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null,
        authedUser
    }
}

export default connect(mapStateToProps)(App);
