document.addEventListener('DOMContentLoaded', () => {

    // Helper: Check Auth & Load Info
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect if not logged in
        window.location.href = 'index.html';
        return; // Prevent further execution
    }

    // Attempt to decode a JWT token payload locally to fetch user email/name without extra request
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        
        // Grab email, could extract name if available in payload
        const email = decodedPayload.sub || "Guest"; 
        
        // Split on @ to display username part if name isn't stored in token, or use user email.
        const displayName = email !== "Guest" ? email.split('@')[0] : "Guest";
        
        document.getElementById('userNameDisplay').textContent = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    } catch (e) {
        // Failsafe mostly due to token tampering or invalid format
        console.log("Could not parse JWT natively.");
    }

    // Setup Logout Event Listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            // Navigate back to login
            window.location.href = 'index.html';
        });
    }

});
