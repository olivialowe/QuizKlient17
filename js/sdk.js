const SDK = {


//ulr for server
    serverURL: "http://localhost:8080/api",
   //SDK request
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];

            });
        }

        //Asynchronous call to server
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },
    User: {
        currentUser: () => {
            return SDK.Storage.load("user");
        },
        //Request for creating user
        createUser: (firstName, lastName, username, password, type, cb) => {
            SDK.request({
                url: "/user/",
                method: "POST",
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                    type: type,
                }
            }, cb);
        },
        logOut: () => {

            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "index.html";
        },

        login: (username, password, cb) => {
            SDK.request({
                data: {
                    username: username,
                    password: password

                },
                url: "/user/login",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);
                console.log(data);

                SDK.Storage.persist("userId", data.userId);
                SDK.Storage.persist("user", data.user);

                cb(null, data);

            });
        },
    },
    Quiz: {

        createQuiz: (quiztitle, courseid, cb) => {
            SDK.request({
                data: {
                    courseId: courseid,
                    quizTitle: quiztitle
                },
                url: "/quiz",
                method: "POST",
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);
                console.log(err);

                SDK.Storage.persist("courseId", data.courseId);
                SDK.Storage.persist("quizTitle", data.quizTitle);

                cb(null, data);
            });
        },
        createQuestion: (quizId, questionTitle, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: {
                    quizId: quizId,
                    questionTitle: questionTitle
                },
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);
                console.log(err);

                //SDK.Storage.persist("questionId", data.courseId);
                //SDK.Storage.persist("questionTitle", data.questionTitle);

                cb(null, data);
            });
        },

        createChoice: (questionId, choiceTitle, answer, cb) => {
            SDK.request({
                method: "POST",
                url: "/choice",
                data: {
                    questionId: questionId,
                    choiceTitle: choiceTitle,
                    answer: answer,
                },
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);
                console.log(err);

                //SDK.Storage.persist("questionId", data.courseId);
                //SDK.Storage.persist("questionTitle", data.questionTitle);

                cb(null, data);
            });
        },



    deleteQuiz: (id, cb) => {
        //Loading the selected course's id from local storage
        //const selectedQuiz = SDK.Storage.load("selectedQuiz")
        //const quizId = selectedQuiz.quizId;

        SDK.request({
            method: "DELETE",
            url: "/quiz/" + id


        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data)
        });
    },
    //Loading the selected quiz's id from local storage
    loadQuestions: (quizId, cb) =>{

        SDK.request({
            method: "GET",
            url: "/question/" + quizId,

        }, (err, data) => {
            if (err) return cb(err);
            cb(null, data)
        });
    },

        findById: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/quiz" + "/" + id,
            }, cb);
        },

        findQuestionById: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/question" + "/" + id,
            }, cb);
        },

        findChoiceById: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/choice" + "/" + id,
            }, cb);
        },

    Choice: {
        createChoice: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/choice",
                data: data,

            }, cb);
        }
    },
    question: {
        createQuestion: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: data,

            }, cb);
        }
    }
    },

    loadNav: (cb) => {
        $("#nav-container").load("nav.html", () => {
            const currentUser = SDK.User.currentUser();
            if (currentUser) {
                $(".navbar-right").html(`
           
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
            } else {
                $(".navbar-right").html(`
            <li><a href="login.html">Login <span class="sr-only">(currentUser)</span></a></li>
          `);
            }
            $("#logout-link").click(() => SDK.User.logOut());
            cb && cb();
        });

    },

    loadNavUser: (cb) => {
        $("#nav-container-user").load("navuser.html", () => {
            const currentUser = SDK.User.currentUser();
            if (currentUser) {
                $(".navbar-right").html(`
           
            <li><a href="#" id="logout-link">Logout</a></li>
          `);

            } else {
                $(".navbar-right").html(`
            <li><a href="login.html">Login <span class="sr-only">(currentUser)</span></a></li>
          `);
            }
            $("#logout-link").click(() => SDK.User.logOut());
            cb && cb();


        });


    },
    // https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    getQueryParam: (sParam) => {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },
//local storage functions
    Storage: {

        prefix: "ExamsquisSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    },

};
