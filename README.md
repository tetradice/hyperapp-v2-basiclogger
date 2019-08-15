# hyperapp-v2-basiclogger

`hyperapp-v2-basiclogger` is basic logger middleware for [hyperapp V2](https://github.com/jorgebucaran/hyperapp).

## Install

```sh
# for npm
% npm install --save hyperapp-v2-basiclogger

# for Yarn
% yarn add hyperapp-v2-basiclogger
```

## Usage

Set logger in the "middleware" argument of the `app` function.

```jsx
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

## Contact
@tetradice ([GitHub Issues](https://github.com/tetradice/hyperapp-typing/issues) or [Twitter](https://twitter.com/tetradice))


## License
Unlicensed