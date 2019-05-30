import React from "react"

export class TwitchConfigComponent extends React.Component {
    render() {
        return (
            <div className="twitch-config">
                Hello World!
                <input type="text" id="username" name="username" onSubmit={this.onSubmit}/>
                <input type="text" id="dexslug" name="dexslug" onSubmit={this.onSubmit}/>
            </div>
        )
    }
    get onSubmit() {
        return (event) => {
            event.preventDefault()
            console.log({
                "username": document.getElementById("username").value,
                "dexslug": document.getElementById("dexslug").value,
            })
            // TwitchExt.configuration.set("broadcaster", "0.0.1", JSON.stringify({
            //     "username": document.getElementById("username").value,
            //     "dexslug": document.getElementById("dexslug").value,
            // }))
        }
    }
}

// TODO: Read the initial values from the store! Redux.connect this.
// TODO: Style the config page to look halfway decent, with instructions on where to see the extension.
