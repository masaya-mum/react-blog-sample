import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostsIndex extends Component{
    // react lifecycle : react automate loaded
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        return _.map(this.props.posts,
                     post => {
                         return (
                                 <li className="list-group-item" key={post.id}>
                                 {post.title }
                                 </li>
                         );
                     }
                    );
    }
    render() {
        return (
            <div>
                <h3>PostsIndex</h3>
                <ul className="list-group">
                {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts}
}

// connect (state, propertyName)
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
