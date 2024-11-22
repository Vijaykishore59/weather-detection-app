const apiKey =''; // Replace with your actual OpenWeatherMap API key

async function getWeather() {
    const city = encodeURIComponent(document.getElementById('cityInput').value.trim());
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const { name, main, weather } = data;
        document.getElementById('cityName').innerText = name;
        document.getElementById('temperature').innerText = `Temperature: ${main.temp}°C`;
        document.getElementById('description').innerText = `Condition: ${weather[0].description}`;
        document.getElementById('humidity').innerText = `Humidity: ${main.humidity}%`;

        const iconCode = weather[0].icon;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;

        applyParticleEffect(weather[0].main.toLowerCase());
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

function applyParticleEffect(condition) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => p.remove());

    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', condition);
        document.body.appendChild(particle);
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
    }
}




