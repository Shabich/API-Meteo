//// S'insrcire sur Open Weather Map 

// Récupérer la clé API dans votre compte - en haut à droite (My API keys)

// Parcourir la doc pour récupérer le lien que vous utiliserez

// Pour le bouton de Geolocalisation : 
// récupérer les coords de vore position avec navigator.geolocation -> Regarder comment ca marche dans la doc (w3 ou MDN) !

// 1) Créer le HTML et importer script + css, ne pas oublier d'importer axios si besoin

// 2) Ajouter un écouteur d'événement sur votre bouton Geolocate (récupérer les coords)

// 3) Passer ces coords dans votre lien lors de la requete vers l'API ainsi que la clé API

// api : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${key}

// 4) Récupérer la data recu et l'afficher dans votre page

// 5) Il faudra afficher les degrés, le temps, la ville et les 2 premières lettres du pays et surtout l'image qui correspond au temps

// BONUS :

// Ajouter un input dans lequel on renseigne le nom de la ville et qui nous affiche le temps correspondant
// (Astuce : vous devrez utiliser un autre type de requete API d'Open Weather en plus de celle utilisée précedemment)

const container = document.querySelector('.container');
const inputPart = document.querySelector('.input-part');
const input = document.querySelector('.input');
const btn = document.querySelector('button');
const degrees = document.querySelector('.degrees');
const weatherDesc = document.querySelector('.weather');
const img = document.querySelector('img');
const city = document.querySelector('.city');

const key = '7aa59d308f80d3792456aeb54c854a81';

navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    





    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then(res => res.data)
        .then(body => {
            const tempInCelsius = Math.round(body.main.temp - 273.15); // Convertir la température en Kelvin en Celsius
            degrees.textContent = `${tempInCelsius}°C`;
            weatherDesc.textContent = body.weather[0].description;
            city.textContent = `${body.name}, ${body.sys.country}`;
            img.src = `https://openweathermap.org/img/w/${body.weather[0].icon}.png`;
        })
        .catch(err => console.error(err));
});



// Ajoutez un écouteur d'événements au bouton de recherche
btn.addEventListener('click', function() {
    // Récupérez la valeur saisie par l'utilisateur dans l'input
    const cityName = input.value;

    // Effectuez une requête à l'API OpenWeatherMap pour obtenir les coordonnées de la ville
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then(res => res.data)
        .then(body => {
            // Vérifiez s'il y a des résultats
            if (body.length > 0) {
                const latitude = body[0].lat;
                const longitude = body[0].lon;
                // Effectuez une autre requête pour obtenir les informations météorologiques basées sur les coordonnées
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
                    .then(res => res.data)
                    .then(body => {
                        const tempInCelsius = Math.round(body.main.temp - 273.15);
                        degrees.textContent = `${tempInCelsius}°C`;
                        weatherDesc.textContent = body.weather[0].description;
                        city.textContent = `${body.name}, ${body.sys.country}`;
                        img.src = `https://openweathermap.org/img/w/${body.weather[0].icon}.png`;
                    })
                    .catch(err => console.error(err));
            } else {
                // Si aucune ville n'est trouvée, affichez un message d'erreur
                alert('City not found');
            }
        })
        .catch(err => console.error(err));
});


