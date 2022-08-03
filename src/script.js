const form = document.getElementById("form");
const fullName = document.getElementById("fullName");
const privateNumber = document.getElementById("privateNumber");
const lottoNumber = document.getElementById("lottoNumber");
const formControl = document.querySelectorAll(".form-control");
const sectionTickets = document.querySelector(".section-tickets");
const winnerNumbers = document.querySelector(".winner-numbers");
const checkWinner = document.querySelector(".check-winner");
const userWinner = document.querySelector(".winner-user");

//-----------------------------Check winner-------------------------------
let ticketArr = [];
let winnerNumbersArr = [...Array(7)].map(() => ~~(Math.random() * 49 + 1));
winnerNumbers.innerHTML = ` <p>Winner Numbers: ${winnerNumbersArr}</p>`;
winnerNumbersArr = winnerNumbersArr.sort((a, b) => a - b);

function checkBtn() {
  let newArr = [];
  ticketArr.forEach((item) =>
    newArr.push(item.userLottoNumber.split(",").map(Number))
  );
  newArr.map((item) => item.sort((a, b) => a - b));

  let winnerArr = [];
  const equals = (a, b) => JSON.stringify(a) == JSON.stringify(b);
  newArr.forEach(
    (item) =>
      equals(item, winnerNumbersArr) &&
      winnerArr.push(ticketArr[newArr.indexOf(item)].userName) &&
      document
        .querySelectorAll(".user-ticket")
        [newArr.indexOf(item)].classList.add("winner")
  );
  if (winnerArr.length === 0) {
    userWinner.innerHTML = `<p class="no-winner">No Winner</p>`;
  } else {
    userWinner.innerText = "";
    winnerArr.forEach((item) => {
      userWinner.innerHTML += `<p class='is-winner'>Winner is: ${item}</p>`;
    });
  }
}
checkWinner.addEventListener("click", checkBtn);
//------------------------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const fullNameValue = fullName.value.trim();
  const privateNumberValue = privateNumber.value.trim();
  const lottoNumberValue = lottoNumber.value.trim();

  fullNameValue === "" || !fullNameValue.includes(" ")
    ? setErrorFor(fullName, "შეიყვანეთ სწორად,სახელი და გვარი")
    : setSaccessFor(fullName);

  privateNumberValue === "" || privateNumberValue.length != 11
    ? setErrorFor(privateNumber, "პირადი ნომერი უნდა შედგებოდეს 11 ციფრისაგან")
    : setSaccessFor(privateNumber);

  lottoNumberValue === ""
    ? setErrorFor(lottoNumber, "შეიყვანეთ ლოტოს ციფრები")
    : setSaccessFor(lottoNumber);

  if (
    [...formControl].every(
      (item) => item.getAttribute("class") == "form-control success"
    )
  ) {
    ticketArr.push({
      userName: fullNameValue,
      userPrivateNumber: privateNumberValue,
      userLottoNumber: lottoNumberValue,
    });

    fullName.value = "";
    privateNumber.value = "";
    lottoNumber.value = "";

    sectionTickets.innerHTML += `<div class='user-ticket'>
      <p class="ticket-head">Ticket  ${ticketArr.length}</p>
      <div class="ticket">
      <h4>Full Name:</h4>
      <p> ${ticketArr[ticketArr.length - 1].userName}</p>
      </div>

      <div class="ticket">
      <h4>Private Number:</h4>
      <p>  ${ticketArr[ticketArr.length - 1].userPrivateNumber}</p>
      </div>

      <div class="ticket">
      <h4>Lotto Numbers:</h4>
      <p>  ${ticketArr[ticketArr.length - 1].userLottoNumber}</p>
      </div>
      </div>`;
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".error_message");
  errorMessage.innerText = message;
  formControl.className = "form-control error";
}

function setSaccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  return true;
}
