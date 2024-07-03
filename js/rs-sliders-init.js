/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	if (document.querySelector('.rs-slider__slider.swiper')) {
		const sliderBlocks = document.querySelectorAll('.rs-slider');

		sliderBlocks.forEach(slider => {
			const sliderSwiper = slider.querySelectorAll('.rs-slider__slider.swiper');
			const arrowPrev = slider.querySelector('.rs-slider__button-prev');
			const arrowNext = slider.querySelector('.rs-slider__button-next');
			const pagination = slider.querySelector('.rs-slider__pagination');
			const interleaveOffset = 0.75;

			sliderSwiper.forEach(swiper => {
				const swiperMain = new Swiper(swiper, {
					// Автопрокрутка
					autoplay: {
						// Пауза между прокруткой
						delay: 10000,
						// Закончить на последнем слайде
						stopOnLastSlide: false,
						// Отключить после ручного переключения
						disableOnInteraction: false,
					},

					// Кол-во показываемых слайдов
					slidesPerView: 1,

					// Обновить свайпер
					// при изменении элементов слайдера
					observer: true,
					// при изменении родительских элементов слайдера
					observeParents: true,
					// при изменении дочерних элементов слайдера
					observeSlideChildren: true,

					// Скорость смены слайдов
					speed: 800,

					// Включение/отключение
					// перетаскивание на ПК
					simulateTouch: true,
					allowTouchMove: false,
					// Чувствительность свайпа
					touchRadio: 1,
					// Угол срабатывания свайпа/перетаскивания
					touchAngle: 45,
					// Cобытие touchstart (pointerdown)
					touchStartPreventDefault: false,

					// Цикличность слайдера
					loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Пагинация
					pagination: {
						el: pagination,
						clickable: true,
						type: 'fraction',
						formatFractionCurrent: addZero,
						formatFractionTotal: addZero
					},

					watchSlidesProgress: true,
					direction: 'vertical',
					on: {
						progress: function () {
							let swiper = this;

							for (let i = 0; i < swiper.slides.length; i++) {
								let slideProgress = swiper.slides[i].progress;
								let innerOffset = swiper.height * interleaveOffset;
								let innerTranslate = slideProgress * innerOffset;

								TweenMax.set(swiper.slides[i].querySelector(".rs-slider__bg"), {
									y: innerTranslate,
								});
							}
						},
						setTransition: function (slider, speed) {
							let swiper = this;
							for (let i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector(".rs-slider__bg").style.transition =
									speed + "ms";
							}
						}
					}
				});
			});
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});