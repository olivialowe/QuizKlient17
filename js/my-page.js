$(document).ready(() => {

    SDK.loadNav();
    const $Tbody = $("#tbody");


    $("#dis-button").click(() => {

        $(".quiz-button").hide();
        $("#quiz-table").show();
        SDK.Quiz.findById(1, (err, data) => {
            let quizzes = JSON.parse(data);
            if (err) throw err;
            quizzes.forEach(quiz => {
                console.log(quiz);

                $Tbody.append(`
                    <tr>
                        <td><a href="quiz.html?quizId=${quiz.quizId}">${quiz.quizTitle}</a></td>
                       
                    </tr>
                    `);
            });
        });
    });

    $("#itf-button").click(() => {
        $(".quiz-button").hide();
        $("#quiz-table").show();

        SDK.Quiz.findById(2, (err, data) => {
            let quizzes = JSON.parse(data);
            if (err) throw err;
            quizzes.forEach(quiz => {
                console.log(quiz);

                $Tbody.append(`
                    <tr>
                        <td><a href="quiz.html?quizId=${quiz.quizId}">${quiz.quizTitle}</a></td>
               
                    </tr>
                    `);
            });
        });
    });



    $("#makro-button").click(() => {
        $(".quiz-button").hide();
        $("#quiz-table").show();

        SDK.Quiz.findById(3, (err, data) => {
            let quizzes = JSON.parse(data);
            if (err) throw err;
            quizzes.forEach(quiz => {
                console.log(quiz);

                $Tbody.append(`
                    <tr>
                        <td><a href="quiz.html?quizId=${quiz.quizId}">${quiz.quizTitle}</a></td>
               
                    </tr>
                    `);
            });
        });
    });


    $("#finance-button").click(() => {
        $(".quiz-button").hide();
        $("#quiz-table").show();

        SDK.Quiz.findById(4, (err, data) => {
            let quizzes = JSON.parse(data);
            if (err) throw err;
            quizzes.forEach(quiz => {
                console.log(quiz);

                $Tbody.append(`
                    <tr>
                        <td><a href="quiz.html?quizId=${quiz.quizId}">${quiz.quizTitle}</a></td>
               
                    </tr>
                    `);
            });
        });
    });


});
