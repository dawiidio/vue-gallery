export interface Action<P> {
    payload?: P
    type: string
}

export type ActionCreator<P> = (payload?: P) => Action<P> & {
    toString(): string
};

export function createAction<P>(type: string): ActionCreator<P>{
    function mutationCreator(payload?: P): Action<P> {
        return {
            type,
            payload
        }
    }

    mutationCreator.toString = () => `${type}`;

    return mutationCreator;
}
