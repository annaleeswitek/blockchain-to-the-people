import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {fade} from '../../utils/colorManipulator';

import {white, darkBlack, fullBlack, teal800, teal900, grey500, yellow600, grey100, purple300, grey300, cyan500, blueGrey800, blueGrey400, lightGreen400, lightBlue600, teal300, black, greenA100, teal400, yellow800, yellow500, blue400, yellow700, lightBlue800, lightBlue900, lightGreen800, lightGreen600, lightBlue300, teal500, blue500, blueA400, blueGrey600, indigoA700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  fontFamily: '"Open Sans", sans-serif',
  palette: {
    primary1Color: blue500,
    // primary2Color: blueGrey400,
    // primary3Color: grey500,
    accent1Color: teal500,
    // accent2Color: lightBlue600,
    // accent3Color: teal300,
    textColor: black,
    // alternateTextColor: white,
    canvasColor: grey100,
    // borderColor: grey300,
    // // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: '#d0ed57',
    // // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
});
// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <MuiThemeProvider muiTheme={muiTheme}>
        <App />
    </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
