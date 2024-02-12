export {
    isMobile,
    isClass,
    add_valid_noValid,
    addTextofClassname,
    randomNumber,
    add_zavd_to_array,
    add_to_bilet,
    remove_tasks_bilets,
    modalWindows,
    onlyNumbers,
    randomArray
};
import {
    arrayzavd
} from './count.js';


//Функція, яка повертає true якщо це мобіл і false якщо ні
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//Видаляє клас у елемента якщо він є і додає його якщо немає
function isClass(el_name, class_name) {
    const el = document.querySelector(el_name)
    if (el.classList.contains(class_name)) {
        el.classList.remove(class_name)
    } else {
        el.classList.add(class_name);
    }
}

//Перевірка імейлу та додавання класу валід або но-валід інпуту в який вписується клас
function valid_email(input_value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input_value).toLowerCase());
}

//Очистка та додавання класів Валід або неВалід
function add_valid_noValid(index) {
    const email = document.getElementById(index);
    email.classList.remove('_valid-email');
    email.classList.remove('_no-valid-email');
    if (valid_email(email.value)) {
        email.classList.add('_valid-email')
    } else {
        email.classList.add('_no-valid-email')
    }
}

//Функція, яка додає текст в задане місце(працює по класнейму)
function addTextofClassname(beforeText, valueText, inerText, arterText) {
    for (let i = 0; i < inerText.length; i++) {
        if (typeof inerText[i].innerText !== 'undefined') {
            // IE8-
            inerText[i].innerText = beforeText + valueText.value + arterText;
        } else {
            // Нормальные браузеры
            inerText[i].textContent = valueText.value;
        }

    }
}
//Метод для перемішування массиву чисел
function randomNumber(array) {
    for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
}
//Додавання завдань до масиву
function add_zavd_to_array(zavd, array, ) {
    array.length = 0;
    for (let i = 0; i < zavd.length; i++) {
        if (zavd[i].value.length > 0) {
            array.push(zavd[i].value);
        }
    }
}
//Додавання завдань із масиву до білету
function add_to_bilet(array_zavd, default_value_zavd, place_about_zavd, count_bilet) {
    if (array_zavd.length === 0) {
        alert('Упс, сталась помилка. Ви не додали свої завдання в масив')
    } else if (default_value_zavd > array_zavd.length) {
        alert("Завдань в пам'яті менше ніж задано в білеті")
    } else {
        let arrayNumber = [];
        let arrayBilet = [];
        for (let i = 0; i < array_zavd.length; i++) {
            arrayNumber.push(i);
        }
        let randomArray = randomNumber(arrayNumber);
        for (let i = 0; i < default_value_zavd; i++) {
            arrayBilet[i] = array_zavd[randomArray[i]];
        }
        if (count_bilet.length == 1) {
            for (let i = 0; i < arrayBilet.length; i++) {
                place_about_zavd[0].innerHTML += '<div>' + (i + 1) + '. ' + arrayBilet[i] + '</div>';
            }
        } else {

            for (let i = 0; i < count_bilet.length; i++) {
                let arrayNumber = [];
                let arrayBilet = [];
                for (let i = 0; i < array_zavd.length; i++) {
                    arrayNumber.push(i);
                }
                let randomArray = randomNumber(arrayNumber);
                for (let j = 0; j < default_value_zavd; j++) {
                    arrayBilet[j] = array_zavd[randomArray[j]];
                }
                for (let j = 0; j < arrayBilet.length; j++) {
                    place_about_zavd[i].innerHTML += '<div>' + (j + 1) + '. ' + arrayBilet[j] + '</div>';
                }
            }
        }
    }
}
//Видалення Завдань із білету
function remove_tasks_bilets(bilet_task_container) {
    if (bilet_task_container[0].children.length > 0) {
        for (let i = 0; i < bilet_task_container.length; i++) {
            let children = bilet_task_container[i].children;
            let children_length = bilet_task_container[i].children.length;
            for (let j = 0; j < children_length; j++) {
                children[0].remove();
            }
        }
    }
}
//Функція для модальних вікон
function modalWindows(modal, span) {
    // Когда пользователь нажимает кнопку, открывается pop-up форма 
    modal.style.display = 'block';
    // Когда пользователь нажимает кнопку (x) <span>, закрывается окно формы
    span.onclick = function () {
        modal.style.display = 'none';
    }
    // Когда пользователь нажимает в любое место вне формы, закрыть окно формы
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
//Повертає тільки цілі числа
function onlyNumbers(input, count) {
    if (input.value > 0 && input.value % 1 === 0 && input.value !== '') {
        count = input.value;
    } else {
        count = 1;
    }
    return count;
}

function randomArray(array) {
    var arrayNumber = [];
    var newArray = [];
    for (let j = 0; j < array.length; j++) {
        arrayNumber[j] = j;
    }
    var randomArrayNumber = randomNumber(arrayNumber);
    for (let j = 0; j < array.length; j++) {
        newArray[j] = array[randomArrayNumber[j]];
    }
    return newArray;
}