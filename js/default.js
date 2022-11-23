const adviceNumber = document.getElementById('advice-number');
const adviceText = document.getElementById('advice-quote');
const diceButton = document.querySelector('.dice-button');

function getAdvice() {
  // Get data via Fetch API
  if (window.fetch) {
    fetch('https://api.adviceslip.com/advice', { method: 'GET', cache: 'no-cache' })
      .then(response => response.json())
      .then(response => {
        adviceNumber.innerHTML = response.slip.id;
        adviceText.innerHTML = "&ldquo;" + response.slip.advice + "&rdquo;";
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
        const response = await sendRequest('GET', 'https://api.adviceslip.com/advice');
        adviceNumber.innerHTML = response.slip.id;
        adviceText.innerHTML = "&ldquo;" + response.slip.advice + "&rdquo;";
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }
}

diceButton.addEventListener('click', getAdvice, false);

getAdvice();