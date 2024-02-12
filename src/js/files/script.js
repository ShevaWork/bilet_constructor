import {
    isClass,
    add_valid_noValid,
    addTextofClassname,
    add_zavd_to_array,
    add_to_bilet,
    remove_tasks_bilets
} from './functions.js';
import {
    defaultValueZavd,
    valid_acount,
    arrayzavd
} from './count.js';

//Функції кнопки стрілки коли користувач залогінений
document.querySelector('.on-login__arrowDown').addEventListener('click', function () {
    isClass(".on-login__arrowDown", "_active");
    isClass(".on-login__list", "_hoverBox");
    isClass(".on-login__item", "_hoveritem");
})

document.addEventListener("DOMContentLoaded", function () {
    let count = true;
    //Лічильник, завдяки якому відомо чи курсор наведений на поле вводу завдань
    if (document.getElementsByClassName('first-row').length > 0) {
        document.getElementsByClassName('first-row')[0].addEventListener('mouseover', function () {
            count = false;
        })
        document.getElementsByClassName('first-row')[0].addEventListener('mouseout', function () {
            count = true;
        })
    }

    // document.getElementsByClassName('first-row__textarea').onfocus(console.log('asdf'))

    //Валідація логіну
    if (valid_acount === false) {
        isClass(".on-login", "validation_login")
    } else if (valid_acount === true) {
        isClass(".login__off", "validation_login")
    }
    //Валідація імейлів
    //Відправка імейлу з головної сторінки
    if (document.getElementById('questions-suport__form-btn') != null) {
        document.getElementById('questions-suport__form-btn').addEventListener('click', function () {
            add_valid_noValid("questions-suport__email");
            if (document.getElementById('questions-suport__email').classList.contains('_valid-email') &&
                document.getElementById('questions-suport__name').value.length > 0 &&
                document.getElementById('area-of-dreams').value.length > 0) {
                let email = document.getElementById('questions-suport__email').value;
                let name = document.getElementById('questions-suport__name').value;
                let dreams = document.getElementById('area-of-dreams').value;
                $.post('/backEnd/sendMailIndex.php', {
                    'email': email,
                    'name': name,
                    'dreams': dreams
                }, function (data) {
                    alert(data);
                })
            }
        })
    }
    //Відправка імейлу з футеру
    if (document.getElementById('suport-footer__form-btn') !== null) {
        document.getElementById('suport-footer__form-btn').addEventListener('click', function () {
            add_valid_noValid("input-email__footer");
            var req = new XMLHttpRequest();
            if (document.getElementById('input-email__footer').classList.contains('_valid-email')) {
                let email = document.getElementById('input-email__footer');
                $.post(
                    '/backEnd/sendMailFooter.php', {
                        'email': email.value
                    },
                    function (data) {
                        alert(data);
                    }
                )
            }
        });
    }
    //кнопка додавання хедеру в шаблон
    if (document.querySelector('.header-form__add') !== null) {
        document.querySelector('.header-form__add').addEventListener('click', function () {
            let universityInput = document.getElementById('university-input');
            let fakultetInput = document.getElementById('fakultet-input');
            let specialnistInput = document.getElementById('specialnist-input');
            let specializaciyaInput = document.getElementById('specializaciya-input');
            let osv_progInput = document.getElementById('osv_prog-input');
            let okrInput = document.getElementById('okr-input');
            let duscuplinaInput = document.getElementById('duscuplina-input');


            let universityBilet = document.getElementsByClassName('bilet__university');
            let fakultetBilet = document.getElementsByClassName('bilet__fakultet');
            let specialnistBilet = document.getElementsByClassName('bilet__specialnist');
            let specializaciyaBilet = document.getElementsByClassName('bilet__specializaciya');
            if (specializaciyaInput.value !== '' && specializaciyaBilet.length > 0) {
                addTextofClassname('Спеціалізація: ', specializaciyaInput, specializaciyaBilet, '');
            } else if (specializaciyaInput.value == '' && specializaciyaBilet.length > 0) {

                for (let i = 0; i < specializaciyaBilet.length; i++) {
                    specializaciyaBilet[i].remove();
                }
            } else if (specializaciyaInput.value !== '' && specializaciyaBilet.length <= 0) {
                for (let i = 0; i < specialnistBilet.length; i++) {
                    specialnistBilet[i].insertAdjacentHTML("afterend", '<div class="bilet__specializaciya"></div>');
                }
                addTextofClassname('Спеціалізація: ', specializaciyaInput, specializaciyaBilet, '');

            } else if (specializaciyaInput.value == '' && specializaciyaBilet.length <= 0) {

            } else {
                alert('Сталась помилка, перезавантажте сторінку.')
            }

            let osvProgBilet = document.getElementsByClassName('bilet__osvprog');
            let okrBilet = document.getElementsByClassName('bilet__okr');
            let duscuplinaBilet = document.getElementsByClassName('bilet__duscuplina');

            addTextofClassname('', universityInput, universityBilet, '');
            addTextofClassname('', fakultetInput, fakultetBilet, '');
            addTextofClassname('Спеціальність: ', specialnistInput, specialnistBilet, '');

            addTextofClassname('Освітня програма: ', osv_progInput, osvProgBilet, '');
            addTextofClassname('ОКР: ', okrInput, okrBilet, '');
            addTextofClassname('Дисципліна: ', duscuplinaInput, duscuplinaBilet, '');

        })
    }
    //Кнопка додавання протоколів
    if (document.getElementById('zatver-form__add') !== null) {
        document.getElementById('zatver-form__add').addEventListener('click', function () {
            let protokolInput = document.getElementById('zatver-form__zatverd');
            let dateProtokol = document.getElementById('zatver-form__protokol');


            let protokolBilet = document.getElementsByClassName('bilet__protokol');
            let dateProtokolBilet = document.getElementsByClassName('bilet__protokol-number');

            addTextofClassname('', protokolInput, protokolBilet, '');
            addTextofClassname('', dateProtokol, dateProtokolBilet, '');
        })
    }
    //Кнопка додавання футеру в шаблон
    if (document.getElementById('footer-kolon__add') !== null) {
        document.getElementById('footer-kolon__add').addEventListener('click', function () {
            let zavInput = document.getElementById('footer-kolon__posada');
            let zavNameInput = document.getElementById('footer-kolon__posada-name');
            let prepInput = document.getElementById('footer-kolon__prepod');
            let prepNameInput = document.getElementById('footer-kolon__prepod-name');

            let zavBilet = document.getElementsByClassName('bilet__zavkaf');
            let zavNameBilet = document.getElementsByClassName('bilet__zavkafname');
            let prepBilet = document.getElementsByClassName('bilet__prepod');
            let prepNameBilet = document.getElementsByClassName('bilet__prepodname');

            addTextofClassname('', zavInput, zavBilet, ': ');
            addTextofClassname(' ', zavNameInput, zavNameBilet, '');
            addTextofClassname('', prepInput, prepBilet, ': ');
            addTextofClassname(' ', prepNameInput, prepNameBilet, '');
        })
    }
    //Додавання білетів
    if (document.getElementById('input-count-btn') !== null) {
        document.getElementById('input-count-btn').addEventListener('click', function () {
            let addBiletInput = document.getElementById('count-bilet');
            let biletForm = document.getElementById('bilet-view');
            let bilet = document.getElementsByClassName('bilet');
            let biletNumber = document.getElementsByClassName('bilet__number');
            if (addBiletInput.value > 0 && addBiletInput.value % 1 === 0 && addBiletInput.value !== '') {
                alert('Кількість білетів: ' + addBiletInput.value)
                let bilet_length = bilet.length;
                if (bilet_length > 1) {
                    for (let i = 1; i < bilet_length; i++) {
                        bilet[1].remove();
                    }
                }
                if (addBiletInput.value > 1) {
                    for (let i = 2; i <= addBiletInput.value; i++) {
                        $(bilet[0]).clone().appendTo(biletForm);
                        biletNumber[i - 1].innerText = 'Білет №' + i;
                    }
                }

            } else {
                alert('Кількість білетів не може бути менше одного')
            }



        })
    }
    //Визначення кількості завдань для білетів з однорівневими завданнями
    if (document.getElementById('zavd-add__value-zavd') !== null) {
        let defaultValueZavdShablon = document.getElementsByClassName('defaultValueZavd');
        document.getElementById('footer-kolon__add').insertAdjacentHTML('afterend', '<div class="defaultValueZavd">Кількість завдань у білеті: ' + defaultValueZavd + '</div>')
        let valueZavd = document.getElementById('zavd-add__value-zavd')
        valueZavd.addEventListener('input', function () {

            if (valueZavd.value > 0 && valueZavd.value % 1 === 0 && valueZavd.value !== '') {
                defaultValueZavd = valueZavd.value;
            } else {
                defaultValueZavd = 2;
            }
            if (defaultValueZavdShablon.length > 0) {
                for (let i = 0; defaultValueZavdShablon.length > i; i++) {
                    defaultValueZavdShablon[i].remove();
                }
                document.getElementById('footer-kolon__add').insertAdjacentHTML('afterend', '<div class="defaultValueZavd">Кількість завдань у білеті: ' + defaultValueZavd + '</div>')
            } else {
                document.getElementById('footer-kolon__add').insertAdjacentHTML('afterend', '<div class="defaultValueZavd">Кількість завдань у білеті: ' + defaultValueZavd + '</div>')
            }
        })
    }
    //Додавання полів для ручного вводу завдань
    if (document.getElementById('add_textarea_for_zavd') !== null) {
        document.getElementById('add_textarea_for_zavd').addEventListener('click', function () {
            document.getElementsByClassName('first-row__buttons')[0].insertAdjacentHTML('beforebegin', '<textarea name="first-row__textarea"class="first-row__textarea" placeholder="Впишіть завдання"></textarea>')
        })
    }
    //Видалення полів для ручного вводу завдань
    if (document.getElementById('remove_textarea_for_zavd') !== null) {
        document.getElementById('remove_textarea_for_zavd').addEventListener('click', function () {


            let textarea_for_zavd = document.getElementsByClassName('first-row__textarea');
            if (textarea_for_zavd.length > 0) {
                textarea_for_zavd[textarea_for_zavd.length - 1].remove();
            }
        })
    }
    //Виведення із полів завдань у білети шаблону
    if (document.getElementById('add_to_bilet') !== null) {
        let button_add_to_bilet = document.getElementById('add_to_bilet');
        let textarea_tasks = document.getElementsByClassName('first-row__textarea');
        button_add_to_bilet.addEventListener('click', function () {
            if (textarea_tasks.length > 0) {
                add_zavd_to_array(textarea_tasks, arrayzavd);
                if (document.getElementsByClassName('arrayzavd__length').length == 1) {
                    document.getElementsByClassName('arrayzavd__length')[0].remove();
                    document.getElementsByClassName('footer-kolon')[0].insertAdjacentHTML('beforeend', "<div class='arrayzavd__length'>Кількість завдань в пам'яті: " + arrayzavd.length + "</div>")

                } else {
                    document.getElementsByClassName('footer-kolon')[0].insertAdjacentHTML('beforeend', "<div class='arrayzavd__length'>Кількість завдань в пам'яті: " + arrayzavd.length + "</div>")
                }
                let bilet_task_container = document.getElementsByClassName('bilet__task');
                remove_tasks_bilets(bilet_task_container);
                add_to_bilet(arrayzavd, defaultValueZavd, bilet_task_container, document.getElementsByClassName('bilet'));
            } else {
                alert("Немає завдань.")
            }
        })
    }
    //Видалення завдань із білету та массиву
    if (document.getElementById('remove_to_bilet') !== null) {
        document.getElementById('remove_to_bilet').addEventListener('click', function () {
            remove_tasks_bilets(document.getElementsByClassName('bilet__task'));
            if (arrayzavd.length > 0) {
                arrayzavd.length = 0;
                document.getElementsByClassName('arrayzavd__length')[0].remove();
                document.getElementsByClassName('footer-kolon')[0].insertAdjacentHTML('beforeend', "<div class='arrayzavd__length'>Кількість завдань в пам'яті: " + arrayzavd.length + "</div>")
            } else {
                alert("У пам'яті немає завдань!")
            }

        })
    }
    //Виконання функцій по натисканню клавіш +, -, та Enter 
    if (document.getElementById('add_textarea_for_zavd') &&
        document.getElementById("remove_textarea_for_zavd") &&
        document.getElementById('add_to_bilet') !== null) {
        document.addEventListener('keyup', function (event) {
            if (count) {
                if (event.key == "+") {
                    document.getElementById('add_textarea_for_zavd').click();
                    if (arrayzavd.length > 0) {
                        document.getElementById('remove_to_bilet').click();
                    }
                }
                if (event.key == "-") {
                    document.getElementById("remove_textarea_for_zavd").click();
                    if (arrayzavd.length > 0) {
                        document.getElementById('remove_to_bilet').click();
                    }
                }
                if (event.key == "Enter") {
                    document.getElementById('add_to_bilet').click();
                }
            }
        })
    }

    ////////////////////////////////
    if (document.getElementById('download_bilet') !== null) {
        document.getElementById('download_bilet').addEventListener('click', function () {

        })
    }
    ///////////////////////////////

})