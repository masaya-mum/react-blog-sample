import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {

    renderField(field) {
        const {meta: { touched, error }} = field;
        // {touched : touched} => {touched}
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
              <label>{field.label}</label>
              <input
                className="form-control"
                type="text"
                {...field.input}
                // ... : open properties
                // same as : onChange={field.input.onChange}
                //           onFocus={field.input.onFocue}
                />
              <div className="text-help">
                {field.meta.touched ? field.meta.error : ''}
              </div>
            </div>
        );
        // meta.pristine : not yet selected
        // meta.touched : selected, focused or focused away
        // meta.invalid :  invalid
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Title"
                name="title"
                component={this.renderField}
                />
              <Field
                label="Categories"
                name="categories"
                component={this.renderField}
                />
              <Field
                label="Post Content"
                name="content"
                component={this.renderField}
                />

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    // values : -> { title: 'a', catecories: 'test', content: 'hoge' }
    const errors = {};

    // Validate the ipunts from 'values'
    if(!values.title || values.title.length < 3) {
        errors.title = "enter a title that is at least 3 chars!";
    }

    if(!values.categories) {
        errors.categories = "enter a categories!";
    }

    if(!values.content) {
        errors.content = "enter a content!";
    }

    // if errors is empty, the form is fine to submit
    // if errors has any properties, redux-form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{ createPost })(PostsNew)
);
