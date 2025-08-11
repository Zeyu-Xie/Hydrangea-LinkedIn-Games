// Arguments
const MAX_SOLUTION_NUM = 20;

// Global variable `current_color`
let current_color = 0;

/* 1. Select Color */

const _color_selector_bar = document.querySelector("#color-selector-bar");
const _color_selector_button_list = _color_selector_bar.querySelectorAll("div");
const _current_color_button = document.querySelector("#current-color-bar div");

const color_num = _color_selector_button_list.length;
for (let i = 0; i < color_num; i++) {
    const _color_selector_button = _color_selector_button_list[i];
    const color_idx = Number(_color_selector_button.className.split("color-")[1]);
    _color_selector_button.addEventListener("click", () => {
        current_color = color_idx;
        _current_color_button.className = `color-${color_idx}`;
    });
}

/* 2. Fill Color */

const _td_list = document.querySelectorAll("#board > table td");

const td_num = _td_list.length;
for (let i = 0; i < td_num; i++) {
    const _td = _td_list[i];
    _td.addEventListener("click", () => {
        _td.className = `color-${current_color}`;
    });
}

/* 3. Load preset board button */

const _load_preset_board_button = document.querySelector("#load-preset-board-button");

_load_preset_board_button.addEventListener("click", async () => {
    await fetch("./assets/preset_boards.json")
        .then(res => res.json())
        .then(res => {
            board = res[1];
        })
        .catch(err => console.error(err));
    for (let i = 0; i < td_num; i++) {
        const _td = _td_list[i];
        _td.className = `color-${board[Number(_td.dataset.row)][Number(_td.dataset.col)]}`;
    }
})

/* 4. Submit board */

const _submit_button = document.querySelector("#submit-button");
const _solutions_div = document.querySelector("#solutions");

_submit_button.addEventListener("click", () => {

    // Get data for `board`
    for (let i = 0; i < td_num; i++) {
        const _td = _td_list[i];
        if (_td.className === "") {
            window.alert("Please fill the blanks before submitting.");
            return;
        }
        const row = Number(_td.dataset.row);
        const col = Number(_td.dataset.col);
        const color = Number(_td.className.split("color-")[1])
        board[row][col] = color;
    }
    console.log(board);

    // Calculate solutions
    solutions = get_solutions(board);
    const solutions_num = solutions.length;
    console.log(`Find ${solutions_num} ${solutions_num === 1 ? "solution" : "solutions"}.`);
    console.log(solutions);


    // Render solutions to the solutions div
    _solutions_div.innerHTML = "";
    for (let i = 0; i < solutions_num; i++) {
        if (i >= MAX_SOLUTION_NUM)
            break;
        const _solution_table = document.createElement("table");
        for (let j = 0; j < 9; j++) {
            const _tr = document.createElement("tr");
            for (let k = 0; k < 9; k++) {
                const _td = document.createElement("td");
                _td.className = `color-${board[j][k]}`;
                if (solutions[i][j] === k) {
                    const _img = document.createElement("img");
                    _img.src = "./assets/crown.svg";
                    _td.appendChild(_img);
                }
                _tr.appendChild(_td);
            }
            _solution_table.appendChild(_tr);
        }
        _solutions_div.appendChild(_solution_table);
    }
})