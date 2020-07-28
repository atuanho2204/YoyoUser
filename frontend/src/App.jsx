import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from './routes';

export class App extends React.Component {
  render() {
    return (
      <>  
        <Router>
          <Switch>
            {
              ROUTES.map((x, id) => (
                <Route path={x.path} component={x.component} key={id}/>
              ))
            }
          </Switch>
        </Router>    
      </>
    );  
  }
}