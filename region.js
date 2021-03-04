async function searchAllTheCountries() {
    const response = await axios.get('https://restcountries.eu/rest/v2/all')
    const data = response.data

    const sortByPopulation = data.sort((a, b) => a.population - b.population)
    const nameAndFlag = () => {
        const list = document.getElementById('country-list')
        for (let i = 0; i < data.length; i++) {
            const listItem = document.createElement('li')
            listItem.setAttribute('class', 'list-item')
            list.appendChild(listItem)
            const flag = document.createElement('img');
            flag.src = data[i].flag;
            flag.setAttribute('class', 'flag-icon');
            listItem.appendChild(flag);
            const countryName = document.createElement('div');
            const colorCoder = (i) => {
                const region = data[i].region.toString(), subregion = data[i].subregion;
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
            const listId = document.getElementById('list' + [i])
            const hiddenPopulation = document.createElement('div')
            hiddenPopulation.setAttribute('class', 'hidden-pop')
            hiddenPopulation.setAttribute('id', 'hide-pop' + [i])
            const population = `Population: ${numeral(data[i].population).format('0,0')}`
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
}

searchAllTheCountries()