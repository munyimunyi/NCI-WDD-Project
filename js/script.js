const customRadio = document.getElementById('donateAmountCustom');
const customContainer = document.getElementById('customAmountContainer');
const customInput = document.getElementById('customAmountInput');
const allRadios = document.querySelectorAll('input[name="donationAmount"]');
const donationForm = document.getElementById('donationForm');

// Show/hide custom input based on radio selection
allRadios.forEach((radio) => { // => calls a function | (radio) => is the same as function(radio)
	radio.addEventListener('change', function() { // listens for a change in radio 
		if (this.value === 'custom') { // if custom radio is clicked
			customContainer.classList.add('show'); // add .show class to the customAmountContainer | this shows it
			customInput.required = true; // make an input required
			customInput.focus(); // focuses typing on the text box
		} else {
			customContainer.classList.remove('show'); // if a radio other than custom is pressed, remove the .show class | this hides it
			customInput.required = false; // no longer makes the input required
			customInput.value = ''; // removes the value (if inputted)
		}
	});
});

// When custom input changes, update the radio value
customInput.addEventListener('input', function() { // listens for an input
	if (customRadio.checked && this.value) {
		customRadio.value = this.value;
		// if the custom radio is checked and there is a value, set the radio value to the input value
	}
});


donationForm.addEventListener('submit', function(e) {
	e.preventDefault(); // prevents website from reloading

	const selectedAmount = document.querySelector('input[name="donationAmount"]:checked'); // gets the radio button that is checked

	/*
	selectedAmount.value === 'custom' ? document.getElementById('customInputAmount').value : selectedAmount.value;
	is the same as
	if (selectedAmount.value === 'custom') {
		donationAmount = document.getElementById('customInputAmount').value;
	} else {
		donationAmount = selectedAmount.value;
	}
	*/

	const donationAmount = selectedAmount.value === 'custom' ? document.getElementById('customAmountInput').value : selectedAmount.value;
	// if selected amount is custom, gets the value from the input, else gets the value of radio button selected

	const formData = { 
	donationAmount: donationAmount,
	name: document.getElementById('name').value,
	email: document.getElementById('email').value,
	cardNumber: document.getElementById('cardNumber').value,
	expiryDate: document.getElementById('expiryDate').value,
	cvv: document.getElementById('cvvCode').value
	};

	confirm('Form Data: ', formData)
});
