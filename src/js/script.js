import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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
  // to get prev month days and current month all days and rem next month days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay();
  console.log(day);

  // Update date top of calendar
  dataEL.textContent = `${monthStr} ${year}`;

  //adding days on DOM

  let days = '';

  // prev month days

  // for (let x = day; x > 0; x--) {
  //   days +=`<div class="day prev-date">${prevDays - x + 1}</div>`;
  //   console.log(days);
  // }
  const prevMonthDays = Array.from(
    { length: day - 1 },
    (_, i) => prevDays - i
  ).reverse();
  prevMonthDays.forEach(
    prevDay => (days += `<div class="day prev-date">${prevDay}</div>`)
  );

  // cuurent month day

  const currentMonthDays = Array.from({ length: lastDate }, (_, i) => ++i);
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

  //next month

  const nextMonthDays = Array.from({ length: nextDays }, (_, i) => ++i);
  nextMonthDays.forEach(
    day => (days += `<div class='day next-date'>${day}</div>`)
  );

  daysEL.innerHTML = days;
};

initCalendar();

// Prev month

const prevMonth = function () {
  month--;
  monthStr = new Intl.DateTimeFormat(navigator.language, {
    month: optionDate.month,
  }).format(new Date(year, month + 1, 0));
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
};

// Next month

const nextMonth = function () {
  month++;
  monthStr = new Intl.DateTimeFormat(navigator.language, {
    month: optionDate.month,
  }).format(new Date(year, month, 1));
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
};

prevEl.addEventListener('click', prevMonth);
nextEl.addEventListener('click', nextMonth);
