document.addEventListener('DOMContentLoaded', function() {
    // Sample data for transport options
    const transportData = {
        "delhi-mumbai": {
            bus: { price: 2500, time: "24-30 hours", comfort: "Moderate" },
            train: { price: 1800, time: "16-20 hours", comfort: "Good" },
            flight: { price: 4500, time: "2 hours", comfort: "Excellent" }
        },
        "delhi-jaipur": {
            bus: { price: 1000, time: "6-8 hours", comfort: "Moderate" },
            train: { price: 700, time: "4-6 hours", comfort: "Good" },
            flight: { price: 3000, time: "1 hour", comfort: "Excellent" }
        },
        "mumbai-goa": {
            bus: { price: 1800, time: "12-14 hours", comfort: "Basic" },
            train: { price: 1200, time: "8-10 hours", comfort: "Good" },
            flight: { price: 4000, time: "1 hour", comfort: "Excellent" }
        },
        "bangalore-chennai": {
            bus: { price: 1200, time: "6-7 hours", comfort: "Basic" },
            train: { price: 800, time: "5 hours", comfort: "Good" },
            flight: { price: 2500, time: "1 hour", comfort: "Excellent" }
        }
    };

    // Calculate button click handler
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const fromCity = document.getElementById('from-city').value.toLowerCase();
        const toCity = document.getElementById('to-city').value.toLowerCase();
        const passengers = parseInt(document.getElementById('passengers').value) || 1;
        
        if (!fromCity || !toCity) {
            alert("Please enter both cities");
            return;
        }

        const routeKey = `${fromCity}-${toCity}`;
        const reverseRouteKey = `${toCity}-${fromCity}`;
        
        let results = transportData[routeKey] || transportData[reverseRouteKey];
        
        if (!results) {
            // Generate random prices if route not found
            const distance = Math.floor(Math.random() * 1500) + 300;
            results = {
                bus: {
                    price: Math.floor(distance * 1.5 * passengers),
                    time: `${Math.floor(distance / 50)}-${Math.floor(distance / 40)} hours`,
                    comfort: ["Basic", "Moderate"][Math.floor(Math.random() * 2)]
                },
                train: {
                    price: Math.floor(distance * 1.2 * passengers),
                    time: `${Math.floor(distance / 70)}-${Math.floor(distance / 60)} hours`,
                    comfort: ["Good", "Excellent"][Math.floor(Math.random() * 2)]
                },
                flight: {
                    price: Math.floor(distance * 3 * passengers),
                    time: `${Math.floor(distance / 600)} hours`,
                    comfort: "Excellent"
                }
            };
        } else {
            // Multiply by number of passengers
            results.bus.price *= passengers;
            results.train.price *= passengers;
            results.flight.price *= passengers;
        }

        // Display results
        document.getElementById('bus-price').textContent = results.bus.price;
        document.getElementById('bus-time').textContent = results.bus.time;
        document.getElementById('bus-comfort').textContent = results.bus.comfort;

        document.getElementById('train-price').textContent = results.train.price;
        document.getElementById('train-time').textContent = results.train.time;
        document.getElementById('train-comfort').textContent = results.train.comfort;

        document.getElementById('flight-price').textContent = results.flight.price;
        document.getElementById('flight-time').textContent = results.flight.time;
        document.getElementById('flight-comfort').textContent = results.flight.comfort;
    });
});