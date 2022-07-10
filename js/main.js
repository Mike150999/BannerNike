
const URL = 'https://solovey.com.ua/test/data.json';

const getResourse = async (url) => {
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}
	return await res.json();
};


const getSneakers = async () => {
	const res = await getResourse(URL);
	return res;
};


getSneakers()
	.then(res => {
		const currency = res.currency;
		res.sneakers.forEach(item => {
			const image = item.image_url;
			const link = item.link;
			const model = item.model;
			const price = item.price;
			new Banner({ image, link, model, price, currency }).render();
		});
	})
	.then(
		res => {
			const tabs = document.querySelectorAll('.banner');
			const btn = document.querySelector('.btn');
			let activeTab = 1;

			setInterval(() => {
				tabs.forEach((item, i) => {
					if (i === activeTab) {
						item.classList.add('show');
						item.classList.remove('hide');
					} else {
						item.classList.add('hide');
						item.classList.remove('show');
					}
				});
				if (activeTab >= tabs.length - 1) {
					activeTab = 0;
				} else {
					activeTab = activeTab + 1;
				}
			}, 3500);

		}
	);


class Banner {
	constructor({ image, link, model, price, currency }) {
		this.image = image;
		this.link = link;
		this.model = model;
		this.price = price;
		this.currency = currency;
	}


	render() {
		const element = document.createElement('div');
		const parent = document.querySelector('.banner__container');

		element.innerHTML = `
		<a href="${this.link}">
		<div class="banner">
	<div class="banner__inner">
			<img class="banner__logo" src="./img/Vector.png" alt="img">
		<p class="banner__text">${this.model}</p>
		<div class="banner__box">
		<div class="banner__price"><span>${this.currency}${this.price}</span> </div>
			<img class="banner__img" src=${this.image} alt="img"></div>
		<button class="banner__button">ORDER NOW!</button>
	</div>
</div>
		</a >`;

		parent.append(element);
	}

}








