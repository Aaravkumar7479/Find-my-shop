// Form validation and submission
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            
            // Clear previous errors
            clearErrors();
            
            // Basic validation
            let hasErrors = false;
            
            if (!email) {
                showError('email', 'Email is required');
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                hasErrors = true;
            }
            
            if (!password) {
                showError('password', 'Password is required');
                hasErrors = true;
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                hasErrors = true;
            }
            
            if (hasErrors) {
                document.querySelector('.login-card').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.login-card').classList.remove('shake');
                }, 500);
                return;
            }
            
            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.textContent = 'Signing In...';
            
            // Simulate API call
            try {
                await simulateLogin(email, password);
                
                // Show success message
                showSuccess('Login successful! Redirecting to dashboard...');
                
                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                    // window.location.href = '/dashboard';
                }, 2000);
                
            } catch (error) {
                showError('password', error.message);
                document.querySelector('.login-card').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.login-card').classList.remove('shake');
                }, 500);
            } finally {
                // Reset button state
                loginBtn.classList.remove('loading');
                loginBtn.textContent = 'Sign In';
            }
        });
        
        // Helper functions
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showError(fieldName, message) {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + 'Error');
            
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'flex';
        }