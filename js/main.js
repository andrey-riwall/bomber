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
const mask = new Inputmask("99.99.9999");
mask.mask(sendDate);