// Queen Count
const N = 8

// Verbose Level: 0 = off, 1 = print all steps
const verbose = 0

// Import for the local search code
const HillClimb = require('./HillClimb')

// Create NxN board of 0's
const BoardGen = () => Array.from({ length: N }).fill(0)
const Board = Array.from({ length: N }).map(BoardGen)

// Get start time
const startTime = Date.now()

// Main code

// Place Queens
for (let i of Array(N).keys()) {
    // Returns {0-n, 0-n}
    let getPotential = () => { return { r: Math.floor(Math.random() * N), c: Math.floor(Math.random() * N) } }

    // Recursively checks to see if the randomly generated spot is okay, then returns it
    let getLoc = () => {
        let { r, c } = getPotential()
        if (Board[r][c]) return getLoc()
        else return { r, c }
    }

    let { r, c } = getLoc()
    Board[r][c] = i + 1
}

// Clones the starting board
let workingBoard = JSON.parse(JSON.stringify(Board))

// Step counter
let steps = 0

while (true) {
    // Get potential moves
    let moves = HillClimb.generateMoves(workingBoard)

    // Set the board to the best move (lowest hueristic)
    workingBoard = HillClimb.evaluateMoves(moves)


    // Increment step counter
    steps++

    // Verbosity
    if (verbose) {
        console.log(`\n\nStep: ${steps}\n`)
        HillClimb.logBoard(workingBoard)
    }

    // Check to see if it is solved
    // Since using min-conflict heuristic, check to see if that is 0
    if (HillClimb.calculateHeuristic(workingBoard) == 0) break
}

// Log the information about the solution
console.log(`\n\n\n------------------------------\n`)
console.log('Solution Found\n')
console.log(`Queen Count: ${N}`)
console.log(`Step Count: ${steps}`)
console.log(`Time Taken: ${(Date.now() - startTime) / 1000}s`)
console.log(`\n------------------------------\n`)
console.log(`Initial Board:\n`)
HillClimb.logBoard(Board)
console.log(`\n\nSolution Board:\n`)
HillClimb.logBoard(workingBoard)
console.log(`\n------------------------------`)

