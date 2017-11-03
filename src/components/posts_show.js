import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        // this.props.match.params.{params} defined in index.js : router setting
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
              <h3>{post.title}</h3>
              <h6>Categories: {post.categories}</h6>
              <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}
// default exportで単一値を渡す
// http://uehaj.hatenablog.com/entry/2015/11/07/001848
export default connect(mapStateToProps,{ fetchPost })(PostsShow);
