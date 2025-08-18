
document.addEventListener('DOMContentLoaded', () => {
    // 드롭다운 버튼 클릭 이벤트
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function () {
            const dropdownButton = this.closest('.dropdown')?.querySelector('.dropdown-toggle');
            if (dropdownButton) {
                dropdownButton.innerHTML = this.innerHTML;
            }
        });
    });

    const mainSwiperSlide = document.querySelector(".main-swiper").querySelectorAll(".swiper-slide");
    new Swiper(".main-swiper", {
        loop: mainSwiperSlide.length > 1,
        observer: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    new Swiper(".media-swiper", {
        slidesPerView: 1,
        loop: true,
        observer: true,
        spaceBetween: 15,
        pagination: {
            el: '.swiper-pagination',
        },
    });

    new Swiper(".ser-swiper", {
        observer: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
        },
    });
});
