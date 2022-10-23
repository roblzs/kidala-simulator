const titleComponent = document.getElementById("title");
const optionComponent = document.getElementById("options");
const notificationComponent = document.getElementById("notification");
const cashText = document.getElementById("cash");
const repText = document.getElementById("rep");
const scoreCard = document.getElementById("score");

let playing = false;
let jobAccepted = false;
let notifSent = false;
let dealValue = 0;
let rep = 0;
let money = 0;
let dealDone = false;

const handlePlay = () => {
  playing = true;
  titleComponent.classList.add("hidden");
  scoreCard.classList.remove("hidden");
};

const acceptJob = () => {
  jobAccepted = true;
  notificationComponent.classList.add("hidden");
  showOptions();
};

const declineJob = () => {
  jobAccepted = false;
  notificationComponent.classList.add("hidden");
};

const showNotification = () => {
  notifSent = true;

  notificationComponent.removeChild(notificationComponent.lastChild);

  const streets = [
    "Ābeļu",
    "Skolas",
    "Ozolciema",
    "Jenkem",
    "Ogres",
    "Kroņu",
    "Lupīnu",
    "Buļļu",
    "Tu jau zini",
  ];

  const streetName = streets[randomIntFromInterval(0, streets.length - 1)];

  dealValue = randomIntFromInterval(5, 240);

  const text = `You have a new deal worth ${dealValue}$ on ${streetName} street`;

  const notifText = document.createElement("p");

  notifText.innerHTML = text;

  notificationComponent.appendChild(notifText);

  notificationComponent.classList.remove("hidden");
};

const showOptions = () => {
  const initiators = [
    "Yo vecīt",
    "Yo tu tas pacans",
    "Yo",
    "Sveiks, tu esi tas džeks, kurš man te nometīs stafu?",
    "Sveiki",
    "Kura no jums ir signe?",
    "Kurš no jums ir benārs?",
  ];

  const followUps = [
    "Es vēlos nopirkt marihuānu",
    "Tev marihuana ir?",
    "O centr xd?",
    "A kurš no jums ir cigārs",
    "Samīļo mani ja tu mani mīli xd",
    "Varētu man lūdzu 2 bauskas aliņus pls xd",
    "Bo zep?",
    "Dvj pa bracki iedod džekam 2o",
    "Vari iedot 2o uz ZV konci?",
    "Man lūdzu 2 gramus scooby snacks spaisa",
    "Tu vakar maksimā raudāji?",
  ];

  const initiator = initiators[randomIntFromInterval(0, initiators.length - 1)];
  const followUp = followUps[randomIntFromInterval(0, followUps.length - 1)];

  const initiatorP = document.createElement("p");
  const followUpP = document.createElement("p");

  initiatorP.innerHTML = `Client - ${initiator}`;
  followUpP.innerHTML = `Client - ${followUp}`;

  optionComponent.appendChild(initiatorP);
  optionComponent.appendChild(followUpP);

  const options = [
    "Appisiens",
    "Safe deal",
    "Bļēē sorry vecīt, aizmirsu stafāru",
    "Es klausos ziedu viju XD",
    "Nazis",
    "Stroķis",
  ];

  for (let i = 0; i < 3; i++) {
    const opt = options[randomIntFromInterval(0, options.length - 1)];

    const docEl = document.createElement("button");

    docEl.innerHTML = opt;
    docEl.classList.add("option");
    docEl.id = `option${i}`;

    optionComponent.appendChild(docEl);
  }

  optionComponent.classList.remove("hidden");

  const option1Button = document.getElementById("option0");
  const option2Button = document.getElementById("option1");
  const option3Button = document.getElementById("option2");

  let clicked = false;

  option1Button.addEventListener("click", () => {
    if (!clicked) {
      handleOptClick(option1Button.innerHTML);
      clicked = true;
    }
  });
  option2Button.addEventListener("click", () => {
    if (!clicked) {
      handleOptClick(option2Button.innerHTML);
      clicked = true;
    }
  });
  option3Button.addEventListener("click", () => {
    if (!clicked) {
      handleOptClick(option3Button.innerHTML);
      clicked = true;
    }
  });
};

const handleOptClick = (val) => {
  let imgSource = "./appisiens.png";
  let repDiff = 0;
  let cashDiff = dealValue;

  switch (val) {
    case "Appisiens":
      imgSource = "./appisiens.png";
      repDiff -= 15;
      break;
    case "Safe deal":
      imgSource = "./safe-deal.png";
      cashDiff = Math.floor(dealValue / 1.3);
      repDiff += 20;
      break;
    case "Bļēē sorry vecīt, aizmirsu stafāru":
      imgSource = "./forgor.png";
      cashDiff = 0;
      repDiff -= 10;
      break;
    case "Nazis":
      imgSource = "./nazis.png";
      repDiff -= 20;
      break;
    case "Stroķis":
      imgSource = "./strokis.png";
      repDiff -= 25;
      break;
    case "Es klausos ziedu viju XD":
      imgSource = "./ziedu-vija.webp";
      repDiff += 50;
      cashDiff = 0;
      break;
  }

  money += cashDiff;
  rep += repDiff;

  const imgComp = document.createElement("img");
  imgComp.src = imgSource;

  optionComponent.appendChild(imgComp);

  cashText.innerHTML = `Cash: ${money}$`;
  repText.innerHTML = `Rep: ${rep}`;

  const pRep = document.createElement("h3");
  const pCash = document.createElement("h3");

  pRep.innerHTML = `${repDiff > 0 ? "+" : ""}${repDiff} rep`;
  pCash.innerHTML = `+${cashDiff}$`;

  optionComponent.appendChild(pRep);
  optionComponent.appendChild(pCash);

  setTimeout(() => {
    jobAccepted = false;
    notifSent = false;
    optionComponent.classList.add("hidden");
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
    optionComponent.removeChild(optionComponent.lastChild);
  }, 3000);
};

setInterval(() => {
  if (playing && !jobAccepted && !notifSent) {
    showNotification();
  }
}, 5000 - rep * 10);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
