import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Start from './components/start';
import Quiz from './components/quiz';

import BaseLayout from './layout/baseLayout';

class Routes extends React.Component{
  render() {
    return (
     <Switch>
       <BaseLayout>
         <Route path="/start" component={ Start }/>
         <Route path="/quiz" component={ Quiz }/>
       </BaseLayout>
     </Switch>
    );
  }

  // TODO: make expression generic!
  // TODO: check if user is authenticated

  componentDidMount() {
    const { history } = this.props;

    if ( window.location.href === 'http://localhost:3000/' ) {
      history.push( '/login' );
    }
  }

}

export default withRouter( Routes );
