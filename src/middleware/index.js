import logger from './logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export default applyMiddleware(
    // important: keep order, thunk middleware reads it line after line
    thunk,
    logger
);