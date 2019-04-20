# 1.	Setup:

  1. git clone to local repository
  2. run `cd dynamicform` from local respository folder (make sure Node 8.10.0 or later is installed on your computer)
  3. run `npm install` (takes a while to install all dependencies)
  3. run `npm start`
  4. open http://localhost:3000/ in broswer
  
  
# 2.	Input JSON format:

1 form data object (e.g. bmiReferenceProps)
  - id: form id
  - observationName: form title
  - dataElements: array of form field data object
  
2 form field data object
  - shared properties
    - id: form field id
    - displayName: form field name
    - type: form field type (e.g. text input) 
    - display: whether this field is displayed on screen
    - isRequired: whether this field should not be leaved empty
    - value: initial value of form field, could be empty

  - field specific properties
    - placeholder: used by textInput type to hint about the expected input (e.g. full name)  
    - pattern: used by textInput type to specify the required format of input

    - options : array of select options object, used by select type
        - id: id of select option
        - name: text of select option to be displayed
        - sortOrder:the order of select option to be displayed

    - unitOfMeasure: used by numberInput type to specify the unit of input value
    - bounds: value range object used by numberInput type
        - upperLimit: the maximum value of input allowed
        
An example of input JSON data would be like

```
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
          placeholder:"full name",
          pattern: /^[a-zA-Z]+ [a-zA-Z]+$/
        },
        {
          id: 'gender',
          displayName: 'Gender',
          type: 'select',
          value:"Male",
          options: [
            {
              id: 1,
              name: 'Male',
              sortOrder: 1,
            },
            {
              id: 2,
              name: 'Female',
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
```

# 3.	Project template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
