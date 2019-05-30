import { Component } from 'react';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { ReactGA }                  from '../utils/analytics';
import { retrieveUser }             from '../actions/user';
import { setSessionUser, setToken } from '../actions/session';

export class Nav extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount () {
    this.reset();
  }

  reset (props) {
    const { retrieveUser, session, setSessionUser } = props || this.props;

    if (session) {
      this.setState({ ...this.state, loading: true });

      retrieveUser(session.username)
      .then((user) => {
        setSessionUser(user);
        this.setState({ ...this.state, loading: false });
      })
      .catch(() => this.setState({ ...this.state, loading: false }));
    }
  }

  signOut = () => {
    const { clearToken } = this.props;

    ReactGA.event({ action: 'sign out', category: 'Session' });

    clearToken();
  }

  render () {
    const { session, user } = this.props;
    const { loading } = this.state;

    return (
      <nav>
        <Link to={this.url}>Pokédex Tracker</Link>
      </nav>
    );
  }
  get url() {
    if(this.props.twitch
    && this.props.twitch.configuration
    && this.props.twitch.configuration.username) {
      return '/u/' + this.props.twitch.configuration.username;
    }
    return '/u/ashketchum10';
  }
}

function mapStateToProps ({ session, sessionUser, twitch }) {
  return { session, user: sessionUser, twitch };
}

function mapDispatchToProps (dispatch) {
  return {
    clearToken: () => dispatch(setToken(null)),
    retrieveUser: (username) => dispatch(retrieveUser(username)),
    setSessionUser: (user) => dispatch(setSessionUser(user))
  };
}

export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);
