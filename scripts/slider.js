if (window.matchMedia("(max-width: 480px)").matches) {
    document.addEventListener('DOMContentLoaded', function() {
      const slider = document.querySelector('.slider');
      const cards = document.querySelectorAll('.card');
      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      const dotsContainer = document.querySelector('.slider-dots');
      
      let slideWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
      let currentIndex = 0;
      let cardsPerView = Math.floor(slider.offsetWidth / slideWidth);
      let maxIndex = cards.length - cardsPerView;
      
      // Переменные для отслеживания свайпов
      let touchStartX = 0;
      let touchEndX = 0;
      
      // Создаем индикаторы (точки)
      function createDots() {
        for (let i = 0; i <= maxIndex; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => {
            goToSlide(i);
          });
          dotsContainer.appendChild(dot);
        }
      }
      
      // Обновляем активную точку
      function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      // Перейти к определенному слайду
      function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
      }
      
      // Обработчики для кнопок навигации
    
      
      // Обработка свайпов на мобильных устройствах
      slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchEndX < touchStartX - minSwipeDistance) {
          // Свайп влево - следующий слайд
          goToSlide(currentIndex + 1);
        }
        if (touchEndX > touchStartX + minSwipeDistance) {
          // Свайп вправо - предыдущий слайд
          goToSlide(currentIndex - 1);
        }
      }
      
      // Обработка изменения размера окна
      window.addEventListener('resize', () => {
        slideWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
        cardsPerView = Math.floor(slider.offsetWidth / slideWidth);
        maxIndex = Math.max(0, cards.length - cardsPerView);
        
        // Пересоздаем точки
        dotsContainer.innerHTML = '';
        createDots();
        
        // Проверяем, не вышли ли мы за пределы
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }
        
        goToSlide(currentIndex);
      });
      
      // Инициализация
      createDots();
    });
  }
  
  