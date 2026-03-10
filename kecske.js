const KECSKE = "kepek/kecske2.png";
const KAPOSZTA = "kepek/kaposzta.png";
const FARKAS = "kepek/farkas.png";

const BALLISTA = [KECSKE, KAPOSZTA, FARKAS];
const CSONAKLISTA = [];
const JOBBLISTA = [];

let csonakBalon = true;


/*megfogom a html dom elemeket*/
const balpart = document.querySelector("#bal p");
const jobbpart = document.querySelector("#jobb p");
const csonakElem = document.querySelector("#csonak");

function megjelenit(lista = [], szuloelem, hely = "") {
  /* a program aktuális állapotát jelenít meg*/
  let htmlszoveg = "";
  for (let index = 0; index < lista.length; index++) {
    htmlszoveg += `<img src="${lista[index]}" id=${hely}_${index}">`;
  }

  szuloelem.innerHTML = htmlszoveg;
}
function init() {
  megjelenit(BALLISTA, balpart, "b");
  megjelenit(JOBBLISTA, jobbpart, "j");
  megjelenit(CSONAKLISTA, csonakElem, "cs");
  esemenykezelo();
}
init();
function esemenykezelo() {
  const KEPELEMEK = document.querySelectorAll("img");

  for (let index = 0; index < KEPELEMEK.length; index++) {

    KEPELEMEK[index].addEventListener("click", function (event) {

      let hely = event.target.id.split("_")[0];
      let i = Number(event.target.id.split("_")[1]);

      switch (hely) {

        case "b":
          if (csonakBalon && CSONAKLISTA.length === 0) {
            CSONAKLISTA.push(BALLISTA[i]);
            BALLISTA.splice(i, 1);
          }
          break;

        case "cs":
          if (CSONAKLISTA.length> 0) {

            if (csonakBalon){
             JOBBLISTA.push(CSONAKLISTA[i]);   
            }else {
            BALLISTA.push(CSONAKLISTA[i]);
          }
          CSONAKLISTA.splice(i, 1);
          csonakBalon = !csonakBalon;
        }
          break;

        case "j":
          if (!csonakBalon && CSONAKLISTA.length === 0) {
            CSONAKLISTA.push(JOBBLISTA[i]);
            JOBBLISTA.splice(i, 1);
          }
          break;
      }

      init();
    });
  }
}