window.addEventListener('load', function() {
    // 햄버거
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    hamburgerBtn.addEventListener('click', () => {
        document.body.classList.toggle('gnb-open');
    });

    // is-scroll
    window.addEventListener('scroll', function() {
        document.body.classList.toggle('is-scroll', window.scrollY > 0);
    });

   // 서비스탭 클릭시 active탭 가운데로
    const tabWrap = document.querySelector('#service-tabs');
    const activeTab = document.querySelector('#service-tabs .active');
    const navWrap = document.querySelector('.urs-history .nav');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    function stickyCheck(ele) {
        ele.classList.toggle('is-sticky', ele.getBoundingClientRect().top <= headerHeight);
    }

    if (tabWrap && activeTab) {
        function scroll() {
            const scrollLeft = activeTab.offsetLeft - (tabWrap.offsetWidth / 2) + (activeTab.offsetWidth / 2);
            tabWrap.scrollTo({ left: scrollLeft });
        }
        scroll();
        window.addEventListener('resize', scroll);
    }

    window.addEventListener('scroll', function() {
        tabWrap && stickyCheck(tabWrap);
        navWrap && stickyCheck(navWrap);
    });

    window.dispatchEvent(new Event('scroll'));

    // 유알스코프 높이
    function setCustomHeight() {
        const height = window.innerHeight - 60;
        document.documentElement.style.setProperty('--height', `${height}px`);
    }

    window.addEventListener('load', setCustomHeight);
    window.addEventListener('resize', setCustomHeight);

    // 푸터 버튼 드롭다운
    const button = document.querySelector(".ft-info-btn");
    const dropdown = document.querySelector(".ft-info.dropdown-menu");

    button.addEventListener("click", function () {
        if (dropdown.classList.contains("show")) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth"
                });
            }, 100);
        }
    });

    // swiper-mob-only
    new Swiper('.swiper-mob-only', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { 
            el: ".swiper-pagination" 
        },
        breakpoints: {
            768: {
                spaceBetween: 0,
            }
        }
    });

    // grow-swiper (유알스코프)
    new Swiper(".grow-swiper", {
        observer: true,
        pagination: { 
            el: '.swiper-pagination' 
        },
        navigation: { 
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev' 
        },
        allowTouchMove: true,
        spaceBetween: 30,
    });


    // our speciality 드롭다운
    function toggleOnClass() {
        const specialNums = document.querySelectorAll(".special-num");

        specialNums.forEach(num => {
            num.addEventListener("click", function () {
    
                if(window.innerWidth > 991){
                    return;
                }
    
                if (this.classList.contains("on")) {
                    this.classList.remove("on");
                } else {
                    specialNums.forEach(item => item.classList.remove("on"));
                    this.classList.add("on");
                }
            });
        });
    }

    toggleOnClass();
});