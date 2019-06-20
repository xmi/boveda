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
    const configRefreshInterval = 30 * 1000;
    setInterval(() => {
        console.log("REfreshing config")
        $.getJSON("config.json", function (data) {
            config = data;
        });
    }, configRefreshInterval);


    while (true) {

        // counter to force browser to ignore cache
        $("iframe").attr("src", `/get/photo?${counter++}`);

        //wait for media to load
        await sleep(500);

        var wait;
        // unify video and image
        if ($("#bg").contents().find("video").length > 0) {
            $("#bg").contents().find("video").attr("id", "media");
            $("#media", $("#bg").contents()).get(0).play();
            wait = $("#media", $("#bg").contents()).get(0).duration * 1000;
        } else {
            $("#bg").contents().find("img").attr("id", "media");
            wait = config.cycleInterval;
        }

        await sleep(wait);
        // wait a bit to not overload browsers
        await sleep(200);
    }
}).fail(() => {
    console.log("Cant get config")
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// https://backend.maldita.es/api/recentdebunks
// https://backend.maldita.es/uploads/debunks/xxx