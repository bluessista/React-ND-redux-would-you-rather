import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleSaveAnswer } from '../actions/questions';

class Question extends Component {
    render() {
        const { question } = this.props;

        if (question === null ) {
            return (<p>This question does not exist!</p>)
        }

        const {
            name, avatar, optionOne, optionTwo, hasAnswered, answer, optionOneVotedBy, optionOneVotedPercentage, optionTwoVotedBy, optionTwoVotedPercentage
        } = question

        const getInfoOptionOne = () => {
            if(hasAnswered){
                console.log('true')
                return (
                    <div className='info'>
                        <p>{`Votes: ${optionOneVotedBy}`}</p>
                        <p>{`Percentage: ${optionOneVotedPercentage}`}</p>
                    </div>
                )
            }
        }
        const getInfoOptionTwo = () => {
            if(hasAnswered){
                return (
                    <div className='info'>
                        <p>{`Votes: ${optionTwoVotedBy}`}</p>
                        <p>{`Percentage: ${optionTwoVotedPercentage}`}</p>
                    </div>
                )
            }
        }

        const getClassNameOne = () => {
            if(answer === 'optionOne'){
                return 'option answered'
            } else if (answer === 'optionTwo') {
                return 'option notanswered'
            } else {
                return 'option'
            }
        }

        const getClassNameTwo = () => {
            if(answer === 'optionTwo'){
                return 'option answered'
            }  else if (answer === 'optionOne') {
                return 'option notanswered'
            } else {
                return 'option'
            }
        }
        const choose = (option) => {
            const { dispatch, question } = this.props
            dispatch(handleSaveAnswer({
                id: question.id,
                answer: option
            }))
        }

        return (
            <div className="question">
                <img src={avatar} alt={`Avatar of ${name}`} className='avatarImg'/> <span>{`${name} asks:`}</span>
                <h3>Would You Rather ...</h3>
                <div className="question-options">
                    <div className={getClassNameOne()}>
                        <div onClick={() => {!hasAnswered && choose('optionOne')}}>
                            {optionOne}
                        </div>
                        {getInfoOptionOne()}
                    </div>
                    <div className={getClassNameTwo()}>
                        <div onClick={() => {!hasAnswered && choose('optionTwo')}}>
                            {optionTwo}
                        </div>
                        {getInfoOptionTwo()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users}, { id }) {
    const question = questions[id];
    return {
        authedUser,
        question: question
         ? formatQuestion(question, users[question.author], users, authedUser)
         : null
    }
}

export default connect(mapStateToProps)(Question);