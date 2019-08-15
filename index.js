"use strict";

export function defaultLogger(type, params){
    switch(type){
        case "action":
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

        case "state":
            console.group("Dispatch state");
            console.log("prev state:", params.prevState);
            console.log("next state:", (params.changed ? '(unchanged)' : params.nextState));
            console.groupEnd();
            break;

        case "stateAndEffects":
            console.group("Dispatch state and Effects");
            console.log("prev state:", params.prevState);
            console.log("next state:", (params.changed ? params.nextState : "(unchanged)"));

            var displayEffects = [];
            for(var i = 0; i < params.effects.length; i++){
                var effect = params.effects[i];
                displayEffects.push({ runner: effect[0], props: effect[1] });
            }

            console.log("   effects:", displayEffects);
            console.groupEnd();
            break;
    }
}

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