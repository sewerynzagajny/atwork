// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// Data
const dateContainerEL = document.querySelector('.date__container');

// const day = `${now.getDate()}`.padStart(2, 0);
// const mounth = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// const sec = `${now.getSeconds()}`.padStart(2, 0);

const updateDate = function () {
  const now = new Date();
  const opitonDate = {
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
    opitonDate
  ).format(now);
};
setInterval(updateDate, 1000);
updateDate();

// dateContainerEL.textContent = `${day}.${mounth}.${year}, ${hour}:${min}:${sec}`;
// console.log(`${day}.${mounth}.${year}, ${hour}:${min}:${sec}`);
