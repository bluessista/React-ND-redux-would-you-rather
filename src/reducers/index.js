import { combinedReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

export default combinedReducers({
    authedUser,
    users,
    questions
})