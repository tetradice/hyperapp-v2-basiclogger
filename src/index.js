"use strict";

import { defaultLogger } from "./defaultLogger";
export { defaultLogger } from "./defaultLogger";

export function createLoggerMiddleware(loggerFunction) {
    if (loggerFunction === undefined) loggerFunction = defaultLogger;

    return function (baseDispatch) {
        var oldState = undefined;
        var reservedDefaultPayload = undefined;
        var reservedCustomPayload = undefined;

        return function (target, props, defaultPayload) {
            var result = undefined;
            
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
                    loggerFunction("action", { action: target, defaultPayload: props });
                }

                result = baseDispatch(target, props, defaultPayload);
                loggerFunction("actionEnd", undefined);

            } else if (Array.isArray(target)) {
                if (typeof target[0] === "function") {
                    // Invoke action (with payload) - delayed until next dispatch
                    reservedDefaultPayload = props;
                    reservedCustomPayload = target[1];
                    result = baseDispatch(target, props, defaultPayload);
                } else {
                    // Update state and invoke effects
                    loggerFunction("state", { oldState: oldState, newState: target[0], changed: oldState === target[0], effects: target.slice(1) });
                    result = baseDispatch(target, props, defaultPayload);
                    loggerFunction("stateEnd", undefined);

                    oldState = target[0];
                }
            } else {
                // Update state
                loggerFunction("state", { oldState: oldState, newState: target, changed: oldState === target });
                result = baseDispatch(target, props, defaultPayload);
                loggerFunction("stateEnd", undefined);

                oldState = target;
            }

            return result;
        }
    }
}

export default createLoggerMiddleware(defaultLogger);