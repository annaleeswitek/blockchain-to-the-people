import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import NavBar from './components/app-bar';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';



const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
