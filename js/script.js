const customRadio = document.getElementById('donateAmountCustom');
const customContainer = document.getElementById('customAmountContainer');
const customInput = document.getElementById('customAmountInput');
const allRadios = document.querySelectorAll('input[name="donationAmount"]');

// Show/hide custom input based on radio selection
allRadios.forEach((radio) => {
	radio.addEventListener('change', function() {
		if (this.value === 'custom') {
			customContainer.classList.add('show');
			customInput.required = true;
			customInput.focus();
		} else {
			customContainer.classList.remove('show');
			customInput.required = false;
			customInput.value = '';
		}
	});
});

// When custom input changes, update the radio value
customInput.addEventListener('input', function() {
	if (customRadio.checked && this.value) {
		customRadio.value = this.value;
	}
});
