import * as React from "react";

export interface WelcomeProps { 
    username: string; 
}

export const Welcome = (props: WelcomeProps) => (<p>Welcome {props.username}!</p>);