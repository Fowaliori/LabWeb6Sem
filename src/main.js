$(document).ready(function() {
    let score = 0;
    let totalClicks = 0;
    let testStarted = false;
    let testDuration = 10000; // 10 секунд
    let interval;

    $('#startButton').click(function() {
        if (!testStarted) {
            testStarted = true;
            score = 0;
            totalClicks = 0;
            $('#result').text('');
            startTest();
            setTimeout(endTest, testDuration);
        }
    });

    function startTest() {
        interval = setInterval(function() {
            const img = $('<img class="image" src="../Photos/buggy.jpg" alt="target">');
            const x = Math.random() * ($('#testArea').width() - 50);
            const y = Math.random() * ($('#testArea').height() - 50);
            img.css({ left: x, top: y });
            $('#testArea').append(img);
            img.fadeIn(200).delay(1000).fadeOut(200, function() {
                $(this).remove();
            });

            img.click(function() {
                score++;
                totalClicks++;
                $(this).addClass('exploded').fadeOut(200, function() {
                    $(this).remove();
                });
            });

        }, 2000);
    }

    function endTest() {
        clearInterval(interval);
        testStarted = false;

        const successRate = (score / totalClicks) * 100;
        $('#result').text(`Ваш результат: ${successRate.toFixed(2)}% удачных щелчков.`);
    }
});
