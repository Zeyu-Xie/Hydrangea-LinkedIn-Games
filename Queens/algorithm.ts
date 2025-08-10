// Global variable `board`
const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(-1));

/*
    1. Init
    Get `pt_solutions` and `N`.
*/

const pt_solutions: number[][] = [];
function _dfs(step: number, is_boooked: boolean[], queens: number[]) {
    if (step === 9) {
        pt_solutions.push(queens.slice());
        return;
    }
    else {
        for (let i: number = 0; i < 9; i++) {
            if (is_boooked[i])
                continue;
            if ([i - 1, i, i + 1].includes(queens[step - 1]))
                continue;
            is_boooked[i] = true;
            queens[step] = i;
            _dfs(step + 1, is_boooked, queens);
            is_boooked[i] = false;
            queens[step] = -1;
        }
    }
}
_dfs(0, Array(9).fill(false), Array(9).fill(-1));
const N: number = pt_solutions.length;

/*
    2. Calculate Solutions
    Define a function `get_solutions`.
*/

function _is_ok(queens: number[], board: number[][]): boolean {
    const is_boooked: boolean[] = Array(9).fill(false);
    for (let i: number = 0; i < 9; i++) {
        if (is_boooked[board[i][queens[i]]])
            return false;
        is_boooked[board[i][queens[i]]] = true;
    }
    return true;
}
function get_solutions(board: number[][]): number[][] {
    const solutions: number[][] = [];
    for (let i: number = 0; i < N; i++)
        if (_is_ok(pt_solutions[i], board))
            solutions.push(pt_solutions[i].slice());
    return solutions;
}