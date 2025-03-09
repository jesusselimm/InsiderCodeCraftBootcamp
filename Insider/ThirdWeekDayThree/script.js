$(document).ready(function() {
    // Date picker plugin
    $("#birthdate").datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0',
        maxDate: '-18y'
    });
    
    // Phone number mask plugin
    $("#phone").mask("(999) 999-9999");
    
    // Form validation plugin
    $("#jobForm").validate({
        errorClass: "error",
        rules: {
            firstName: {
                required: true,
                minlength: 2
            },
            lastName: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 14
            },
            position: {
                required: true
            },
            birthdate: {
                required: true
            },
            experience: {
                required: true,
                number: true,
                min: 0,
                max: 50
            },
            terms: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: "Please enter your first name",
                minlength: "First name must be at least 2 characters"
            },
            lastName: {
                required: "Please enter your last name",
                minlength: "Last name must be at least 2 characters"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            phone: {
                required: "Please enter your phone number",
                minlength: "Please enter a valid phone number"
            },
            position: {
                required: "Please select the position you're applying for"
            },
            birthdate: {
                required: "Please enter your date of birth"
            },
            experience: {
                required: "Please enter your years of experience",
                number: "Please enter a number",
                min: "Experience cannot be negative",
                max: "Experience seems too high"
            },
            terms: {
                required: "You must agree to the terms and conditions"
            }
        },
        submitHandler: function(form) {
            // Hide form and show success message
            $("#application-form").fadeOut(500, function() {
                $("#successMessage").fadeIn(500).delay(3000).fadeOut(500, function() {
                    $("#application-form").fadeIn(300);
                    $("#jobForm")[0].reset();
                });
            });
            
            return false;
        }
    });
    
    // Add styling to social buttons
    $(".social-btn").hover(
        function() {
            $(this).css("transform", "translateY(-3px)");
        },
        function() {
            $(this).css("transform", "translateY(0)");
        }
    );
}); 