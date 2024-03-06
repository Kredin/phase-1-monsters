let scrollPlace = 0;
const forwardButton = document.querySelector("#forward");
const backButton = document.querySelector("#back");

document.addEventListener("DOMContentLoaded", () => {
  createMonsterForm();
  monsterData();
});

function createMonsterForm() {
  const createMonster = document.querySelector("#create-monster");
  let nameInput = document.createElement("input");
  nameInput.setAttribute("id", "name-input");
  nameInput.setAttribute("placeholder", "Name:");

  let ageInput = document.createElement("input");
  ageInput.setAttribute("id", "age-input");
  ageInput.setAttribute("placeholder", "Age:");

  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("id", "description-input");
  descriptionInput.setAttribute("placeholder", "Description:");

  let btn = document.createElement("button");
  btn.textContent = "Create Monster";
  btn.addEventListener("click", createNewMonster);

  createMonster.appendChild(nameInput);
  createMonster.appendChild(ageInput);
  createMonster.appendChild(descriptionInput);
  createMonster.appendChild(btn);
}

function createNewMonster(e) {
  console.log("clicked!");
  let nameInput = document.querySelector("#name-input").value;
  let ageInput = document.querySelector("#age-input").value;
  let descriptionInput = document.querySelector("#description-input").value;
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      age: ageInput,
      description: descriptionInput,
    }),
  });
}

let monsterData = function loadMonsters() {
  fetch("http://localhost:3000/monsters")
    .then((res) => res.json())
    .then((data) => createMonsterCard(data));
};

function createMonsterCard(data) {
  const monsterContainer = document.querySelector("#monster-container");
  monsterContainer.innerHTML = "";
  console.log(scrollPlace);
  for (i = scrollPlace; i < scrollPlace + 50; i++) {
    let div = document.createElement("div");

    let h2Name = document.createElement("h2");
    h2Name.textContent = data[i].name;

    let h3Age = document.createElement("h3");
    h3Age.textContent = data[i].age;

    let pDescription = document.createElement("p");
    pDescription.textContent = data[i].description;

    div.appendChild(h2Name);
    div.appendChild(h3Age);
    div.appendChild(pDescription);

    monsterContainer.appendChild(div);
  }
}

forwardButton.addEventListener("click", () => {
  scrollPlace += 50;
  console.log(scrollPlace);
  monsterData();
});

backButton.addEventListener("click", () => {
  if (scrollPlace - 50 > -1) {
    scrollPlace -= 50;
    console.log(scrollPlace);
    monsterData();
  }
});
