import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// Data
const dateContainerEL = document.querySelector('.date__container');

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
