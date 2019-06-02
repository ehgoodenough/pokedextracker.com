import React from "react"
import * as ReactRedux from "react-redux"
import TwitchExt from "twitchext"

class TwitchConfig extends React.Component {
    render() {
        // if(this.props.twitch.isReady != true) {
        //     return (
        //         <div className="loading">
        //             Loading...
        //         </div>
        //     )
        // }
        this.props.twitch.configuration = this.props.twitch.configuration || {}
        return (
            <div className="twitch-config">
                <section className="instructions">
                    <div className="step">
                        <div className="number">1</div>
                        <div className="text">
                            <b>Set your username!</b>
                            This is your username on pokedextracker.com, not on twitch.tv.
                        </div>
                    </div>
                    <div className="step">
                        <div className="number">2</div>
                        <div className="text">
                            <b>Set a default dex. (Optional)</b>
                            If you don't specify a default dex, we'll just show all your dexes.
                        </div>
                    </div>
                    <div className="step">
                        <div className="number">3</div>
                        <div className="text">
                            <b>Activate the extension!!</b>
                            Close this configuration page, and then activate it is a panel.
                        </div>
                    </div>
                </section>
                <section className="options">
                    <form onSubmit={this.onSubmit}>
                        <div className="option">
                            <label htmlFor="username">
                                <span className="name">Username</span>
                                <span className="url">/u/<b>ashketchum10</b></span>
                            </label>
                            <input type="text" id="username" name="username" defaultValue={this.props.twitch.configuration.username} placeholder="ashketchum10"/>
                        </div>
                        <div className="option">
                            <label htmlFor="dexslug">
                                <span className="name">Dex</span>
                                <span className="url">/u/ashketchum10/<b>living-dex</b></span>
                            </label>
                            <input type="text" id="dexslug" name="dexslug" defaultValue={this.props.twitch.configuration.dexslug}/>
                        </div>
                        <div className="option">
                            <input className="submit" type="submit" value="Save"/>
                            {this.confirmation}
                        </div>
                    </form>
                </section>
            </div>
        )
    }
    get confirmation() {
        if(this.state && this.state.confirmationDate) {
            return (
                <div className="confirmation" key={this.state.confirmationDate}>
                    Saved! Will be available on reload.
                </div>
            )
        }
    }
    get onSubmit() {
        return (event) => {
            event.preventDefault()
            const username = document.getElementById("username").value
            const dexslug = document.getElementById("dexslug").value
            TwitchExt.configuration.set("broadcaster", "0.0.1", JSON.stringify({ username, dexslug }))
            this.setState({"confirmationDate": Date.now()})
            // TODO: Also push the data to the local store.
        }
    }
}

export const TwitchConfigComponent = ReactRedux.connect(({twitch}) => ({twitch}))(TwitchConfig)
