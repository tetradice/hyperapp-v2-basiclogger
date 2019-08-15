"use strict";

export default function(baseDispatch){
    var prevState = undefined;

    return function(target, props){
        if(typeof target === "function") {
            // Invoke action (without payload)
            console.group("Dispatch action: " (target.name ? target.name : target));
            console.log("default payload: ", props);
            console.log(" custom payload: none");
            console.groupEnd();
        } else if (Array.isArray(target)) {
            if (typeof target[0] === "function") {
                // Invoke action (with payload)
                console.group("Dispatch action: ", (target[0].name ? target[0].name : target[0]));
                console.log("default payload: ", props);
                console.log(" custom payload: ", target[1]);
                console.groupEnd();
            } else {
                // Update state and invoke effects
                console.group("Dispatch new state and Effects");
                console.log("prev state:", prevState);
                console.log("next state:", target[0]);
                console.log("effects:", target.slice(1));
                console.groupEnd();

                prevState = target[0];
            }
        } else {
            // Update state
            console.group("Dispatch new state");
            console.log("prev state:", prevState);
            console.log("next state:", target);
            console.groupEnd();

            prevState = target;
        }

        return baseDispatch(target, props);
    }
} 