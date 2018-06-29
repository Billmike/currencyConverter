// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

const dbName = "currencyConverter";
const request = window.indexedDB.open(dbName, 11);
let db;

if (!window.indexedDB) {
  toastr.info('It seems your browser does not support indexedDB')
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('We have the service worker running!!');
    
  }).catch((error) => {
    console.log(error);
  });
}

/**
 * This function handles the calls to the free-currency converter API.
 * It fetches the currencies of all nations and saves it to the Database.
 */
const fetchNations = () => {
  const fetchCurrency = 'https://free.currencyconverterapi.com/api/v5/countries';

  fetch(fetchCurrency).then((response) => {
    return response.json();
  }).then((returnedResponse) => {

    request.onerror = (event) => {
      alert('An error with the database', event.target.errorCode);
    }

    request.onsuccess = (event) => {

    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("currencies", { keyPath: "name" });
      const objectStoreTransaction = db.transaction("currencies", "readonly").objectStore("currencies");

      objectStore.createIndex("name", "name", { unique: true });;

      objectStore.transaction.oncomplete = (event) => {
        // Open transaction
        const customerObjectStore = db.transaction("currencies", "readwrite").objectStore("currencies");
        const transaction = db.transaction(["currencies"], "readwrite");
        for (const index in returnedResponse.results) {
          // write transaction. This executes and populates the object-store.
          customerObjectStore.add(returnedResponse.results[index])
        }

        transaction.oncomplete = function(event) {
          toastr.info("Application ready for offline use!");
        };
      }
    }
  })
}


/**
 * This function is responsible for reading the data from the indexedDB.
 */
const readDataFromDB = () => {
  request.onsuccess = (event) => {
    const db = event.target.result;

    // Open a read-only transaction for connecting to Database
    const transaction = db.transaction("currencies", "readonly");
    const DBStore = transaction.objectStore("currencies");

    // call getAll() to fetch all objects from the currencies object-store
    const getAllObjects = DBStore.getAll();

    // Create an on-success function that handles successful calls to the database
    getAllObjects.onsuccess = () => {
      /**
       * getAllObjects returns a result array containing all objects found in the database
       * We can then map through it to get a single object and append it to an HTML select element.
       */
      getAllObjects.result.map(singleCountry => {
        const fromCurrencySelect = document.getElementById("fromCurrency");
        const toCurrencySelect = document.getElementById("toCurrency");
        fromCurrencySelect.options[fromCurrencySelect.options.length] = new Option(`${singleCountry.currencyName}`, `${singleCountry.id}`);
        toCurrencySelect.options[toCurrencySelect.options.length] = new Option(`${singleCountry.currencyName}`, `${singleCountry.id}`);
      })
    }
  }
}


fetchNations();
readDataFromDB();

// getCurrencies = (event) => {
//   const db = event.target.result;
//   const index = db.transaction('currencies').objectStore('currencies');

//   return index.getAll().then(allCurrencies => {
//     console.log('We got them all!!!!')
//   })
// }

// getCurrencies()


// console.log(arrayOfCountries.map(singles => {
//   return singles;
// }))


// const getFullStuff = (event) => {

//   // prevent form from submitting when the submit button is clicked.
//   document.getElementById("formId").addEventListener("click", (event) => {
//     event.preventDefault();
//   })
//   const fromCurrencyOption = document.getElementById("fromCurrency");
//   const toCurrencyOption = document.getElementById("toCurrency");

//   const fromCurrencyValue = fromCurrencyOption.options[fromCurrencyOption.selectedIndex].text;
//   const toCurrencyValue = toCurrencyOption.options[toCurrencyOption.selectedIndex].text;

//   const trimmedFromCurrencyValue = fromCurrencyValue.split(" ")[1].slice(1, -1);
//   const trimmedToCurrencyValue = toCurrencyValue.split(" ")[1].slice(1, -1);

//   const query = `${trimmedFromCurrencyValue}_${trimmedToCurrencyValue}`;
//   const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
//   fetch(url).then((response) => {
//     return response.text();
//   }).then((text) => {
//     const parsedCurrency = JSON.parse(text);
//     const { val } = parsedCurrency[query];
//     document.getElementById("currencyId").value = val;
//     toastr.info('Conversion successful.');
//   }).catch((error) => {
//     toastr.error(`We encountered an error trying to convert ${trimmedFromCurrencyValue} to ${trimmedToCurrencyValue}. Our engineers are currently working to fix that.`);
//   })
// }


// const fetchCurrency = 'https://free.currencyconverterapi.com/api/v5/countries';
// fetch(fetchCurrency).then(response => {
//   return response.text();
// }).then((returnedResponse) => {
//   const parsedText = JSON.parse(returnedResponse);
//   for (const index in parsedText) {

//   }
// })
