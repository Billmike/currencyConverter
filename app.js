let arrayOfCountries = []

const fetchNations = () => {
  var fetchCurrency = 'https://free.currencyconverterapi.com/api/v5/countries';
  fetch(fetchCurrency).then((response) => {
    return response.text();
  }).then((text) => {
    const parsedNations = JSON.parse(text);
    const select = document.getElementById("fromCurrency");
    const select2 = document.getElementById("toCurrency");
    for (const index in parsedNations.results) {
      select.options[select.options.length] = new Option(`${parsedNations.results[index].name} (${parsedNations.results[index].currencyId})`, index);
      select2.options[select2.options.length] = new Option(`${parsedNations.results[index].name} (${parsedNations.results[index].currencyId})`, index);
    }
  })
}

const getFullStuff = (event) => {

  // prevent form from submitting when the submit button is clicked.
  document.getElementById("formId").addEventListener("click", (event) => {
    event.preventDefault();
  })
  const fromCurrencyOption = document.getElementById("fromCurrency");
  const toCurrencyOption = document.getElementById("toCurrency");

  const fromCurrencyValue = fromCurrencyOption.options[fromCurrencyOption.selectedIndex].text;
  const toCurrencyValue = toCurrencyOption.options[toCurrencyOption.selectedIndex].text;

  const trimmedFromCurrencyValue = fromCurrencyValue.split(" ")[1].slice(1, -1);
  const trimmedToCurrencyValue = toCurrencyValue.split(" ")[1].slice(1, -1);

  const query = `${trimmedFromCurrencyValue}_${trimmedToCurrencyValue}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
  fetch(url).then((response) => {
    return response.text();
  }).then((text) => {
    const parsedCurrency = JSON.parse(text);
    const { val } = parsedCurrency[query];
    document.getElementById("currencyId").value = val;
    toastr.info('Conversion successful.');
  }).catch((error) => {
    toastr.error(`We encountered an error trying to convert ${trimmedFromCurrencyValue} to ${trimmedToCurrencyValue}. Our engineers are currently working to fix that.`);
  })
}

fetchNations()
