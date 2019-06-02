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
                            <input type="text" id="dexslug" name="dexslug" defaultValue={this.props.twitch.configuration.dexslug} placeholder="living-dex"/>
                        </div>
                        <div className="option">
                            <input className="submit" type="submit" value="Save"/>
                            {this.confirmation}
                        </div>
                    </form>
                </section>
                <section className="instructions">
                </section>
            </div>
        )
    }
    get confirmation() {
        if(this.state && this.state.confirmationDate) {
            return (
                <div className="confirmation" key={this.state.confirmationDate}>
                    Saved to your extension!
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
