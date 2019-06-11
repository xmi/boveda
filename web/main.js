var config = null;
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
            //clear previous image
            $("#bg").attr("style", "background-image: url(fallback.png)");
            //show image
            // foo=bar to force refreshing
            $("#bg").attr("style", "background-image: url(get/photo?foo=bar)");
            console.log("imagen");
        } else {
            //show article
            console.log("articulo");
        }
    }, config.cycleInterval);
}).fail(() => {
    console.log("Cant get config")
});