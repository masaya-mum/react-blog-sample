import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        // this.props.match.params.{params} defined in index.js : router setting
        const { id } = this.props.match.params;
        // same as : const id = this.props.match.params.id;
        // same as : const id = this.props.match.params['id'];
        this.props.fetchPost(id);
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        // this.props.post.id is risky. not always exist;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
              <Link to="/">back to index</Link>
              <button className="btn btn-danger pull-xs-right"
                      onClick={this.onDeleteClick.bind(this)}>
                Delete Post
              </button>
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
export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);
