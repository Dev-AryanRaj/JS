document.addEventListener("DOMContentLoaded", () => {
    const textFrom = document.querySelector(".textFrom");
    const textTo = document.querySelector(".textTo");
    const select = document.querySelectorAll("select");
    const translateBtn = document.getElementById("translateButton");


    select.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : (country_code == "hi-IN" ? "selected" : "");
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

    textFrom.addEventListener("keyup", () => {
        if (!textFrom.value) {
            textTo.value = "";
        }
    });

    translateBtn.addEventListener("click", () => {
        let text = textFrom.value.trim(),
            translateFrom = select[0].value,
            translateTo = select[1].value;
        if (!text) {
            return;
        }
        console.log(translateFrom, translateTo)
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data => {
            console.log(data);
            textTo.value = data.responseData.translatedText;
            data.matches.forEach(match => {
                if (match.id === 0) {
                    textTo.value = match.translation;
                }
            });
            textTo.setAttribute("placeholder", "Translation");
        });
    });
});
