import React, { Component } from "react";

export default class BlogForm extends Component {
    constructor(props) {
        super(porps);

        this.state = {
            title: "",
            blog_status: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })    
    }

    render() {
        return (
            <form>
                <input 
                    type="text"
                    onChange={this.handleChange}
                    name="title"
                    placeholder="Blog Title"
                    value={this.state.title}
                />
                
                <input 
                    type="text"
                    onChange={this.handleChange}
                    name="blog_status"
                    placeholder="Blog Status"
                    value={this.state.blog_status}
                />

                <button>Save</button>
            </form>
        );
    }
}