import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

class Login extends Component {
   
    state = {
        isLogged: false
    }

    componentWillMount(){
        if(localStorage.getItem("fbData") || localStorage.getItem("googleData")) {
            this.setState({ isLogged: true});
        }
    }

    //Facebook
    responseFacebook = (response) => {
        //TODO
        localStorage.setItem("fbData",JSON.stringify({
            token: response.token,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: 'fb'
        }));

        this.setState({ isLogged: true });
    }

    //Google
    responseGoogle = (response) => {
        //TODO
        localStorage.setItem("googleData",JSON.stringify({
            token: response.token,
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            social: 'google'
        }));

        this.setState({ isLogged: true });
    }

    onFailure = (error) => {
        console.log(error);
    }
    
    render() {

        if(this.state.isLogged){
            return (<Redirect to="home/" />);
        }

        return (
            <div className="Login">                
                <div className="Login-box">
                    <div className="card">
                        <div className="card-content">
                            <FacebookLogin
                                appId="1670135253112265"
                                autoLoad={ false }
                                fields="name, email, picture.width(120)"
                                callback={ this.responseFacebook }
                                onFailure={ this.onFailure }
                                textButton=" Facebook"
                                cssClass="waves-effect waves-light btn blue darken-2"
                                icon="fab fa-facebook-f"
                             />
                            <br/>
                            <GoogleLogin 
                                clientId="969902114236-07oqag7pmo3indg29duuv5fpnooncf6h.apps.googleusercontent.com"
                                autoLoad={ false }
                                onSuccess={ this.responseGoogle }
                                onFailure={ this.onFailure }
                                className="waves-effect waves-light btn red lighten-1"    
                            >
                                <i className="fab fa-google"></i> Google    
                            </GoogleLogin>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;