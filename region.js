const worldLoader = document.getElementById('loading'),
    listFrame = document.getElementById('country-list-div'),
    list = document.getElementById('country-list');
worldLoader.removeAttribute('class');
async function searchAllTheCountries() {
    const response = await axios.get('https://restcountries.eu/rest/v2/all'),
        data = response.data,
        errorMsg = document.getElementById('error'),
        sortByPopulation = data.sort((a, b) => a.population - b.population);
    try {
        errorMsg.setAttribute('class', 'hide');
        const nameAndFlag = () => {
            for (let i = 0; i < data.length; i++) {
                const listItem = document.createElement('li'), flag = document.createElement('img'),
                    countryName = document.createElement('div');
                listItem.setAttribute('class', 'list-item');
                list.appendChild(listItem);
                flag.src = data[i].flag;
                flag.setAttribute('class', 'flag-icon');
                listItem.appendChild(flag);
                const colorCoder = (i) => {
                    const region = data[i].region, subregion = data[i].subregion;
                    switch (true) {
                        case subregion === "Central America":
                            return countryName.setAttribute('class', 'north-america')
                        case subregion === "Northern America":
                            return countryName.setAttribute('class', 'north-america')
                        case subregion === "South America":
                            return countryName.setAttribute('class', 'south-america')
                        case region === "Oceania":
                            return countryName.setAttribute('class', 'oceania')
                        case region === "Africa":
                            return countryName.setAttribute('class', 'africa')
                        case region === "Europe":
                            return countryName.setAttribute('class', 'europe')
                        case region === "Asia":
                            return countryName.setAttribute('class', 'asia')
                        case region === "Polar":
                            return countryName.setAttribute('class', 'antarctic')
                        default:
                            return countryName.setAttribute('class', 'no-continent')
                    }
                }
                colorCoder([i])
                countryName.innerText = `${data[i].name}`;
                countryName.setAttribute('id', 'list' + [i])
                listItem.appendChild(countryName)
                const listId = document.getElementById('list' + [i]),
                    hiddenPopulation = document.createElement('div'),
                    population = `Population: ${numeral(data[i].population).format('0,0')}`
                hiddenPopulation.setAttribute('class', 'hidden-pop')
                hiddenPopulation.setAttribute('id', 'hide-pop' + [i])
                hiddenPopulation.innerText = population
                listItem.appendChild(hiddenPopulation)
                listId.addEventListener('click', function () {
                    const hiddenPop = document.getElementById('hide-pop' + [i])
                    if (hiddenPop) {
                        listItem.removeChild(hiddenPop)
                        const shownPopulation = document.createElement('div')
                        shownPopulation.setAttribute('class', 'shown-pop')
                        shownPopulation.setAttribute('id', 'show-pop' + [i])
                        shownPopulation.innerText = population
                        return listItem.appendChild(shownPopulation)
                    }
                    const shownPopulation = document.getElementById('show-pop' + [i])
                    if (shownPopulation) {
                        listItem.removeChild(shownPopulation)
                        const hiddenPopulation = document.createElement('div')
                        hiddenPopulation.setAttribute('class', 'hidden-pop')
                        hiddenPopulation.setAttribute('id', 'hide-pop' + [i])
                        hiddenPopulation.innerText = population
                        return listItem.appendChild(hiddenPopulation)
                    }
                });
            }
        }
        nameAndFlag()
    } catch (e) {
        console.error(e);
        errorMsg.removeAttribute('class')
        errorMsg.textContent = `Something went wrong retrieving ALL THE COUNTRIES! please try again later.`;
    }
    worldLoader.setAttribute('class', 'hide')
    listFrame.removeAttribute("class")
}
searchAllTheCountries()
