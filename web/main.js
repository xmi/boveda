var config = null;
var counter = 0;
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
        if (Math.random() > config.malditaPerImage) {
            //show image
            // counter to force browser to ignore cache
            $("#bg").attr("style", `background-image: url(get/photo?${counter++})`);
            console.log("imagen");
        } else {
            //show article
            console.log("articulo");
        }
    }, config.cycleInterval);
}).fail(() => {
    console.log("Cant get config")
});

// https://backend.maldita.es/api/recentdebunks
// https://backend.maldita.es/uploads/debunks/xxx