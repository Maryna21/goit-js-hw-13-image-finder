import * as basicLightbox from 'basicLightbox';
export default function onClickImage(evt) {
    basicLightbox
        .create(`<img class="bigImg" width="800" height="600" src="${evt.target.dataset.sourse}">`)
        .show();
}