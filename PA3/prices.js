$(document).ready(function () {
    //Hide claim
    $("#prices_claim1").animate({opacity: "0"}, 1);
    $("#prices_claim2").animate({opacity: "0"}, 1);
    // Animate loader off screen
    setTimeout(() => {
        $(".se-pre-con").fadeOut("slow");
    }, 1300);

    setTimeout(() => {
        $("#prices_claim1").animate({opacity: "100"}, 3000, "swing");
    }, 2000);

    setTimeout(() => {
        $("#prices_claim2").animate({opacity: "100"}, 5000, "swing");
    }, 3000);

    $("#phone_search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#prices_table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    var availableTags = [
        "iPhone SE",
        "iPhone 11",
        "iPhone mini",
        "iPhone 12",
        "iPhone 13 mini",
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 12 Pro Max",
        "64 GB",
        "128 GB",
        "256 GB",
        "512 GB",
        "1 TB",
    ];

    $("#phone_search").autocomplete({
        source: availableTags,
    });
});
