import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Example from '../components/Example';


export default class ExamplesList extends Component {
  constructor(props) {
    super(props);


    this.state = { examples: [] };
  }


  componentDidMount() {
    axios.get('http://localhost:5000/examples/')
      .then(response => {
        this.setState({ examples: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  exampleList() {
    return this.state.examples.map(currentExample => {
      return <Example example={currentExample} key={currentExample._id} />;
    })
  }


  render() {
    return (
      <div>
        <h3>Examples List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.exampleList() }
          </tbody>
        </table>
      </div>
    )
  }
}

;
