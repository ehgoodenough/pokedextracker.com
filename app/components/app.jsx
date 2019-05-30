import { Component } from 'react';
import { connect }   from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore }                    from 'react-router-redux';

import { AccountComponent }  from './account';
import { DonateComponent }   from './donate';
import { HomeComponent }     from './home';
import { LoginComponent }    from './login';
import { NotFoundComponent } from './not-found';
import { ProfileComponent }  from './profile';
import { RegisterComponent } from './register';
import { Store }             from '../stores';
import { TrackerComponent }  from './tracker';
import { logPageView }       from '../utils/analytics';

const history = syncHistoryWithStore(browserHistory, Store);

class App extends Component {
  render() {
    if(this.props.twitch.isReady != true) {
        return (
            <div/>
        )
    }
    return (
      <Router history={history} onUpdate={logPageView}>
        <Redirect from='/' to={this.url} />
        <Redirect from='/index.html' to={this.url} />
        <Route path='/home' component={HomeComponent} />
        <Route path='/u/:username' component={ProfileComponent} />
        <Route path='/u/:username/:slug' component={TrackerComponent} />
        <Route path='*' component={NotFoundComponent} />
      </Router>
    );
  }
  get url() {
    let url = '/u/';
    if(!!this.props.twitch
    && !!this.props.twitch.configuration
    && !!this.props.twitch.configuration.username) {
      url += this.props.twitch.configuration.username + '/';
    } else {
      url += 'ashketchum10' + '/';
    }
    if(!!this.props.twitch
    && !!this.props.twitch.configuration
    && !!this.props.twitch.configuration.dexslug) {
       url += this.props.twitch.configuration.dexslug;
    }
    return url;
  }
}

function mapStateToProps ({ twitch }) {
  return { twitch };
}

export const AppComponent = connect(mapStateToProps)(App);
