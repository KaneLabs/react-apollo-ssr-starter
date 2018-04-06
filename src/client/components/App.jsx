import React from 'react';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Nav from './Nav';

class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { routes } = this.props.route;

    return (
      <main id='App'>
        <Route component={Nav} />

        {renderRoutes(routes)}
      </main>
    );
  }
}

export default App;
