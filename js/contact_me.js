// Contact Form Scripts
$(function() {
    // Create a Stripe client
    var stripe = Stripe('pk_live_ElGHyjAz7MX8NLSfnJ6bnwq8');

    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {
        style: style
    });

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Handle form submission
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        var form = this
        event.preventDefault();
        if (
            $('input[name="state"]').val() == "" ||
            $('input[name="country"]').val() == "" ||
            $('input[name="city"]').val() == "" ||
            $('input[name="email"]').val() == "" ||
            $('input[name="postal_code"]').val() == "" ||
            $('input[name="name"]').val() == "" ||
            $('input[name="address"]').val() == "") {
            alert("Please complete the form!");
        } else {
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server
                    $('[name=stripeToken]').val(result.token.id);
                    var form = $('#payment-form')
                    $.post($(form).attr('action'), $(form).serialize(), function(json, error) {
                            if (json.error == null) {
                                alert("success your item will be shipped hella soon!")
                            } else {
                                alert("There was a problem processing your payment")
                            }
                        }, 'json')
                        .fail(function() {
                            alert("There was a problem processing your payment");
                        })



                }
            });

        }
    });




    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});