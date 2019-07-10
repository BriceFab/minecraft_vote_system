import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Views
import NotFound from './views/not-found';
import Home from './views/home';
import Login from './views/login';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                {/* <Route path="/accueil" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route path="/management" component={ManagementPage} /> */}
                <Route component={NotFound} /> 
                <Redirect to="/not-found" />
            </Switch>
        );
    }
}