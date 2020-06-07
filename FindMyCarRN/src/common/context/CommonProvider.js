import React, {Component} from 'react'
import {themeLight, themeDark} from '../Theme';

export const AppContext = React.createContext();

export class CommonProvider extends Component {

  changeTheme = () => {
    this.setState({
      theme:this.state.themeType === 'light' ? themeDark : themeLight,
      themeType:this.state.themeType === 'light' ? 'dark' : 'light'
    });
  }

  state = {
    themeType:'light',
    theme: themeLight
  };

  render() {
    return (
      <AppContext.Provider
        value={{state: this.state}}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export class CommonConsumer extends Component{
  render(){
    return(
      <AppContext.Consumer>
        {this.props.children}
      </AppContext.Consumer>
    )
  }
}
