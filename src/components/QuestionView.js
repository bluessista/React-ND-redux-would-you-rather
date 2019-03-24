import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Redirect } from "react-router-dom";

class QuestionView extends Component {
    render() {
        if (this.props.authedUser === null){
            return ( <Redirect to="/" /> )
        }
        const { question } = this.props
        console.log(question)
        if (question === undefined) {
            console.log('redirect')
            return <Redirect to="/error" />;
        }
      
        return (
          <div className='question'>
            <h3>Question</h3>
              <Question id={question.id} />
          </div>
        )
    }
}
function mapStateToProps ({ questions, authedUser }, props) {
    const { id } = props.match.params
    console.log(id)
    const question = questions[id]
    console.log(questions[id])
    if (authedUser !== null) {
        return {
            question: question,
            authedUser
        }
    } else {
        return {
            authedUser
        }
    }
}

export default connect(mapStateToProps)(QuestionView);