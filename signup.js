// Utility functions
    function generateCaptcha() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }

    function validateEmail(email) {
      // Simple email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^\d{10}$/.test(phone);
    }

    // DOM Elements
    const captchaBox = document.getElementById('captchaBox');
    const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
    const signupForm = document.getElementById('signupForm');
    const successMsg = document.getElementById('successMsg');

    let currentCaptcha = '';

    function setCaptcha() {
      currentCaptcha = generateCaptcha();
      captchaBox.textContent = currentCaptcha;
    }

    refreshCaptchaBtn.addEventListener('click', function() {
      setCaptcha();
      document.getElementById('captchaInput').value = '';
      document.getElementById('captchaError').textContent = '';
    });

    // Initial captcha
    setCaptcha();

    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      document.getElementById('nameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('phoneError').textContent = '';
      document.getElementById('passwordError').textContent = '';
      document.getElementById('confirmPasswordError').textContent = '';
      document.getElementById('captchaError').textContent = '';
      successMsg.style.display = 'none';

      // Get values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const captchaInput = document.getElementById('captchaInput').value.trim().toUpperCase();

      let valid = true;

      // Name validation
      if (name.length === 0) {
        document.getElementById('nameError').textContent = 'Name is required.';
        valid = false;
      }

      // Email validation
      if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        valid = false;
      }

      // Phone validation
      if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
        valid = false;
      }

      // Password validation
      if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
        valid = false;
      }

      // Confirm password validation
      if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        valid = false;
      }

      // Captcha validation
      if (captchaInput !== currentCaptcha) {
        document.getElementById('captchaError').textContent = 'Captcha does not match.';
        valid = false;
      }

      if (valid) {
        successMsg.textContent = 'Sign up successful !';
        successMsg.style.display = 'block';
        signupForm.reset();
        setCaptcha();
        
        // Redirect to login page after 1.5 seconds
      setTimeout(function() {
      window.location.href = "login.html";
  }, 1500);
      }
    });

    // Optional: Real-time validation for better UX
    document.getElementById('email').addEventListener('input', function() {
      if (this.value && !validateEmail(this.value)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
      } else {
        document.getElementById('emailError').textContent = '';
      }
    });
    document.getElementById('phone').addEventListener('input', function() {
      if (this.value && !validatePhone(this.value)) {
        document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
      } else {
        document.getElementById('phoneError').textContent = '';
      }
    });
    document.getElementById('confirmPassword').addEventListener('input', function() {
      if (this.value && this.value !== document.getElementById('password').value) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
      } else {
        document.getElementById('confirmPasswordError').textContent = '';
      }
    });