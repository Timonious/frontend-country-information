const button = document.getElementById("button");
button.addEventListener("click", function () {
    country = inputField.value;
    searchcountry();
});
const inputField = document.getElementById("input");
const input = (e) => {
    country = e.target.value;
    if (e.key === 'Enter') {
        searchcountry();
    }
}
inputField.addEventListener('keyup', input);
const content = document.getElementById('content');
let country = "";

async function searchcountry() {
    inputField.value = '';
    const errorMsg = document.getElementById('error');
    errorMsg.textContent = '';
    const oldFlag = document.getElementById('flag-image');
    const oldCountryNameH2 = document.getElementById('country-name-header');
    const oldTextContent = document.getElementById('information');
    if (oldCountryNameH2) {
        content.removeChild(oldCountryNameH2);
        content.removeChild(oldTextContent);
        content.removeChild(oldFlag);
    }
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        const data = response.data[0];
        console.log(data);
        console.log(`${data.name} is situated in ${data.subregion}. It has a population of ${data.population} people.`);
        const capitalAndMoney = () => {
            if (data.currencies.length === 1) {
                return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name}'s`;
            }
            if (data.currencies.length === 2) {
                return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name}'s and ${data.currencies[1].name}'s`;
            }
            let sum = ``;
            if (data.currencies.length > 2) {
                for (let i = 1; i < data.currencies.length - 2; i++) {
                    sum += data.currencies[i].name + `, `;
                    console.log(sum);
                }
            }
            return `The capital is ${data.capital} and you can pay with ${data.currencies[0].name},${sum} ${data.currencies[data.currencies.length - 2].name} and ${data.currencies[data.currencies.length - 1].name}.`;
        }
        console.log(capitalAndMoney());
        function languages() {
            let sum = ``;
            if (data.languages.length === 1) {
                return `They speak ${data.languages[0].name}`;
            }
            if (data.languages.length === 2) {
                return `They speak ${data.languages[0].name} and ${data.languages[data.languages.length - 1].name}`;
            }
            if (data.languages.length > 2) {
                for (let i = 1; i < data.languages.length - 2; i++) {
                    sum += data.languages[i].name + `, `;
                    console.log(sum);
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
        textContent.innerText = `${data.name} is situated in ${data.subregion}. It has a population of ${data.population} people.\n` + capitalAndMoney() + `\n` + languages();
        textContent.setAttribute('id', 'information');
        content.appendChild(textContent);
        console.log(data);
    } catch (e) {
        console.error(e);
        if (country.length === 0) {
            errorMsg.textContent = `Please enter a valid country-name`;
        }
        else {
            errorMsg.textContent = `Cannot find input:${country}, try again!`;
        }
    }
}



