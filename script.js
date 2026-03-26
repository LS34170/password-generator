const buttongenerate = document.querySelector("#generate");
const textpassword = document.querySelector("#password");
const container = document.querySelector(".toggle-tab");
const copyIcon = document.querySelector("#icon");

let difficulte = 1;


const consonne = "bcdfghjklmnpqrstvwxyz";
const voyelle = "aeiou";
let password = "";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomChar(charactere) {
        return charactere.charAt(Math.floor(Math.random() * charactere.length));
}

function sylabe(maj, chiffre) {
    let sylabe;
    if (maj) {
        sylabe = getRandomChar(consonne).toUpperCase() + getRandomChar(voyelle) + getRandomChar(consonne);
    } else if(chiffre) {
        sylabe = getRandomChar(consonne) + getRandomChar(voyelle) + getRandomInt(10);

    } else {
        sylabe = getRandomChar(consonne) + getRandomChar(voyelle) + getRandomChar(consonne);

    }
    return sylabe;
}

function groupe(maj, chiffre) {
    let groupe;
    if (maj) {
        if (Math.random() < 0.5) {
        groupe = sylabe(!maj, chiffre) + sylabe(maj, chiffre);
    } else {
        groupe = sylabe(maj, chiffre) + sylabe(!maj, chiffre);
    }
    }
    else if(chiffre) {
         if (Math.random() < 0.5) {
        groupe = sylabe(maj, !chiffre) + sylabe(maj, chiffre);
    } else {
        groupe = sylabe(maj, chiffre) + sylabe(maj, !chiffre);
    }
    }
    return groupe;
}

function multigroupe(difficulte) {
    if (difficulte === 1) {
        password = groupe(true, true);
    } else if (difficulte === 2) {
        password = groupe(true, false) + "-" + groupe(false, true);
    } else if (difficulte === 3) {
        password = groupe(true, false) + "-" + groupe(false, false) + "-" + groupe(false, true);
    } else {
        password = "ho lala";
    }
    return password;
}
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab")) {
    // 🔹 récupérer tous les boutons DANS le container
    const tabs = container.querySelectorAll(".tab");

    // 🔹 reset
    tabs.forEach(tab => tab.classList.remove("active"));

    // 🔹 activer le cliqué
    e.target.classList.add("active");

    console.log(e.target.value);
    difficulte = Number(e.target.value);
    textpassword.innerText = multigroupe(difficulte);

  }
});

buttongenerate.addEventListener("click", () => {
    textpassword.innerText = multigroupe(difficulte);
})

copyIcon.addEventListener("click", async () => {
  const text = textpassword.innerText;

  try {
    await navigator.clipboard.writeText(text);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    console.log("Copié !");
  } catch (err) {
    console.error("Erreur de copie", err);
  }
});

textpassword.innerText = multigroupe(difficulte);
