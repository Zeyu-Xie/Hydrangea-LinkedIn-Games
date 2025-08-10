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

/* 3. Submit board */

const _submit_button = document.querySelector("#submit-button");

_submit_button.addEventListener("click", () => {
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
    solutions = get_solutions(board);
    console.log(solutions);
})