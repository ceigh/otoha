const circleEl = document.querySelector('circle');

const showCircle = () => circleEl.style.opacity = '1';
const hideCircle = () => circleEl.removeAttribute('style');

const circle = {
  show: showCircle,
  hide: hideCircle
};
export default circle;
