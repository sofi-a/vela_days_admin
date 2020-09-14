import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './layout/Navigation';
import Landing from './Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import store from '../store';
import { loadUser } from '../actions/auth';

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, [])
    
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navigation />
                    <Route exact path="/home" component={Landing} />
                    <Switch>
                        <Route exact path="/home/login" component={Login} />
                        <Route exact path="/home/register" component={Register} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;