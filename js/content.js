chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const extension = () => {
    setTimeout(() => {
      const slugs = document.querySelectorAll('.slug-wrap');

      const latitude = 53.53;
      const longtitude = 27.34;

      // Получение данных о погоде в Минске
      const fetchWeatherAPi = () => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=fd97a707a1212b3c1e75098d1837ef55`,
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

      // Создание блока с текстовым сообщением
      const createWeatherTextbox = parentElem => {
        const weatherTextbox = document.createElement('div');
        weatherTextbox.classList.add('weather__textbox', 'none');
        parentElem.appendChild(weatherTextbox);
      };

      // Создание кнопки на плашке с новостями
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
  };

  // Обработка сообщений полученных с service_worker
  if (request.message === 'url-changed' || request.message === 'page-refreshed') {
    extension();
  }
});
