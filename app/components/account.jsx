import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect }   from 'react-redux';
import { push }      from 'react-router-redux';

import { AlertComponent }                  from './alert';
import { FooterComponent }                 from './footer';
import { NavComponent }                    from './nav';
import { ReactGA }                         from '../utils/analytics';
import { ReloadComponent }                 from './reload';
import { checkVersion }                    from '../actions/utils';
import { friendCode3DS, friendCodeSwitch } from '../utils/formatting';
import { updateUser }                      from '../actions/user';

export class Account extends Component {

  constructor (props) {
    super(props);
    this.state = { error: null, password: false, success: null };
  }

  componentWillMount () {
    this.reset();
  }

  componentWillUpdate (props) {
    this.reset(props);
  }

  reset (props) {
    const { checkVersion, redirectToLogin, session } = props || this.props;

    if (!session) {
      redirectToLogin();
    }

    checkVersion();
  }

  scrollToTop () {
    if (this._form) {
      this._form.scrollTop = 0;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { session, updateUser } = this.props;
    const payload = {
      username: session.username,
      payload: {
        password: this._password && this._password.value || undefined,
        password_confirm: this._password_confirm && this._password_confirm.value || undefined,
        friend_code_3ds: this._friend_code_3ds.value,
        friend_code_switch: this._friend_code_switch.value
      }
    };

    this.setState({ ...this.state, error: null, loading: true, success: null });

    updateUser(payload)
    .then(() => {
      ReactGA.event({ action: 'update', category: 'User' });

      this.setState({ ...this.state, loading: false, success: 'Account settings saved!' });
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.message, loading: false });
      this.scrollToTop();
    });
  }

  render () {
    const { session } = this.props;
    let { user } = this.props;
    const { error, loading, password, success } = this.state;

    if (!session) {
      return null;
    }

    // If the session user hasn't been loaded yet, temporarily substitute it
    // with the normal session. If there are things that are expected to be in
    // the session user that isn't in the normal session (e.g. dexes), this
    // could cause some problems and might need to be reworked, but right now,
    // it works.
    if (!user) {
      user = session;
    }

    let passwordInputs = null;

    if (password) {
      passwordInputs = (
        <div>
          <div className="form-group">
            <input className="form-control" ref={(c) => this._password = c} name="password" id="password" type="password" required placeholder="••••••••••••" />
            <i className="fa fa-asterisk" />
          </div>
          <div className="form-group">
            <input className="form-control" ref={(c) => this._password_confirm = c} name="password_confirm" id="password_confirm" type="password" required placeholder="••••••••••••" />
            <i className="fa fa-asterisk" />
          </div>
        </div>
      );
    }

    return (
      <DocumentTitle title="Account | Pokédex Tracker">
        <div className="account-container">
          <NavComponent />
          <ReloadComponent />
          <div className="form" ref={(c) => this._form = c}>
            <h1>{user.username}'s Account</h1>
            <form onSubmit={this.onSubmit} className="form-column">
              <AlertComponent message={error} type="error" />
              <AlertComponent message={success} type="success" />
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <button className="btn btn-inline btn-yellow" type="button" onClick={() => this.setState({ ...this.state, password: !password })}>
                  {password ? 'Cancel' : 'Change'}
                </button>
              </div>
              {passwordInputs}
              <div className="form-group">
                <label htmlFor="friend_code_3ds">3DS Friend Code</label>
                <input className="form-control" ref={(c) => this._friend_code_3ds = c} defaultValue={user.friend_code_3ds} name="friend_code_3ds" id="friend_code_3ds" type="text" placeholder="XXXX-XXXX-XXXX" onChange={(e) => this._friend_code_3ds.value = friendCode3DS(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="friend_code_switch">Switch Friend Code</label>
                <input className="form-control" ref={(c) => this._friend_code_switch = c} defaultValue={user.friend_code_switch} name="friend_code_switch" id="friend_code_switch" type="text" placeholder="SW-XXXX-XXXX-XXXX" onChange={(e) => this._friend_code_switch.value = friendCodeSwitch(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="language">Pokémon Name Language</label>
                <select className="form-control">
                  <option>English</option>
                </select>
                <i className="fa fa-chevron-down" />
              </div>
              <button className="btn btn-blue" type="submit">
                <span className={loading ? 'hidden' : ''}>Save <i className="fa fa-long-arrow-right" /></span>
                {loading ? <span className="spinner"><i className="fa fa-spinner fa-spin" /></span> : null}
              </button>
            </form>
          </div>
          <FooterComponent />
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ session, sessionUser }) {
  return { session, user: sessionUser };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion()),
    redirectToLogin: () => dispatch(push('/login')),
    updateUser: (payload) => dispatch(updateUser(payload))
  };
}

export const AccountComponent = connect(mapStateToProps, mapDispatchToProps)(Account);
