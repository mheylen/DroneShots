import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUsers } from "../ducks/reducer";
import Pilot_Videos from "./Pilot_Videos";
import Stats from "./Stats"
import { Link } from 'react-router-dom'
// import { setStore } from "../ducks/store"
import "./PilotCard.css";
import Dropzone from "react-dropzone"
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/de3supjrm/video/upload";


class PilotCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      video: "",
      title: "",
      description: "",
      tag: "",
      videoList: [],
      uploadedFile: '',
      cloudinaryUrl: [],
      

    };
    this.signIn = this.signIn.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.upload = this.upload.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  onVideoDrop = (files) => {
    console.log("onVideoDrop FILES", files)
    this.setState({
      uploadedFile: files[0]
    });
    
    this.handleVideoUpload(files[0]);
  }

  handleVideoUpload = (file) => {

    axios.get('/api/upload').then(response => {

        let formData = new FormData();
        console.log(formData, "formData")
        formData.append("signature", response.data.signature)
        // formData["signature"] = response.data.signature;
        formData.append("api_key", "276529187845597");
        // formData["api_key" ] = "276529187845597"
        formData.append("timestamp", response.data.timestamp)
        // formData["timestamp"] = response.data.timestamp
        formData.append("file", file);
        formData["file"] = file
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
          this.setState({
            cloudinaryUrl: [...this.state.cloudinaryUrl, response.data.secure_url]
            })
        }).catch( err => {
        console.log(err);
        })

    })
}
  

  componentDidMount() {
    // const { id } = this.props.match.params;
    // if (id) {
    //   axios.get(`/api/content/${id}`).then(res => {
    //     const { title, description, tag } = res.data;
    //     this.setState({
    //       title,
    //       description,
    //       tag,
    //       edit: true
    //     });
    //   });
    // }
    axios.get("/api/users").then(res => {
      console.log(res)
      this.props.setUsers(res.data);
    });
    this.getOne();
    this.signIn();
 
  }
  
 


  upload() {
    const storePayload = {
      title: this.state.title,
      description: this.state.description,
      tag: this.state.tag,
      video: this.state.cloudinaryUrl,
      id: this.props.users.id
    };console.log(this.state.cloudinaryUrl, "CloudinaryUrl")
    axios.post("/api/content", storePayload).then(res => {
      alert("Post Added") 
      this.getOne();
    })
  }
  
  signIn() {
    const loginPayload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/signin", loginPayload)
      .then(res => {
        console.log("logged in", res.data)
        this.props.setUsers(res.data);
      })
      .catch(err => alert(err));
  }

  register() {
    const loginPayload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/register", loginPayload)
      .then(res => {
        console.log(res.data)
        this.props.setUsers(res.data);
      })
      .catch(err => alert(err));
  }

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  logout = () => {
    axios.post("/api/logout").then(() => {
      this.props.setUsers(null);
    });
  };

getOne () {
console.log("Hit")
  axios.get('/api/pilotContent/').then(response => {
    console.log(response.data, "------------->")
    this.setState({
      videoList: response.data
    });
  });
  
}




  render() {
    const { email, password, video, description, tag, title, videoList} = this.state;
    const { users } = this.props;
    
    console.log(users)
    return (
        <div >
          <nav>
            <ul>
              {!users ? (
                <li>
                  <input required 
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={e =>
                      this.changeHandler(e.target.name, e.target.value)
                    }
                  />
                  <input required 
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e =>
                      this.changeHandler(e.target.name, e.target.value)
                    }
                  />
                  
                  <button id="button-1" onClick={this.register}>Register</button>
                  <button id="button-2"onClick={() => this.signIn()}>Sign In</button>
                </li>
              ) : (
                <button onClick={this.logout}>Logout</button>
              )}
              {JSON.stringify(this.state.users)}
              {users ?
              <li>
                  <Dropzone  
                    onDrop={this.onVideoDrop} accept="video/*"multiple={false}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <button className="dropzone">Drag or Click to Drop Files </button>
                        </div>
                      </section>
                    )}
                  </Dropzone>
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
                    
                  <button onClick={this.upload}>Upload</button>
              
                </li>
                : null
              } </ul>
              <ul>
                  {users ?
              <Pilot_Videos />
                : null
              } 

          </ul>
          </nav>
        </div>
      
    );
  }
}

const mapStateToProps = reduxState => {
  console.log(reduxState)
  return {
    users: reduxState.users
  };
};

const mapDispatchToProps = {
  setUsers: setUsers,
  // setStore: setStore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PilotCard);
