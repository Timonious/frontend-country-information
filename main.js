const button = document.getElementById("button");
button.addEventListener("click", function () {
    country = inputField.value;
    searchCountry();
});
const inputField = document.getElementById("input");
const input = (e) => {
    country = e.target.value;
    if (e.key === 'Enter') {
        searchCountry();
    }
}
inputField.addEventListener('keyup', input);
const content = document.getElementById('content');
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
            data = response.data[0];
        console.log(data);
        const capitalAndMoney = () => {
            if (data.currencies.length === 1) {
                return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name}'s.`;
            }
            if (data.currencies.length === 2) {
                return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name}'s and ${data.currencies[1].name}'s.`;
            }
            let sum = ``;
            if (data.currencies.length > 2) {
                for (let i = 1; i < data.currencies.length - 2; i++) {
                    sum += data.currencies[i].name + `, `;
                }
            }
            return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name}, ${sum} ${data.currencies[data.currencies.length - 2].name} and ${data.currencies[data.currencies.length - 1].name}.`;
        }

        function languages() {
            let sum = ``;
            if (data.languages.length === 1) {
                return `They speak ${data.languages[0].name}.`;
            }
            if (data.languages.length === 2) {
                return `They speak ${data.languages[0].name} and ${data.languages[data.languages.length - 1].name}.`;
            }
            if (data.languages.length > 2) {
                for (let i = 1; i < data.languages.length - 2; i++) {
                    sum += data.languages[i].name + `, `;
                }
            }
            return `They speak ${data.languages[0].name},${sum} ${data.languages[data.languages.length - 2].name} and ${data.languages[data.languages.length - 1].name}.`;
        }

        const flag = document.createElement('img');
        flag.src = data.flag;
        flag.setAttribute('id', 'flag-image');
        content.appendChild(flag);
        const countryNameH2 = document.createElement('div');
        countryNameH2.setAttribute('id', 'country-name-header');
        countryNameH2.innerText = `${data.name}`;
        content.appendChild(countryNameH2);
        const textContent = document.createElement('div');
        textContent.innerText = `${data.name} is situated in ${data.subregion}. It has a population of ${numeral(data.population).format('0,0')} people.\n` + capitalAndMoney() + `\n` + languages();
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



