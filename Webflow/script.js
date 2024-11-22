document.querySelectorAll('.title').forEach((title) => {
	title.addEventListener('click', () => {
		const box = title.nextElementSibling;
		const isActive = title.classList.contains('active');

		document.querySelectorAll('.title.active').forEach((activeTitle) => {
			activeTitle.classList.remove('active');
			activeTitle.setAttribute('aria-expanded', 'false');
			activeTitle.nextElementSibling.style.maxHeight = null;
		});

		if (!isActive) {
			title.classList.add('active');
			title.setAttribute('aria-expanded', 'true');
			box.style.maxHeight = `${box.scrollHeight}px`;
		}
	});
});
