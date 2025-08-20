$(function() {
    gsap.to(window,0.2,{scrollTo:0})

    var intro = gsap.timeline({
        onComplete:function(){
            // 애니메이션 완료 후 FullPage 초기화하여 스크롤 활성화
            initFullpage();
        }
        
    });

    intro.to('.sc_intro .sc_title span:nth-child(1)',0.5,{opacity:1})
    .to('.sc_intro .sc_title span:nth-child(1)',0.3,{opacity:0})
    .to('.sc_intro .sc_title span:nth-child(2)',0.5,{opacity:1})
    .to('.sc_intro .sc_title span:nth-child(2)',0.3,{opacity:0})
    .to('.sc_intro .sc_title span:nth-child(3)',0.5,{opacity:1})
    .to('.sc_intro .sc_title span:nth-child(3)',0.3,{opacity:0})
    .to('.sc_intro .sc_title span:nth-child(4)',0.5,{opacity:1})
    .to('.sc_intro .sc_title span:nth-child(4)',0.5,{'letter-spacing':'3vw'})
    .addLabel('m1')
    // 자동 스크롤 부분 제거
    .to('.sc_intro .sc_title span:nth-child(4)',1,{'filter':'blur(50px)'},'m1')
    .set('.sc_intro .sc_title span:nth-child(4)',{'filter':'blur(0px)'},)

    $('.nav a').click(function(e){
        e.preventDefault();
       var target = $(this).attr('href');

        gsap.to(window, {duration: 1, scrollTo:target});

        $('body').removeClass('hidden')
        $('.nav,.menu_btn').removeClass('on')
        $('.menu_btn').text('Menu')

    })

    var $grid = $('.grid').isotope({
        itemSelector: '.cont',
        layoutMode: 'fitRows',
        stagger: 100
    });

    $('.filter_area').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

        $(this).addClass('on').siblings().removeClass('on')
    });

    // Fullpage 초기화 함수
    function initFullpage() {
        const myFullpage = new fullpage('#fullpage', {
            navigation: true,
            navigationPosition: 'left',
            showActiveTooltip: true,
            
            lockAnchors: true,
            anchors: ['page01', 'page02', 'page03', 'page04'],

            autoScrolling: true,
            scrollHorizontally: true,

            verticalCentered: true,
            
            scrollOverflow: false,
        });
    }

    // grow-swiper (유알스코프)
    new Swiper(".swiper", {
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
});