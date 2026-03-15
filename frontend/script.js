const BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {

    // Toggle Forms
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');
    const toSignupBtn = document.getElementById('toSignup');
    const toLoginBtn = document.getElementById('toLogin');

    toSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.add('hidden');
        signupFormContainer.classList.remove('hidden');
        clearMessages();
    });

    toLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormContainer.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
        clearMessages();
    });

    // Helper functions for messages
    const showMessage = (elementId, message, type) => {
        const el = document.getElementById(elementId);
        el.textContent = message;
        el.style.display = 'block';
        if(type === 'error') {
            el.className = 'error-msg';
        } else {
            el.className = 'success-msg';
        }
    };

    const clearMessages = () => {
        ['loginError', 'loginSuccess', 'signupError', 'signupSuccess'].forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.style.display = 'none';
                el.textContent = '';
            }
        });
    };

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    const loginBtn = loginForm.querySelector('button');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessages();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        loginBtn.classList.add('loading');
        
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMsg = data.detail || 'Login failed.';
                // Custom error logic based on user request
                if (errorMsg.toLowerCase() === 'invalid email') {
                    errorMsg = 'user is not registered with us, create a new account';
                } else if (errorMsg.toLowerCase() === 'invalid password') {
                    errorMsg = 'password is incorrect';
                }
                
                showMessage('loginError', errorMsg, 'error');
            } else {
                // Success!
                showMessage('loginSuccess', 'Logged in successfully! Redirecting...', 'success');
                // Save token optionally
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                }
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }

        } catch (error) {
            showMessage('loginError', 'Could not connect to the server.', 'error');
        } finally {
            loginBtn.classList.remove('loading');
        }
    });

    // Signup Form Submit
    const signupForm = document.getElementById('signupForm');
    const signupBtn = signupForm.querySelector('button');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessages();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        signupBtn.classList.add('loading');

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage('signupError', data.detail || 'Registration failed.', 'error');
            } else {
                showMessage('signupSuccess', 'Account created successfully! Please log in.', 'success');
                
                // Clear the form and automatically switch to login form after 2 seconds
                signupForm.reset();
                setTimeout(() => {
                    signupFormContainer.classList.add('hidden');
                    loginFormContainer.classList.remove('hidden');
                    // Pre-fill email in login
                    document.getElementById('loginEmail').value = email;
                    clearMessages();
                }, 2000);
            }

        } catch (error) {
            showMessage('signupError', 'Could not connect to the server.', 'error');
        } finally {
            signupBtn.classList.remove('loading');
        }
    });

});
