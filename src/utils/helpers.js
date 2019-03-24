export function formatQuestion (question, user, users, authedUser) {
    const { id, timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = user;
    let percentOne = question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100;
    let percentTwo = question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100;
    console.log(users[authedUser].answers[id]);

    return {
        name,
        id,
        timestamp,
        avatar: avatarURL,
        optionOne: optionOne.text,
        optionTwo: optionTwo.text,
        hasAnswered: users[authedUser].answers.hasOwnProperty(id),
        answer: users[authedUser].answers.hasOwnProperty(id) ? users[authedUser].answers[id] : null,
        optionOneVotedBy: question.optionOne.votes.length,
        optionOneVotedPercentage:  question.optionOne.votes.length > 0 ? percentOne.toFixed(0) : 0,
        optionTwoVotedBy: question.optionTwo.votes.length,
        optionTwoVotedPercentage:  question.optionTwo.votes.length > 0 ? percentTwo.toFixed(0) :0
    };
}