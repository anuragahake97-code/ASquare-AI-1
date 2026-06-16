let totalScans = 0;
let safeCount = 0;
let phishingCount = 0;

function checkURL() {

    let url =
    document.getElementById("urlInput").value.toLowerCase();

    let result =
    document.getElementById("result");

    let reason =
    document.getElementById("reason");

    if (url === "") {

        result.innerHTML =
        "⚠ Please enter a URL";

        return;

    }

    totalScans++;

    let suspiciousWords = [
        "login",
        "verify",
        "bank",
        "secure",
        "paypal",
        "account"
    ];

    let phishing = false;

    let explanation = [];

    suspiciousWords.forEach(word => {

        if (url.includes(word)) {

            phishing = true;

            explanation.push(
                "Contains suspicious keyword: " + word
            );

        }

    });

    if (phishing) {

        phishingCount++;

        result.innerHTML =
        "🔴 PHISHING WEBSITE DETECTED";

        result.style.color =
        "red";

    }

    else {

        safeCount++;

        result.innerHTML =
        "🟢 SAFE WEBSITE";

        result.style.color =
        "lime";

        explanation.push(
            "No suspicious keywords found"
        );

    }

    reason.innerHTML =
    explanation.join("<br>");

    document.getElementById(
        "total"
    ).innerHTML = totalScans;

    document.getElementById(
        "safe"
    ).innerHTML = safeCount;

    document.getElementById(
        "phishing"
    ).innerHTML = phishingCount;

}
