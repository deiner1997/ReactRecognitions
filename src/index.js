import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setHeader from "./setHeader";
import decode from "jwt-decode";
import { userLoggedIn } from "./actions/auth";
const store = createStore(reducer, applyMiddleware(thunk));
const token = window.localStorage.getItem('jwt');
if (token) {
    const payload = decode(token);
    setHeader(token,payload.sub[0]._id);
    store.dispatch(userLoggedIn(payload.sub));
}
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={App} />
                </Switch>

            </App>
        </Router>
    </Provider>, document.getElementById('root'));
