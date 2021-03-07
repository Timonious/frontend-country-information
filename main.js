let country = "";

async function searchCountry() {
    const oldFlag = document.getElementById('flag-image'),
        exCountryNameH2 = document.getElementById('country-name-header'),
        oldTextContent = document.getElementsByClassName('information'),
        worldLoader = document.getElementById('loading'),
        errorMsg = document.getElementById('error');
    errorMsg.textContent = '';
    inputField.value = '';
    if (exCountryNameH2) {
        content.removeChild(exCountryNameH2);
        content.removeChild(oldTextContent);
        content.removeChild(oldFlag);
    }
    try {
        errorMsg.setAttribute('class', 'hide');
        worldLoader.removeAttribute('class');
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`),
            {currencies, capital, flag, subregion, languages, population, name} = response.data[0],
            capitalAndMoney = () => {
                let sum = ``;
                switch (true) {
                    case currencies.length === 1:
                        return `${currencies[0].name}'s.`;
                    case currencies.length === 2:
                        return `${currencies[0].name}'s and ${currencies[1].name}'s.`;
                    case currencies.length > 2:
                        for (let i = 1; i < currencies.length - 2; i++) {
                            sum += currencies[i].name + `, `;
                        }
                        return `${currencies[0].name}, ${sum} ${currencies[currencies.length - 2].name} and ${currencies[currencies.length - 1].name}.`;
                    default :
                        return ` nothing, I guess they started a resource-based economy here, good for them!`
                }
            },
            spokenLanguages = () => {
                let sum = ``;
                switch (true) {
                    case languages.length === 1:
                        return `${languages[0].name}.`;
                    case languages.length === 2:
                        return `${languages[0].name} and ${languages[languages.length - 1].name}.`;
                    case languages.length > 2:
                        for (let i = 1; i < languages.length - 2; i++) {
                            sum += languages[i].name + `, `;
                        }
                        return `${languages[0].name},${sum} ${languages[languages.length - 2].name} and ${languages[languages.length - 1].name}.`;
                    default:
                        return `I guess they don't speak in ${name}, sad.`
                }
            },
            flagImg = document.createElement('img'),
            countryNameH2 = document.createElement('div'),
            textContent = document.createElement('div');
        flagImg.src = flag;
        flagImg.setAttribute('id', 'flag-image');
        content.appendChild(flagImg);
        countryNameH2.setAttribute('id', 'country-name-header');
        countryNameH2.innerText = `${name}`;
        content.appendChild(countryNameH2);
        textContent.innerText =
            `${name} is situated in ${subregion}. It has a population of ${numeral(population).format('0,0')} people.
             The capital is ${capital} and you can pay with ${capitalAndMoney()}
             They speak ${spokenLanguages()}`;
        textContent.setAttribute('class', 'information');
        content.appendChild(textContent);
    } catch (e) {
        console.error(e);
        errorMsg.removeAttribute('class')
        if (country.length === 0) {
            errorMsg.textContent = `Please enter a valid country-name`;
        } else {
            errorMsg.textContent = `Cannot find input:${country}, try again!`;
        }
    }
    worldLoader.setAttribute('class', 'hide')
}

button = document.getElementById("button");
button.addEventListener("click", function () {
    country = inputField.value;
    searchCountry();
});
const inputField = document.getElementById("input"),
    input = (e) => {
        country = e.target.value;
        if (e.key === 'Enter') {
            searchCountry();
        }
    }
inputField.addEventListener('keyup', input);
const content = document.getElementById('content');


