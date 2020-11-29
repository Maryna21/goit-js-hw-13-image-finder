export default class ImageApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
		this.perpage = 12;
	}
	fetchPictures() {
		const BASE_URL = 'https://pixabay.com/api/';
		const myApiKey = '19250465-3ecaba10f96f1a4c0424b71f3';
		const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${myApiKey}`;
		return fetch(url)
			.then(response => response.json()).then((data) => {
				this.incrementPage();
				return data;
			}
			)
	}
		incrementPage(){
			this.page += 1;
		}
		resetPage() {
			this.page = 1;
		}
	}

console.log(ImageApiService);


