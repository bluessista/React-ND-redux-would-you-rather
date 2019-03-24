import React, { Component } from 'react';

export default class ErrorView extends Component {
    render () {
        return (
            <div>
                <h3 className='center'>An Error occured!</h3>
                <p>The page you requested was not found.</p>
            </div>
        )
    }
}