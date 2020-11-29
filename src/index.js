import './styles.css';
import imgCardTpl from './templates/imgCard.hbs';
import imgListTpl from './templates/imgList.hbs';
import onScroll from './js/onScroll';
import onFetchError from './js/onError';
import ImageApiService from './js/apiService';
import getRefs from './js/getRefs';
import { alert, defaultModules } from '@pnotify/core';
const debounce = require('lodash.debounce');
const imageApiService = new ImageApiService();
const refs = getRefs();
refs.searchForm.addEventListener('submit', debounce(onSearch, 500));
refs.buttonScroll.addEventListener('click', onScroll);

function onSearch(e) {
    e.preventDefault();
    clearResult();
    imageApiService.searchQuery = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    console.log(imageApiService.searchQuery)
    imageApiService.fetchImages()
        .then(renderImgCard)
        .catch(onFetchError);
}
function renderImgCard(img) {
	 
    const markup = imgCardTpl(img);
    return refs.cardContainer.innerHTML('beforeend', markup); 
  }
    
function clearResult() {
        refs.cardContainer.innerHTML = '';
}