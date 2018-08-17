import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import './index.css';

class Home extends Component {

  state = {
    profileImage: '',
    fullName: '',
    isLogout: false
  }

  componentWillMount() {
    let fbData = JSON.parse(localStorage.getItem('fbData'));
    let googleData = JSON.parse(localStorage.getItem('googleData'));
    
    if(fbData){
      this.setState({ profileImage: fbData.picture, fullName: fbData.name })
    } else if(googleData){
      this.setState({ profileImage: googleData.picture, fullName: googleData.name })
    } else {
      this.setState({
        isLogout: true
      })
    }
  }

  onLogout = (e) => {
    localStorage.clear();
    this.setState({
      isLogout: true
    })
  }

  render(){

    if(this.state.isLogout){
      return (<Redirect to="/" />);
    }

    return(
      <div className="Home">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Autenticación</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><img className="circle Home-avatar" src={ this.state.profileImage } alt="profile" /></li>
              <li>{ this.state.fullName }</li>
              <li><i onClick={ this.onLogout } className="Home-logout fa fa-power-off"></i></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
