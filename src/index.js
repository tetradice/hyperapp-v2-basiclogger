"use strict";

import { defaultLogger } from "./defaultLogger";

export function createLoggerMiddleware(loggerFunction){
    return function (baseDispatch) {
        var prevState = undefined;
        var reservedDefaultPayload = undefined;
        var reservedCustomPayload = undefined;

        var loggerFunction = defaultLogger;

        return function (target, props) {
            if (typeof target === "function") {
                // Invoke action
                if (reservedDefaultPayload !== undefined) {
                    // with custom payload (or payload creator)
                    if (typeof reservedCustomPayload === 'function') {
                        loggerFunction("action", { action: target, defaultPayload: reservedDefaultPayload, payloadCreator: reservedCustomPayload, customPayload: props });
                    } else {
                        loggerFunction("action", { action: target, defaultPayload: reservedDefaultPayload, customPayload: props });
                    }

                    reservedDefaultPayload = undefined;
                    reservedCustomPayload = undefined;
                } else {
                    // without custom payload
                    loggerFunction("action", { action: target, defaultPayload: reservedDefaultPayload });
                }
            } else if (Array.isArray(target)) {
                if (typeof target[0] === "function") {
                    // Invoke action (with payload) - delayed until next dispatch
                    reservedDefaultPayload = props;
                    reservedCustomPayload = target[1];
                } else {
                    // Update state and invoke effects
                    loggerFunction("stateAndEffects", { prevState: prevState, nextState: target[0], changed: prevState === target[0], effects: target.slice(1) });

                    prevState = target[0];
                }
            } else {
                // Update state
                loggerFunction("state", { prevState: prevState, nextState: target, changed: prevState === target });

                prevState = target;
            }

            return baseDispatch(target, props);
        }
    }
}

export default createLoggerMiddleware(defaultLogger);