$(document).ready(function(){
	var $grid = $('.grid').masonry({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		// use element for option
		columnWidth: '.grid-sizer'
	});
	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.masonry();
	});
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		// Rola para o elemento alvo
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
	let current = '';
	
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		if (pageYOffset >= sectionTop - sectionHeight / 3) {
			current = section.getAttribute('id');
		}
	});

	menuLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
})