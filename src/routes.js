import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './components/App';
import Recognition from './components/Recognition/Recognition'

const AppRoutes= ()  =>
<App>
    <Switch>
    <Route exact path='/dashboard' component={Recognition}/>
    </Switch>
</App>;
export default AppRoutes;