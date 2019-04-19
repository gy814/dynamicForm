import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Form extends Component{
  render(){
    return (
      <div>
        <form></form>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const bmiReferenceProps = {
      id: 'bmi',
      observationName: 'BMI - Body mass index',
      dataElements: [
        {
          id: 'name',
          displayName: 'Name',
          type: 'textInput',
          display: true,
          isRequired: true,
        },
        {
          id: 'gender',
          displayName: 'Gender',
          type: 'select',
          options: [
            {
              id: 1,
              name: 'Male',
              isDefault: true,
              sortOrder: 1,
            },
            {
              id: 2,
              name: 'Female',
              isDefault: false,
              sortOrder: 2,
            },
          ],
          display: true,
          isRequired: false,
        },
        {
          id: 'weight',
          displayName: 'Weight',
          unitOfMeasure: 'kg',
          type: 'numberInput',
          bounds: {
            upperLimit: 1000,
          },
          display: true,
          isRequired: true,
        },
        {
          id: 'height',
          displayName: 'Height',
          unitOfMeasure: 'cm',
          type: 'numberInput',
          bounds: {
            upperLimit: 300,
          },
          display: true,
          isRequired: true,
        },
        {
          id: 'bmi',
          displayName: 'BMI',
          unitOfMeasure: 'kg/m2',
          type: 'numberInput',
          bounds: {
            upperLimit: 100,
          },
          display: false,
          isRequired: false,
        },
      ],
    };
    
    const headCircumferenceReferenceProps = {
      id: 'head-circumference',
      observationName: 'Head Circumference',
      dataElements: [
        {
          id: 'name',
          displayName: 'Name',
          type: 'textInput',
          display: true,
          isRequired: true,
        },
        {
          id: 'gender',
          displayName: 'Gender',
          type: 'select',
          options: [
            {
              id: 1,
              name: 'Male',
              isDefault: true,
              sortOrder: 1,
            },
            {
              id: 2,
              name: 'Female',
              isDefault: false,
              sortOrder: 2,
            },
          ],
          display: true,
          isRequired: false,
        },
        {
          id: 'head-circumference',
          displayName: 'Head Circumference',
          unitOfMeasure: 'cm',
          type: 'numberInput',
          bounds: {
            upperLimit: 1000,
          },
          display: true,
          isRequired: true,
        },
      ],
    };
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Form formData={headCircumferenceReferenceProps}/>
      </div>
    );
  }
}

export default App;
