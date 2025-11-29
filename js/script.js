// Szymon
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
			// customInput.required = true; // make an input required
			customInput.focus(); // focuses typing on the text box
		} else {
			customContainer.classList.remove('show'); // if a radio other than custom is pressed, remove the .show class | this hides it
			// customInput.required = false; // no longer makes the input required
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

// clear errors when input is changed
document.getElementById('name').addEventListener('input', function() {
	clearError('name');
});

document.getElementById('email').addEventListener('input', function() {
	clearError('email');
});

document.getElementById('cardNumber').addEventListener('input', function() {
	clearError('cardNumber');
});

document.getElementById('expiryDate').addEventListener('input', function() {
	clearError('expiryDate');
});

document.getElementById('cvvCode').addEventListener('input', function() {
	clearError('cvvCode');
});

// show error message
function showError(inputId, message) {
	// clear existing errors
	clearError(inputId);
	
	// create error message div & styling
	const errorDiv = document.createElement('div');
	errorDiv.className = 'error-message';
	errorDiv.id = 'error-' + inputId;
	errorDiv.textContent = message;
	errorDiv.style.color = 'red';
	errorDiv.style.textShadow = '1px 1px black';
	errorDiv.style.fontSize = '1rem';
	errorDiv.style.marginTop = '5px';

	// find place to put error
	let targetElement;
	if (inputId === 'donationAmount' || inputId === 'customAmount') {
		targetElement = document.querySelector('.p4_form-group-donate');
	} else if (inputId === 'cardNumber' || inputId === 'expiryDate' || inputId === 'cvvCode') { // if inputId is cardNumber, expiryDate, or cvvCode
		targetElement = document.querySelector('.p4_alignRow').parentElement; // find the parent element
	} else {
		targetElement = document.getElementById(inputId).parentElement;
	}

	// add error message to the target element
	targetElement.appendChild(errorDiv); // appendChild adds an element to the end of the parent element
}

// clear error message
function clearError(inputId) {
	const errorDiv = document.getElementById('error-' + inputId);
	if (errorDiv) {
		errorDiv.remove();
	}
}

// clear all errors
function clearAllErrors() {
	const allErrors = document.querySelectorAll('.error-message');
	allErrors.forEach((error) => error.remove());
}

// function to check if string has only digits
function isOnlyDigits(str) {
	for (let i = 0; i < str.length; i++) { // loop through each character in the string
		if (str[i] < '0' || str[i] > '9') { // if character is not a digit [0-9]
			return false;
		}
	}
	return true;
}

// validate donation amount
function validateDonationAmount() {
	const selectedAmount = document.querySelector('input[name="donationAmount"]:checked');
	
	if (!selectedAmount) {
		showError('donationAmount', 'Please select a donation amount');
		return false;
	}

	if (selectedAmount.value === 'custom') {
		const customAmount = parseFloat(customInput.value);
		if (!customInput.value || isNaN(customAmount) || customAmount < 1) {
			showError('customAmount', 'Please enter a valid custom amount (minimum €1)');
			customInput.focus();
			return false;
		}
	}

	return true;
}

// validate name
function validateName() {
	const name = document.getElementById('name').value.trim(); // trim() removes spaces at the beginning and end of the string

	if (name === '') {
		showError('name', 'Please enter your name');
		document.getElementById('name').focus();
		return false;
	}

	return true;
}

// validate email
function validateEmail() {
	const email = document.getElementById('email').value.trim();

	if (email === '' || !email.includes('@') || !email.includes('.')) {
		showError('email', 'Please enter your email address');
		document.getElementById('email').focus();
		return false;
	}

	return true;
}

// validate card number
function validateCardNumber() {
	const cardNumber = document.getElementById('cardNumber').value;

	if (cardNumber === '') {
		showError('cardNumber', 'Please enter your card number');
		document.getElementById('cardNumber').focus();
		return false;
	}
	
	// remove spaces to check length
	const cardNumberNoSpaces = cardNumber.split(' ').join('');

	// check if exactly 16 digits
	if (cardNumberNoSpaces.length !== 16 || !isOnlyDigits(cardNumberNoSpaces)) {
		showError('cardNumber', 'Card number must be 16 digits');
		document.getElementById('cardNumber').focus();
		return false;
	}

	return true;
}

// validate expiry date
function validateExpiryDate() {
	const expiryDate = document.getElementById('expiryDate').value;

	if (expiryDate === '') {
		showError('expiryDate', 'Please enter the expiry date');
		document.getElementById('expiryDate').focus();
		return false;
	}

	// check if MM/YY (5 char including /)
	if (expiryDate.length !== 5 || expiryDate[2] !== '/') { // if length is not 5 or if the character at index 2 is not / (index starts at 0, so 2 is the third character)
		showError('expiryDate', 'Expiry date must be in MM/YY format');
		document.getElementById('expiryDate').focus();
		return false;
	}

	// check if MM/YY are digits
	const month = expiryDate.substring(0, 2); // substring(start, end) 
	const year = expiryDate.substring(3, 5);

	if (!isOnlyDigits(month) || !isOnlyDigits(year)) {
		showError('expiryDate', 'Expiry date must be in MM/YY format');
		document.getElementById('expiryDate').focus();
		return false;
	}

	return true;
}

// validate CVV
function validateCVV() {
	const cvv = document.getElementById('cvvCode').value;

	if (cvv === '') {
		showError('cvvCode', 'Please enter the CVV');
		document.getElementById('cvvCode').focus();
		return false;
	}

	// check if exactly 3 digits
	if (cvv.length !== 3 || !isOnlyDigits(cvv)) {
		showError('cvvCode', 'CVV must be 3 digits');
		document.getElementById('cvvCode').focus();
		return false;
	}

	return true;
}

// form validation
donationForm.addEventListener('submit', function(e) {
	e.preventDefault(); // prevents page reload

	// clear previous errors
	clearAllErrors();

	// do all validations
	if (!validateDonationAmount()) return;
	if (!validateName()) return;
	if (!validateEmail()) return;
	if (!validateCardNumber()) return;
	if (!validateExpiryDate()) return;
	if (!validateCVV()) return;

	// if all validations pass, get form data
	const selectedAmount = document.querySelector('input[name="donationAmount"]:checked');

	let donationAmount;
	if (selectedAmount.value === 'custom') {
		donationAmount = document.getElementById('customAmountInput').value;
	} else {
		donationAmount = selectedAmount.value;
	}

	const formData = {
		donationAmount: donationAmount,
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		cardNumber: document.getElementById('cardNumber').value,
		expiryDate: document.getElementById('expiryDate').value,
		cvv: document.getElementById('cvvCode').value
	};
	
	// log data to console for testing
	console.log('Form Data: ', formData);
	alert('Donation submitted successfully! Thank you for your donation of €' + donationAmount + '.');	
	
});

// function to remove non-digits
function removeNonDigits(str) {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] >= '0' && str[i] <= '9') { // check if character is a digit
			result += str[i]; // add digit to result
		}
	}

	return result;
}


// format card number with spaces
document.getElementById('cardNumber').addEventListener('input', function(e) {
	// remove spaces and non-numbers
	let value = removeNonDigits(e.target.value);

	// limit to 16 digits
	if (value.length > 16) {
		value = value.substring(0, 16);
	}

	// split into groups of 4
	let formattedValue = '';
	for (let i = 0; i < value.length; i++) {
		if (i > 0 && i % 4 === 0) {
			formattedValue += ' ';
		}
		formattedValue += value[i];
	}

	e.target.value = formattedValue;
});

// format expiry date with slash
document.getElementById('expiryDate').addEventListener('input', function(e) {
	let value = removeNonDigits(e.target.value);

	// limit to 4 digits
	if (value.length > 4) {
		value = value.substring(0, 4);
	}

	// add slash after 2 digits
	if (value.length >= 2) {
		value = value.substring(0, 2) + '/' + value.substring(2, 4);
	}

	e.target.value = value;
});

// limit CVV to 3 digits
document.getElementById('cvvCode').addEventListener('input', function(e) {
	let value = removeNonDigits(e.target.value);

	// limit to 3 digits
	if (value.length > 3) {
		value = value.substring(0, 3);
	}

	e.target.value = value;
});