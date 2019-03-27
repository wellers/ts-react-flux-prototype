import * as React from "react";

const e = React.createElement;

export interface WelcomeProps { username: string; }

export class Welcome extends React.Component<WelcomeProps, {}> {
    render() {
        return e('p', null, `Welcome ${this.props.username}!`);
    }
}