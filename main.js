//function to create to 'count' number of div elements
//and insert it to 'elementId' element as its child
//with class name 'className'
function createDiv(count, element, className, elementId) {
    let i = 0;
    while (i != count) {
        let div1 = document.createElement(element);
        div1.setAttribute('class', className);
        document.getElementById(elementId).appendChild(div1);
        i++;
    }
}

/*
function returns both pos and neg random number, depending on sign
--height returns number in between (-clientHeight to 1) or (1 to clientHeight)
--width returns number in between (-clientWidth to 1) or (1 to clientWidth)
*/
function seed(dimension, sign) {

    let ranNum, height, width;

    if (sign == '+') {
        if (dimension == 'H') {
            height = parent1.clientHeight;
            ranNum = Math.floor((Math.random() * height) + 1);
            return ranNum;
        }
        else {
            width = parent.clientWidth;
            ranNum = Math.floor((Math.random() * width) + 1);
            return ranNum;
        }
    }
    else {
        if (dimension == 'H') {
            height = parent1.clientHeight;
            ranNum = Math.floor((Math.random() * height) + 1);
            return (ranNum * -1);
        }
        else {
            width = parent1.clientWidth;
            ranNum = Math.floor((Math.random() * width) + 1);
            return (ranNum * -1);
        }
    }
}

function ranMove(target = '#parent1 .divs1') {
    anime({
        targets: '#parent1 .divs1',
        translateX: function () {
            return anime.random(seed('W', '-'), seed('W', '+'));
        },
        translateY: function () {
            return anime.random(seed('H', '-'), seed('H', '+'));
        },
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 500 },
            { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(150, { grid: [14, 5], from: 'center' }),
        duration: 900,
        easing: 'easeInOutSine',
        complete: ranMove
    });
}

//function divs with indices divisible by 5
function unique(count) {
    let array = [];
    let j = 0;
    for (let index = 0; index < count; index++) {
        if (index % 5 == 0) {
            array[j++] = document.getElementById('parent1').children[index];
        }
    }
    //adding its own separate set of styling
    array.forEach(item => {
        item.style.backgroundColor = '#cbdb6d';
        item.style.width = '2vw';
        item.style.height = '2vw';
    });
}
//utility functions below
function increase() {
    divNo.value = ++divCount;
}
function decrease() {
    divNo.value = --divCount;
}
//div count change function
function helper() {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
    divCount = divNo.value;
    divNo.placeholder = divCount;
    divCount = Number(divCount);
    createDiv(divCount, 'div', 'divs1', 'parent1');
    unique(divCount);
    console.log("New microbes added");
    microbesCount.innerHTML = divCount;
    console.log("Present microbes count:", divCount);
}
//reset function
function normal() {
    divCount = 50;
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }
    divNo.value = divCount;
    divNo.placeholder = divCount;
    createDiv(divCount, 'div', 'divs1', 'parent1');
    unique(divCount);
    console.log("Reset Done");
    microbesCount.innerHTML = divCount;
    console.log("Present microbes count: ", divCount);
}

//driver code
let parent = document.getElementById('parent1');
let divNo = document.getElementById('value');
let microbesCount = document.getElementById('microbes');
let divCount = 50;
createDiv(divCount, 'div', 'divs1', 'parent1'); //inserts provided divCount number of divs into the DOM
unique(divCount);
console.log("Initial microbes count:", divCount);

setTimeout(ranMove, 300);//starts the animation


increment.addEventListener('click', increase);
decrement.addEventListener('click', decrease);
reset.addEventListener('click', normal);
apply.addEventListener('click', helper);

