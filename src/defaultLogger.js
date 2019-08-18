"use strict";

function getFunctionName(func) {
    return (func.name ? func.name : "anonymous")
}

function getTimestamp() {
    return (new Date()).toLocaleString();
}

export function defaultLogger(type, params) {
    switch (type) {
        case "action":
            console.group("%cDispatch action: %c%s", "color: gray; font-weight: lighter;", "color: black;", getFunctionName(params.action));
            if (params.customPayload !== undefined) {
                console.log("%c     default payload: %o", "color: #03A9F4; font-weight: bold;", params.defaultPayload);
                console.log("%c      custom payload: %o", "color: #4CAF50; font-weight: bold;", params.customPayload);
            } else {
                console.log("%c     default payload: %o", "color: #03A9F4; font-weight: bold;", params.defaultPayload);
                console.log("%c      custom payload: %cnone", "color: #4CAF50; font-weight: bold;", "color: gray;");
            }
            var detailOfFunctions = { action: params.action };
            if (params.payloadCreator !== undefined) {
                detailOfFunctions.payloadCreator = params.payloadCreator;
            }
            console.log("%c detail of functions: %o", "color: #9E9E9E; font-weight: bold;", detailOfFunctions);
            console.log("%c                  at: %c%s", "color: #9E9E9E; font-weight: bold;", "color: #9E9E9E; font-weight: lighter;", getTimestamp());

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
                console.log("%cnew state: %o", "color: #4CAF50; font-weight: bold;", params.newState);
            }

            if (params.effects !== undefined) {
                var displayEffects = [];
                for (var i = 0; i < params.effects.length; i++) {
                    var effect = params.effects[i];
                    displayEffects.push({ runner: effect[0], props: effect[1] });
                }

                console.log("%c  effects: %o", "color: #03A9F4; font-weight: bold;", displayEffects);
            }

            console.groupEnd();
            break;
    }
}