const nomeUsuario = document.getElementById("nome_usuario");    
nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;

const sensorTemp1 = document.getElementById("temperatura1");
const sensorUmid1 = document.getElementById("umidade1");
const sensorTemp2 = document.getElementById("temperatura2");
const sensorUmid2 = document.getElementById("umidade2");


  new Chart(sensorTemp1, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Temperatura do Sensor 1',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
    }]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

   new Chart(sensorTemp2, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Temperatura do Sensor 2',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
    }]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

   new Chart(sensorUmid1, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Umidade do sensor 1',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
    }]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  
   new Chart(sensorUmid2, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [{
        label: 'Umidade do sensor 2',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
    }]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });