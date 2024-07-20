chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // реагируем сообщение об изменении URL

  const extension = () => {
    setTimeout(() => {
      const slugs = document.querySelectorAll('.slug-wrap');

      const fetchWeatherAPi = () => {
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=53.53&lon=27.34&appid=fd97a707a1212b3c1e75098d1837ef55',
          {
            method: 'GET',
          }
        )
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
            const weatherTextbox =
              document.querySelectorAll('.weather__textbox');
            weatherTextbox.forEach(
              textboxElem =>
                (textboxElem.innerHTML = `Погода в Минске на сегодня ${Math.round(
                  data.main.temp - 273.15
                )} °C
                  Ощущается как ${Math.round(
                    data.main.feels_like - 273.15
                  )} °C`)
            );
          })
          .catch(err => console.error(err));
      };

      const createWeatherTextbox = parentElem => {
        const weatherTextbox = document.createElement('div');
        weatherTextbox.classList.add('weather__textbox', 'none');
        parentElem.appendChild(weatherTextbox);
      };

      const createWeatherButton = parentElem => {
        const weatherButton = document.createElement('div');
        weatherButton.classList.add('weather__btn');
        createWeatherTextbox(weatherButton);

        weatherButton.addEventListener('click', () => {
          const weatherTextbox =
            weatherButton.querySelector('.weather__textbox');
          weatherTextbox.classList.toggle('none');
        });
        parentElem.appendChild(weatherButton);
      };

      fetchWeatherAPi();

      slugs.forEach(slugElem => {
        createWeatherButton(slugElem);
      });
    }, 2500);
  }

  if (request.message === 'url-changed') {
    extension();
  }

  if (request.message === 'page-refreshed') {
    console.log('Получено сообщение "page-refreshed":', request.url);
    extension();
  }

});

