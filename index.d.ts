export type LoggerFunction = (type: ('action' | 'state'), params: {
    action: Function
    , defaultPayload: any
    , payloadCreator: Function
    , customPayload: any
    , effects?: Array<[Function, any]>
    , oldState: any
    , newState: any
    , changed: boolean
}) => void;

export var defaultLogger: LoggerFunction;

type Middleware = (baseDispatch: (action: any, props: any) => any) => ((action: any, props: any) => any);

export function createLoggerMiddleware(logger: LoggerFunction): Middleware;

declare const logger: Middleware;
export default logger;