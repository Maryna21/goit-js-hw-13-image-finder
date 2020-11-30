import './styles.css';
import imgCardTpl from './templates/imgCard.hbs';
import ImageApiService from './js/apiService';
import getRefs from './js/getRefs';
import { alert, defaultModules } from '@pnotify/core';
import onClickImage from './js/onClickImage';
const debounce = require('lodash.debounce');
const imageApiService = new ImageApiService();
const refs = getRefs();
refs.cardContainer.addEventListener('click', onClickImage);
refs.searchForm.addEventListener('submit', debounce(onSearch, 500));
refs.buttonScroll.addEventListener('click', onLoadMore);
let refInput = document.querySelector('input');
function onSearch(e) {
    e.preventDefault();
    clearResult();
    imageApiService.searchQuery = refInput.value;
    imageApiService.resetPage();
    if (imageApiService.searchQuery === '') {
        return alert('Введить запит для пошуку')
    }

    imageApiService.fetchPictures()
        .then(renderImgCard)
        .catch(onFetchError);
}
function renderImgCard(hits) {
    const markup = imgCardTpl(hits);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup); 
}
    
function clearResult() {
        refs.cardContainer.innerHTML = '';
}

function onLoadMore() {
    imageApiService.fetchPictures().then(renderImgCard);
    onScrollTo()     
}

function onFetchError() {
    alert('Щось пішло не так! ')
}

function onScrollTo() {
    let value = document.body.scrollHeight;
     setTimeout(() => {
      window.scrollTo({
        top: value,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
}
   