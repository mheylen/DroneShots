// import React, { Component } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";


// export default class Dashboard extends Component {
//     constructor (props) {
//         super(props);

//         this.state = {
//             content: []
//         };
//         this.getOne = this.getOne.bind(this);
//     }
//     componentDidMount() {
//         this.getOne();
//     }
//     getOne() {
//         axios.get("/api/pilotContent/").then(res => {
//             this.setState({
//                 content: res.data
//             });
//         });
//     }
//     render (){
//         const { content } = this.state;

//         const contentDisplay = content.map(content => {
//             return (

//                 <div key={content.content_id}>
//                     <h1>{content.title}</h1>
//                     <p>This is for the stats</p>
//                     <img src={content.video} />
//                 </div>
//             )
//         })
//         return <div className="dashboard">{contentDisplay}</div>
//     }
// }