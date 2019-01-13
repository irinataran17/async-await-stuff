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
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=ba9116afb4e3a1c6c7b85c2d5b2bf698');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error('Unable to get exchange rate.');
    }
};

//SYNC version
const getCountriesSYNC = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};

//ASYNC version
const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error('Unable to get countries.');
    }
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
}).catch((e) => {
    console.log(e.message);
});


const add = async (a, b) => a + b;

const doWork = async () => {
    try {
        const result = await add(12, 13);
        return result;
    } catch (e) {
        console.log(e.message);
    }
};

doWork().then((data) => {
    console.log(data);
}).catch((e) => {
    console.log('Something went wrong');
});