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
const prevEl = document.querySelector('.prev');
const nextEl = document.querySelector('.next');

const today = new Date();
const optionDate = {
  month: 'long',
  year: 'numeric',
};
dataEL.innerHTML = '';
// dataEL.textContent = new Intl.DateTimeFormat(
//   navigator.language,
//   optionDate
// ).format(today);

let activeDay;
let month = new Intl.DateTimeFormat(navigator.language, {
  month: optionDate.month,
}).format(today);
let year = today.getFullYear();

//  function to add days

const initCalendar = function () {
  // to get prev month days and current month all days and rem next month days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDays = lastDay.getDate();
  const day = firstDay.getDate();
  const nextDays = 7 - lastDay.getDate() - 1;

  // Update date top of calendar
  dataEL.textContent = `${month} ${year}`;
};

initCalendar();
