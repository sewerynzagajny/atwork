import 'core-js/stable';
import 'regenerator-runtime/runtime';

const currentTime = new Date();
console.log(currentTime);

if (module.hot) {
  module.hot.accept();
}
