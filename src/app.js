/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here

  /*Velocidad del video*/
  let video = document.getElementById("logoVideo");
  video.playbackRate = 0.5;

  /*consulta con api de Dominio.es*/
  document
    .getElementById("domainForm")
    .addEventListener("submit", function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente

      let domainName = document.getElementById("domainName").value;
      let availabilityMessage = document.getElementById("availabilityMessage");

      // Realizar la solicitud a la API de datos.gob.es
      fetch("https://datos.gob.es/apidata/catalog/" + domainName)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          // Aquí necesitas procesar los datos XML. Este es solo un ejemplo.
          let results = data.getElementsByTagName("result");
          if (results.length > 0) {
            availabilityMessage.textContent =
              "El nombre de dominio NO está disponible";
          } else {
            availabilityMessage.textContent =
              "El nombre de dominio está disponible";
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error("Error al consultar la API:", error);
          availabilityMessage.textContent =
            "Error al verificar la disponibilidad del dominio";
        });
    });
};
