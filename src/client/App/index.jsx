import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import './assets/index.scss';

class App extends React.Component {
  render() {
    return (
      <section>
        {`Yey! I can be reloaded! Right now I'm on "${this.props.router.location.pathname}"`}
        {renderRoutes(this.props.route.routes)}
      </section>
    );
  }
}

function mapStateToProps({ router }) {
  return {
    router,
  };
}

const ConnectedApp = connect(mapStateToProps, () => ({}))(App);

export default ConnectedApp;
