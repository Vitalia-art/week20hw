document.getElementById('fetchButton').addEventListener('click', function() {
    const resource = document.getElementById('resource').value;
    const id = document.getElementById('id').value;
  
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').textContent = '';
    document.getElementById('result').textContent = '';
  
    // Новый базовый URL для API Swapi
    const baseUrl = 'https://swapi.py4e.com/api/';
    const url = `${baseUrl}${resource}/${id}/`;
  
    console.log(`Fetching data from ${url}`);
    fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      let resultContent = '';
      
      if (resource === 'people') {
        // Для людей
        resultContent = `
          <h2>${data.name}</h2>
          <p><strong>Год рождения:</strong> ${data.birth_year}</p>
          <p><strong>Пол:</strong> ${data.gender}</p>
        `;
      } else if (resource === 'planets') {
        resultContent = `
        <h2>${data.name}</h2>
        <p><strong>Диаметр:</strong> ${data.diameter} км</p>
        <p><strong>Террайн:</strong> ${data.terrain}</p>
      `;
    } else if (resource === 'starships') {
      // Для кораблей
      resultContent = `
        <h2>${data.name}</h2>
        <p><strong>Модель:</strong> ${data.model}</p>
        <p><strong>Пассажиры:</strong> ${data.passengers}</p>
      `;
    } else if (resource === 'films') {
      // Для фильмов
      resultContent = `
        <h2>${data.title}</h2>
        <p><strong>Режиссер:</strong> ${data.director}</p>
        <p><strong>Дата выхода:</strong> ${data.release_date}</p>
      `;
    }
    document.getElementById('result').innerHTML = resultContent;
})
.catch(error => {
  document.getElementById('error').textContent = `Что-то пошло не так: ${error}`;
})
.finally(() => {
  document.getElementById('loading').style.display = 'none';
});
});  