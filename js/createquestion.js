$(document).ready(() => {

    SDK.loadNav();


    const quizId = SDK.getQueryParam("quizId");
    console.log(quizId);

    $("#createquestion").click(() => {
        // const questionId = $("#inputQuestion").val();
        const questionTitle = $("#inputQuestion").val();



        SDK.Quiz.createQuestion( quizId, questionTitle, (err, data) => {

            data = JSON.parse(data);

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("BAd stuff happened")
            } else {
                window.location.href = ("createchoice.html?questionId=" + data.questionId);
                //"create-question.html"
                const quizId = SDK.getQueryParam("questionId");


            }





        });


    });

});