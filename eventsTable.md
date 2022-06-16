# `Board`

|Event|Description
---|---
|[*playercollision*](#playercollision)|The `Board` class has detected the collision of two `Player` sprites.

## Details
### `playercollision`

|Key|Value
---|---
|*player*|The `player` instance upon which the event is fired.
|*position*|A simple object `{ x, y }` representing the next coordinates where the `player` instance sprite will be drawn.

**Note**: whenever an animation occurs, the colliding sprite is considered to be the one the animated sprite is passing over.

# `Player`

|Event|Description
---|---
|[*playermoved*](#playermoved)|The `AnimationManager` class has started the animation of a `Player` sprite.
|[*playerstopped*](#playerstopped)|The `AnimationManager` class has stopped the animation of a `Player` sprite.
|[*playerclick*](#playerclick)|The user has clicked over a `Player` sprite to select or deselect said player.

## Side effects


## Details
### `playermoved`

|Key|Value
---|---
|*player*|The `player` instance upon which the event is fired.
|*position*|A simple object `{ x, y }` representing the next coordinates where the `player` instance sprite will be drawn.

**Note**: whenever an animation occurs, this event will be fired for every frame of that animation.

### `playerstopped`

|Key|Value
---|---
|*player*|The `player` instance upon which the event is fired.
