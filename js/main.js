$(function() {
    gsap.to(window,0.2,{scrollTo:0})


    var intro = gsap.timeline({
        onComplete:function(){
            gsap.set('body',{'overflow':'auto'})
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
    .to(window,1.5,{scrollTo:'.sc_works'},'m1')
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







})