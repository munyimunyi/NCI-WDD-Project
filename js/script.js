// Szymon
const customRadio = document.getElementById('donateAmountCustom');
const customContainer = document.getElementById('customAmountContainer');
const customInput = document.getElementById('customAmountInput');
const allRadios = document.querySelectorAll('input[name="donationAmount"]');
const donationForm = document.getElementById('donationForm');

// Show/hide custom input based on radio selection
allRadios.forEach((radio) => { // => calls a function | (radio) => is the same as function(radio) | forEach() goes through every element (with type radio)
	radio.addEventListener('change', function() { // waits for a change in radio on the page
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
	if (customRadio.checked && this.value) { // this refers to object (i.e. customInput)
		customRadio.value = this.value;
		// if the custom radio is checked and there is a value, set the radio value to the input value
	}
});

// clear errors when input is changed
document.getElementById('SW_name').addEventListener('input', function() {
	clearError('SW_name');
});

document.getElementById('SW_email').addEventListener('input', function() {
	clearError('SW_email');
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
	const errorDiv = document.createElement('div'); // creates a div element
	errorDiv.className = 'error-message';
	errorDiv.id = 'error-' + inputId;
	errorDiv.textContent = message;
	errorDiv.style.color = 'red';
	errorDiv.style.textShadow = '1px 1px black'; // adds shadow behind text for readability
	errorDiv.style.fontSize = '1rem';
	errorDiv.style.marginTop = '5px';

	// find place to put error
	let targetElement; // creates variable for use in if statements
	if (inputId === 'donationAmount' || inputId === 'customAmount') {
		targetElement = document.querySelector('.p4_form-group-donate'); // finds first element with p4_form-group-donate class
	} else if (inputId === 'cardNumber' || inputId === 'expiryDate' || inputId === 'cvvCode') { // if inputId is cardNumber, expiryDate, or cvvCode
		targetElement = document.querySelector('.p4_alignRow').parentElement; // find parent of element with p4_alignRow class
	} else { // if it doesn't catch anything with above classes
		targetElement = document.getElementById(inputId).parentElement;
	}

	// add error message to the target element
	targetElement.appendChild(errorDiv); // appendChild() adds an element to the end of the parent element
}

// clear error message
function clearError(inputId) {
	const errorDiv = document.getElementById('error-' + inputId); // gets errorDiv by the id "error-" and the input that has the error
	if (errorDiv) { // if it has a value
		errorDiv.remove(); // remove error
	}
}

// clear all errors
function clearAllErrors() {
	const allErrors = document.querySelectorAll('.error-message'); // gets all elements with error-message class
	allErrors.forEach((error) => error.remove()); // remove errorDiv for each error
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
	const selectedAmount = document.querySelector('input[name="donationAmount"]:checked'); // gets selected donationAmount
	
	if (!selectedAmount) { // if amount not selected
		showError('donationAmount', 'Please select a donation amount'); // show error
		return false; 
	}

	if (selectedAmount.value === 'custom') { // if amount is custom
		const customAmount = parseFloat(customInput.value); // parse the input into a float (int with decimals)
		if (!customInput.value || isNaN(customAmount) || customAmount < 1) { // if no value or is not number or is less than 1
			showError('customAmount', 'Please enter a valid custom amount (minimum €1)');
			customInput.focus();
			return false;
		}
	}

	return true;
}

// validate name
function validateName() {
	const name_SW = document.getElementById('SW_name').value.trim(); // trim() removes spaces at the beginning and end of the string

	if (name_SW === '') { // if empty
		showError('SW_name', 'Please enter your name');
		document.getElementById('SW_name').focus();
		return false;
	}

	return true;
}

// validate email
function validateEmail() {
	const email_SW = document.getElementById('SW_email').value.trim();

	if (email_SW === '' || !email_SW.includes('@') || !email_SW.includes('.')) { // if email is empty, doesn't include @ or doesn't include .
		showError('SW_email', 'Please enter a valid email address');
		document.getElementById('SW_email').focus();
		return false;
	}

	return true;
}

// validate card number
function validateCardNumber() {
	const cardNumber = document.getElementById('cardNumber').value; // value of input

	if (cardNumber === '') { // if empty
		showError('cardNumber', 'Please enter your card number');
		document.getElementById('cardNumber').focus();
		return false;
	}
	
	// remove spaces to check length
	const cardNumberNoSpaces = cardNumber.split(' ').join(''); // splits input by spaces and joins them without any

	// check if exactly 16 digits
	if (cardNumberNoSpaces.length !== 16 || !isOnlyDigits(cardNumberNoSpaces)) { // checks if isn't 16 digits long, or if not isOnlyDigits (has letters)
		showError('cardNumber', 'Card number must be 16 digits');
		document.getElementById('cardNumber').focus();
		return false;
	}

	return true;
}

// validate expiry date
function validateExpiryDate() {
	const expiryDate = document.getElementById('expiryDate').value; // get value of expiry date

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
	const month = expiryDate.substring(0, 2); // substring(start, end) | includes start character but excludes end character
	const year = expiryDate.substring(3, 5); // index 3 is 4th character (after /)

	if (!isOnlyDigits(month) || !isOnlyDigits(year)) { // if month and year are not digits
		showError('expiryDate', 'Expiry date must be in MM/YY format'); // display error
		document.getElementById('expiryDate').focus();
		return false;
	}

	return true;
}

// validate CVV
function validateCVV() {
	const cvv = document.getElementById('cvvCode').value; // get value of cvv

	if (cvv === '') { // if empty
		showError('cvvCode', 'Please enter the CVV');
		document.getElementById('cvvCode').focus();
		return false;
	}

	// check if exactly 3 digits
	if (cvv.length !== 3 || !isOnlyDigits(cvv)) { // if not 3 digits or not only digits
		showError('cvvCode', 'CVV must be 3 digits');
		document.getElementById('cvvCode').focus();
		return false;
	}

	return true;
}

// form validation
donationForm.addEventListener('submit', function(e) { // can use anything other than e | many sources I looked at used e, so I did too
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
	if (selectedAmount.value === 'custom') { // if donation amount is custom
		donationAmount = document.getElementById('customAmountInput').value; // set donationAmount to the custom input
	} else {
		donationAmount = selectedAmount.value; // otherwise set it to selected amount 
	}

	const formData = { // creates object with the submitted form data (for debugging)
		donationAmount: donationAmount,
		name_SW: document.getElementById('SW_name').value,
		email_SW: document.getElementById('SW_email').value,
		cardNumber: document.getElementById('cardNumber').value,
		expiryDate: document.getElementById('expiryDate').value,
		cvv: document.getElementById('cvvCode').value
	};
	
	// log data to console for testing
	console.log('Form Data: ', formData);
	alert('Donation submitted successfully! Thank you for your donation of €' + donationAmount + '.'); // shows alert on screen
	
});

// function to remove non-digits
function removeNonDigits(str) {
	let result = ''; // makes result empty
	for (let i = 0; i < str.length; i++) { // loops through length of string
		if (str[i] >= '0' && str[i] <= '9') { // check if character is a digit [0-9]
			result += str[i]; // add digit to result
		}
	}

	return result;
}


// format card number with spaces
document.getElementById('cardNumber').addEventListener('input', function(e) { // waits for input, if found executes function(e) 
	// remove spaces and non-numbers
	let value = removeNonDigits(e.target.value); // runs function above to remove anything that isn't a digit (i.e. letters, spaces, etc.)

	// limit to 16 digits
	if (value.length > 16) { // if length is longer than 16
		value = value.substring(0, 16); // returns only first 16 characters
	}

	// split into groups of 4
	let formattedValue = ''; // empty formattedValue
	for (let i = 0; i < value.length; i++) { // loops through length of input
		if (i > 0 && i % 4 === 0) { // if value is more than 0 and modulus (remainder) is 0 when divided by 4
			formattedValue += ' '; // adds a space to formattedValue
		}
		formattedValue += value[i]; // adds the space to the value inputted when modulus is 0 (from above) 
	}

	e.target.value = formattedValue; // sets the value to the formattedValue
});

// format expiry date with slash
document.getElementById('expiryDate').addEventListener('input', function(e) {
	let value = removeNonDigits(e.target.value); // removes digits

	// limit to 4 digits
	if (value.length > 4) { // if length over 4
		value = value.substring(0, 4); // returns only first 4 characters
	}

	// add slash after 2 digits
	if (value.length >= 2) { // if length is at 2 or more
		value = value.substring(0, 2) + '/' + value.substring(2, 4); // add a / at [2] between 2nd digit [1] and 3rd digit [3]
	}

	e.target.value = value; // sets inputted value to value variable
});

// limit CVV to 3 digits
document.getElementById('cvvCode').addEventListener('input', function(e) {
	let value = removeNonDigits(e.target.value);

	// limit to 3 digits
	if (value.length > 3) { // if length more than 3
		value = value.substring(0, 3); // return first 3 digits
	}

	e.target.value = value;
});
