if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(() => {
    console.log('Service worker running.')
  }).catch((error) => {
    new Promise.reject(error);
  });
}

const convertCurrencies = (event) => {

  // Prevent the form from submitting each time the convert button is clicked
  document.getElementById("formId").addEventListener("click", (event) => {
    event.preventDefault();
  });

  // Get the value of the currency to be converted from, currency to be converted to and the amount
  const fromCurrencyValue = document.getElementById("fromCurrency").value;
  const toCurrencyValue = document.getElementById("toCurrency").value;
  const currencyValue = document.getElementById("currencyId").value;

  const query = `${fromCurrencyValue}_${toCurrencyValue}`;
  const conversionURL = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;

  const retrievedCurrencyPairs = localStorage.getItem("CurrencyPair");

  const parsedRetrievedCurrency = JSON.parse(retrievedCurrencyPairs);

  // Do not make an API call if the user has not entered a value in the input field.
  if (document.getElementById("currencyId").value === "") {
    return;
  }

  // Check if the currency pair is already stored. If it is, make use of it and do not make an API call
  if (parsedRetrievedCurrency !== null && parsedRetrievedCurrency.hasOwnProperty(query)) {
    const { val } = parsedRetrievedCurrency[query];
    const offlineConversionValue = currencyValue * val;
    document.getElementById("currencyId").value *= offlineConversionValue;
    return toastr.info("Conversion was successful.");
  }

  // Make an API call to get the conversion rate and save it for another operation.
  fetch(conversionURL).then(response => {
    return response.json();
  }).then(returnedResponse => {
    localStorage.setItem("CurrencyPair", JSON.stringify(returnedResponse));
    const { val } = returnedResponse[query];
    document.getElementById("currencyId").value *= val;
    toastr.info("Conversion was successful.");
  }).catch(() => {
    toastr.error("We apologize for showing this error message. Our Engineers are working to fix the error that made this happen.")
  })

}

convertCurrencies();
