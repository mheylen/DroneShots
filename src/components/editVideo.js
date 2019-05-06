import React, { Component } from "react";
import axios from "axios";
import "./header.css";
import Dropzone from "react-dropzone"
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/de3supjrm/video/upload";


export default class editVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tag: "",
      edit: false
    };
    this.editVideo=this.editVideo.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      axios.get(`/api/content/${id}`).then(res => {
        const { title, description, tag } = res.data;
        this.setState({
          title,
          description,
          tag,
          edit: true
        });
      });
    }
 
  }
  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  editVideo(){
      const {title, description, tag } = this.state;
      const payload ={
        title,
        description,
        tag
      };
      axios.put(`/api/content/${this.props.match.params.id}`, payload).then(() => {
        this.clearForm();
        this.props.history.push("/")
      })
  }
  clearForm () {
    this.setState({
      title: "",
      description: "",
      tags: ""
    });
  };

  render() {
    const { description, tag, title, edit} = this.state;
    const { users } = this.props;
    
    console.log(users)
    return (
        <div className="editVideo">
                  <input
                      placeholder="title"
                      type="title"
                      name="title"
                      value={title}
                      onChange={e =>
                        this.changeHandler(e.target.name, e.target.value)
                      }
                    />
                  <input
                    placeholder="description"
                    type="description"
                    name="description"
                    value={description}
                    onChange={e =>
                      this.changeHandler(e.target.name, e.target.value)
                    }
                  />
                    <input
                    placeholder="tag"
                    type="tag"
                    name="tag"
                    value={tag}
                    onChange={e =>
                      this.changeHandler(e.target.name, e.target.value)
                    }
                    />
      <button
          onClick={() => {
            this.clearForm();
            if (edit) {
              this.props.history.push("/");
            }
          }}
        >
          Cancel
        </button>
        <button onClick={this.editVideo }>
          Make Changes
        </button>
      </div>
    );
  }
}

