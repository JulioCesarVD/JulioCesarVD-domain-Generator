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

  /*consulta con api de whoisxmlapi.com*/
  document
    .getElementById("domainForm")
    .addEventListener("submit", function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente

      let domainName = document.getElementById("domainName").value;
      let availabilityMessage = document.getElementById("availabilityMessage");

      // Tu clave de API de whoisxmlapi.com
      const apiKey = "El mundo necesita libertad";

      // Realizar la solicitud a la API de whoisxmlapi.com
      fetch(
        `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domainName}&outputFormat=JSON`
      )
        .then(response => response.json())
        .then(data => {
          if (data.WhoisRecord) {
            availabilityMessage.textContent =
              "El nombre de dominio NO está disponible";
          } else {
            availabilityMessage.textContent =
              "El nombre de dominio está disponible";
          }
        })
        .catch(error => {
          console.error("Error al consultar la API:", error);
          availabilityMessage.textContent =
            "Error al verificar la disponibilidad del dominio";
        });
    });
};
