$(document).ready(function() {
    let score = 0;
    let totalImages = 0;
    let testStarted = false;
    let interval;
    let timer;
    const showEndButtonAfter = 10;

    $('#startButton').click(function() {
        if (!testStarted) {
            testStarted = true;
            score = 0;
            totalImages = 0;
            $('#result').text('');
            $('#endButton').hide();
            $('#timeElapsed').text(0);
            startTimer();
            startTest();
        }
    });

    $('#endButton').click(function() {
        if (testStarted) {
            endTest();
        }
    });

    function startTimer() {
        let elapsedTime = 0;
        timer = setInterval(function() {
            elapsedTime++;
            $('#timeElapsed').text(elapsedTime);
            if (elapsedTime >= showEndButtonAfter) {
                $('#endButton').show();
            }
        }, 1000);
    }

    function startTest() {
        interval = setInterval(function() {
            const img = $('<img class="image" src="../Photos/buggy.jpg" alt="target">');
            const x = Math.random() * ($('#testArea').width() - 75);
            const y = Math.random() * ($('#testArea').height() - 75);
            img.css({ left: x, top: y });
            $('#testArea').append(img);
            img.fadeIn(200).delay(1500).fadeOut(200, function() {
                $(this).remove();
            });

            totalImages++;

            img.click(function(event) {
                event.stopPropagation();
                score++;
                $(this).addClass('exploded').fadeOut(200, function() {
                    $(this).remove();
                });
            });

        }, 1600);
    }

    function endTest() {
        clearInterval(interval);
        clearInterval(timer);
        testStarted = false;
        $('#endButton').hide();

        const successRate = (score / totalImages) * 100;
        $('#result').text(`Ваш результат: ${successRate.toFixed(2)}% удачных кликов. 
        Всего изображений: ${totalImages} Удачных кликов: ${score}`);
    }
});
