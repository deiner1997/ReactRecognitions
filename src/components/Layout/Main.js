import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login/Create'
import CreateRecognition from '../Recognition/Create'
import Recognition from '../Recognition';
import Approve from '../Approve';
import ApproveEdit from '../Approve/edit';
import EditUser from '../Register/edit'
import EditPeriod from '../Period/edit'
import Period from '../Period'
import Location from '../Location'
import MyAccount from '../Account';
import Report from '../Reports'
import Catalogue from '../Catalogue';
import Shopping from '../Shopping';
import ShowRecognitions from '../Reports/breakdown';
import ShowRecognitionsPeriod from '../Reports/breakdownOld';
import Queries from '../Queries'

import './css/main.css';
class Main extends Component {
  
  render() {
    return (
      <div className="main" >
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/create-recognition" component={CreateRecognition} />
                <Route path="/dashboard" component={Recognition} />
                <Route path="/approve" component={Approve} />
                <Route path="/period" component={Period} />
                <Route path="/location" component={Location} />
                <Route path="/edit/user/:id" component={EditUser} />
                <Route path="/edit/recognize/:id" component={ApproveEdit} />                
                <Route path="/edit/period/:id" component={EditPeriod} />
                <Route path="/show/breakdown/:id" component={ShowRecognitions} />
                <Route path="/show/breakdownOld/:id&:periodId" component={ShowRecognitionsPeriod} />
                <Route path="/my-account" component={MyAccount} />
                <Route path="/report" component={Report} />
                <Route path="/queries" component={Queries} />
                <Route path="/catalogue" component={Catalogue} />
                <Route path="/shopping" component={Shopping} />
              </Switch>
          </div>
    );
  }
}
export default Main
