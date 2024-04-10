const formData = document.getElementById("taxForm");

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  const annualIncome =
    parseFloat(document.getElementById("annualIncome").value) || 0;
  const extraIncome =
    parseFloat(document.getElementById("extraIncome").value) || 0;
  const age = document.getElementById("ageGroup").selectedOptions[0].value || 0;
  const deductions =
    parseFloat(document.getElementById("applicableDeductions").value) || 0;

  const errorMessages = document.querySelectorAll(".errorMsg");
  errorMessages.forEach((errorMsg) => {
    errorMsg.style.visibility = "hidden";
  });

  let hasError = false;
  if (!annualIncome) {
    displayErrorMessage("annualIncome");
    hasError = true;
  }
  if (extraIncome < 0) {
    displayErrorMessage("extraIncome");
    hasError = true;
  }
  if (!age) {
    displayErrorMessage("ageGroup");
    hasError = true;
  }
  if (deductions < 0) {
    displayErrorMessage("applicableDeductions");
    console.log("deductions ", deductions);
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const tax = calculateTax(age, annualIncome, extraIncome, deductions);
  document.getElementById("myModal").style.display = "flex";
  const result = document.getElementById("result");
  const incomeAfterTax = annualIncome + extraIncome - deductions - tax;
  const resultText = `<p class="heading">Your Overall Income will be</p> ${formatIndianNumber(
    incomeAfterTax
  )} <p class='description'>after tax deduction.</p>`;
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = resultText;
});

function displayErrorMessage(elementId, visibility) {
  const errorMsg = document.querySelector(`#${elementId} ~ .errorMsg`);
  errorMsg.style.visibility = visibility || "visible";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("myModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
  window.location.reload();
});

function calculateTax(age, annualIncome, extraIncome, deductions) {
  const INCOME = annualIncome + extraIncome - deductions;

  if (INCOME <= 800000) {
    return 0;
  } else {
    let taxableAmount = INCOME - 800000;
    console.log(age)
    if (age==1) {
      console.log("12");
      return taxableAmount * 0.3;
    } else if (age ==2) {
      console.log("1234");

      return taxableAmount * 0.4;

    } else {
      console.log("123456");

      return taxableAmount * 0.1;
    }
  }
}

function formatIndianNumber(tax) {
  const suffixes = ["", "Lakh", "Crore"];
  let i = 0;

  while (tax >= 100000) {
    tax /= 100000;
    i++;
  }

  if (i > 0) {
    return `${tax.toFixed(1)} ${suffixes[i]}`;
  } else {
    return `${tax.toFixed(2)} ${suffixes[i]}`;
  }
}


function validateInput(elementId) {
  var input = document.getElementById(elementId).value.trim(); // Trim whitespace

  if (input === "") {
    console.log("Input is empty");
    return; // Exit the function if input is empty
  }

  // Check if input matches a valid number format
  var isValidNumber = /^-?\d*\.?\d+(?:e[+-]?\d+)?$/.test(input);

  if (!isValidNumber) {
    displayErrorMessage(elementId);
    hasError = true;
  } else {
    displayErrorMessage(elementId, "hidden");
  }
}
