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