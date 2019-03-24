import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        // get users and questions to add them to the state of redux store
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            });
    };
}