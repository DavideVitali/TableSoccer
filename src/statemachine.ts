export interface ITransitionProvider<TState extends IState, TInput extends IInput, TTransitionStart extends ITransitionStart<TState, TInput>> {
  /**
   * Set the allowed transitions for the transitionable entity
   */
  readonly transitions: [TTransitionStart, TState][];
}

export interface IStateable<TState> {
    /**
   * Get the current state
   */
    currentState: TState;
}

export interface ITransitionable<
  TState extends IState,
  TInput extends IInput,
  TStateable extends IStateable<TState>
> {
  /**
   * Get the next state given the input
   * @param input 
   */
  getNext(entity: TStateable, input: TInput): TState;

  /**
   * Update the current state, given the input
   * @param input 
   */
  update(entity: TStateable, input: TInput): void;
}

export interface ITransitionStart<TState extends IState, TInput extends IInput> {
  state: TState;
  input: TInput;
}

interface IState {}
interface IInput {}

export enum PlayerStateEnum {
  IDLE,
  WAITING,
  MOVING,
  MOVED,
  SELECTED,
};

export enum PlayerInputEnum {
  SELECT,
  MOVE,
  STOP,
  DESELECT,
};

export class PlayerTransition
  implements ITransitionStart<PlayerStateEnum, PlayerInputEnum>
{
  constructor(public state: PlayerStateEnum, public input: PlayerInputEnum) {}
}
