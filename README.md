# frogger3
# frogger
frogger game from youtube video by Ania Kubów (https://www.youtube.com/watch?v=8T3naEnr67o)

added the timer function. 

clock turns red at 5 seconds. game over at 0

Start/pause/Play Again button. game waits for start click, pauses at pause click, and resets at play again click.




I was able to anticipate the next step throughout. Much of the time, I was able to find a way to create the next step before watching her soulution. 

My solutions differ from hers in several cases, but I tried not to stray too far afield.

Used textContent to change the display time and results span elements 

Used innerHTML to add an emoji to the 'you lose' message

Used setInterval to call the animation function every second 

Incremented a countdown variable each time the animation function was called 

Call the loser(), winner() on each interval using checkStatus(). Cannot call timer() on the frogMove() as that advances the countdown as well, so that is a one-off call.


The move left / move right processes seem clumsy to me. Maybe reversing the div classes in the html for the right movement elements will allow me to clean up the js

Approaching MVP

### Screenshot


## Link
https://bp4924.github.io/frogger3/
