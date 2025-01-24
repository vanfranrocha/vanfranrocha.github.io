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

var iconMenu = document.querySelector('.menu-burguer');

iconMenu.addEventListener('click', function() {
  toggleMenu();
}, false);

var isOpen = false;

function toggleMenu(e) {
  isOpen = !isOpen;
  var myMenu = document.querySelector('.menu-wrapper');
  var overlay = document.querySelector('.overlay');
 
  myMenu.classList.toggle('active'); 
  overlay.classList.toggle('active');
  if (iconMenu.classList.contains('open')) {
    iconMenu.classList.remove('open');
  } else {
    iconMenu.classList.add('open');
  }
}

document.onkeydown = function(e) {
  if (e.keyCode == 27) {
    isOpen && 
    toggleMenu();
  }
}

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
  
	if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
  
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
	var that = this;
	var delta = 200 - Math.random() * 100;
  
	if (this.isDeleting) { delta /= 2; }
  
	if (!this.isDeleting && this.txt === fullTxt) {
	  delta = this.period;
	  this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	  this.isDeleting = false;
	  this.loopNum++;
	  delta = 500;
	}
  
	setTimeout(function() {
	  that.tick();
	}, delta);
};
  
window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
	  var toRotate = elements[i].getAttribute('data-type');
	  var period = elements[i].getAttribute('data-period');
	  if (toRotate) {
		new TxtType(elements[i], JSON.parse(toRotate), period);
	  }
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const selectValue = document.querySelector('[data-select-value]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}


const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "todos") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}