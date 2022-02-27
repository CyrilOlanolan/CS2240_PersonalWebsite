// VALIDATION
(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                var storage = $("#quote_storage-version input:checked").val();

                if (typeof storage == "undefined") {
                    event.preventDefault();
                    event.stopPropagation();
                    $("#quote_storage-version .valid-feedback").hide();
                    $("#quote_storage-version .invalid-feedback").show();
                } else {
                    $("#quote_storage-version .invalid-feedback").hide();
                    $("#quote_storage-version .valid-feedback").show();
                }

                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    $("#dialog-confirm").html(() => {
                        return (
                            '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Is everything correct? Double check all the details carefully.</p>' +
                            '<p><span class="fw-bold">Name: </span>' +
                            $("#quote_name").val() +
                            "</p>" +
                            '<p><span class="fw-bold">Email: </span>' +
                            $("#quote_email").val() +
                            "</p>" +
                            '<p><span class="fw-bold">Delivery Location: </span>' +
                            $("#quote_address").val() +
                            "</p>" +
                            '<p><span class="fw-bold">Expected Delivery Date: </span>' +
                            $("#quote_delivery-date").val() +
                            "</p>" +
                            '<p><span class="fw-bold">iPhone Version: </span>' +
                            $("#quote_version").val() +
                            "</p>" +
                            '<p><span class="fw-bold">Storage: </span>' +
                            storage +
                            "</p>" +
                            '<p><span class="fw-bold">Inclusions: </span>' +
                            GetInclusions() +
                            "</p>"
                        );
                    });

                    $("#dialog-confirm").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            Confirm: function () {
                                $(this).dialog("close");
                                ConfirmDialog();
                                // $("#dialog-success").dialog("open");
                            },
                            Cancel: function () {
                                $(this).dialog("close");
                            },
                        },
                    });
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

$(document).ready(function () {
    // Animate loader off screen
    setTimeout(() => {
        $(".se-pre-con").fadeOut("slow");
    }, 1300);

    setTimeout(() => {
        $("#want").animate({ color: "#0071e3;" }, 500, "swing");
    }, 2000);

    setTimeout(() => {
        $("#got").animate({ color: "#f9e201;" }, 500, "swing");
    }, 3000);

    setTimeout(() => {
        $("#want").animate({ color: "#1d1d1f;" }, 2000, "swing");
        $("#got").animate({ color: "#1d1d1f;" }, 2000, "swing");
    }, 5000);

    $(".quote_area").toggleClass("fade-in-up", 3000);

    $("#quote_delivery-date").datepicker({ minDate: 3 });
    $("#quote_delivery-date").datepicker("option", "showAnim", "fadeIn");

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

    $("#quote_version").autocomplete({
        source: availableTags,
    });

    $("#quote_storage-version input").checkboxradio({
        icon: false,
    });

    $("#quote_inclusions input").checkboxradio();

    $("#dialog-success").css("display", "none");
    $("#request_quote").button();

    $(function () {
        $("#tabs").tabs();
    });
});

function ConfirmDialog() {
    $("#dialog-success").dialog({
        modal: true,
        show: {
            effect: "blind",
            duration: 500,
        },
        hide: {
            effect: "blind",
            duration: 500,
        },
    });
}

function GetInclusions() {
    var counter = 0;
    var inclusions = "<ul>";

    $("#quote_inclusions input:checked").each(function () {
        inclusions += "<li>" + $(this).val() + "</li>";
        counter++;
    });

    inclusions += "</ul>";

    if (counter == 0) {
        inclusions = "None";
    }

    return inclusions;
}
