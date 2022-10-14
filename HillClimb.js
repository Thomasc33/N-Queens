const closedList = new Set()

function generateMoves(board) {
    closedList.add(JSON.stringify(board))
    let moves = []
    for (let i of Array(board.length).keys()) {
        i += 1 // Using 1->N instead of 0->N-1, so add 1

        // Get current
        let row, col
        for (let r of Array(board.length).keys()) {
            if (row && col) break
            for (let c of Array(board.length).keys()) {
                if (board[r][c] == i) { row = r; col = c; break; }
            }
        }

        // Generate moves with column change
        for (let j of Array(board.length).keys()) {
            if (j == col) continue
            if (board[row][j]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[row][j] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }

        // Generate moves with row change
        for (let j of Array(board.length).keys()) {
            if (j == row) continue
            if (board[j][col]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[j][col] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }

        // Generate row with diagnal change

        // -1 -1
        let r = row, c = col
        while (true) {
            r -= 1; c -= 1
            if (r == -1 || c == -1) break;
            if (board[r][c]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[r][c] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }
        // -1 +1
        r = row; c = col
        while (true) {
            r -= 1; c += 1
            if (r == -1 || c == board.length) break;
            if (board[r][c]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[r][c] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }
        // +1 -1
        r = row; c = col
        while (true) {
            r += 1; c -= 1
            if (r == board.length || c == -1) break;
            if (board[r][c]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[r][c] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }
        // +1 +1
        r = row; c = col
        while (true) {
            r += 1, c += 1
            if (r == board.length || c == board.length) break;
            if (board[r][c]) continue
            let t = JSON.parse(JSON.stringify(board))
            t[row][col] = 0
            t[r][c] = i
            if (closedList.has(JSON.stringify(t))) continue
            moves.push(t)
        }
    }
    return moves
}

function evaluateMoves(moves) {
    // Holds the best step
    let max = { board: undefined, heuristic: -1 }
    for (let i of moves) {
        if (!i) continue
        // Calculate the min-conflict heuristic
        let h = calculateHeuristic(i)

        // If it has a lower heuristic, update the best step
        if (h < max.heuristic || max.heuristic == -1) {
            max.board = i
            max.heuristic = h
        }
    }
    // Add the new board to the closed list so that it doesn't get selected again
    closedList.add(JSON.stringify(max.board))

    // Returns the best step
    return max.board
}

function calculateHeuristic(board) {
    let conflicts = 0

    for (let i of Array(board.length).keys()) {
        i += 1 // Using 1->N instead of 0->N-1, so add 1

        // Get current
        let row, col
        for (let r of Array(board.length).keys()) {
            if (row && col) break
            for (let c of Array(board.length).keys()) {
                if (board[r][c] === i) { row = r; col = c; break; }
            }
        }

        // Generate moves with column change
        for (let j of Array(board.length).keys()) {
            if (j == col) continue
            // If the space contains a queen
            // Using javascript truthy to check, 0 == false, 1-inf == true
            if (board[row][j]) conflicts++
        }

        // Generate moves with row change
        for (let j of Array(board.length).keys()) {
            if (j == row) continue
            if (board[j][col]) conflicts++
        }

        // Generate row with diagnal change

        // -1 -1
        let r = row, c = col
        while (true) {
            r -= 1; c -= 1
            if (r == -1 || c == -1) break;
            if (board[r][c]) conflicts++
        }
        // -1 +1
        r = row; c = col
        while (true) {
            r -= 1; c += 1
            if (r == -1 || c == board.length) break;
            if (board[r][c]) conflicts++
        }
        // +1 -1
        r = row; c = col
        while (true) {
            r += 1; c -= 1
            if (r == board.length || c == -1) break;
            if (board[r][c]) conflicts++
        }
        // +1 +1
        r = row; c = col
        while (true) {
            r += 1, c += 1
            if (r == board.length || c == board.length) break;
            if (board[r][c]) conflicts++
        }
    }

    // Since all conflicts will show up twice, divide conflicts by 2
    return conflicts / 2
}

function logBoard(Board) {
    // Tunables for logging
    // If 0's and 1's hurt your eyes, maybe try _ and Q
    let empty = '0'
    let queen = '1'
    console.log(Board.map(m => m.map(n => `${n ? queen : empty}`).join(' ')).join('\n'))
}

// Makes the functions accessible when imported in index.js
module.exports = {
    generateMoves,
    evaluateMoves,
    calculateHeuristic,
    logBoard
}