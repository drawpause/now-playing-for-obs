
function refresh() {
    $.ajax({

        type: "GET",
        url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=henridefense&api_key=8665d0f4c6278e0cbdf852067b529085&format=json&limit=1', // <= Providing the URL
        success: function (results) {
            // What to do when the ajax is successful.
            // "results" is the response from the url (eg. "theAction" here)

            var song = results.recenttracks.track[0].name;
            var artist = results.recenttracks.track[0].artist['#text'];
            var art = results.recenttracks.track[0].image[2]['#text'];
            var element = $('.np');
            element.text('Now playing: ' + song + ' by ' + artist);
            if(!art) {
                element.addClass('noimage');
            } else {
                element.removeClass('noimage');
            }
            element.css('background-image', 'url(' + art + ')');
            console.log(song, artist, art);
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
