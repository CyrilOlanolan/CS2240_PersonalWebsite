// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            else if (form.checkValidity()) {
                var val = document.getElementById('email-bill').value

                if (val == "") {
                    var salute = document.getElementById('salute').value
                    var name = document.getElementById('name').value
                    var email = document.getElementById('email').value

                    alert("Hello, " + salute + " " + name + "! you have subscribed to the Musika. Newsletter using " + email + ".");
                }
                else alert("Your email (" + val + ") was successfully subscribed.");

                // form.reset();
                
                // event.preventDefault()
                // event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()