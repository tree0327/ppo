document.addEventListener("DOMContentLoaded", function() {
    function adjustHeights() {
        var bxElements = document.querySelectorAll('.people-grid .bx');
        var windowWidth = window.innerWidth;
        var itemsPerRow;

        if (windowWidth >= 992) {
            itemsPerRow = 3;
        } else if (windowWidth >= 768) {
            itemsPerRow = 2;
        } else {
            // 모바일에서는 작동하지 않음
            bxElements.forEach(function(bx) {
                var detailDivs = bx.querySelectorAll('.bx-content-detail > div');
                detailDivs.forEach(function(div) {
                    div.style.height = 'auto';
                });
            });
            return;
        }

        // 모든 div의 높이를 초기화합니다.
        bxElements.forEach(function(bx) {
            var detailDivs = bx.querySelectorAll('.bx-content-detail > div');
            detailDivs.forEach(function(div) {
                div.style.height = 'auto';
            });
        });

        for (var i = 0; i < bxElements.length; i += itemsPerRow) {
            var maxHeight1 = 0;
            var maxHeight2 = 0;
            var rowBxs = Array.prototype.slice.call(bxElements, i, i + itemsPerRow);

            // 각 행별로 첫 번째 div와 두 번째 div의 가장 높은 값을 찾아서 설정합니다.
            rowBxs.forEach(function(bx) {
                var detailDivs = bx.querySelectorAll('.bx-content-detail > div');
                if (detailDivs[0]) {
                    var height1 = detailDivs[0].offsetHeight;
                    if (height1 > maxHeight1) {
                        maxHeight1 = height1;
                    }
                }
                if (detailDivs[1]) {
                    var height2 = detailDivs[1].offsetHeight;
                    if (height2 > maxHeight2) {
                        maxHeight2 = height2;
                    }
                }
            });

            rowBxs.forEach(function(bx) {
                var detailDivs = bx.querySelectorAll('.bx-content-detail > div');
                if (detailDivs[0]) {
                    detailDivs[0].style.height = maxHeight1 + 'px';
                }
                if (detailDivs[1]) {
                    detailDivs[1].style.height = maxHeight2 + 'px';
                }
            });
        }
    }

    // 초기 높이 조정
    adjustHeights();

    // 창 크기 변경 시 높이 조정
    window.addEventListener('resize', adjustHeights);
});