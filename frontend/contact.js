document.addEventListener('DOMContentLoaded', () => {

    // 1. Map Configuration using Leaflet
    const offices = [
        {
            city: "New York HQ",
            lat: 40.7128,
            lng: -74.0060,
            address: "123 Manhattan Ave, New York, NY 10001",
            phone: "+1 (212) 555-0198",
            email: "ny-support@emart.com",
            hours: "Mon-Fri: 8:00 AM - 6:00 PM (EST)"
        },
        {
            city: "Los Angeles Hub",
            lat: 34.0522,
            lng: -118.2437,
            address: "450 Wilshire Blvd, Los Angeles, CA 90017",
            phone: "+1 (213) 555-0245",
            email: "la-hub@emart.com",
            hours: "Mon-Sat: 9:00 AM - 8:00 PM (PST)"
        },
        {
            city: "Chicago Operations",
            lat: 41.8781,
            lng: -87.6298,
            address: "789 Loop St, Chicago, IL 60604",
            phone: "+1 (312) 555-0374",
            email: "chi-ops@emart.com",
            hours: "Mon-Fri: 8:00 AM - 5:00 PM (CST)"
        },
        {
            city: "Houston Distribution",
            lat: 29.7604,
            lng: -95.3698,
            address: "202 Texas Pkwy, Houston, TX 77002",
            phone: "+1 (713) 555-0811",
            email: "hou-dist@emart.com",
            hours: "Mon-Sun: 7:00 AM - 9:00 PM (CST)"
        },
        {
            city: "Miami Seaside Office",
            lat: 25.7617,
            lng: -80.1918,
            address: "55 Ocean Drive, Miami, FL 33139",
            phone: "+1 (305) 555-0922",
            email: "miami-hello@emart.com",
            hours: "Mon-Fri: 10:00 AM - 7:00 PM (EST)"
        }
    ];

    // Initialize map centered roughly across the contiguous US
    const map = L.map('map').setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Create custom eMart Icon
    const eMartIcon = L.icon({
        iconUrl: '../images/logo.png',
        iconSize: [40, 40], // scale icon
        iconAnchor: [20, 20], 
        popupAnchor: [0, -20]
    });

    const officeDetailsBox = document.getElementById('officeDetails');

    // Add markers dynamically
    offices.forEach(office => {
        const marker = L.marker([office.lat, office.lng], { icon: eMartIcon }).addTo(map);
        
        // Optional quick popup naming the city
        marker.bindPopup(`<b>${office.city}</b>`);

        // Handle Click Event to update the Contact Info panel!
        marker.on('click', () => {
            officeDetailsBox.innerHTML = `
                <h4><span style="color:var(--primary-color)">📍</span> ${office.city}</h4>
                <p><strong>Address:</strong> ${office.address}</p>
                <p><strong>Phone:</strong> ${office.phone}</p>
                <p><strong>Email:</strong> <a href="mailto:${office.email}" class="highlight-email">${office.email}</a></p>
                <p><strong>Hours:</strong> ${office.hours}</p>
            `;
            
            // Add slight flash animation to show it updated
            officeDetailsBox.style.opacity = '0.5';
            setTimeout(() => {
                officeDetailsBox.style.opacity = '1';
            }, 150);
        });
    });


    // 2. Contact Form Submission Logic
    const contactForm = document.getElementById('contactForm');
    const formSuccessMsg = document.getElementById('formSuccessMsg');
    const submitBtn = document.getElementById('submitContactBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab values just to show we 'processed' them theoretically here
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('emailAddr').value;
        const phone = document.getElementById('contactNo').value;
        const issue = document.getElementById('issueType').value;
        const message = document.getElementById('messageBox').value;

        // Visual simulation of submitting details to backend
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Success
            contactForm.reset();
            formSuccessMsg.style.display = 'block';
            submitBtn.querySelector('span').textContent = 'Submit Request';
            submitBtn.disabled = false;

            // Hide success msg after 5s
            setTimeout(() => {
                formSuccessMsg.style.display = 'none';
            }, 5000);
            
        }, 1500);
    });

});
