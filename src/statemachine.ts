/**
 * Defines the contract for the definition of the
 * complete (Start + Input = Next) transitions in a state machine
 */
export interface ITransitionProvider<
  TState extends IState,
  TInput extends IInput,
  TTransitionStart extends ITransitionStart<TState, TInput>
> {
  /**
   * Set the allowed transitions for the transitionable entity
   */
  readonly transitions: [TTransitionStart, TState][];
}

/**
 * Defines the contract for an object in a state machine
 * that holds the information about its current state
 */
export interface ITransitionable<TState> {
  /**
   * Get the current state
   */
  currentState: TState;
}

/**
 * Defines the contract for an object in a state machine
 * that manages both the state transitions AND the information
 * about its current state.
 */
export interface ITransitionManagerInternal<
  TState extends IState,
  TInput extends IInput
> {
  /**
   * Get the next state given the input
   * @param input
   */
  getNext(input: TInput): TState;

  /**
   * Update the current state, given the input
   * @param input
   */
  update(input: TInput): void;
}

/**
 * Defines the contract for an object in a state machine
 * that manages the state transitions over an ITransitionable<T>
 * entity
 */
export interface ITransitionManager<
  TState extends IState,
  TInput extends IInput,
  TTransitionable extends ITransitionable<TState>
> {
  /**
   * Get the next state given the input
   * @param input
   */
  getNext(entity: TTransitionable, input: TInput): TState;

  /**
   * Update the current state, given the input
   * @param input
   */
  update(entity: TTransitionable, input: TInput): void;
}

/**
 * Defines the contract for a transition start condition in a state machine
 */
export interface ITransitionStart<
  TState extends IState,
  TInput extends IInput
> {
  state: TState;
  input: TInput;
}

interface IState {}
interface IInput {}

/**
 * A Player's state
 */
export enum PlayerStateEnum {
  IDLE,
  WAITING,
  MOVING,
  MOVED,
  SELECTED,
}

/**
 * The possible inputs for a Player's state
 */
export enum PlayerInputEnum {
  SELECT,
  MOVE,
  STOP,
  DESELECT,
}

/**
 * The allowed starting state and inputs for a transition
 * in a Players state machine
 */
export class PlayerTransition
  implements ITransitionStart<PlayerStateEnum, PlayerInputEnum>
{
  constructor(public state: PlayerStateEnum, public input: PlayerInputEnum) {}
}
