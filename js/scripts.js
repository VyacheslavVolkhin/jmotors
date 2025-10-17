document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//copy button
	document.querySelectorAll('.js-btn-copy').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const content = btn.getAttribute('data-content');
			if (content) {
				navigator.clipboard.writeText(content)
					.then(() => {
						// alert('Скопировано!');
					})
					.catch(err => {
						// Обработка ошибок, если не удалось скопировать
						alert('Ошибка копирования');
					});
			}
		});
	});


	//select toggle content visibility
	const inputs = document.querySelectorAll(
	  "input[data-content], input[data-content-check], input[data-content-uncheck]"
	);
  
	inputs.forEach(function (input) {
	  toggleContent(input);
	  });
  
	inputs.forEach((input) => {
	  input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		  content.classList.remove("active");
			  });
  
		inputs.forEach(toggleContent);
		  });
	  });
  
	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	  button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		  .querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		  .forEach((content) => {
			content.classList.add("active");
			  });
		return false;
		  });
	  });
  
	function toggleContent(input) {
	  let selectContent;
	  if (input.checked) {
		selectContent =
		  input.getAttribute("data-content-check") ||
		  input.getAttribute("data-content");
		  } else {
		selectContent = input.getAttribute("data-content-uncheck");
		  }
	  document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		  content.classList.add("active");
		  });
	  }


	//form login and reg toggle
	const toggleButtons = document.querySelectorAll('.js-form-toggle');
    const loginBox = document.querySelector('.form-login-box');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            loginBox.classList.toggle('reg-active');
			e.preventDefault();
        });
    });

	//photo upload
	


	//edit field
	document.querySelectorAll('.field-button-edit').forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			const container = this.closest('.frm-field-input');
			const input = container.querySelector('.form-input');
			const isActive = this.classList.toggle('active');
			
			if (isActive) {
				input.removeAttribute('disabled');
				if (input.type === 'password') {
					input.dataset.originalType = 'password';
					input.type = 'text';
				}
			} else {
				input.setAttribute('disabled', 'disabled');
				if (input.dataset.originalType === 'password') {
					input.type = 'password';
				}
			}
		});
	});
	

	//files add
	const fileBlocks = document.querySelectorAll('.js-field-file');
	
	fileBlocks.forEach(fileBlock => {
		const fileInput = fileBlock.querySelector('.js-field-input');
		const fileAttachButton = fileBlock.querySelector('.js-file-button-attach');
		const fileDeleteButton = fileBlock.querySelector('.js-file-button-del');
		const fileName = fileBlock.querySelector('.file-name');
	
		fileAttachButton.addEventListener('click', function() {
			fileInput.click();
		});
	
		fileInput.addEventListener('change', function() {
			if (fileInput.files.length > 0) {
				fileName.textContent = fileInput.files[0].name;
				fileBlock.classList.add('file-active');
			} else {
				fileName.textContent = '';
				fileBlock.classList.remove('file-active');
			}
		});
	
		fileDeleteButton.addEventListener('click', function(e) {
			e.preventDefault();
			fileName.textContent = '';
			fileBlock.classList.remove('file-active');
			fileInput.value = null;
		});
	});


	//search
	const searchResultWrap = document.querySelector('.header-main-panel .search-result-wrap');
    const searchInput = document.querySelector('.header-main-panel .search-inner-wrap .form-input');
    function removeActiveClass() {
        if (searchResultWrap.classList.contains('active')) {
            searchResultWrap.classList.remove('active');
        }
    }
    document.addEventListener('click', function(event) {
        if (!searchResultWrap.contains(event.target) && event.target !== searchInput) {
            removeActiveClass();
        }
    });


	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterButtonClose = document.querySelector('.js-filter-close');
	if (filterButtonOpen) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonClose) {
		filterButtonClose.addEventListener("click", function(event) {
				document.body.classList.remove("filter-show");
				event.preventDefault();
		})
	}

	
	//range slider
	const sliderRange = document.getElementById('range-slider');
	const minInput = document.getElementById('input-number-min');
	const maxInput = document.getElementById('input-number-max');
	
	const minRange = 0;
	const maxRange = 12500;
	
	if (sliderRange) {
		noUiSlider.create(sliderRange, {
			start: [2320, 12500],
			connect: true,
			range: {
				'min': [minRange],
				'max': [maxRange]
			},
			tooltips: true,
			format: {
				to: function (value) {
					return Math.round(value).toString();
				},
				from: function (value) {
					return Number(value);
				}
			},
		});
		sliderRange.noUiSlider.on('update', (values, handle) => {
			const value = values[handle];
	
			if (handle === 0) {
				minInput.value = Math.round(value);
			} else {
				maxInput.value = Math.round(value);
			}
		});
		minInput.addEventListener('change', () => {
			sliderRange.noUiSlider.set([minInput.value, null]);
		});
		maxInput.addEventListener('change', () => {
			sliderRange.noUiSlider.set([null, maxInput.value]);
		});
	}


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//slider tiles
	const sliderstiles = document.querySelectorAll(".slider-tiles");
	
	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				1200: { slidesPerView: 3 },
			},
		});
	});


	//slider reviews
	const slidersreviews = document.querySelectorAll(".slider-reviews");
	
	slidersreviews.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-reviews-pagination");
		const nextEl = container.querySelector(".button-slider-reviews-next");
		const prevEl = container.querySelector(".button-slider-reviews-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 1 },
				1400: { slidesPerView: 2 },
			},
		});
	});


	//slider catalog
	const sliderscatalog = document.querySelectorAll(".slider-catalog");
	
	sliderscatalog.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-catalog-pagination");
		const nextEl = container.querySelector(".button-slider-catalog-next");
		const prevEl = container.querySelector(".button-slider-catalog-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1400: { slidesPerView: 4 },
			},
		});
	});


	//slider main
	const slidersmain = document.querySelectorAll(".slider-main");
	
	slidersmain.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-main-pagination");
		const nextEl = container.querySelector(".button-slider-main-next");
		const prevEl = container.querySelector(".button-slider-main-prev");
		const counterEl = container.querySelector(".slider-count");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			on: {
				init: function () {
					updateSliderCounter(this);
				},
				slideChange: function () {
					updateSliderCounter(this);
				},
			},
		});
		function updateSliderCounter(swiperInstance) {
			if (!counterEl) return;
			const currentSlide = swiperInstance.realIndex + 1;
			const totalSlides = swiperInstance.slides.length;
			counterEl.textContent = currentSlide;
			counterEl.setAttribute('data-count', totalSlides);
		}
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			threshold: 5,
			direction: 'vertical',
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1024: {
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextMBtn,
				prevEl: prevMBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});


	//slider history
	const slidershistory = document.querySelectorAll(".slider-history");
	
	slidershistory.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const nextEl = container.querySelector(".button-slider-history-next");
		const prevEl = container.querySelector(".button-slider-history-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider teams
	const slidersteams = document.querySelectorAll(".slider-teams");
	
	slidersteams.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-teams-pagination");
		const nextEl = container.querySelector(".button-slider-teams-next");
		const prevEl = container.querySelector(".button-slider-teams-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				768: { slidesPerView: 3 },
				1200: { slidesPerView: 4 },
			},
		});
	});


})