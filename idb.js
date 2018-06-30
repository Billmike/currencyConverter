// Make the API request call using fetch API
fetch('https://free.currencyconverterapi.com/api/v5/countries').then(response => {
  return response.json();
}).then(returnedJson => {

  // Iterate over the returned JSON object using a for...in loop
  for (const objects in returnedJson.results) {
    localStorage.setItem('Countries',  JSON.stringify(returnedJson.results));
  }
});

const retrievedStoredCurrencies = localStorage.getItem('Countries');
const parsedStoredCurrency = JSON.parse(retrievedStoredCurrencies);

const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency")

for (const objects in parsedStoredCurrency) {
  fromCurrencySelect.options[fromCurrencySelect.options.length] = new Option(`${parsedStoredCurrency[objects].currencyName}`, `${parsedStoredCurrency[objects].currencyId}`);
  toCurrencySelect.options[toCurrencySelect.options.length] = new Option(`${parsedStoredCurrency[objects].currencyName}`, `${parsedStoredCurrency[objects].currencyId}`)
}
