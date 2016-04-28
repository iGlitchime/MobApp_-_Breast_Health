var words = {
    other: {"en": ["Breast Health","Click to start","Start Testing","Settings","Version 1.0","Notifications","Sounds","Test","Add Note","Date","Address","Room","Doctor","Remind","Comment", "Visit your doctor in", "Note", "Listen to the question", "Take the test again?", "Save?", "All inputs required", "Space for your notes"],
            "ru": ["Здоровая Грудь","Нажмите, чтобы начать тест","Пройти тест","Настройки","Версия 1.0","Уведомления","Звуки","Тест","Добавить заметку","Дата","Адрес","Кабинет","Врач","Напомнить за..","Комментарий", "Визит к врачу через", "Заметка", "Прослушать вопрос", "Пройти заново?", "Сохранить?", "Заполните все поля", "Для Ваших заметок"]
    },
    swiperwords:{
        "en":[ "15 min", "30 min", "45 min", "1 hour", "1 hour 15 min","1 hour 30 min","1 hour", "2 hours", "2 hours 15 min", "2 hours 30 min", "2 hours 45 min", "3 hours"],
        "ru":["15 мин","30 мин", "45 мин", "1 час", "1 час 15 мин","1 час 30 мин","1 час 45 мин","2 часа","2 часа 15 мин","2 часа 30 мин","2 часа 45 мин", "3 часа"]
    },
    testing:[
        {
            question: {
                "en": "snd/q/Eng/0.mp3",
                "ru": "snd/q/Rus/0.mp3"
            },
            img: "css/img/art/girl_0.png",
            answer: {
                "en": ["Nothing unusual", "I feel something, but very slightly", "Slight hardening/swelling", "I distinctly feel hardening/swelling"],
                "ru": ["Ничего необычного", "Я чувствую незначительные изменения", "Легкое уплотнение/отечность", "Я отчетливо чувствую уплотнение/отечность"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/1.mp3",
                "ru": "snd/q/Rus/1.mp3"
            },
            img: "css/img/art/girl_1.png",
            answer: {
                "en": ["Nothing unusual", "I feel something, but very slightly", "Slight hardening/swelling", "I distinctly feel hardening/swelling"],
                "ru": ["Ничего необычного", "Я чувствую незначительные изменения", "Легкое уплотнение/отечность", "Я отчетливо чувствую уплотнение/отечность"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/2.mp3",
                "ru": "snd/q/Rus/2.mp3"
            },
            img: "css/img/art/girl_2.png",
            answer: {
                "en": ["Nothing unusual", "I feel something, but very slightly", "Slight hardening/swelling", "I distinctly feel hardening/swelling"],
                "ru": ["Ничего необычного", "Я чувствую незначительные изменения", "Легкое уплотнение/отечность", "Я отчетливо чувствую уплотнение/отечность"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/3.mp3",
                "ru": "snd/q/Rus/3.mp3"
            },
            img: "css/img/art/girl_3.png",
            answer: {
                "en": ["Nothing unusual", "I feel something, but very slightly", "Slight hardening/swelling", "I distinctly feel hardening/swelling"],
                "ru": ["Ничего необычного", "Я чувствую незначительные изменения", "Легкое уплотнение/отечность", "Я отчетливо чувствую уплотнение/отечность"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/4.mp3",
                "ru": "snd/q/Rus/4.mp3"
            },
            img: "css/img/art/girl_4.png",
            answer: {
                "en": ["Both sides are of the same shape and size", "The shapes are slightly different, but the sizes are equal", "One breast is larger than the other, but doesn’t differ dramatically", "I am noticing sudden changes in size"],
                "ru": ["Груди одинаковой формы и размера", "Размеры одинаковые, но форма несколько отличается", "Одна грудь больше другой, но незначительно", "Я заметила значительную разницу в размерах/форме"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/5.mp3",
                "ru": "snd/q/Rus/5.mp3"
            },
            img: "css/img/art/girl_5.png",
            answer: {
                "en": ["There are no one of the mentioned symptoms", "I notice slight redness/rash of the nipples", "I notice one of the mentioned symptoms", "I notice few symptoms or all together"],
                "ru": ["Не наблюдается ни одного из симптомов", "Легкое покраснение/раздражение на сосках", "Один или два из перечисленных симптомов", "Несколько симптомов или все сразу"]
            }
        },
        {
            question: {
                "en": "snd/q/Eng/6.mp3",
                "ru": "snd/q/Rus/6.mp3"
            },
            img: "css/img/art/girl_6.png",
            answer: {
                "en": ["Both breasts vein patterns are equal and look normal", "I notice a slight difference in vein patterns", "Veins are quite bright and visible", "There are prominent veins on the surface of the breast"],
                "ru": ["Венозный рисунок одинаковый и ровный с обеих сторон", "Незначительная разница в рисунке вен", "Вены довольно яркие и хорошо видны", "Замечена выступающая вена на поверхности груди"]
            }
        },
    ],
    results: {
        "en":["The risk of lumps appearance is very low. Most likely, you have not any declinations or abnormality. Even so, don’t forget to perform breast self-exams at least once a month. Regular breast self-exams help you to be familiar with how your breasts look and feel so you can alert your healthcare professional if there are any changes. Remember! It’s recommended to see your doctor and to do a Breast Ultrasound once a year since you are 20 years old.",
            "The risk of lumps appearance is quite low. Most likely, you have not any declinations or abnormality. Even so, don’t forget to perform breast self-exams at least once a month. Check your calendar and find out if it’s time to visit your healthcare professional. It’s recommended to see your doctor and to do a Breast Ultrasound once a year to make a picture of the tissues inside the breast.",
            "The risk of lumps appearance is from low to the middle. Probably, you may have some declinations or abnormality. We recommend you to visit your healthcare professional for further evaluation. Don’t forget to mention all the symptoms you noticed during the self-testing. It’s also recommended to do a Breast Ultrasound once a year to make a picture of the tissues inside the breast. Continue to perform breast self-exams at least once a month.",
            "The risk of lumps appearance is significant. You may have some declinations or abnormality. We highly recommend you to visit your healthcare professional. Don’t forget to mention all the symptoms you noticed during the self-testing. It’s also recommended to do a Breast Ultrasound once a year to make a picture of the tissues inside the breast. Continue to perform breast self-exams at least once a month to monitor the situation.",
            "The risk of lumps appearance is very high. We recommend you to see your doctor promptly. Don’t panic. About 80% of lumps found are not cancerous. But you definitely need to share this situation with your healthcare professional for further evaluation. Don’t forget to mention all the symptoms you noticed during the self-testing. It’s also recommended to do a Breast Ultrasound or a Mammogram to make a picture of the tissues inside the breast. Continue to perform breast self-exams at least once a month to monitor the situation.",],
        "ru":["Риск возникновения опухоли очень мал. Вероятнее всего, у вас нет аномалий или отклонений от нормы. Несмотря на это, продолжайте проводить самообследование раз в месяц. Регулярные самообследования помогут вам понять, как ваша грудь выглядит в обычном состоянии и вовремя заметить изменения. Помните! Рекомендуется посещать врача и проводить УЗИ молочных желез раз в год начиная с 20-летнего возраста.",
            "Риск возникновения опухоли достаточно низкий. Вероятнее всего, у вас нет аномалий или отклонений от нормы. Несмотря на это, продолжайте проводить самообследование раз в месяц.  Не забывайте посещать врача и делать УЗИ молочных желез раз в год, чтобы оценить состояние тканей груди.",
            "Риск возникновения опухоли от низкого до среднего. Возможно, у вас имеются некоторые отклонений от нормы. Мы рекомендуем посетить специалиста для дальнейших исследований. При визите к врачу не забудьте упомянуть все замеченные вами симптомы. Также рекомендуется проводить УЗИ молочных желез раз в год, чтобы оценить состояние тканей груди. Продолжайте проводить самообследование раз в месяц, чтобы следить за ситуацией.",
            "Значительный риск возникновения опухоли. Вероятно, у вас имеются некоторые отклонений от нормы. Мы настоятельно рекомендуем посетить врача и получить профессиональную консультацию. При визите к врачу не забудьте упомянуть все замеченные вами симптомы. Также рекомендуется проводить УЗИ молочных желез раз в год, чтобы оценить состояние тканей груди. Продолжайте проводить самообследование раз в месяц, чтобы следить за ситуацией.",
            "Высокий риск возникновения опухолей. Мы рекомендуем незамедлительно посетить врача. Не пугайтесь: около 80% всех новообразований являются доброкачественными. Но вам необходимо проконсультироваться со специалистом для проведения дальнейших исследований. При визите к врачу не забудьте упомянуть все замеченные вами симптомы. Также рекомендуется проводить УЗИ молочных желез или маммографию раз в год, чтобы оценить состояние тканей груди. Продолжайте проводить самообследование раз в месяц, чтобы следить за ситуацией."]
    },
    langs:{
		"en":"",
		"ru":""
	}
};
var lang = navigator.language.substr(0,2); //в каждом броаузере есть навигатор, берем данные из текущего файла и обрезаем первые два символа (на андроиде берем первые 2 символа ru-RU)
	var flag = 0;
	for(var keys in words.langs){ // берем объект words.langs по ключам которого пробегаем
		if(keys==lang){
			flag++;
		}
	} 
	if(flag==0){ //если не нашел, то выставляет варик EN 
		lang = "en";
	}