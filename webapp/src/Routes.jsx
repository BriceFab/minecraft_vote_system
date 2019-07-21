import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Views
import NotFound from './views/not-found';
import HomePage from './views/home';
import LoginPage from './views/login';
import RegisterPage from './views/register';
import LogoutPage from './views/logout';
import ManagementPage from './views/management';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route path="/management" component={ManagementPage} />
                <Route component={NotFound} /> 
                <Redirect to="/not-found" />
            </Switch>
        );
    }
}