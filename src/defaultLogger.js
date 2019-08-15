"use strict";

export function defaultLogger(type, params) {
    switch (type) {
        case "action":
            console.group("%cDispatch action:", "color: gray; font-weight: lighter;", (params.action.name ? params.action.name : params.action));
            if (params.payloadCreator !== undefined) {
                console.log("%c       default payload:", "color: #03A9F4; font-weight: bold;", params.defaultPayload);
                console.log("%c       payload creator:", "color: #9E9E9E; font-weight: bold;", params.payloadCreator);
                console.log("%ccreated custom payload:", "color: #4CAF50; font-weight: bold;", params.customPayload);

            } else if (params.customPayload !== undefined) {
                console.log("%cdefault payload:", "color: #03A9F4; font-weight: bold;", params.defaultPayload);
                console.log("%c custom payload:", "color: #4CAF50; font-weight: bold;", params.customPayload);
            } else {
                console.log("%cdefault payload:", "color: #03A9F4; font-weight: bold;", params.defaultPayload);
                console.log("%c custom payload: %cnone", "color: #4CAF50; font-weight: bold;", "color: gray;");
            }
            console.groupEnd();

            break;

        case "state":
            if (params.effects !== undefined) {
                console.group("%cDispatch state and effects", "color: gray; font-weight: lighter;");
            } else {
                console.group("%cDispatch state", "color: gray; font-weight: lighter;");
            }

            if (params.changed) {
                console.log("%cnew state: %cunchanged", "color: #4CAF50; font-weight: bold;", "color: gray;");
            } else {
                console.log("%cnew state:", "color: #4CAF50; font-weight: bold;", params.newState);
            }

            if (params.effects !== undefined) {
                var displayEffects = [];
                for (var i = 0; i < params.effects.length; i++) {
                    var effect = params.effects[i];
                    displayEffects.push({ runner: effect[0], props: effect[1] });
                }

                console.log("%c   effects:", "color: #03A9F4; font-weight: bold;", displayEffects);
            }

            console.groupEnd();
            break;
    }
}