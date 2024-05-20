/* eslint-disable */
import "bootstrap";
import "./style.css";
import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import "dotenv/config";
require("dotenv").config();
console.log(process.env);

// Función para generar dominios
function generateDomains() {
  let pronoun = ["the", "our"];
  let adj = ["great", "big"];
  let noun = ["jogger", "racoon"];
  let extensions = [".com", ".net", ".us", ".io"];
  let hacks = { es: "pued", it: "cred", in: "log" }; // Añade más "hacks" aquí

  let resultsDiv = document.getElementById("domainResults");
  resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

  // Generar dominios normales
  for (let i = 0; i < pronoun.length; i++) {
    for (let j = 0; j < adj.length; j++) {
      for (let k = 0; k < noun.length; k++) {
        for (let l = 0; l < extensions.length; l++) {
          let domain = `${pronoun[i]}${adj[j]}${noun[k]}${extensions[l]}`;
          resultsDiv.innerHTML += `<p>${domain}</p>`;
        }
      }
    }
  }

  // Generar "domain hacks"
  for (let ext in hacks) {
    for (let i = 0; i < pronoun.length; i++) {
      for (let j = 0; j < adj.length; j++) {
        let domain = `${pronoun[i]}${adj[j]}${hacks[ext]}.${ext}`;
        resultsDiv.innerHTML += `<p>${domain}</p>`;
      }
    }
  }
}

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
      const apiKey = process.env.API_KEY_TEST;
      console.log(`ESTA ES LA API KEY ${apiKey}`);
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

// Exportar la función para que esté disponible globalmente
window.generateDomains = generateDomains;
