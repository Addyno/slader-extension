// Remove 'x' free solutions badge.
if (document.querySelector('.b1if8dab')) { document.querySelector('.b1if8dab').style.display = "none"; }

checkIfNewAccountNeeded();

function checkIfNewAccountNeeded()
{
    // Three cases: Almost out of solutions, not logged in at all, or out of solutions.

    // Almost out of solutions
    if (document.querySelector('.b1m16m5o') && document.querySelector('.b1m16m5o').textContent == "This is your last free explanation")
    {
        signUpNewAccount(false);
    }
    // Not logged in
    else if (document.querySelector('.t1qexa4p') && document.querySelector('.t1qexa4p').textContent == "Create a free account to see explanations")
    {
        signUpNewAccount(true);
    }
    // Out of solutions
    else if (document.querySelector('.sukvi6d') && document.querySelector('.sukvi6d').textContent == "YOU'VE REACHED YOUR FREE LIMIT")
    {
        signUpNewAccount(true);
    }
}


function signUpNewAccount(doesReload)
{
    // We're just gonna assume this is a large enough characterspace for it to never matter.
    var email = "sq_bypass_" + randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // Same thing ^
    var username = "sq_bypass_" + randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    var request = fetch("https://quizlet.com/webapi/3.2/direct-signup", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "cs-token": getToken(),
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://quizlet.com/goodbye",
        "referrerPolicy": "origin-when-cross-origin",
        "body": "{\"TOS\":false,\"birth_day\":\"5\",\"birth_month\":\"5\",\"birth_year\":\"2000\",\"email\":\"" + email + "@example.com\",\"is_free_teacher\":\"2\",\"is_parent\":false,\"password1\":\"SladerBypassPassword\",\"redir\":\"https://quizlet.com/goodbye\",\"signupOrigin\":\"global-header-link\",\"screenName\":\"Logout/logoutMobileSplash\",\"username\":\"" + username + "\",\"marketing_opt_out\":false}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(function()
    {
        if (doesReload)
        {
            location.reload();
        }
    });
    return true;
};

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

function getToken(){
    token = document.cookie.match("(?:^|;)\\s*" + "qtkn".replace(/[\-\[\]{}()*+?.,\\^$|#\s]/g, "$&") + "=([^;]*)");
    return decodeURIComponent(token[1]);
};