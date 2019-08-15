# hyperapp-v2-basiclogger

`hyperapp-v2-basiclogger` is basic logging middleware for [hyperapp V2](https://github.com/jorgebucaran/hyperapp).

## Install

```sh
# for npm
% npm install --save hyperapp-v2-basiclogger

# for Yarn
% yarn add hyperapp-v2-basiclogger
```

## Usage

Set logger to the `middleware` argument of the `app` function.

```jsx
import { h, app } from "hyperapp";
import logger from "hyperapp-v2-basiclogger";

app({
    init: {count: 0},
    view: state => (
        <div>
            ...
        </div>
    ),
    node: document.getElementById("app"),
    middleware: logger
});
```

## Advanced: Custom logger

You can create middleware based on your own logger function by using `createLoggerMiddleware` function. This allows you to change the output format and destination.

```jsx
import { h, app } from "hyperapp";
import { createLoggerMiddleware } from "hyperapp-v2-basiclogger";

function customLogger(type, params){
    switch(type){
        case "action": // Invoke action
            // The following parameters are available:
            // - params.action          (function)
            // - params.defaultPayload  
            // - params.payloadCreator  (if you are not using payload creator, it is undefined)
            // - params.customPayload   (if you do not pass custom payload, it is undefined)

            console.group("Dispatch action:", (params.action.name ? params.action.name : params.action));
            if(params.payloadCreator !== undefined){
                console.log("       default payload:", params.defaultPayload);
                console.log("       payload creator:", params.payloadCreator);
                console.log("created custom payload:", params.customPayload);

            } else if(params.customPayload !== undefined){
                console.log("default payload:", params.defaultPayload);
                console.log(" custom payload:", params.customPayload);

            } else {
                console.log("default payload:", params.defaultPayload);
                console.log(" custom payload:", "none");
            }
            console.groupEnd();

            break;

        case "state": // Update state
            // The following parameters are available:
            // - params.oldState
            // - params.newState  
            // - params.changed    (true if prevState and nextState are different, false otherwise)
            // - params.effects    (if no effect has occurred, it is undefined)

            break;
    }
}

app({
    init: {count: 0},
    view: state => (
        <div>
            ...
        </div>
    ),
    node: document.getElementById("app"),
    middleware: createLoggerMiddleware(customLogger)
});
```

## Contact
@tetradice ([GitHub Issues](https://github.com/tetradice/hyperapp-v2-basiclogger/issues) or [Twitter](https://twitter.com/tetradice))


## License
Unlicensed