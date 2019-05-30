import './styles';

import { Provider }       from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { render }         from 'react-dom';

import { AppComponent } from './components/app';
import { Config }       from '../config';
import { Store }        from './stores';

function run () {
  render(
    <Provider store={Store}>
      <StripeProvider apiKey={Config.STRIPE_PUBLISHABLE_KEY}>
        <AppComponent />
      </StripeProvider>
    </Provider>,
    document.getElementById('root')
  );
}

if (document.getElementById('root')) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run);
}

import { setTwitch } from './actions/twitch';

const TwitchExt = require("twitchext")
TwitchExt.configuration.onChanged(() => {
    let configuration = {}
    if(!!TwitchExt.configuration.broadcaster) {
        try {
            configuration = JSON.parse(TwitchExt.configuration.broadcaster.content)
        } catch(error) {
            console.log(error)
        }
    }
    console.log(">>>", configuration)
    Store.dispatch(setTwitch({
        "isReady": true,
        "configuration": configuration
    }))
})

// const query = require("query-string").parse(location.search);
// console.log(query.mode === "config");
// window.setTimeout(() => {
//     TwitchExt.configuration.set("broadcaster", "0.0.1", JSON.stringify({
//         "username": "pkmncast", "dexslug": "pikavee-living-dex",
//     }))
// }, 1000)
