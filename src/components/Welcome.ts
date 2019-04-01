import * as React from "react";

const e = React.createElement;

export interface WelcomeProps { username: string; }

export const Welcome = (props: WelcomeProps) => e('p', null, `Welcome ${props.username}!`);