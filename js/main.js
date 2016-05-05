"use strict";
/* включает новый синтаксис ES2015 */
var datePicker;
var LN = "en";
var snd_list_page;
var snd_cards;
var snd_check;
var snd_notif;
var countAnswers = 0;
var AudioQuestions = [];
//var sumAnswers;
var Answer;

function refreshSyncData() {
// функция, которая берет данные с localstorage и обновляет списки
    UsersNote(tabDay);
}
/* --------------------- BEGIN READY Function--------------------- */
function ready() {
    //звуки должны быть в assets/snd
    snd_list_page = new Sound("snd/list_page.mp3");
    snd_cards = new Sound("snd/cards.mp3");
    snd_check = new Sound("snd/check.mp3");
    snd_notif = new Sound("snd/notification.mp3")

    AudioQuestions[0] = new Media(words.testing[0].question[lang]);
    AudioQuestions[1] = new Media(words.testing[1].question[lang]);
    AudioQuestions[2] = new Media(words.testing[2].question[lang]);
    AudioQuestions[3] = new Media(words.testing[3].question[lang]);
    AudioQuestions[4] = new Media(words.testing[4].question[lang]);
    AudioQuestions[5] = new Media(words.testing[5].question[lang]);
    AudioQuestions[6] = new Media(words.testing[6].question[lang]);

    JSAPI.keepScreenOn();

    StorageTest(); //проверяем наличие данных в ЛокСтор

    if (JSON.parse(localStorage.getItem('testResult')) == 0 || JSON.parse(localStorage.getItem('testResult')) == "null") {
        document.getElementById("StartButtonText").innerHTML = words.other[lang][2];
        document.getElementById("StartButtonText").style.backgroundImage = "none";
        document.getElementById("ProgressBarContainer").style.display = "none";
        document.getElementById("ProgressBarTxt").style.display = "none";
        document.getElementById("AppLogo").style.display = "block";
        document.getElementById("commentText").innerHTML = words.other[lang][1];
        document.getElementById("result").style.display = "none";
    } else {
        bar.animate(JSON.parse(localStorage.getItem('testResult')) / 100);
        document.getElementById("AppLogo").style.display = "none";
        document.getElementById("StartButtonText").innerHTML = "";
        document.getElementById("StartButtonText").style.backgroundImage = "url(css/img/refresh.svg)";
        document.getElementById("commentText").style.display = "none";
        document.getElementById("commentText").innerHTML = "";
        document.getElementById("result").style.display = "block";
        document.getElementById("result").innerHTML = testPage.testResultInfo(testPage.sumAllAnswers);
        document.getElementById("ProgressBarContainer").style.display = "block";
        document.getElementById("ProgressBarTxt").style.display = "block";
        document.getElementById("ProgressBarTxt").innerHTML = JSON.parse(localStorage.getItem('testResult')) + "%";
    }

    /* BEGIN settings*/
    if (JSON.parse(localStorage.getItem("notifSW")) == "on") {
        notifs.createTest();
    }
    switches.test();

    var soundSW = document.getElementById('soundSW'); //забираем данные со страницы
    new Tap(soundSW); //функция-конструктор, вешает TAP на soundSW

    soundSW.addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        switches.call(this); // вешаем действие на клик
    }, false);
    soundSW.addEventListener('swipe', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.detail.direction == 'left') {
            switches.off(this);
        } else if (e.detail.direction == 'right') {
            switches.on(this);
        }
    }, false);

    var notifSW = document.getElementById('notifSW');
    new Tap(notifSW);
    notifSW.addEventListener('tap', function (e) {
        e.preventDefault();
        e.stopPropagation();
        switches.call(this);
    }, false);
    notifSW.addEventListener('swipe', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.detail.direction == 'left') {
            switches.off(this);
        } else if (e.detail.direction == 'right') {
            switches.on(this);
        }
    }, false);
    /* --------------------- END settings--------------------- */


    /* --------------------- BEGIN FDT--------------------- */
    datePicker = new Fdt('barrel_date', { // параметры необязательны, если нет, то будут по умолчанию
        mode: 'dateTime', // 'date' || 'time' || 'dateTime' по умолчанию - 'dateTime'
        startDate: new Date(),  // can be a string like '2026/02/13 15:56' or Date object по умолчанию - new Date();
        lang: 'en' // язык, по умолчанию используется переменная LN
    })
    datePicker.change = function (params) {
        getNotesFromUser.takeDate();
    };
    /* --------------------- END FDT--------------------- */

    /* --------------------- BEGIN pages animation --------------------- */
    setTimeout(function () {
        page.open("first"); //открываем главную страницу
    }, 1300);
    var pages = document.getElementsByClassName("page");

    for (var i = 0; i < pages.length; i++) {
        pages[i].addEventListener('webkitAnimationStart', function (e) {  //старт анимации
            e.preventDefault();
            e.stopPropagation();
        }, false);

        pages[i].addEventListener('webkitAnimationEnd', function (e) { //завершение анимации и действия после
            e.preventDefault();
            e.stopPropagation();

            // действия после анимации
            if ((this.classList.contains("moveLeft")) || (this.classList.contains("moveRight"))) {
                this.style.visibility = "hidden";
                this.classList.remove("hold");
            }
            else if ((this.classList.contains("moveFromLeft")) || (this.classList.contains("moveFromRight"))) {
                this.classList.add("hold");
            }
            this.classList.remove("moveLeft");
            this.classList.remove("moveRight");
            this.classList.remove("moveFromLeft");
            this.classList.remove("moveFromRight");
            page.busy = true;
        }, false);
    }

    /* --------------------- END pages animation --------------------- */


    /* --------------------- BEGIN Taps ---------------------  */

    new Tap("goSettings").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        page.open("settings");  // вешаем переход на страницу выбора занятия
    }, false);

    new Tap("SettingsToFirst").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        page.open("first");  // вешаем переход на страницу выбора занятия
    }, false);

    new Tap("fromFourthToFirst").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        page.open("first");  // вешаем переход на страницу выбора занятия
    }, false);

    new Tap("StartButton").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        if (countAnswers == 0) {
            localStorage.setItem('testResult', JSON.stringify(testPage.sumAllAnswers));
            testPage.drawTestBlock();
            snd_list_page.play();
            page.open("second");
        } else {
            ConfirmBlock.ConfirmTestOn(); //вызываем окно с вопросом "сбросить?"
        }
    }, false);

    new Tap("checkAnswer").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        testPage.CountAnswers(Answer);
        window.isplaying = false;
        AudioQuestions[countAnswers].stop();
        countAnswers++;

        testPage.drawTestBlock();
        if(countAnswers < 7) {
            AudioQuestions[countAnswers].play();
            window.isplaying = true;
            document.getElementById("playButton").style.backgroundImage = "url(css/img/stop.svg)";
            var MyMediaDuration = Math.floor(AudioQuestions[countAnswers].duration()*1000);
            setTimeout(function(){
                document.getElementById("playButton").style.backgroundImage = "url(css/img/play.svg)";
            }, MyMediaDuration);
        }

    }, false);

    new Tap("addNote").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        page.open("third");  // вешаем переход на страницу выбора занятия
    }, false);

    new Tap("AddCircle").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        page.open("third");  // вешаем переход на страницу выбора занятия
    }, false);


    //раскомментировать как отрисовка будет готова

    new Tap("allNotes").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        DrawDay.parseLocStor();
        page.open("fourth");  // вешаем переход на страницу выбора занятия
    }, false);

    // открываем или скрываем первый пикер - с Датой
    new Tap("inputStrings", "inputLine").addEventListener('tap', function (e) {
        //берем ID родителя, отбираем объекты с классом, и в условии отбираем у них ID необходимых

        if (e.detail.cTarget.id == "choose_date" || e.detail.cTarget.id == "choose_time") {
            e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
            e.stopPropagation(); //запрещает всплытие
            snd_list_page.play();
            document.getElementById('barrel_date').style.position = "relative";
            document.getElementById('barrel_date').style.top = "0";
            getNotesFromUser.takeDate(); // вызываем функцию отображения даты в нужных полях
        } else if (e.detail.cTarget.classList.contains("inputLine")) {
            document.getElementById('barrel_date').style.position = "absolute";
            document.getElementById('barrel_date').style.top = "200em";
        }
    }, false);

    // открываем или скрываем второй пикер - с ремайндом
    new Tap("inputStrings", "inputLine").addEventListener('tap', function (e) {
        //берем ID родителя, отбираем объекты с классом, и в условии отбираем у них ID необходимых
        if (e.detail.cTarget.id == "chooseTimeNotification") {
            e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
            e.stopPropagation(); //запрещает всплытие
            document.getElementById('notifTimer').style.position = "relative";
            document.getElementById('notifTimer').style.top = "0";
        } else if (e.detail.cTarget.classList.contains("inputLine")) {
            document.getElementById('notifTimer').style.position = "absolute";
            document.getElementById('notifTimer').style.top = "-200em";
        }
    }, false);

    new Tap("BackFromNote").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        page.open("first");
    }, false);

    new Tap("doneNote").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        revise.review();
    }, false);

    new Tap("endTest").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        // вешаем переход на страницу выбора занятия

        ConfirmBlock.ConfirmTestOn(); //вызываем окно с вопросом "сбросить?"
    }, false);

    new Tap("ConfirmYes").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        ConfirmBlock.ConfirmClearTest();
    }, false);

    new Tap("ConfirmNo").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        ConfirmBlock.ConfirmTestOff();
    }, false);


    new Tap("alertYes").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        snd_list_page.play();
        document.getElementById('alertActivity').style.display = "none";
    }, false);


    var swipeElement = new Tap("DayTask", "ButtonNote");
    swipeElement.addEventListener('tap', function (e) {
        if(e.target === e.currentTarget)
            return false;
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        var id = e.detail.cTarget.getElementsByClassName("editButton")[0].dataset.edit;

        if (e.target.className == 'delCross') {
            document.getElementById("id_" + id).style.height = "0";
            document.getElementById("id_" + id).style.border = "none";
            document.getElementById("id_" + id).innerHTML = "";
            DrawDay.DeleteNote(id);
        } else if (e.target.className == 'editButton') {
            console.log("edit " + id);
            DrawDay.editNote(id);
            page.open("fifth");
        } else {
            //вешаем действие: передача ключа для парсинга из локстора
            console.log("open " + id);
            DrawDay.editNote(id);
            page.open("fifth");
        }
    }, false);

    swipeElement.addEventListener('swipe', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        if(e.target === e.currentTarget)
            return false;

        if (e.detail.direction == "left") {
            e.detail.cTarget.classList.add("swipeLeft");
        } else if (e.detail.direction == "right") {
            e.detail.cTarget.classList.remove("swipeLeft");
        }
    });



    new Tap("editBack").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        page.open("fourth");
    }, false);

    new Tap("editDone").addEventListener('tap', function (e) {
        e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
        e.stopPropagation(); //запрещает всплытие
        revise.reviewEdit(IdEditNote);
    }, false);

    /* --------------------- END Taps---------------------  */


    document.getElementById("input_adress").placeholder = words.other[lang][10];
    document.getElementById("input_cabinet").placeholder = words.other[lang][11];
    document.getElementById("input_doctor").placeholder = words.other[lang][12];
    document.getElementById("input_comment").placeholder = words.other[lang][14];

    /* --------------------- BEGIN выбор времени к нотификациям --------------------- */
    window.swiper = new Swiper('.notifTimer', {
        slidesPerView: 5,
        centeredSlides: true,
        spaceBetween: 1,
        loop: true,
        initialSlide: 0,
        direction: 'vertical',
        runCallbacksOnInit: true,
        effect: 'coverflow',
        coverflow: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
        },
        onTransitionEnd: function (swiper) {
            var reminder = swiper.slides[swiper.activeIndex].innerText;
            getNotesFromUser.takeReminder(reminder);
        }

    });
    /* --------------------- END выбор времени к нотификациям---------------------  */
};
/* --------------------- END READY Function--------------------- */



/* --------------------- BEGIN pages navigation--------------------- */
var page = {
    busy: true, //флаг анимации (если false - идет анимация) ограничение тапов-переходов при выбранном одном из нескольких
    prevpage: 'first', //предыдущая страница
    open: function (id) { //открытие другой странички
        if (id == this.prevpage) { //если открывает ту же страничку, то не открывает
            return false;
        } else if (this.busy) { //иначе - если анимация идет (проверка), то ничего не делать
            this.busy = false;
            switch (id) {
                case 'first':
                    break;
                case 'second':
                    break;
                case 'third':
                    break;
                case 'fourth':
                    break;
                case 'fifth':
                    break;
            }
            //проверка на существования предыдущей страницы
            if (document.getElementById(this.prevpage)) {
                this.animationHandlerCall(id);
            }
            this.prevpage = id; //перезапись актуальной страницы (предыдущая)
        }
    },
    animationHandlerCall: function (id) { //функция управления анимацией перелистывания страниц
        document.getElementById(id).style.visibility = "visible"; //
        if (document.getElementById(id).dataset.n * 1 < document.getElementById(this.prevpage).dataset.n * 1) {
            document.getElementById(this.prevpage).classList.add('moveRight');
            document.getElementById(id).classList.add('moveFromLeft');
        } else {
            document.getElementById(this.prevpage).classList.add('moveLeft');
            document.getElementById(id).classList.add('moveFromRight');
        }
    }
}
/* END pages navigation*/
var revise = {
    review: function () {
        var date = document.getElementById('input_date').innerHTML;
        var adress = document.getElementById("input_adress").value;
        var room = document.getElementById("input_cabinet").value; // кабинет
        var doctor = document.getElementById("input_doctor").value; // врач
        var reminder = swiper.slides[swiper.activeIndex].innerText;
        var comment = document.getElementById("input_comment").value; // Комментарии

        if (date != 0 && date != "" && date != "&nbsp;" && adress != 0 && adress != "" && adress != "&nbsp;" && room != 0 && room != "" && room != "&nbsp;" && doctor != 0 && doctor != "" && doctor != "&nbsp;" && reminder != 0 && reminder != "" && reminder != "&nbsp;") {
            if(comment != 0 && comment != "" && comment != "&nbsp;") {
                getNotesFromUser.save(adress, room, doctor, reminder, comment);
            } else {
                getNotesFromUser.save(adress, room, doctor, reminder, "");
            }
        } else {
            document.getElementById('alertMessage').innerHTML = words.other[lang][20];
            document.getElementById('alertActivity').style.display = "block";
        }
    },
    reviewEdit: function (IdEditNote) {
        var AllNotes = JSON.parse(localStorage.getItem("notes"));
        var comment = document.getElementById("editComment").value; // Комментарии

        if (AllNotes[IdEditNote].comment != comment) {
            AllNotes[IdEditNote].comment = comment;
            localStorage.setItem("notes", JSON.stringify(AllNotes));
        } else if (AllNotes[IdEditNote].comment == comment) {
            page.open("fourth");
        }
        snd_list_page.play();
    }
}
/* --------------------- END pages navigation--------------------- */




/* --------------------- BEGIN Taking Date & Time --------------------- */
var getNotesFromUser = {
    takeDate: function () {
        var date = datePicker.getDate().human;
        document.getElementById('input_date').innerHTML = date;
    },
    takeReminder: function (remind) {
        if (remind == "" || typeof remind == "undefined") {
            document.getElementById('input_reminder').innerText = words.swiperwords[lang][0];
        } else {
            document.getElementById('input_reminder').innerText = remind;
        }
    },
    save: function (adress, room, doctor, reminder, comment) {
        var remTime = remindTimeConverter(reminder);
        var GetDate = new Date(datePicker.getDate().text).getTime();
        var K = new Date(GetDate).getTime() - remTime; //берем дату, введенную пользователем и переводим в милисекунды с 1 янв 1970г и отнимаем время, для "заранее" напоминашки
        if (new Date().getTime() <= K) {
            var T = JSON.parse(localStorage.getItem("notes"));
            var O = {
                notificationTime: K,
                time: GetDate,
                adress: adress,
                room: room,
                doctor: doctor,
                reminder: reminder,
                comment: comment
            };
            if (searchInLSarray(K)) {
                document.getElementById('alertMessage').innerHTML = words.other[lang][22];
                document.getElementById('alertActivity').style.display = "block";
                return;

            } else {
                T.push(O);
                T.sort(sortByMilisecs);
                if (JSON.parse(localStorage.getItem("notifSW")) == "on") {
                    notifs.create(K, reminder);
                }
                localStorage.setItem("notes", JSON.stringify(T))
                snd_list_page.play();

                document.getElementById('input_date').innerHTML = "&nbsp";
                document.getElementById("input_adress").value = "";
                document.getElementById("input_cabinet").value = ""; // кабинет
                document.getElementById("input_doctor").value = ""; // врач
                swiper.slides[swiper.activeIndex].innerText = words.swiperwords[lang][0];
                document.getElementById("input_comment").value = "";

                page.open("first");

//
            }
        } else {
            document.getElementById('alertMessage').innerHTML = words.other[lang][23];
            document.getElementById('alertActivity').style.display = "block";
        }
    }

};
/* --------------------- END Taking Date & Time---------------------  */




/* --------------------- BEGIN Drawing Notes ---------------------  */
var DrawDay = {
    convertMonth: function (month) {
        var MonthStr = month.toString();
        if (MonthStr.length < 2) {
            return month = "0" + month++;
            return month;
        } else {
            return month++;
        }
    },
    convertTime: function (time) {
        if (time.toString().length < 2) {
            return time = "0" + time;
        } else {
            return time;
        }
    },
    parseLocStor: function () {
        var AllNotes = JSON.parse(localStorage.getItem("notes")); //парсим ЛокСтор пакет со всеми записями
        var PageContent = document.getElementById('PageContent');
        var DayTask = document.getElementById('DayTask');
        var ActualNotes = "";
        if (AllNotes.length != 0) {
            //бежим с конца массива, проверяем
            for (var i = AllNotes.length; --i >= 0;) {
                if (AllNotes[i].notificationTime < new Date().getDate()) {
                    AllNotes.splice(i, 1);
                } else if (new Date().getDate() <= new Date(AllNotes[i].notificationTime).getDate()) {
                    // берем дату, которая будет отображаться для юзера
                    var DataSliced = new Date(AllNotes[i].time);
                    var ShowData = DrawDay.convertTime(DataSliced.getDate()) + "." + DrawDay.convertMonth(DataSliced.getMonth() + 1) + "." + DataSliced.getFullYear() + " - " + DrawDay.convertTime(DataSliced.getHours()) + ":" + DrawDay.convertTime(DataSliced.getMinutes());
                    var Adress = AllNotes[i].adress + " " + AllNotes[i].room;
                    var Doctor = AllNotes[i].doctor;
                    var Comment = AllNotes[i].comment;
                    ActualNotes += DrawDay.DrawNotes(i, ShowData, Adress, Doctor, Comment, AllNotes[i].notificationTime);
                }
            }
            localStorage.setItem("notes", JSON.stringify(AllNotes));

            document.getElementById("NoNotes").style.display = "none";
            document.getElementById("AddCircle").style.display = "none";
        } else {
            document.getElementById("NoNotes").style.display = "block";
            document.getElementById("AddCircle").style.display = "block";
        }
        DayTask.innerHTML = ActualNotes;


    },
    // отрисовка элемента DOM
    DrawNotes: function (N, ShowData, Adress, Doctor, Comment, notifTime) {
        var listItem = document.createElement('div'); //создаем элемент-div (сохраняя в переменную, чтоб удобно обращаться)
        var idItem = "id_" + notifTime;
        //listItem.id = idItem;
        if (N != null) {
            listItem.innerHTML = '<div class="ButtonNote" id="' + idItem + '">\
                    <div class="textOnButton">\
                        <div class="showDate">' + words.other[lang][9] + ": " + ShowData + '</div>\
                        <div class="showAdressRoom">'+ words.other[lang][10] + ": " + Adress + '</div>\
                        <div class="showDoctor">'+ words.other[lang][12] + ": " + Doctor + '</div>\
                        <div class="showComment">'+ words.other[lang][14] + ": " + Comment + '</div>\
                    </div>\
                    <div class="actionsButton"></div>\
                    <div class="editButton" data-edit="' + notifTime + '"></div>\
                    <div class="delCross" data-dely="' + notifTime + '"></div>\
                </div>';
            return listItem.innerHTML;
        }
    },
    editNote: function (id) {
        var editDate = document.getElementById("editDate");
        var editAdress = document.getElementById("editAdress");
        var editDoctor = document.getElementById("editDoctor");
        var editComment = document.getElementById("editComment");
        var AllNotes = JSON.parse(localStorage.getItem("notes"));

        for (var j = 0; j < AllNotes.length; j++) {
            if (AllNotes[j].notificationTime == id) {
                var DataSliced = new Date(AllNotes[j].time);
                editDate.innerHTML = words.other[lang][9] + ": " + DrawDay.convertTime(DataSliced.getDate()) + "." + DrawDay.convertMonth(DataSliced.getMonth() + 1) + "." + DataSliced.getFullYear() + " - " + DrawDay.convertTime(DataSliced.getHours()) + ":" + DrawDay.convertTime(DataSliced.getMinutes());
                editAdress.innerHTML = words.other[lang][10] + ": " + AllNotes[j].adress + " " + AllNotes[j].room;
                editDoctor.innerHTML = words.other[lang][12] + ": " + AllNotes[j].doctor;
                editComment.value = AllNotes[j].comment;
                IdEditNote = j;
                break;
            }
        }
    },
    DeleteNote: function (id) {
        var AllNotes = JSON.parse(localStorage.getItem("notes"));
        for (var j = 0; j < AllNotes.length; j++) {
            if (AllNotes[j].notificationTime == id) {
                AllNotes.splice(j, 1);
            }
        }
        localStorage.setItem("notes", JSON.stringify(AllNotes));

    }

}
var IdEditNote;
/* --------------------- END Drawing Notes ---------------------  */




/* --------------------- BEGIN Settings switches--------------------- */
var switches = {
    call: function (el) {
        if (JSON.parse(localStorage.getItem(el.id)) == 'on') {
            this.off(el);
        } else {
            this.on(el);
        }
        snd_check.play();
    },
    on: function (el) {
        switch (el.id) {
            case "soundSW":
                snd_check.volume(0.5);
                snd_list_page.volume(0.5);
                break;
            case "notifSW":
                notifs.createAll();
                break;
            default:
                break;
        }
        el.classList.add('switched');
        localStorage.setItem(el.id, JSON.stringify('on'));
    },
    off: function (el) {
        switch (el.id) {
            case "soundSW":
                snd_check.volume(0);
                snd_list_page.volume(0);
                break;
            case "notifSW":
                notifs.deleteAll();
                break;
            default:
                break;
        }
        el.classList.remove('switched');
        localStorage.setItem(el.id, JSON.stringify('off'));
    },
    test: function () {
        if (JSON.parse(localStorage.getItem('soundSW')) == 'on') {
            this.on(document.getElementById('soundSW'));
        } else {
            this.off(document.getElementById('soundSW'));
        }
        if (JSON.parse(localStorage.getItem('notifSW')) == 'on') {
            document.getElementById('notifSW').classList.add('switched');
        } else {
            document.getElementById('notifSW').classList.remove('switched');
        }
    }
}
/*--------------------- END Settings switches--------------------- */


/*--------------------- BEGIN Test Page --------------------- */

var testPage = {
    sumAllAnswers: 0,
    ResultText: "",
    drawTestBlock: function () {
        var ShowTest = document.getElementById('testblock');
        var testItem = document.createElement('div');

        if (countAnswers < 7) {
            testItem.innerHTML = '<div class="testPicBlock" id="testPicBlock">\
                                        <div id="TestPic" class="testPic">\
                                            <img src="' + words.testing[countAnswers].img + '" alt="">\
                                        </div>\
                                        <div class="Q_counter">' + (countAnswers + 1) + ' / 7</div>\
                                  </div>\
                                  <div class="questionBlock">\
                                      <div class="questionLine">\
                                          <div id="playButton" class="playButton"></div>\
                                          <div id="PlayQuestion" class="PlayQuestion">' + words.other[lang][17] + '</div>\
                                      </div>\
                                  </div>\
                                  <div class="answerblock">\
                                      <div class="swiper-container AnswerSwiper" id="AnswerSwiper">\
                                          <div class="swiper-wrapper ">\
                                              <div class="swiper-slide">' + words.testing[countAnswers].answer[lang][0] + '</div>\
                                              <div class="swiper-slide">' + words.testing[countAnswers].answer[lang][1] + '</div>\
                                              <div class="swiper-slide">' + words.testing[countAnswers].answer[lang][2] + '</div>\
                                              <div class="swiper-slide">' + words.testing[countAnswers].answer[lang][3] + '</div>\
                                          </div>\
                                          <div class="fdtLines"></div>\
                                      </div>\
                                  </div>';
            //костылим таймаутом
            setTimeout(function () {
                window.AnswerSwiper = new Swiper('.AnswerSwiper', {
                    pagination: '.AnswerPagination',
                    slidesPerView: 3,
                    centeredSlides: true,
                    spaceBetween: 10,
                    //loop: true,
                    initialSlide: 2,
                    direction: 'vertical',
                    runCallbacksOnInit: true,
                    effect: 'coverflow',
                    coverflow: {
                        rotate: 20,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false
                    },
                    onTransitionEnd: function (AnswerSwiper) {
                        Answer = AnswerSwiper.slides[AnswerSwiper.activeIndex].innerText;
                    }
                });
            }, 100)
        } else {
            var percent = (testPage.sumAllAnswers) / 100;
            localStorage.setItem('testResult', JSON.stringify(testPage.sumAllAnswers));

            document.getElementById("AppLogo").style.display = "none";
            document.getElementById("StartButtonText").innerHTML = "";
            document.getElementById("StartButtonText").style.backgroundImage = "url(css/img/refresh.svg)";
            document.getElementById("commentText").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("result").innerHTML = testPage.testResultInfo(testPage.sumAllAnswers);
            document.getElementById("ProgressBarContainer").style.display = "block";
            document.getElementById("ProgressBarTxt").style.display = "block";
            document.getElementById("ProgressBarTxt").innerHTML = testPage.sumAllAnswers + "%";

            page.open("first");
            bar.animate(percent);
        }

        ShowTest.innerHTML = testItem.innerHTML;

        if (document.getElementById("playButton")) {
            new Tap("playButton").addEventListener('tap', function (e) {
                e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
                e.stopPropagation(); //запрещает всплытие

                if (window.isplaying) {
                    AudioQuestions[countAnswers].stop();
                    window.isplaying = false;

                    document.getElementById("playButton").style.backgroundImage = "url(css/img/play.svg)";
                } else {
                    AudioQuestions[countAnswers].play();
                    window.isplaying = true;
                    var MyMediaDuration = Math.floor(AudioQuestions[countAnswers].duration()*1000);

                    setTimeout(function(){
                        document.getElementById("playButton").style.backgroundImage = "url(css/img/play.svg)";
                    }, MyMediaDuration );

                    document.getElementById("playButton").style.backgroundImage = "url(css/img/stop.svg)";
                }
            }, false);
        }



    },

    CountAnswers: function (chosenAnswer) {
        if (chosenAnswer == words.testing[countAnswers].answer[lang][0]) {
            testPage.sumAllAnswers += 1;
        } else if (chosenAnswer == words.testing[countAnswers].answer[lang][1]) {
            testPage.sumAllAnswers += 5;
        } else if (chosenAnswer == words.testing[countAnswers].answer[lang][2]) {
            testPage.sumAllAnswers += 10;
        } else if (chosenAnswer == words.testing[countAnswers].answer[lang][3]) {
            testPage.sumAllAnswers += 14;
        }
    },
    testResultInfo: function (resultCounted) {
        if (resultCounted <= 15) {
            testPage.ResultText = words.results[lang][0];
        } else if (resultCounted > 15 && resultCounted <= 30) {
            testPage.ResultText = words.results[lang][1];
        } else if (resultCounted > 30 && resultCounted <= 50) {
            testPage.ResultText = words.results[lang][2];
        } else if (resultCounted > 50 && resultCounted <= 70) {
            testPage.ResultText = words.results[lang][3];
        } else {
            testPage.ResultText = words.results[lang][4];
        }

        return testPage.ResultText;
    }
}

var ConfirmBlock = {
    ConfirmTestOn: function(){
        document.getElementById("ConfirmCards").style.visibility = "visible";
        document.getElementById('ConfirmQ').innerHTML = words.other[lang][24];

    },
    ConfirmTestOff: function (){
        document.getElementById("ConfirmCards").style.visibility = "hidden";
        document.getElementById('ConfirmQ').innerHTML = "";
    },
    ConfirmClearTest: function (){
        countAnswers = 0;
        testPage.sumAllAnswers = 0;
        document.getElementById("StartButtonText").innerHTML = words.other[lang][2];
        document.getElementById("StartButtonText").style.backgroundImage = "none";
        document.getElementById("ProgressBarContainer").style.display = "none";
        document.getElementById("ProgressBarTxt").style.display = "none";
        document.getElementById("AppLogo").style.display = "block";
        document.getElementById("commentText").style.display = "block";
        document.getElementById("result").style.display = "none";
        localStorage.setItem('testResult', JSON.stringify(testPage.sumAllAnswers));
        ConfirmBlock.ConfirmTestOff();
        page.open("first");
        console.log("CLEAR");
    }

}

/*--------------------- END Test Page --------------------- */


/*--------------------- BEGIN ProgressBar.JS  --------------------- */
var bar = new ProgressBar.Circle('#ProgressBarContainer', {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 4,
    trailColor: '#FF96AA',
    easing: 'easeInOut',
    borderRadius: 1,
    duration: 3000,
    svgStyle: {
        display: 'block',
        width: '100%'
    },
    text: {
        autoStyleContainer: false
    },
    from: {color: '#FF2D55', width: 10},
    to: {color: '#FF2D55', width: 5},
    // Set default step function for all animate calls
    step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
    }
});


/*--------------------- END ProgressBar.JS --------------------- */






/* --------------------- BEGIN работа с локстор--------------------- */
function StorageTest() {
    if (localStorage.getItem("notes") == null) {
        localStorage.setItem("notes", JSON.stringify(new Array));
        localStorage.setItem('soundSW', JSON.stringify('on'));
        localStorage.setItem('notifSW', JSON.stringify('on'));
        localStorage.setItem('testResult', JSON.stringify(""));
    }
}

function searchInLSarray(K, GetDate) {
    var T = JSON.parse(localStorage.getItem("notes"));
    var F = false;
    //анонимная функция ----- пробежались по массиву, с проверкой на совпадение по notificationTime
    T.forEach(function (item, i, a) {

        if (item.notificationTime == K) {
            F = true;
        }
    });
    return F;
}

var notifs = {
    create: function (K, reminder) {
        var str = words.other[lang][15] + " " + reminder;
        JSAPI.createUnitNotif(0, K, K, words.other[lang][0], str, str, 1000, "sound/tone.mp3");
    },
    del: function (id) {
        JSAPI.cancelNotif(id);
    },
    deleteAll: function () { //метод, пробегающий по всему массиву и удаляющий нотификации (если выключаем их в окне настроек)
        var NotesArray = JSON.parse(localStorage.getItem('notes'));
        NotesArray.forEach(function (item, i, a) {
            notifs.del(item.notificationTime); //удаляем по одной, потому что пробегает по всем
        });
    },
    createAll: function () { //метод, пробегающий по всему массиву и создающий нотификации (если включаем их в окне настроек)
        var NotesArray = JSON.parse(localStorage.getItem('notes'));
        NotesArray.forEach(function (item, i, a) {
            notifs.create(item.notificationTime, item.reminder); //создаем по одной, потому что пробегает по всем
        })
    },
    createTest: function () {
        var K = (new Date().getTime() + 5 * 60000);
        this.create(K, "test");
        setTimeout(function () {
            notifs.del(K);
        }, 1000)
    }
}
/* --------------------- END работа с локстор--------------------- */





/* --------------------- BEGIN Милисекунды --------------------- */

function remindTimeConverter(reminder) {
    var remTime = 0;
    if (reminder == words.swiperwords[lang][0]) {
        remTime = 900000;
    } else if (reminder == words.swiperwords[lang][1]) {
        remTime = 1800000;
    } else if (reminder == words.swiperwords[lang][2]) {
        remTime = 2700000;
    } else if (reminder == words.swiperwords[lang][3]) {
        remTime = 3600000;
    } else if (reminder == words.swiperwords[lang][4]) {
        remTime = 4500000;
    } else if (reminder == words.swiperwords[lang][5]) {
        remTime = 5400000;
    } else if (reminder == words.swiperwords[lang][6]) {
        remTime = 6300000;
    } else if (reminder == words.swiperwords[lang][7]) {
        remTime = 7200000;
    } else if (reminder == words.swiperwords[lang][8]) {
        remTime = 8100000;
    } else if (reminder == words.swiperwords[lang][9]) {
        remTime = 9000000;
    } else if (reminder == words.swiperwords[lang][10]) {
        remTime = 9900000;
    } else if (reminder == words.swiperwords[lang][11]) {
        remTime = 10800000;
    }
    return remTime;
}

function sortByMilisecs(a, b) {
    return a.notificationTime - b.notificationTime;
}
/* --------------------- END Милисекунды --------------------- */



document.addEventListener('DOMContentLoaded', ready, false);

/* --------------------- END FILE --------------------- */