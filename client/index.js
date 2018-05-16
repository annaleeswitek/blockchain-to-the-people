import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {fade} from '../../utils/colorManipulator';

import {white, darkBlack, fullBlack, teal800, teal900, grey500, yellow600, grey100, purple300, grey300, cyan100, blueGrey800, blueGrey400, lightGreen400, lightBlue600, teal300, black, greenA100, teal400, yellow800, yellow500, blue400, yellow700, lightBlue800, lightBlue900, lightGreen800, lightGreen600, lightBlue300, teal500, blue500, blueA400, blueGrey600, indigoA700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  fontFamily: '"Open Sans", sans-serif',
  palette: {
    primary1Color: blue500,
    canvasColor: "azure"
  },
  appBar: {
    height: 70,
  }
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
