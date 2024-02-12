import {
    add_zavd_to_array,
    modalWindows,
    randomArray,
    remove_tasks_bilets
} from './functions.js';
import {
    arrayzavd,
    arrayLevelOne,
    arrayLevelTwo,
    arrayLevelThree
} from './count.js';

let look_rating_modal = 0;

document.addEventListener("DOMContentLoaded", function () {
    //Відкриття модального вікна логіну
    if (document.getElementById('login__off-button') !== null) {
        document.getElementById('login__off-button').addEventListener('click', function () {
            let modal = document.getElementById('modal-login');
            let span = document.getElementById('login-page__close');
            modalWindows(modal, span);
        })
    }
    //Відкриття модального вікна виходу
    if (document.getElementById('exit_pc') !== null) {
        document.getElementById('exit_pc').addEventListener('click', function () {
            let modal = document.getElementById('modal-exit');
            let span = document.getElementById('exit-close');
            document.getElementById('exit__form-no').onclick = function () {
                modal.style.display = 'none';
            }
            document.getElementById('exit__form-yes').onclick = function () {
                alert('exit')
            }
            modalWindows(modal, span);
        })
    }
    //Функцыыя
    if (document.getElementById('add_rating_task') !== null) {
        document.getElementById('add_rating_task').addEventListener('click', function () {
            if (look_rating_modal > 0) {
                alert('Це модальне вікно можна відкривати тільки один раз. ПЕРЕЗАВАНТАЖЕННЯ СТОРІНКИ БЕЗ ЗБЕРЕЖЕННЯ!!!')
                location.reload();
            } else {
                look_rating_modal = look_rating_modal + 1;
            }
            let textarea_tasks = document.getElementsByClassName('first-row__textarea');
            if (textarea_tasks.length > 0) {
                add_zavd_to_array(textarea_tasks, arrayzavd);
                // Объявить переменную модального окна в текущей области видимости
                var modal = document.getElementById('rating__modal');
                // Получение элемента <span>, который закрывает модальное окно
                var span = document.getElementsByClassName('content-modal__close-rating')[0];
                modalWindows(modal, span);
                // Створення таблиці
                let tasklist = document.getElementById('rating_tasklist');
                let add_to_shablon = document.getElementById('content-modal_btn');
                for (let i = 0; i < arrayzavd.length; i++) {
                    tasklist.insertAdjacentHTML('beforeend', '<div class="tasklist-rating__column">' +
                        '<div class="tasklist-rating__column-task">' + arrayzavd[i] + '</div>' +
                        '<div class="tasklist-rating__column-radio">' +
                        '<input type="radio" name="' + i + '" class="shsh" value="1">1' +
                        '<input type="radio" name="' + i + '" class="shsh" value="2">2' +
                        '<input type="radio" name="' + i + '" class="shsh" value="3">3' +
                        '</div>' +
                        '</div>')
                }
                add_to_shablon.addEventListener('click', function () {
                    remove_tasks_bilets(document.getElementsByClassName('task__bilet'));
                    let rows = document.getElementsByClassName('tasklist-rating__column');
                    let column_task = document.getElementsByClassName('tasklist-rating__column-task');
                    for (let i = 0; i < rows.length; i++) {
                        let radio = document.getElementsByName(i);
                        for (let j = 0; j < radio.length; j++) {
                            // console.log(i + '\t' + radio[j].value);

                            if (radio[j].value == '1' && radio[j].checked) {
                                arrayLevelOne.push(column_task[i].innerText)
                            } else if (radio[j].value == '2' && radio[j].checked) {
                                arrayLevelTwo.push(column_task[i].innerText)
                            } else if (radio[j].value == '3' && radio[j].checked) {
                                arrayLevelThree.push(column_task[i].innerText)
                            }

                        }
                    }

                    let one_input = document.getElementById('content-modal__one-level');
                    let two_input = document.getElementById('content-modal__two-level');
                    let three_input = document.getElementById('content-modal__three-level');
                    let bilet_task = document.getElementsByClassName('bilet__task');
                    for (let i = 0; i < bilet_task.length; i++) {
                        var new_array = arrayZavdforLevel(arrayLevelOne, one_input.value, arrayLevelTwo, two_input.value, arrayLevelThree, three_input.value);
                        for (let j = 0; j < new_array.length; j++) {
                            bilet_task[i].innerHTML += '<div>' + (j + 1) + '. ' + new_array[j] + '</div>';
                        }
                    }
                })
            }
        })
    }
})






function arrayZavdforLevel(one, countOne, two, countTwo, three, countThree) {
    if (countOne > 0 && countOne % 1 === 0 || countTwo > 0 && countTwo % 1 === 0 || countThree > 0 && countThree % 1 === 0) {
        var newOne = randomArray(one);
        var newTwo = randomArray(two);
        var newThree = randomArray(three);
        var newArray = [];
        for (let i = 0; i < countOne; i++) {
            newArray.push(newOne[i])
        }
        for (let i = 0; i < countTwo; i++) {
            newArray.push(newTwo[i])
        }
        for (let i = 0; i < countThree; i++) {
            newArray.push(newThree[i])
        }
        return newArray;
    }

}