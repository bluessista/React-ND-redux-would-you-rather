import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION, SAVE_ANSWER } from '../actions/questions';

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            };
        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [question.author]: {
                    ...state[question.author],
                    questions: state[question.author].questions.concat([
                        question.id
                    ])
                }
            };
        case SAVE_ANSWER:
            const { object } = action;
            return {
                ...state,
                [object.authedUser]: {
                    ...state[object.authedUser],
                    answers: {
                        ...state[object.authedUser].answers,
                        [object.qid]: object.answer
                    }
                }
            };
        default :
            return state;
    }
}