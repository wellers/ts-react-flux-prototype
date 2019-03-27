import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Welcome } from "./components/Welcome";

const e = React.createElement;

ReactDOM.render(
    e('div', null,
        Hello({ compiler: "TypeScript", framework: "React" }),
        e(Welcome, { username: "Paul" }, null)
    ),
    document.getElementById("example")
);