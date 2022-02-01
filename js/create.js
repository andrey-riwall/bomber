// selects

// create telegram select
const CreateSelectElement = document.querySelector('#CreateTgSelect');
const CreateChoices = new Choices(CreateSelectElement, {
  searchEnabled: false,
  placeholder: true,
  placeholderValue: "Выберете телеграм-канал",
  position: 'bottom',
});



// padding
const CreateLowHeading = document.querySelector("#CreateLowHeading");
const dropdown = document.querySelector(".choices__list--dropdown");

document.addEventListener('click', () => {
    setTimeout(() => {
        if (dropdown.classList[2] == 'is-active') {
            CreateLowHeading.style.padding = `${dropdown.offsetHeight}px 0px 0px 0px`;
        }
        if (!dropdown.classList[2]) {
            CreateLowHeading.style.padding = "0px";
        }
    }, 1)
    setTimeout(() => {
        if (dropdown.classList[2] == 'is-active') {
            CreateLowHeading.style.padding = `${dropdown.offsetHeight}px 0px 0px 0px`;
        }
        if (!dropdown.classList[2]) {
            CreateLowHeading.style.padding = "0px";
        }
    }, 100)
})



// input type file
function showFile(input) {
    let file = input.files[0];
    const filename = document.querySelector(".create__filename");
    const fileclear = document.querySelector(".create__clear");
    filename.textContent = file.name;
    fileclear.classList.add('is_active');
}

function clearFile(btn) {
    const inputFile = document.querySelector(".create__file");
    const filename = document.querySelector(".create__filename");
    const fileclear = document.querySelector(".create__clear");
    inputFile.value = '';
    filename.textContent = '';
    btn.classList.remove('is_active');
} 


// show url btn
function showUrl(btn) {
    const urlBtn = document.querySelector(".create__url");
    urlBtn.classList.toggle('is_active');

    if (urlBtn.classList[2]) {
        urlBtn.value = '';
    }
}


// menu
document.querySelectorAll(".header__item").forEach(function(tabsBtn) {
  tabsBtn.addEventListener("click", function(event) {
    const path = event.currentTarget.dataset.menu

    document.querySelectorAll(".page").forEach(function(tabContent) {
      tabContent.classList.remove('is_active')
    });

    document.querySelector(`[data-page="${path}"]`).classList.add("is_active")
  });
});

const menuBtn = document.querySelectorAll(".header__item");

for (let i=0; i<menuBtn.length; i++) {
  menuBtn[i].onclick = function() {
    let j = 0;

    while(j < menuBtn.length) {
      menuBtn[j++].className = "header__item";
    };

    menuBtn[i].className = "header__item is_active";
  };

};


// input mask
const sendDate = document.getElementById("sendDate");
const mask = new Inputmask("99:99-99.99.9999");
mask.mask(sendDate);

// validate
const sendBtn = document.querySelector(".create__send");

hoursCount = 24;
minsCount = 60;
monthsCount = 12;

function timeH(hour) {
    if (hour < (hoursCount+1)) {
        return true;
    }
}
function timeMin(min) {
    if (min < (minsCount+1)) {
        return true;
    }
}


var monthArray = [
    31, // jan      0
    28, // feb      1
    31, // marth    2
    30, // apr      3
    31, // may      4
    30, // june     5
    31, // july     6
    31, // aug      7
    30, // sep      8
    31, // oct      9
    30, // now      10
    31, // dec      11
]

function changeFeb() {
    if (dateValue.date.year % 4 == 0) {
        monthArray[1] = 29;
    } else {
        monthArray[1] = 28;
    }
}


function timeDay(day, month) {
    if (day < (monthArray[month-1]+1)) {
        return true;
    }
}

function timeMonth(month) {
    if (month < (monthsCount+1)) {
        return true;
    }
}

function timeYear(year, now) {
    if ((now+2) > year && year > (now-1)) {
        return true;
    } else {
        // console.log("error");
        // console.log(`${now+2} > ${year} > ${now-1}`);
    }
}


function diffTime(now, input) {
    if (now<input) {
        return true
    } else {
        // console.log('error');
    }
}

function dateAccept() {
    if (!inputDateValue) {
        send(nowDateMin);
    } else if (timeH(dateValue.time.hours) && timeMin(dateValue.time.mins) && timeDay(dateValue.date.day, dateValue.date.month) && timeMonth(dateValue.date.month) && timeYear(dateValue.date.year, nowYear) && diffTime(nowDateMin, inputDateMin)) {
        return true;
    } else {
        error();
    }
}



// CREATE SELECT
var tgSelectValue;
function tgSelectData() {
    tgSelectValue = document.querySelector('.choices__item[data-item]').textContent.trim();
}

// CREATE FILE  FIX ME!!!!!!!!!!!!!
var createFileValue;
function fileValueFunc(condition) {
    createFileValue = document.querySelector(".create__file").files[0];
    if (condition == 'return') {
        if (createFileValue) {
            return true;
        }
    }
}

// CREATE TEXTAREA
var createText;
function createTextFunc(condition) {
    createText = document.querySelector(".create__text").value;
    if (condition == 'return') {
        if (createText) {
            return true
        }
    }
}

// CREATE URL
var createUrl;
function createUrlFunc() {
    createUrl = document.querySelector(".create__url").value;
}






function error() {
    console.log('error');
}



sendBtn.onclick = () => {
    
    inputDateValue = sendDate.value;
    dateValue = {
        time: {
            hours: Number(inputDateValue[0]+inputDateValue[1]),
            mins: Number(inputDateValue[3]+inputDateValue[4]),

        },
        date: {
            day: Number(inputDateValue[6]+inputDateValue[7]),
            month: Number(inputDateValue[9]+inputDateValue[10]),
            year: Number(inputDateValue[12]+inputDateValue[13]+inputDateValue[14]+inputDateValue[15]),
        },
    }

    nowDateMin = +new Date() / 60000;
    nowYear = new Date().getFullYear();

    var inputDate = new Date(dateValue.date.year, dateValue.date.month-1, dateValue.date.day, dateValue.time.hours, dateValue.time.mins);
    inputDateMin = +inputDate / 60000;

    // console.log(`INPUT TIME: ${inputDateMin}`);
    // console.log(`NOW TIME: ${nowDateMin}`);
    // console.log(inputDateValue);

    changeFeb();


    tgSelectData();
    fileValueFunc();
    createTextFunc();
    createUrlFunc();

    //GLOBAL DATA OBJECT
    globalData = {
        createSelect: tgSelectValue,
        createFile: createFileValue, // FIX ME!!
        createText: createText,
        createUrl: createUrl,
        createDate: +inputDate,
    }

    // MAIN CONDITION!!!!!!!!!!!!!!!!!!
    if (dateAccept() && (createTextFunc('return') || fileValueFunc('return'))) {
        send();
    } else {
        error();
    }
}

// LAST FUNC OUTPUT!!!!!!!!!!!!!
function send() {
    console.log(globalData);
    console.log('PUSH!');
}