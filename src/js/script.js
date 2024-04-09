import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// Data
const dateContainerEL = document.querySelector('.date__container');

const updateDate = function () {
  const now = new Date();
  const optionDate = {
    hour: 'numeric',
    minute: 'numeric',
    second: `numeric`,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };

  dateContainerEL.textContent = new Intl.DateTimeFormat(
    navigator.language,
    optionDate
  ).format(now);
};
setInterval(updateDate, 1000);
updateDate();

// Calendar

const calendarEL = document.querySelector('.calnedar');
const dataEL = document.querySelector('.date__text');
const daysEL = document.querySelector('.days');
const prevEl = document.querySelector('.btn--prev');
const nextEl = document.querySelector('.btn--next');
const clearDays = document.querySelector('.days').innerHTML;
const dataInputEl = document.querySelector('.data-input');
const btnGotoEl = document.querySelector('.btn__goto');
const btnTodayEl = document.querySelector('.btn__today');

const today = new Date();
const optionDate = {
  month: 'long',
  year: 'numeric',
};
dataEL.innerHTML = '';
// const monthYear = new Intl.DateTimeFormat(
//   navigator.language,
//   optionDate
// ).format(today);

let activeDay;
let monthStr = new Intl.DateTimeFormat(navigator.language, {
  month: optionDate.month,
}).format(today);
let month = today.getMonth();
let year = today.getFullYear();

//  function to add days

const initCalendar = function () {
  daysEL.insertAdjacentHTML('afterbegin', clearDays);
  // to get prev month days and current month all days and rem next month days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDays = lastDay.getDate();
  const day = firstDay.getDay();
  let nextDays;

  // Update date top of calendar
  dataEL.textContent = `${monthStr} ${year}`;

  //adding days on DOM

  let days = '';

  // prev month days

  // for (let x = day; x > 0; x--) {
  //   days +=`<div class="day prev-date">${prevDays - x + 1}</div>`;
  //   console.log(days);
  // }

  // const prevMonthDays = Array.from(
  //   { length: day - 1 },
  //   (_, i) => prevDays - i
  // ).reverse();

  const prevMonthDays = Array.from(
    { length: day === 0 ? 6 : day - 1 }, // Jeśli pierwszy dzień miesiąca to niedziela, to poprzednie miesiąca jest 6 dni; w przeciwnym razie jest to wartość day-1.
    (_, i) => prevDays - (day === 0 ? 6 - i : day - 1 - i) // Jeśli pierwszy dzień miesiąca to niedziela, to zaczynamy od prevDays - (6 - i), w przeciwnym razie od prevDays - (day - 1 - i).
  ).reverse();

  prevMonthDays.forEach(
    prevDay => (days += `<div class="day prev-date">${prevDay}</div>`)
  );

  // cuurent month day

  const currentMonthDays = Array.from({ length: lastDays }, (_, i) => ++i);
  currentMonthDays.forEach(day => {
    if (
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      days += `<div class='day today-active'>${day}</div>`;
    } else {
      days += `<div class='day'>${day}</div>`;
    }
  });

  daysEL.innerHTML = days;

  const daysInCalendarBefore = daysEL.children.length;
  console.log(daysInCalendarBefore);
  console.log(lastDays);

  nextDays = 14 - lastDay.getDay();
  //next month
  if (daysInCalendarBefore >= 35) {
    nextDays = 7 - lastDay.getDay();
  }

  // nextDays = 14 - ((day - 1 + lastDays) % 14);

  const nextMonthDays = Array.from({ length: nextDays }, (_, i) => ++i);
  console.log(nextMonthDays);

  if (daysInCalendarBefore + nextMonthDays.length === 43)
    nextMonthDays.splice(-1);
  nextMonthDays.forEach(
    day => (days += `<div class='day next-date'>${day}</div>`)
  );

  daysEL.innerHTML = days;
};

initCalendar();

// Prev month

const prevMonth = function () {
  month--;

  if (month < 0) {
    month = 11;
    year--;
  }
  monthStr = new Intl.DateTimeFormat(navigator.language, {
    month: optionDate.month,
  }).format(new Date(year, month + 1, 0));
  initCalendar();
};

// Next month

const nextMonth = function () {
  month++;

  if (month > 11) {
    month = 0;
    year++;
  }
  monthStr = new Intl.DateTimeFormat(navigator.language, {
    month: optionDate.month,
  }).format(new Date(year, month, 1));
  initCalendar();
};

const presentMonth = function () {
  const today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  monthStr = new Intl.DateTimeFormat(navigator.language, {
    month: optionDate.month,
  }).format(today);
  initCalendar();
};

prevEl.addEventListener('click', prevMonth);
nextEl.addEventListener('click', nextMonth);

btnTodayEl.addEventListener('click', presentMonth);

const pressEnter = function () {
  return function (e) {
    dataInputEl.value = dataInputEl.value.replace(/[^0-9.]/g, '');
    if (dataInputEl.value.length === 2) dataInputEl.value += '.';
    if (dataInputEl.value.length > 7)
      dataInputEl.value = dataInputEl.value.slice(0, 7);

    // if backspace pressed
    if (e.key === 'Backspace') {
      if (dataInputEl.value.length === 3)
        dataInputEl.value = dataInputEl.value.slice(0, 2);
    }
    if (e.key === 'Enter') {
      gotoDate();
    }
  };
};

dataInputEl.addEventListener('keyup', pressEnter());

const gotoDate = function () {
  const [monthArr, yearArr] = dataInputEl.value.split('.');
  if (+monthArr > 0 && +monthArr < 13 && yearArr.length === 4) {
    month = +monthArr - 1;
    year = +yearArr;
    monthStr = new Intl.DateTimeFormat(navigator.language, {
      month: optionDate.month,
    }).format(new Date(year, month));
    initCalendar();
    dataInputEl.value = '';
  } else alert('Zła data');
};

btnGotoEl.addEventListener('click', gotoDate);

// btnGotoEl.addEventListener('submit');
