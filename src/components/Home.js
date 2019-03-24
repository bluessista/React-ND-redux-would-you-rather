import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";

class Home extends Component {
    state = {
        showQuestions: 'unanswered',
    }

    render() {
        const { unansweredQuestions, answeredQuestions, questions, authedUser } = this.props;

        const showQuestions = (value) => {
            let showQuestions = value;
            this.setState(() => ({
                showQuestions: showQuestions,
            }));
        };
    
        const getClassnameUnanswered = () => {
            if (this.state.showQuestions === 'unanswered'){
                return ('clicked');
            }
            else {
                return ('unclicked');
            }
        };
    
        const getClassnameAnswered = () => {
            if (this.state.showQuestions === 'answered'){
                return ('clicked');
            }
            else {
                return ('unclicked');
            }
        };
        
        if (authedUser === null){
            return (<Redirect to="/" />)
        }
        return (
            <div className='homescreen'>
                <div className='toggleQuestions'>
                    <button role='tab' className={getClassnameUnanswered()} onClick={() => showQuestions('unanswered')}>
                        Unanswered questions
                    </button>
                    <button role='tab' className={getClassnameAnswered()} onClick={() => showQuestions('answered')}>
                        Answered questions
                    </button>
                </div>
                <ul className='question-list'>
                    {this.state.showQuestions === 'unanswered' 
                    ? unansweredQuestions.map((id) => (
                        <li key={id}>
                            <Link to={`/question/${id}`} className='question-options'>
                                <div className='option'>
                                    <p>{questions[id].optionOne.text}</p>
                                </div>
                                <div className='option'>
                                    <p>{questions[id].optionTwo.text}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                    : answeredQuestions.map((id) => (
                        <li key={id}>
                            <Link to={`/question/${id}`} className='question-options'>
                                <div className='option'>
                                    <p>{questions[id].optionOne.text}</p>
                                </div>
                                <div className='option'>
                                    <p>{questions[id].optionTwo.text}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
};

function mapStateToProps ({ questions, users, authedUser }){
    if(authedUser !== null) {
        return {
            questions,
            authedUser,
            answeredQuestions: Object.keys(users[authedUser].answers)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
            unansweredQuestions: _.difference(Object.keys(questions), Object.keys(users[authedUser].answers))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
            questionsIds: Object.keys(questions)
              .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        }
    } else {
        return {authedUser}
    }
};
 export default connect(mapStateToProps)(Home);