$(document).ready(() => {

    SDK.loadNav();


    const quizId = SDK.getQueryParam("quizId");
    const questionId = SDK.getQueryParam("questionId");


    $("#create-choice-button").click(() => {

        const choiceTitle = $("#inputChoice").val();
        const answer = $(".custom-select").find("option:selected").val();

        SDK.Quiz.createChoice(questionId, choiceTitle, answer,(err, data) => {
            console.log(data);
            data = JSON.parse(data);

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("Not good")
            } else {
                //refresh($("#inputChoice"));
                alert("You have now saved the choice. You can now write a new one");
                window.location.href = ("createchoice.html?questionId=" + data.questionId);

                const questionId = SDK.getQueryParam("questionId");

            }
        });
        });
        const chosenQuiz = SDK.Storage.load("quizId");

        $("#back-to-create-question").click(() => {

            window.location.href = ("create-question.html?quizId=" + Storage.load("quizId"));
            const quizId = SDK.getQueryParam("quizId");

        });


        $("#finish-quiz-button").click(() => {

            window.location.href = ("admin-page.html");






    });

});


