var config = null;
var counter = 0;

// Change the html in the iframe to ccenter the image
var foo = 0;
$("#bg").contents().find("img").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>')

// First time
$.getJSON("config.json", function (data) {
    console.log(data);
    config = data;
}).done(function () {
    // config.malditaPerImage: aprox maldita articles to be shown per image

    // Automated refresh of config
    const configRefreshInterval = 5 * 60 * 1000;
    setInterval(() => {
        console.log("REfreshing config")
        $.getJSON("config.json", function (data) {
            config = data;
        });
    }, configRefreshInterval);


    setInterval(() => {
        // Change the html in the iframe to ccenter the image
        $("#bg").contents().find("img").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>')

        // counter to force browser to ignore cache
        $("iframe").attr("src", `/get/photo?${counter++}`);

        // Change the html in the iframe to ccenter the image
        $("#bg").contents().find("img").wrap('<div style="display:flex;justify-content:center;align-items:center;"> </div>')
    }, config.cycleInterval);
}).fail(() => {
    console.log("Cant get config")
});

// https://backend.maldita.es/api/recentdebunks
// https://backend.maldita.es/uploads/debunks/xxx