document.addEventListener('DOMContentLoaded', () => {
    let Ville = document.getElementById('Ville')
    let fond = document.getElementById('fond')
    let menuGRAB = document.getElementById('menuGRAB')
    let menuDIV = document.getElementById('menuDIV')
    let researchResult = document.getElementById('researchResult')
    let nomVille = document.getElementById('nomVille')
    let minDIV = document.getElementById('min')
    let maxDIV = document.getElementById('max')
    let forecastDIV = document.getElementById('forecastDIV')

    let menuOPEN = false
    menuGRAB.addEventListener('click', () => {
        if (menuOPEN) {
            menuDIV.style.left = '-27vw'
        } else {
            menuDIV.style.left = '0%'
        }
        menuOPEN = !menuOPEN
    })


    villeValue = ''
    setInterval(() => {
        if (Ville.value != villeValue && Ville.value.length > 2) {
            villeValue = Ville.value
            $.ajax({
                url: 'ajax/searchCity.php',
                method: 'post',
                data: { ville: Ville.value },
                success: (data) => { printResultsSearch(JSON.parse(data)) }
            })
        }
    }, 250)
    function printResultsSearch(arg) {
        researchResult.innerHTML = ''
        arg.forEach((e) => {
            let div = document.createElement('div')
            researchResult.appendChild(div)
            div.classList.add('contentResultSearch')

            div.addEventListener('click', () => {
                console.log(e.ville_code_commune)
                menuDIV.style.left = '-27vw'
                menuOPEN = false
                apiMeteoCall("https://api.meteo-concept.com/api/forecast/daily?token=cab86840f873a89c490311dd337d125ef003d7054c7b9c29c6cbfca88392ebe0&insee=" + e.ville_code_commune + "&day=0")
            })

            let p = document.createElement('p')
            div.appendChild(p)
            p.innerHTML = e.ville_nom_reel
        })
    }


    async function apiMeteoCall(api) {
        const dataJSON = await fetch(api);
        const data = await dataJSON.json();
        printMeteoDATA(data, data.city.name)
    }
    function printMeteoDATA(arg, name) {
        apiPhotoCall("https://api.unsplash.com/search/photos/?client_id=JnUIljtIa6sFvP1blFhzBRZOLwz4Rcud0j9nudPvxsg&query=", name, arg)
        // arg.forecast.forEach(e => {
        //     let jour = e.datetime.slice(0, 10)
        //     console.log('Temp Minimum' + jour + ' = ' + e.tmin + '°C')
        //     console.log('Temp Maximum' + jour + ' = ' + e.tmax + '°C')
        // });
    }

    async function apiPhotoCall(api, research, meteo) {
        const dataJSON = await fetch(api + research);
        const data = await dataJSON.json();
        printPhotoDATA(data.results, research, meteo)
    }
    function printPhotoDATA(arg, research, meteo) {
        for (let i = 0; i < 10; i++) {
            if (arg[i].slug.includes(research)) {
                printPhoto(arg[i].links.download, meteo)
                return
            }
        }
        printPhoto(arg[0].links.download, meteo)
    }

    function printPhoto(arg, meteo) {
        fond.style.backgroundImage = 'url(' + arg + ')'
        nomVille.innerHTML = meteo.city.name
        minDIV.innerHTML = meteo.forecast[0].tmin + '°C'
        maxDIV.innerHTML = meteo.forecast[0].tmax + '°C'

        console.log(meteo.forecast)

        let count = 0
        forecastDIV.innerHTML = ''
        meteo.forecast.forEach(e => {
            count++

            if (count < 8) {
                let jour = e.datetime.split('T')[0].split('-')[2]

                let div = document.createElement('div')
                forecastDIV.appendChild(div)
                div.classList.add('forecastCONTENT')

                let p = document.createElement('p')
                div.appendChild(p)
                console.log(e)
                p.innerHTML =  'Le ' + jour + ' il fera minimum ' + e.tmin + '°C et maximum ' + e.tmax + '°C'
            }
        })
    }
})

// setInterval(apiCall(), 1000)

//apiMeteoCall("https://api.meteo-concept.com/api/forecast/daily?token=cab86840f873a89c490311dd337d125ef003d7054c7b9c29c6cbfca88392ebe0&insee=75056&day=0")
// apiPhotoCall("https://api.unsplash.com/search/photos/?client_id=JnUIljtIa6sFvP1blFhzBRZOLwz4Rcud0j9nudPvxsg&query=", 'Paris')