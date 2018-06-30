if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service worker running.')
  }).catch((error) => {
    new Promise.reject(error);
  });
}

const convertCurrencies = (event) => {
  document.getElementById("formId").addEventListener("click", (event) => {
    event.preventDefault();
  })
  const fromCurrencyValue = document.getElementById("fromCurrency").value;
  const toCurrencyValue = document.getElementById("toCurrency").value;
  const currencyValue = document.getElementById("currencyId").value;

  const query = `${fromCurrencyValue}_${toCurrencyValue}`;
  const conversionURL = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;

  const retrievedCurrencyPairs = localStorage.getItem("CurrencyPair");

  const parsedRetrievedCurrency = JSON.parse(retrievedCurrencyPairs);

  if (parsedRetrievedCurrency.hasOwnProperty(query)) {
    const { val } = parsedRetrievedCurrency[query];
    const offlineConversionValue = currencyValue * val;
    document.getElementById("currencyId").value *= offlineConversionValue;
    return toastr.info("Conversion was successful.");
  }

  fetch(conversionURL).then(response => {
    return response.json();
  }).then(returnedResponse => {
    console.log("The stringified array in LC", returnedResponse);
    localStorage.setItem("CurrencyPair", JSON.stringify(returnedResponse));
    const { val } = returnedResponse[query];
    document.getElementById("currencyId").value *= val;
    toastr.info("Conversion was successful.");
  }).catch(() => {
    toastr.error("We apologize for showing this error message. Our Engineers are working to fix the error that made this happen.")
  })

}

convertCurrencies();
