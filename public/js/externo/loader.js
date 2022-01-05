const showLoader = (elementId) => {
  const element = document.getElementById(elementId);
  const loader = document.createElement('div');
  loader.classList.add('loader');
  element.prepend(loader);
};

const hideLoader = (elementId) => {
  const element = document.getElementById(elementId);
  const loader = document.getElementsByClassName('loader');
  for (let i = 0; i < loader.length; i++) {
    loader[i].remove();
  }
};
