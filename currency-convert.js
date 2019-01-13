const axios = require('axios');

//SYNC version
const getExchangeRateSYNC = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=ba9116afb4e3a1c6c7b85c2d5b2bf698').then((response) => {
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate;
    });
};

//ASYNC version
const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=ba9116afb4e3a1c6c7b85c2d5b2bf698');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
};

//SYNC version
const getCountriesSYNC = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};

//ASYNC version
const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
};

//SYNC version
const convertCurrencySYNC = (from, to, amount) => {
    let convertedAmount;
    return getExchangeRate(from, to).then((rate) => {
        convertedAmount = (amount * rate).toFixed(2);
        return getCountries(to);
    }).then((countries) => {
        return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
    });
};

//ASYNC version
const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
};


convertCurrency('USD', 'CAD', 20).then((message) => {
    console.log(message);
});