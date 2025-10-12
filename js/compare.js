//slider compare
const sliderscompare = document.querySelectorAll(".slider-compare");

// Функция для синхронизации высоты заголовков
function syncSliderTitlesHeight(container) {
    // Синхронизируем заголовки в slider-title-wrap
    const headerTitles = container.querySelectorAll('.slider-compare .slider-title-wrap .slider-title');
    const slideTitles = container.querySelectorAll('.slider-compare .sl-wrap .slider-title');
    
    // Сбрасываем высоту перед пересчетом
    headerTitles.forEach(title => {
        title.style.minHeight = '';
    });
    slideTitles.forEach(title => {
        title.style.minHeight = '';
    });
    
    // Находим максимальные высоты для каждой колонки
    const titlesCount = headerTitles.length; // Количество колонок (5)
    let maxHeights = new Array(titlesCount).fill(0);
    
    // Проходим по всем заголовкам в слайдах для каждой колонки
    for (let i = 0; i < titlesCount; i++) {
        // Высота заголовка в шапке
        const headerTitle = headerTitles[i];
        if (headerTitle) {
            const headerHeight = headerTitle.offsetHeight;
            if (headerHeight > maxHeights[i]) {
                maxHeights[i] = headerHeight;
            }
        }
        
        // Высоты заголовков в слайдах для этой колонки
        slideTitles.forEach((title, index) => {
            if (index % titlesCount === i) {
                const height = title.offsetHeight;
                if (height > maxHeights[i]) {
                    maxHeights[i] = height;
                }
            }
        });
    }
    
    // Устанавливаем максимальные высоты
    for (let i = 0; i < titlesCount; i++) {
        // Для заголовков в шапке
        if (headerTitles[i]) {
            headerTitles[i].style.minHeight = maxHeights[i] + 'px';
        }
        
        // Для заголовков в слайдах
        slideTitles.forEach((title, index) => {
            if (index % titlesCount === i) {
                title.style.minHeight = maxHeights[i] + 'px';
            }
        });
    }
}

// Функция для инициализации слайдера
function initCompareSlider(container) {
    const swiperEl = container.querySelector(".swiper");
    if (!swiperEl) return;
    
    // Удаляем старый слайдер если существует
    if (swiperEl.swiper) {
        swiperEl.swiper.destroy(true, true);
    }
    
    const swiper = new Swiper(swiperEl, {
        loop: false,
        slidesPerGroup: 1,
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoHeight: false,
        speed: 400,
        freeMode: true,
        pagination: false,
        autoplay: false,
        navigation: false,
        scrollbar: {
            el: container.querySelector(".swiper-scrollbar"),
            hide: true,
        },
        on: {
            init: function() {
                // Синхронизируем высоту после инициализации
                setTimeout(() => {
                    syncSliderTitlesHeight(container);
                }, 100);
            }
        }
    });
    
    return swiper;
}

// Функция для удаления слайда
function removeSlide(container, slideToRemove) {
    const swiper = container.querySelector('.swiper').swiper;
    if (!swiper) return;
    
    // Находим индекс слайда
    const slides = swiper.slides;
    let slideIndex = -1;
    
    for (let i = 0; i < slides.length; i++) {
        if (slides[i] === slideToRemove) {
            slideIndex = i;
            break;
        }
    }
    
    if (slideIndex !== -1) {
        // Удаляем слайд
        swiper.removeSlide(slideIndex);
        
        // Переинициализируем слайдер
        setTimeout(() => {
            initCompareSlider(container);
            syncSliderTitlesHeight(container);
        }, 50);
    }
}

// Инициализация всех слайдеров
sliderscompare.forEach((container) => {
    // Инициализируем слайдер
    initCompareSlider(container);
    
    // Синхронизируем высоту после полной загрузки контента
    setTimeout(() => {
        syncSliderTitlesHeight(container);
    }, 300);
    
    // Добавляем обработчики для кнопок удаления
    container.addEventListener('click', function(e) {
        if (e.target.closest('.tile-button-del')) {
            e.preventDefault();
            const slide = e.target.closest('.swiper-slide');
            if (slide) {
                removeSlide(container, slide);
            }
        }
    });
});

// Обработчик ресайза окна
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        sliderscompare.forEach((container) => {
            syncSliderTitlesHeight(container);
        });
    }, 250);
});

// Дополнительная синхронизация после полной загрузки страницы
window.addEventListener('load', function() {
    setTimeout(() => {
        sliderscompare.forEach((container) => {
            syncSliderTitlesHeight(container);
        });
    }, 500);
});