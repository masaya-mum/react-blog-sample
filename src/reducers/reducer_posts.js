import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
    case DELETE_POST:
        // Delete post data from state
        // payload = post.id
        return _.omit(state, action.payload);
        // same as : return _.refect(state, post => post.id === action.payload);
    case FETCH_POSTS:
        return _.mapKeys(action.payload.data, 'id');
    case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };

        // ** ES6 is following style **
        // const post = action.payload.data;
        // const newState = { ...state };
        // newState[post.id] = post;
        // return newState;
    default:
        return state;
    }
}
