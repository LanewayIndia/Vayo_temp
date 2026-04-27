// --- Form Validation Logic ---
(function() {
    const countrySelect = document.getElementById('countryCode');
    if (!countrySelect) return; // Not on the form page

    const phoneInput = document.getElementById('phoneNumber');
    const phonePreview = document.getElementById('phonePreview');
    const phoneValidation = document.getElementById('phoneValidation');
    const form = document.querySelector('form');

    // Guard: bail out if any critical element is missing
    if (!phoneInput || !phonePreview || !phoneValidation || !form) return;

    // Mapping: ISO country code -> Phone code
    const countryToCode = {
        'US': '+1', 'CA': '+1', 'GB': '+44', 'IN': '+91', 'CN': '+86', 'JP': '+81',
        'DE': '+49', 'FR': '+33', 'IT': '+39', 'ES': '+34', 'AU': '+61', 'NZ': '+64',
        'ZA': '+27', 'BR': '+55', 'AR': '+54', 'MX': '+52', 'NG': '+234', 'EG': '+20',
        'SA': '+966', 'AE': '+971', 'MY': '+60', 'SG': '+65', 'ID': '+62', 'TH': '+66',
        'PH': '+63', 'KR': '+82', 'VN': '+84', 'RU': '+7', 'NO': '+47', 'SE': '+46',
        'DK': '+45', 'NL': '+31', 'BE': '+32', 'CH': '+41', 'AT': '+43', 'PL': '+48',
        'GR': '+30', 'PT': '+351', 'FI': '+358', 'IE': '+353', 'RO': '+40', 'HU': '+36',
        'CZ': '+420', 'SK': '+421', 'HR': '+385', 'GE': '+995', 'JM': '+1-876',
        'TT': '+1-868', 'DO': '+1-809', 'VC': '+1-784', 'LC': '+1-758', 'GD': '+1-473',
        'BB': '+1-246', 'AI': '+1-264', 'KG': '+996', 'UZ': '+998', 'TJ': '+992',
        'TM': '+993', 'KZ': '+7', 'BD': '+880', 'LK': '+94', 'NP': '+977', 'PK': '+92',
        'AF': '+93', 'IR': '+98', 'IQ': '+964', 'JO': '+962', 'LB': '+961', 'SY': '+963',
        'TR': '+90', 'MA': '+212', 'DZ': '+213', 'TN': '+216', 'LY': '+218'
    };

    // Reverse mapping: Phone code -> ISO country code
    const codeToCountry = {};
    Object.entries(countryToCode).forEach(([iso, phone]) => {
        codeToCountry[phone] = iso;
    });

    // Fetch user's country based on IP
    async function detectCountry() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) return;
            const data = await response.json();
            const countryCode = data.country_code;
            
            // find the option with dataset.iso == countryCode
            const option = Array.from(countrySelect.options).find(opt => opt.dataset && opt.dataset.iso === countryCode);
            if (option) {
                option.selected = true;
                updatePhonePreview();
            }
        } catch (error) {
            console.log('Geolocation detection failed, manual selection needed');
        }
    }

    // Get ISO country code from the currently selected option
    function getSelectedISO() {
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        return (selectedOption && selectedOption.dataset) ? selectedOption.dataset.iso : null;
    }

    // Validate phone number using libphonenumber
    function validatePhoneNumber() {
        const countryCode = countrySelect.value;
        const phoneNumber = phoneInput.value;
        
        if (!countryCode || !phoneNumber) {
            phoneValidation.textContent = '';
            phoneValidation.className = 'phone-validation';
            return false;
        }

        const isoCountryCode = getSelectedISO();

        if (!isoCountryCode) {
            phoneValidation.textContent = '✗ Country not supported';
            phoneValidation.className = 'phone-validation invalid';
            return false;
        }

        // Guard: libphonenumber might not be loaded yet
        if (!window.libphonenumber) {
            // Fallback: basic digit-length check (7-15 digits per E.164)
            const digits = phoneNumber.replace(/\D/g, '');
            if (digits.length >= 7 && digits.length <= 15) {
                phoneValidation.textContent = '✓ Phone number accepted';
                phoneValidation.className = 'phone-validation valid';
                return true;
            }
            phoneValidation.textContent = '✗ Invalid phone number';
            phoneValidation.className = 'phone-validation invalid';
            return false;
        }

        try {
            // Parse the phone number with the correct ISO code
            const parsed = window.libphonenumber.parsePhoneNumber(
                String(phoneNumber),
                isoCountryCode
            );

            if (parsed && parsed.isValid()) {
                phoneValidation.textContent = '✓ Valid phone number';
                phoneValidation.className = 'phone-validation valid';
                return true;
            } else {
                phoneValidation.textContent = '✗ Invalid phone number format';
                phoneValidation.className = 'phone-validation invalid';
                return false;
            }
        } catch (error) {
            // Fallback: isValidPhoneNumber (isoCountryCode is in scope here)
            try {
                if (window.libphonenumber.isValidPhoneNumber(String(phoneNumber), isoCountryCode)) {
                    phoneValidation.textContent = '✓ Valid phone number';
                    phoneValidation.className = 'phone-validation valid';
                    return true;
                }
            } catch (_) {
                // isValidPhoneNumber itself can also throw
            }
            phoneValidation.textContent = '✗ Invalid phone number';
            phoneValidation.className = 'phone-validation invalid';
            return false;
        }
    }

    // Update phone preview
    function updatePhonePreview() {
        const countryCode = countrySelect.value;
        const phoneNumber = phoneInput.value;
        
        if (countryCode && phoneNumber) {
            phonePreview.textContent = `Full Number: ${countryCode} ${phoneNumber}`;
        } else {
            phonePreview.textContent = '';
        }

        validatePhoneNumber();
    }

    countrySelect.addEventListener('change', updatePhonePreview);
    phoneInput.addEventListener('input', updatePhonePreview);

    // --- Toast notification ---
    let toastTimer = null;

    function showToast(message, isError = false) {
        // Clear any existing timeout so a rapid second toast isn't killed early
        if (toastTimer) {
            clearTimeout(toastTimer);
            toastTimer = null;
        }

        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }

        const iconColor = isError ? '#ef4444' : '#10b981';
        const iconBg   = isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)';
        const iconChar = isError ? '✗' : '✓';

        toast.innerHTML =
            '<div class="toast-icon" style="color:' + iconColor + ';background:' + iconBg + ';">' +
                iconChar +
            '</div>' +
            '<div>' + message + '</div>';

        // Remove then re-add .show so the CSS transition replays
        toast.classList.remove('show');
        // Force reflow
        void toast.offsetWidth;
        toast.classList.add('show');

        toastTimer = setTimeout(function() {
            toast.classList.remove('show');
            toastTimer = null;
        }, 4500);
    }

    // --- Form submission ---
    let isSubmitting = false;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Prevent double-submit
        if (isSubmitting) return;

        // Validate phone before submitting
        if (!validatePhoneNumber()) {
            showToast('Please enter a valid phone number', true);
            return;
        }

        isSubmitting = true;

        const submitBtn = form.querySelector('.btn-primary');
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        // Safely read each field (guard against null)
        const firstNameEl  = form.querySelector('input[placeholder="First Name"]');
        const lastNameEl   = form.querySelector('input[placeholder="Last Name"]');
        const emailEl      = form.querySelector('input[placeholder="Email Address"]');
        const contactEl    = document.getElementById('contactMethod');
        const commentsEl   = form.querySelector('textarea[placeholder="Can we help you with anything else?"]');

        const data = {
            "First Name": firstNameEl  ? firstNameEl.value  : '',
            "Last Name":  lastNameEl   ? lastNameEl.value   : '',
            "email":      emailEl      ? emailEl.value      : '',
            "Phone Number": countrySelect.value + ' ' + phoneInput.value,
            "Preferred Contact Method": contactEl ? contactEl.value : '',
            "Comments":   commentsEl   ? commentsEl.value   : '',
            // FormSubmit special fields
            "_subject":      "New member signed in for Waitlist of VAYO!",
            "_autoresponse": "Thank you for joining the waitlist of VAYO! We have received your message and will be in touch soon.",
            "_template":     "table"
        };

        const recipientEmail = 'vayocommune@gmail.com';

        fetch('https://formsubmit.co/ajax/' + recipientEmail, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json().catch(function() {
                throw new Error('Server returned an unexpected response (status ' + response.status + ').');
            });
        })
        .then(function(result) {
            console.log('Form submission result:', result);

            // FormSubmit returns success:"false" when activation is needed
            if (result && result.success === "false") {
                var msg = result.message || 'Submission could not be completed.';
                // Check if it's an activation message (not a real error)
                if (msg.toLowerCase().indexOf('activat') !== -1) {
                    showToast('Almost there! Check the inbox of the recipient email to activate this form, then try again.', false);
                } else {
                    showToast(msg, true);
                }
                return;
            }

            showToast('Thank you for joining the waitlist! We will contact you soon.');
            form.reset();
            phoneValidation.textContent = '';
            phoneValidation.className = 'phone-validation';
            phonePreview.textContent = '';
        })
        .catch(function(error) {
            console.error('Submission error:', error);
            showToast(error.message || 'Oops! Something went wrong while submitting. Please try again.', true);
        })
        .finally(function() {
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    });

    // Detect country on page load
    window.addEventListener('load', detectCountry);
})();
