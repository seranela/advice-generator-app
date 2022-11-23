const adviceNumber = document.getElementById('advice-number');
const adviceText = document.getElementById('advice-quote');
const diceButton = document.querySelector('.dice-button');

const apiURL = 'https://api.adviceslip.com/advice';

function updateHTML(slipID, slipAdvice) {
  adviceNumber.innerHTML = slipID;
  adviceText.innerHTML = "&ldquo;" + slipAdvice + "&rdquo;";
}

function getAdvice() {
  // Get data via Fetch API
  if (window.fetch) {
    fetch(apiURL, { method: 'GET', cache: 'no-cache' })
      .then(response => response.json())
      .then(data => {
        updateHTML(data.slip.id, data.slip.advice);
      })
      .catch(err => console.error(err));
  } else {
    // Get data via XMLHttpRequest (Fallback)
    const sendRequest = (method, url) => {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.onload = () => {
          if (xhr.status >= 400) {
            reject(xhr.response);
          }
          resolve(xhr.response);
        };
        xhr.send();
      });
      return promise;
    };
    const getData = async () => {
      try {
        const response = await sendRequest('GET', apiURL);
        updateHTML(response.slip.id, response.slip.advice);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }
}

diceButton.addEventListener('click', getAdvice, false);

getAdvice();