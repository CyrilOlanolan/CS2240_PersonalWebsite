$(document).ready(function () {
    // Animate loader off screen
    setTimeout(() => {
        $(".se-pre-con").fadeOut("slow");
    }, 1300);

    // $(".se-pre-con").fadeOut("slow");

    setTimeout(() => {
        $(".welcome_slogan").animate({ opacity: "100%" }, 2000);
    }, 3000);

    setTimeout(() => {
        $(".welcome_phone").animate({ opacity: "100%" }, 1500);
    }, 5000);

    $("#cinematic_img").hover(
        function () {
            // over
            $("#cinematic_img").addClass("enlarge");
            $(".word_focus").animate({ color: "#0071e3" }, 300, "swing");
            $(".word_drama").animate({ color: "#0071e3" }, 300, "swing");
            $("#cinematic_text h3 span").addClass("underline");
        },
        function () {
            // out
            $("#cinematic_img").removeClass("enlarge");
            $("#cinematic_text h3 span").removeClass("underline");
            $(".word_focus").animate({ color: "#1d1d1f" }, 800, "swing");
            $(".word_drama").animate({ color: "#1d1d1f" }, 800, "swing");
        }
    );

    $("#sample_screens img").draggable();

    $("#empty_phone_frame").dblclick(() => {
        $("#sample_screens img").animate({
            top: "0px",
            left: "0px"
        });
    });
});
