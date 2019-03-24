import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        backHome: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;

        dispatch(handleAddQuestion(optionOne, optionTwo));
        this.setState(() => ({
            text: '',
            backHome: true
        }))
    };

    handleOptionOneChange = (e) => {
        const optionOne = e.target.value;
        this.setState(() => ({
            optionOne
        }));
    };

    handleOptionTwoChange = (e) => {
        const optionTwo = e.target.value;
        this.setState(() => ({
            optionTwo
        }));
    }

    render (){
        const { optionOne, optionTwo, backHome } = this.state;

        if (this.props.authedUser === null){
            return (<Redirect to="/" />);
        }
        // send user back to homepage when question is submitted
        if(backHome === true) {
            return <Redirect to='/home' />
        }

        return (
            <div className='addQuestion'>
                <h3 className='center'>Create a new question</h3>
                <form onSubmit={this.handleSubmit}>
                    <span>
                        <textarea 
                            placeholder='type your option One'
                            rows="10"
                            value={optionOne}
                            onChange={this.handleOptionOneChange}
                            maxLength={256}
                        />
                        <textarea 
                            placeholder='type your option Two'
                            rows="10"
                            value={optionTwo}
                            onChange={this.handleOptionTwoChange}
                            maxLength={256}
                        />
                    </span>
                    <button 
                        type='submit' 
                        className='btn'
                        disabled={optionTwo === '' || optionOne === ''}
                    >
                        Submit question
                    </button>
                </form>
            </div>
        )
    }
};

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(AddQuestion);