export interface Mutation<P> {
    payload: P
    type: string
}

export type MutationCreator<P> = (payload: P) => Mutation<P> & {
    toString(): string
};

export function createMutation<P>(type: string): MutationCreator<P>{
    function mutationCreator(payload: P): Mutation<P> {
        return {
            type,
            payload
        }
    }

    mutationCreator.toString = () => `${type}`;

    return mutationCreator;
}
