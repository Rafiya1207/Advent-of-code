**emergency hull** runs the intcode program by providing the **color** (initially black) and **getting back the color to be painted** and **direction** to turn from intcode.

--> color
  --> run intcode on by setting it's inputs
  | --> step forward 
  | --> check it provided the outputs
  | --> color the panel  
  | --> head to the outputted direction
  | --> clear the outputs
  <-- 
--> count of panels

```
 panel number starts from 0 and gets incremented if it is not painted atleast once by robot
 
```

robot
- current position
- current direction

panels
- panel number
- color

directions map
- 