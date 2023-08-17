import API from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const catSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const pLoad = document.querySelector('.loader');

loadPage();

catSelect.addEventListener('change', chooseCat);

function loadPage() {
  pLoad.classList.remove('hidden');
  fetchCatsAll();
}

function fetchCatsAll() {
  API.fetchBreeds()
    .then(cats => renderCatList(cats))
    .catch(errorPageLoad);
}

function renderCatList(cats) {
  pLoad.classList.add('hidden');
  catSelect.classList.remove('hidden');
  const markup = cats
    .map(cat => {
      return `<option value ='${cat.id}'>${cat.name}</option>`;
    })
    .join('');
  catSelect.innerHTML = markup;
  new SlimSelect({
    select: '#selectElement',
  });
}

function chooseCat(e) {
  pLoad.classList.remove('hidden');
  catInfo.classList.add('hidden');
  API.fetchCatByBreed(e.target.value)
    .then(cat => {
      renderCatInfo(cat);
    })
    .catch(e => errorLoadCat(e));
}

function renderCatInfo(cat) {
  pLoad.classList.add('hidden');
  catInfo.classList.remove('hidden');
  let inf = `
    <img src="${cat[0].url}" alt="${cat[0].breeds[0].name}" width="600"/>
    <div>
      <h2>${cat[0].breeds[0].name}</h2>
      <p>${cat[0].breeds[0].description}</p>
      <p><b>Temperament:&nbsp;</b><span>${cat[0].breeds[0].temperament}</span></p>
    </div>`;
  catInfo.innerHTML = inf;
}

function errorPageLoad(e) {
  pLoad.classList.add('hidden');
  catSelect.classList.add('hidden');
  catInfo.innerHTML = '';
  errorMessage(e);
}

function errorLoadCat(e) {
  pLoad.classList.add('hidden');
  catInfo.innerHTML = '';
  errorMessage(e);
}

function errorMessage(e) {
  // Notiflix.Notify.failure(
  //   'Oops! Something went wrong! Try reloading the page!'
  // );
  Notiflix.Notify.init({ fontSize: '28px', width: '600px' });
  if (!navigator.onLine) {
    window.alert('NO INTERNET CONNECTION\nCheck your internet connection!');
    return;
  }
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
