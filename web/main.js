var config = null;
var counter = 0;

// Change the html in the iframe to ccenter the image
var foo = 0;
$("#bg").contents().find("img").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>')

// First time
$.getJSON("config.json", function (data) {
    console.log(data);
    config = data;
}).done(async function () {
    // config.malditaPerImage: aprox maldita articles to be shown per image

    // Automated refresh of config
    const configRefreshInterval = 5 * 60 * 1000;
    setInterval(() => {
        console.log("REfreshing config")
        $.getJSON("config.json", function (data) {
            config = data;
        });
    }, configRefreshInterval);


    while (true) {
        // counter to force browser to ignore cache
        $("iframe").attr("src", `/get/photo?${counter++}`);

        // if length > 0 there is a video tag
        if ($("#bg").contents().find("video").length > 0) {
            // Change the html in the iframe to ccenter the video
            $("#bg").contents().find("video").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>');

            // set autoplay
            $("#bg").contents().find("video").attr("autoplay", "true");

            var videoLength = document.getElementsByTagName("video")[0].duration;
            await sleep(videoLength);
        } else if ($("#bg").contents().find("img").length > 0) { // if length > 0 there is a img tag
            // Change the html in the iframe to ccenter the image
            $("#bg").contents().find("img").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>')

            await sleep(config.cycleInterval);
        } else {
            console.log("no image or video found")
        }

    }
}).fail(() => {
    console.log("Cant get config")
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// https://backend.maldita.es/api/recentdebunks
// https://backend.maldita.es/uploads/debunks/xxx