interface ITransitionProvider<TState extends IState, TInput extends IInput> {
  /**
   * Set the allowed transitions for the transitionable entity
   */
  readonly Transitions:[ITransitionStart<TState, TInput>, TInput][];
}

interface ITransitionable<
  TState extends IState,
  TInput extends IInput,
  TTransitionStart extends ITransitionStart<TState, TInput>
> {
  /**
   * Get the current state
   */
  currentState: TState;

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

interface ITransitionStart<TState extends IState, TInput extends IInput> {
  state: TState;
  input: TInput;
}

interface IState {}
interface IInput {}

enum PlayerStateEnum {
  IDLE,
  WAITING,
  MOVING,
  MOVED,
  SELECTED,
}
enum PlayerInputEnum {
  SELECT,
  MOVE,
  STOP,
  DESELECT,
}

class PlayerTransition
  implements ITransitionStart<PlayerStateEnum, PlayerInputEnum>
{
  constructor(public state: PlayerStateEnum, public input: PlayerInputEnum) {}
}

export class PlayerStateMachine
  implements ITransitionable<PlayerStateEnum, PlayerInputEnum, PlayerTransition>
{
  transitions: [PlayerTransition, PlayerStateEnum][] = [];
  currentState: PlayerStateEnum;

  constructor() {
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.IDLE, PlayerInputEnum.SELECT),
      PlayerStateEnum.WAITING,
    ]);
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.DESELECT),
      PlayerStateEnum.IDLE,
    ]);
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.MOVE),
      PlayerStateEnum.MOVING,
    ]);
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.MOVING, PlayerInputEnum.STOP),
      PlayerStateEnum.MOVED,
    ]);
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.MOVED, PlayerInputEnum.SELECT),
      PlayerStateEnum.SELECTED,
    ]);
    this.transitions.push([
      new PlayerTransition(PlayerStateEnum.SELECTED, PlayerInputEnum.DESELECT),
      PlayerStateEnum.MOVED,
    ]);
    this.currentState = PlayerStateEnum.IDLE;
  }

  getNext(input: PlayerInputEnum): PlayerStateEnum {
    let targetTransition = this.transitions
      .find((t) => {
        t[0].state === this.currentState && t[0].input === input;
      });

    if (!targetTransition) {
      throw new Error(
        `Input ${input} not allowed in ${this.currentState} state.`
      );
    }

    return targetTransition[1];
  }

  update(input: PlayerInputEnum): void {
    throw new Error("Method not implemented.");
  }
}
