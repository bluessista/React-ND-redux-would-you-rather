import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions';

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            };
        case ADD_QUESTION :
            const { question } = action;
            return {
                ...state,
                [question.id]: question,
            };
        case SAVE_ANSWER :
            const { object } = action;
            return {
                ...state,
                [object.qid]: {
                    ...state[object.qid],
                    [object.answer]: {
                        ...state[object.qid][object.answer],
                        votes: [
                            ...state[object.qid][object.answer].votes,
                            object.authedUser
                        ]
                    }
                }
            };
        default :
            return state;
    }
}