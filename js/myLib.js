//обертка для document.getElement
function $get(cssSelector){
	var el;
	switch(cssSelector[0]){
		case '.':
			el=document.getElementsByClassName(cssSelector.substr(1));
		break;
		case '#':
			el=document.getElementById(cssSelector.substr(1));
		break;
		default:
			el=false;
			console.log("Use css selector!");
		break;
	}
	return (el == null) ? console.log("This element doesn't exists!") : el;
}
//full screen baner
var FSbaner = {
    date: new Date().getTime(),
    show: function(){
        if((new Date().getTime() - FSbaner.date) > 120000){
            JSAPI.showAd();
            FSbaner.date = new Date().getTime();
        };
    }
}
//RNG - возвращает целое число от min до max включительно
function random(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//отлавливает нажатие Enter в инпутах
function keyDownTextField(e) {
    var keyCode = e.keyCode;
	if(keyCode==13) {
		e.target.blur();
	}
}
//костыль для $confirm и $alert
function duckTape(){
	document.documentElement.style.pointerEvents = "none";
	setTimeout(function(){
		document.documentElement.style.pointerEvents = "auto";
	},500);
}
//вызывает нативный confirm
function $confirm (text) {
  var res = false;
  if ($uaContains('iPhone') || $uaContains('iPad')) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'data:text/plain,');
    document.body.appendChild(iframe);

    res = window.frames[0].window.confirm(text);
    iframe.parentNode.removeChild(iframe);
  } else {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '');
    document.body.appendChild(iframe);

    res = window.frames[0].window.confirm(text);
    iframe.parentNode.removeChild(iframe);
  }
  duckTape();
  return res;
}
//вызывает нативный alert
function $alert (text) {
  var res = false;
  if ($uaContains('iPhone') || $uaContains('iPad')) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'data:text/plain,');
    document.body.appendChild(iframe);

    window.frames[0].window.alert(text);
    iframe.parentNode.removeChild(iframe);
  } else {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '');
    document.body.appendChild(iframe);

    window.frames[0].window.alert(text);
    iframe.parentNode.removeChild(iframe);
  }
  duckTape();
}
//определение платформы
function $uaContains (str) {
  return navigator.userAgent.indexOf(str) > -1;
};
/*
//для нативных алертов и конфирмов
iframe {
    border: none;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
}
*/
//обертки для localStorage
var ls = {
	set:function(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	get:function(key){
		return JSON.parse(localStorage.getItem(key));
	}
}
//сортировка обьекта по ключам (увеличение)
function sortObject(o) {
    var sorted = {},
    key, a = [];
    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }
    a.sort();
    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}
//сортировка обьекта по ключам (убывание)
function sortObjectReverse(o) {
    var sorted = {},
    key, a = [];
    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }
    a.sort();
    a.reverse();
    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}
//функция заполнения по id
function fillContent(el,str,img){
	if(img){
		el.style.background = 'url('+img.path+') no-repeat';
		el.style.backgroundPosition = img.position;
		el.style.backgroundSize = img.size;
	} else {
		el.innerHTML = str;
	}
}

/*ternar operator
	(if) ? true : false;
	(условие) ? возвращает если правда : возвращает если ложь;
*/

/*
//определение языка
var lang = navigator.language.substr(0,2);
var flag = 0;
for(var keys in translate.langs){
	if(keys==lang){
		flag++;
	}
} 
if(flag==0){
	lang = "en";
}
*/