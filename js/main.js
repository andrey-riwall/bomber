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