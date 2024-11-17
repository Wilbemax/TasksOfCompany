async function fetchData() {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7'
	);
	const data = await response.json();
	return data;
}

const querySearch = document.querySelector('.search');
const cardContainer = document.querySelector('.card-container');
const cardCheckbox = document.querySelectorAll('.card-checkbox');

let searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get('search');

if (localStorage.getItem('url')) {
	window.history.replaceState({}, '', localStorage.getItem('url'));
}

if (searchValue) {
	querySearch.value = searchValue;
}

querySearch.addEventListener('input', (e) => {
	searchParams.set('search', e.target.value);
	const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
	localStorage.setItem('url', newUrl);
	window.history.replaceState({}, '', newUrl);
});
fetchData().then((data) => {
	const renderCards = () => {
		cardContainer.innerHTML = '';
        cardContainer.classList.remove('error')

		const filterData = data.filter((item) => {
			return (
				item.title.toLowerCase().includes(querySearch.value.toLowerCase())
			);
		});

		if (filterData.length === 0) {
            cardContainer.classList.add('error')
			cardContainer.innerHTML = `
                    <div class='card'>
                        <h2 class='card-title'>No results found</h2>
                        <p>Try searching for something else</p>
                    </div>
                `;
			return;
		} else {
			filterData.forEach((item) => {
				cardContainer.innerHTML += `
                        <div class='card'>
                            <h2 class='card-title'>${item.title}</h2>
                            <p>${item.body}</p>
                            <input class="card-checkbox" type="checkbox" id="${item.id}" />
                        </div>
                    `;
			});
		}

		const cardCheckbox = document.querySelectorAll('.card-checkbox');
		cardCheckbox.forEach((item) =>
			item.addEventListener('change', (e) => {
				if (e.target.checked) {
					item.parentElement.classList.add('checked');
				} else {
					item.parentElement.classList.remove('checked');
				}
			})
		);
	};

	renderCards();

	querySearch.addEventListener('input', renderCards);
});
