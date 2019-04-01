import * as React from "react";

const e = React.createElement;

export interface HelloProps { 
    compiler: string; 
    framework: string; 
}

export const Hello = (props: HelloProps) => e('h1', null, `Hello from ${props.compiler} and ${props.framework}!`);