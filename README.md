## Algorithm Used

This local search utilized the hill climb algorithm with a greedy min-conflict heuristic

## How to run

### Requirements

[Node.js](https://nodejs.org/en/)
Written in 16.13.1, but *should* run on any version

### Executing

Change Directories to `N-Queens` folder

Then execute the command:

```
node .
```

## Additional Notes

The top section of the code has verbosity options. Additionally, I ran a few different N counts, I'll put their results below...

N=45 -> 98.502s
N=100 -> 4505.202s *

*Ran with increased ram (8gb) with the following command
```
node --max-old-space-size=8192 .
```