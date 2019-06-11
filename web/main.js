var config;
// config.malditaPerImage: aprox maldita articles to be shown per image

const configRefreshInterval = 5 * 60 * 1000;
setInterval(() => {
    $.getJSON("get/web/cfg", function (data) {
        config = data;
    });
}, configRefreshInterval);


setInterval(() => {
    if (Math.random() > config.malditaPerImage) {
        //show image
        
    } else {
        //show article
    }
}, config.cycleInterval);