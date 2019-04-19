import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//Individual form field component
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
            pattern={this.props.fieldProps.pattern}
            value={this.props.fieldProps.value}
            onChange={event => this.props.changed(event,this.props.fieldProps)}
            />
          );
           break;
      case "numberInput":
      inputElement = (
        <input
        type="number"
        min="0"
        max={this.props.fieldProps.bounds.upperLimit}
        id={this.props.fieldProps.id}
        hidden={!this.props.fieldProps.display}
        required={this.props.fieldProps.isRequired}
        placeholder={this.props.fieldProps.unitOfMeasure}
        value={this.props.fieldProps.value}
        onChange={event => this.props.changed(event,this.props.fieldProps)}
        />
      );
          break;
      case "select":
      inputElement = (
        <select id={this.props.fieldProps.id}  hidden={!this.props.fieldProps.display} 
                required={this.props.fieldProps.isRequired} value={this.props.fieldProps.value}
                onChange={event => this.props.changed(event,this.props.fieldProps)}>
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
            onChange={event => this.props.changed(event,this.props.fieldProps)}
            />
          );
          break; 
    }
    return (
      <div>
        {this.props.fieldProps.display && <label style={{marginRight:30+"px"}}>{this.props.fieldProps.displayName}</label>}
        {inputElement}
      </div>
     );
  }
}
//Form component
class Form extends Component{
  constructor(props) {
    super(props);
    const formDataState=this.props.formData.dataElements.map(o=>({...o,isValid:this.checkValidity(o)}));
    this.state = {formStates: formDataState,
                  formIsValid: false};
  }
  //Form input change event handler
  inputChange(event,el){
    const updatedFormStates=this.state.formStates.map(o=>({...o}));
    const updatedFormElement = updatedFormStates.find(obj =>obj.id==el.id);
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid=this.checkValidity(updatedFormElement);
    this.setState({formStates:updatedFormStates});
    let formIsValidNow = true;
    updatedFormStates.forEach( el=> {
      formIsValidNow = el.isValid && formIsValidNow;
    });
    this.setState({formIsValid:formIsValidNow})
  };
  //Check input field validity
  checkValidity(field){
    let isValid = true;
    if(!field.display){
      return isValid;
    }
    if (field.isRequired) {
      isValid = field.value.trim() !== "" && isValid;
    }
    if (field.bounds) {
    isValid = field.value >0 && field.value<=field.bounds.upperLimit && isValid;
    }
    if(field.pattern){
      isValid=field.pattern.test(field.value) && isValid;
    }
    return isValid;
  }
  //Form submit event handler
  formSubmit(event){
    event.preventDefault();
    const formData = {};
    let weight,height;
    let flag=false;
    this.state.formStates.forEach(el => {
      if(el.displayName=="Weight"){
        weight= Math.round(el.value);
        formData[el.displayName] = Math.round(el.value);
        return;
      }
      if(el.displayName=="Height"){
        height=Math.round(el.value);
        formData[el.displayName] = Math.round(el.value);
        return;
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
  //Calculate BMI given weight and height value
  calcBMI(w,h){
    var weight = Number(w);
    var height = Number(h);
    var BMI =  weight/(height/100*height/100);
    return BMI.toFixed(2);
  }
  render(){
    return (
      <div>
        <h2>{this.props.formData.observationName}</h2>
        <form id={this.props.formData.id} method="post">
          <ul>
          {
            this.state.formStates.map(el => {
              return (
                <Field fieldProps={el} changed={(e,f)=>this.inputChange(e,f)}/>
              );
            })}
            </ul>
            <button onClick={e=>this.formSubmit(e)} disabled={!this.state.formIsValid}>SUBMIT</button>
        </form>
      </div>
    );
  }
}
//Root component
class App extends Component {
  //Post form data to the server
  postForm(url, data){
    //Make a post request to the server
    console.log(`request posted with data:${JSON.stringify(data)}`);
  }
  render() {
    //Input form json data
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
          value:"",
          pattern: /^[a-zA-Z]+ [a-zA-Z]+$/
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
          value:"",
          pattern: /^[a-zA-Z]+ [a-zA-Z]+$/
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
          step:1,
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
    const url="#"; //Form post url
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
