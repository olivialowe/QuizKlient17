$(document).ready(() => {

    SDK.loadNav();

    $("#submitUser").click(() => {

        const firstName = $("#inputFirstname").val();
        const lastName = $("#inputLastname").val();
        const userName = $("#inputUsername").val();
        const password = $("#inputPassword").val();
        const type = 2;

        SDK.User.createUser(firstName, lastName, userName, password, type, (err, data) => {
            console.log(firstName + lastName + userName + password + type);



            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err) {
                console.log("Not good")
            } else {

                if (!userName || !password) {
                    window.alert("Username or password has not been typed. Please try again");

                } else {
                    alert("New admin has been created successfully");

                    window.location.href = ("admin-page.html");


                }

            }


        });


    });
});