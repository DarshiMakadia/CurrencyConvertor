const BASE_URL = "https://v6.exchangerate-api.com/v6/ffb39ee6ea3449ce7b3be904/latest"; 

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }

         select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
 let amount = document.querySelector(".amount input");
 let amtVal = amount.value;

 if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
}

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
 
try{
 let response = await fetch(URL);
 let data = await response.json();

 if (data && data.conversion_rates && data.conversion_rates[toCurr.value]) {
    let rate = data.conversion_rates[toCurr.value];

 let finalAmount = amtVal * rate;

 msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
} else {
    msg.innerText = "Exchange rate not available!";
}
} catch (error){
    msg.innerText = "Error fetching exchange rates!";
    console.error(error);
}
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    
    if(img){
    img.src = newSrc;
    }
};

btn.addEventListener("click", (evt) => {
 evt.preventDefault();
 updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});