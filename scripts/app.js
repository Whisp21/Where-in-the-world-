const countryList = document.getElementById('country-list');
const countryDiv = document.getElementById('country');
const modal = document.getElementById('details-modal');
const searchBar = document.getElementById('search-bar');
const input = document.querySelector('input');
const dropbtn = document.getElementById('dropbtn');
const darkThemeBtn = document.querySelector('button');
const country =  document.getElementsByClassName('country-div');

const getModalContent = async (countryName) => {
  const selectedCountry = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
  const countryDetails = selectedCountry.data;
  console.log(selectedCountry)
  for(const details of countryDetails) {
    modal.querySelector('img').src = details.flags.png;
    modal.querySelector('h2').textContent = details.name.common;
    modal.querySelector('p').textContent = `Native Name: ${details.nativeName}`;
    modal.querySelector('p:nth-of-type(2)').textContent = `Population: ${details.population}`;
    modal.querySelector('p:nth-of-type(3)').textContent = `Region: ${details.region}`;
    modal.querySelector('p:nth-of-type(4)').textContent = `Sub-region: ${details.subregion}`;
    modal.querySelector('p:nth-of-type(5)').textContent = `Capital: ${details.capital}`;
    modal.querySelector('p:nth-of-type(6)').textContent = `Top Level Domain: ${details.tld}`;
    modal.querySelector('p:nth-of-type(7)').textContent = `Currency: ${details.currencies[0].name}`;
    modal.querySelector('p:nth-of-type(8)').textContent = `Main Language: ${details.languages[0].name}`
  }
}

const getListContent = async (url) => {
  try {
    const allCountryData = await axios.get(url);
    const countries = allCountryData.data;
    for(const country of countries) {
      const countryEl = document.importNode(countryDiv.content, true)
      countryEl.querySelector('img').src = country.flags.png;
      countryEl.querySelector('h3').textContent = country.name.common;
      countryEl.querySelector('p').textContent = `Population: ${country.population}`;
      countryEl.querySelector('p:nth-of-type(2)').textContent = `Region: ${country.region}`;
      countryEl.querySelector('p:nth-of-type(3)').textContent = `Capital: ${country.capital}`;
      countryList.append(countryEl);
    }
  } catch(error) {
    console.log(error)
  }
}

const fetchData = () => {
  const urlReq = 'https://restcountries.com/v3.1/all';
  getListContent(urlReq);
}

const getDetails = (e) => {
  const countryName = e.target.closest('div').querySelector('h3').textContent;
  getModalContent(countryName);
  modal.style.display = 'block';

  if(e.target.id == 'country-element') {
    console.log('clicked');
  }
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

const searchCountry = (e) => {
  e.preventDefault();
  const inputValue = input.value;
  countryList.innerHTML = '';
  const countryUrl = `https://restcountries.com/v3.1/name/${inputValue}`;
  getListContent(countryUrl);
}

const searchByRegion = (e) => {
  const region = e.target.closest('p').textContent;
  const regionUrl = `https://restcountries.com/v3.1/region/${region}`;
  countryList.innerHTML = '';
  getListContent(regionUrl);
}

const toggleTheme = () => {
  let theme = document.getElementById("theme");
  let light = "styles/light.css";
  let dark = "styles/dark.css";

  if (theme.getAttribute("href") == light) {
    theme.href = dark;
  } else {
    theme.href = light;
  }
  // document.querySelector('body').classList.toggle('dark-theme');
  // document.querySelector('button').classList.toggle('dark-theme');
  // document.querySelector('input').classList.toggle('dark-theme');
  // document.querySelector('div').classList.toggle('dark-theme');
  // dropbtn.querySelector('button').classList.toggle('dark-theme');
  // dropbtn.querySelector('.dropdown-content').classList.toggle('dark-theme');
  // modal.querySelector('.modal-content').classList.toggle('dark-theme');
  // for(var i = 0; i < country.length; i++) {
  //   country[i].classList.toggle('dark-theme');
  // }
}

countryList.addEventListener('click', getDetails);
searchBar.addEventListener('submit', searchCountry);
dropbtn.addEventListener('click', searchByRegion);
darkThemeBtn.addEventListener('click', toggleTheme);
fetchData();
