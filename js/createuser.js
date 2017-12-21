$(document).ready(() => {

    SDK.loadNav();

    /**
     * Create new user
     */
    $("#register-button").click (() => {
        console.log("clicked");

            const firstName = $("#inputFirstName").val();
            const lastName = $("#inputLastName").val();
            const username = $("#inputUsername").val();
            const password = $("#inputPassword").val();
            const type = 1;
        console.log("checked");

            SDK.User.createUser(firstName, lastName, username, password, type, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error");
                }
                else if (err) {
                    console.log("Not good")
                } else {

                    if (!username || !password) {
                        window.alert("Username or password is not typed. Please try again");

                    } else {
                        alert("User has been created");
                        window.location.href = ("login.html");

                    }
                    }
            });
    });

});
