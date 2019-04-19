import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class Field extends Component{
  render(){
    let inputElement;
    switch (this.props.fieldProps.type) {
      case "textInput":
          inputElement = (
            <input
            type="text"
            id={this.props.fieldProps.id}
            hidden={!this.props.fieldProps.display}
            required={this.props.fieldProps.isRequired}
            value={this.props.fieldProps.value}
            />
          );
           break;
      case "numberInput":
      inputElement = (
        <input
        type="number"
        min="1"
        max={this.props.fieldProps.bounds.upperLimit}
        id={this.props.fieldProps.id}
        hidden={!this.props.fieldProps.display}
        required={this.props.fieldProps.isRequired}
        placeholder={this.props.fieldProps.unitOfMeasure}
        value={this.props.fieldProps.value}
        />
      );
          break;
      case "select":
      inputElement = (
        <select id={this.props.fieldProps.id}  hidden={!this.props.fieldProps.display} 
                required={this.props.fieldProps.isRequired} value={this.props.fieldProps.value}>
                {
                    Array.from(this.props.fieldProps.options).sort((a, b) => {
                      return a.sortOrder - b.sortOrder;
                    }).map(option => {
                        return (
                          <option id={option.id} selected={option.isDefault}>
                            {option.name}
                          </option>
                        );
                    })
                  }
        </select>
      )
          break;
      default:
          inputElement = (
            <input
            type="text"
            id={this.props.id}
            hidden={!this.props.fieldProps.display}
            required={this.props.fieldProps.isRequired}
            value={this.props.fieldProps.value}
            />
          );
          break; 
    }
    return (
      <div>
        <label style={{marginRight:30+"px"}}>{this.props.fieldProps.displayName}</label>
        {inputElement}
      </div>
     );
  }
}
class Form extends Component{
  formSubmit(event){
    event.preventDefault();
    const formData = {};
    let weight,height;
    let flag=false;
    this.props.formData.dataElements.forEach(el => {
      if(el.displayName=="Weight"){
        weight= el.value;
      }
      if(el.displayName=="Height"){
        height=el.value;
      }
      if(el.displayName=="BMI"){
        flag=true;
        return;
      }
      formData[el.displayName] = el.value;
    }); 
    if(flag){
      formData["BMI"]=this.calcBMI(weight,height);
    }
    this.props.postAction(this.props.postUrl, formData);
  };
  calcBMI(w,h){
    var weight = Number(w);
    var height = Number(h);
    var BMI =  weight/(height/100*height/100);
    return BMI.toFixed(2);
  }
  render(){
    return (
      <div>
        <form id={this.props.formData.id} method="post">
          <ul>
          {
            this.props.formData.dataElements.map(el => {
              return (
                <Field fieldProps={el}/>
              );
            })}
            </ul>
            <button onClick={e=>this.formSubmit(e)}>SUBMIT</button>
        </form>
      </div>
    );
  }
}

class App extends Component {
  postForm(url, data){
    //Make a post request to the server
    console.log(`request posted with data:${JSON.stringify(data)}`);
  }
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
          value:""
        },
        {
          id: 'gender',
          displayName: 'Gender',
          type: 'select',
          value:"",
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
          value:"65"
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
          value:"170"
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
          value:""
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
          value:""
        },
        {
          id: 'gender',
          displayName: 'Gender',
          type: 'select',
          value:"",
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
          value:""
        },
      ],
    };
    const url="#";
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
        <Form formData={bmiReferenceProps}  postUrl={url} postAction={this.postForm}/>
      </div>
    );
  }
}

export default App;
