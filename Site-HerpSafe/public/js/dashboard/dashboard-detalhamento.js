const nomeUsuario = document.getElementById("nome_usuario");    
nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;


function pegarCapturasTemperatura(numeroSensor) {
    const header = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
            fk_sensor: numeroSensor
        })
    }

    fetch("http://localhost:3333/recinto/pegarCapturasTemperatura", header)
    .then((result) => {
        result.json()
        .then((json) => {
                const sensorTemp = document.getElementById(`temperatura${numeroSensor}`).getContext('2d');

                        new Chart(sensorTemp, {
                type: 'line',
                data: {
                labels: ['1', '2', '3', '4', '5', '6'],
                datasets: [{
                    label: 'Temperatura do Sensor 1',
                    data: [json[0].temperatura, json[1].temperatura, json[2].temperatura,
                            json[3].temperatura, json[4].temperatura, json[5].temperatura
                ],
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
        })
    })

    .catch((error) => {
        console.log("Erro: não foi possível fazer a requisição", error);
    })

}
// Function para pegar as capturas de umidade
function pegarCapturasUmidade(numeroSensor){

  const header = {

    method: "POST",
      headers: {

        "Content-type": "Application/json"

      },

      body: JSON.stringify({

        idRecinto: sessionStorage.ID_RECINTO_INDIVIDUAL,
        fk_sensor: numeroSensor

      })

  }

  fetch ("http://localhost:3333/recinto/pegarCapturasUmidade", header)
  .then((result) => {
    result.json()
    .then((json) => {

        const sensorUmi = document.getElementById(`umidade${numeroSensor}`).getContext(`2d`);

            new Chart(sensorUmi, {

              type: `line`,
              data: {
                labels: [`1`, `2`, `3`, `4`, `5`, `6`],
                datasets: [{

                  lavel: `Umidade do Sensor 1`,
                  data: [json[0].umidade, json[1].umidade, json[2].umidade, json[3].umidade, json[4].umidade, json[5].umidade
                ],
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
    })


  })

    .catch((error) => {

      console.log(`Erro: Não foi possível fazer a requisição`, error);

    })

}

pegarCapturasTemperatura(1);
pegarCapturasTemperatura(2);
pegarCapturasUmidade(1);
pegarCapturasUmidade(2);

// function pegarCapturasUmidade(numeroSensor) {

// }


//    new Chart(sensorUmid1, {
//     type: 'line',
//     data: {
//       labels: ['1', '2', '3', '4', '5', '6'],
//       datasets: [{
//         label: 'Umidade do sensor 1',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//     }]
//     },

//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
