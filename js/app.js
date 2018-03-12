"use strict"; 

$(document).ready(function() {
    $('form:first *:input[type!=hidden]:first').focus(); // give focus to first element on load 
    
      const $jobDropDown = $('#title'); 
      const $otherJob = $('<input id = "other-title" type ="text" placeholder = "Your job role">');
    
    ($jobDropDown).change(() => {
        $($jobDropDown).val() === 'other' ? $jobDropDown.after($otherJob) : $otherJob.remove(); 
        
    });
    
    const $designDropDown = $('#design'); 
    const $colorsDropDown = $('#color');
    const punsColors = [ 'Cornflower Blue', 'Dark Slate Grey', 'Gold'];
    const loveColors = ['Tomato', 'Steel Blue', 'Dim Grey'];
    
    // fill a dropDown menu with a new list
    function fillDropDownMenu(dropDown, filler) {
        dropDown.empty(); // ready to be re-filled
        
        $.each(filler, function(key,value) {
            dropDown.append($("<option></option>")
                .attr("value", value).text(value));
            });
    }
    
    
        $colorsDropDown.empty(); 
        $colorsDropDown.append($("<option></option>")
            .attr("value", "<-- Select T-shirt Theme").text( "<-- Select T-shirt Theme"));
    
    
    // change dropdown content based on user's choice
    ($designDropDown).change( () => {
        if($designDropDown.val() === 'js puns') 
            fillDropDownMenu($colorsDropDown, punsColors);
        
        else if($designDropDown.val() === 'heart js')
            fillDropDownMenu($colorsDropDown, loveColors);
        
        else {        
            $colorsDropDown.empty(); 
            $colorsDropDown.append($("<option></option>")
                .attr("value", "<-- Select T-shirt Theme").text( "<-- Select T-shirt Theme"));
            
        }
        
      
        
    });
    
    
    //-------------------------------ACTIVITIES CHOICE SECTION ------------------------------------------------------------------//

    
    function setPrice(price) {
    $('#payment-total').text('Total : $' + price);
        
    }
    
    
    // store informations about all the workshop events 
    const workshopEvents = [
      { name : "all" , time : "all", price : 200 },
      { name : "js-frameworks", time : "Tuesday 9am-12pm", price : 100 },
      { name : "js-libs", time : "Tuesday 1pm-4pm", price : 100},
      { name : "express", time :  "Tuesday 9am-12pm", price : 100 },
      { name : "node", time : "Tuesday 1pm-4pm", price : 100},
      { name : "build-tools", time : "Wednesday 9am-12pm", price : 100 },
      { name : "npm", time :"Wednesday 1pm-4pm", price : 100 }
        
    ];
    
    const $totalPrice = $('.activities'); 
    $totalPrice.after('<div id = "payment-total"></div>')
    let currentPrice = 0; 
    setPrice(currentPrice);
    
 
    $('input:checkbox').change(function() {
        
        const selectedWorkshop = $(this).val(); // current selected value
        var selectedElement;
        
        // get the information relatives to the selected event 
        workshopEvents.forEach(function(element) {
            if(element.name === selectedWorkshop)
                selectedElement = element;
        });
        
        if(this.checked) {
        setPrice(currentPrice + selectedElement.price); 
        currentPrice = selectedElement.price + currentPrice;
        
        }
        // get all the events happening at the same time then the selected one
       const clashingArray =  workshopEvents.filter(function(element) {
            if(selectedElement.name !== element.name && selectedElement.time === element.time )
                return true;
        
        });
        
        // disable those events
        clashingArray.forEach(function(element) {
            let clashingWorkShop = element.name;   
            let checkbox = `input[type=checkbox][value=${clashingWorkShop}]`;
            $(checkbox).prop("disabled", true);
            
        });
        
        if(!this.checked) {
            
            setPrice(currentPrice - selectedElement.price); 
            currentPrice = currentPrice - selectedElement.price;
           
            
            clashingArray.forEach(function(element) {
            let clashingWorkShop = element.name;   
            let checkbox = `input[type=checkbox][value=${clashingWorkShop}]`;
            $(checkbox).prop("disabled", false); 
            
        });
            
        }
                        
    });
    
    //-------------------------------ACTIVITIES CHOICE SECTION ------------------------------------------------------------------//

    
    
    
    
    
    //-------------------------------PAYMENT OPTION SECTION ------------------------------------------------------------------//

    
    // payment options 
    const $paymentOption = $('#payment');
    const $creditCardPayment= $('#credit-card'); 
    const $bitcoinPayment = $('#bitcoin');
    const $paypalPayment = $('#paypal');
    
    // set credit card payment as default payment
    $bitcoinPayment.hide(); 
    $paypalPayment.hide(); 
    $payment.prop('selectedIndex', 1);
    let currentPaymentOption = $creditCardPayment;
    
    
    ($paymentOption).change( () => {
        if($paymentOption.val() === 'bitcoin') {
            currentPaymentOption.hide();  
            $bitcoinPayment.show(); 
            currentPaymentOption = $bitcoinPayment; 
            
        }
        
        else if($paymentOption.val() === 'paypal') {
            currentPaymentOption.hide(); 
            $paypalPayment.show();
            currentPaymentOption = $paypalPayment; 
        
        }
        else if ($paymentOption.val() === 'credit card') {
            currentPaymentOption.hide();
            $creditCardPayment.show();
            currentPaymentOption = $creditCardPayment; 
        }
            
            
    });
    
    //-------------------------------PAYMENT OPTION SECTION ------------------------------------------------------------------//

    
    
    
//-------------------------------FORM VALIDATION SECTION ------------------------------------------------------------------//
    
    
    
    // Add Error/Success Indicators on Keyup 
$('#name, #mail, #cc-num, #zip, #cvv, #other-field').keyup(function (){
	if ( $(this).val() === "")  {
		$(this).removeClass('success');
		$(this).addClass('error');
	} else {
		$(this).removeClass('error');
		$(this).addClass('success');
	}
});

    
// values to check data validity
var emailAddress = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;
var errorMessage ="";

$('form').prepend('<p id="error-message"></p>');
$('#error-message').hide();
$('form').submit(function (e){
	e.preventDefault();

	if ( $('#name').val() === "" ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please ensure you have entered all required fields.";
		$('#name').addClass('error');
		$('#name').focus();
        
        
	}
    else if ( !emailAddress.test($('#mail').val()) ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please enter a valid email.";
		$('#mail').focus();
        
        
	} else if ( $(".activities > label > input:checked").length === 0 ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please select at least one activity.";
		$('.activities').focus();
        
        
	} else if ( $("#payment").val() === "select_method" )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please select a payment method.";
		$('#payment').focus();
        

	} else if ( $("#payment").val() === "credit card" && !creditCard.test($("#cc-num").val()) )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a valid credit card number.";
		$('#cc-num').focus();
        
        
	} else if ( $("#payment").val() === "credit card" && !zipCode.test($("#zip").val()) )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter your zip code.";
		$('#zip').focus();
        
        
	} else if ( $("#payment").val() === "credit card" && $("#cvv").val().length < 3)  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a 3 digit CVV";
		$('#cvv').focus();
        
        
	} else {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "";
		alert("Thanks for registering! We'll see you at the Con!");
	} 
    
    
	document.getElementById('error-message').innerHTML = errorMessage;
	$('#error-message').show();
});
    
    //-------------------------------FORM VALIDATION SECTION ------------------------------------------------------------------//

    
    
});