"use strict";

export default function(baseDispatch){
    var prevState = undefined;
    var reservedDefaultPayload = undefined;
    var reservedCustomPayload = undefined;

    return function(target, props){
        if (typeof target === "function") {
            // Invoke action
            console.group("Dispatch action: ", (target.name ? target.name : target));
            if (reservedDefaultPayload !== undefined){
                // with custom payload (or payload creator)
                if (typeof reservedCustomPayload === 'function'){
                    console.log("       default payload:", reservedDefaultPayload);
                    console.log("       payload creator:", reservedCustomPayload);
                    console.log("created custom payload:", props);
                } else {
                    console.log("default payload:", reservedDefaultPayload);
                    console.log(" custom payload:", reservedCustomPayload);
                }

                reservedDefaultPayload = undefined;
                reservedCustomPayload = undefined;
            } else {
                // without custom payload
                console.log("default payload:", props);
                console.log(" custom payload:", "none");
           }
            console.groupEnd();
        } else if (Array.isArray(target)) {
            if (typeof target[0] === "function") {
                // Invoke action (with payload) - delayed until next dispatch
                reservedDefaultPayload = props;
                reservedCustomPayload = target[1];
            } else {
                // Update state and invoke effects
                console.group("Dispatch state and Effects");
                console.log("prev state:", prevState);
                console.log("next state:", (prevState === target[0] ? '(unchanged)' : target[0]));
                console.log("   effects:", target.slice(1));
                console.groupEnd();

                prevState = target[0];
            }
        } else {
            // Update state
            console.group("Dispatch state");
            console.log("prev state:", prevState);
            console.log("next state:", (prevState === target ? '(unchanged)' : target));
            console.groupEnd();

            prevState = target;
        }

        return baseDispatch(target, props);
    }
} 