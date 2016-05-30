function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function refresh() {

    var user = getParameterByName('user');
    var api_key = getParameterByName('api_key');

    $.ajax({

        type: "GET",
        data: {
            'method': 'user.getrecenttracks',
            'user': user,
            'api_key': api_key,
            'format': 'json',
            'limit': 1
        },
        url: 'http://ws.audioscrobbler.com/2.0/',
        success: function (results) {
            // What to do when the ajax is successful.
            // "results" is the response from the url (eg. "theAction" here)

            var song = results.recenttracks.track[0].name;
            var artist = results.recenttracks.track[0].artist['#text'];
            var art = results.recenttracks.track[0].image[2]['#text'];
            var playing = results.recenttracks.track[0]['@attr'].nowplaying;
            var element = $('.np');
            console.log(playing);
            if (playing == 'true') {
                element.text('Now playing: ' + song + ' by ' + artist);
                if(!art) {
                    element.addClass('noimage');
                } else {
                    element.removeClass('noimage');
                }
                element.css('background-image', 'url(' + art + ')');
                console.log(song, artist, art);
            }
        },
        error: function (results) {
            // What to do when the ajax fails.
            console.log("ERROR");
            $(".np").text('');
        }
    });
}

$(document).ready(function () {
    refresh();
    window.setInterval(refresh, 2000);
});

// 8665d0f4c6278e0cbdf852067b529085