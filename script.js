// ================= VARIABLES =================

let totalScans = Number(localStorage.getItem("totalScans")) || 0;
let safeCount = Number(localStorage.getItem("safeCount")) || 0;
let phishingCount = Number(localStorage.getItem("phishingCount")) || 0;

let historyData =
JSON.parse(localStorage.getItem("history")) || [];

document.getElementById("total").innerText = totalScans;
document.getElementById("safe").innerText = safeCount;
document.getElementById("phishing").innerText = phishingCount;

// ================= CHART =================

let ctx = document.getElementById("myChart");

let chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Safe", "Phishing"],
        datasets: [{
            data: [safeCount, phishingCount],
            backgroundColor: [
                "#00e676",
                "#ff1744"
            ]
        }]
    }
});

// ================= URL ANALYSIS =================

function checkURL() {

    let url =
    document.getElementById("urlInput").value.trim();

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

    let score = 0;

    let explanation = [];

    let suspiciousWords = [
        "login",
        "verify",
        "bank",
        "secure",
        "update",
        "signin",
        "paypal",
        "account"
    ];

    suspiciousWords.forEach(word => {

        if (url.toLowerCase().includes(word)) {

            score += 25;

            explanation.push(
                "Contains keyword: " + word
            );
        }

    });

    if (!url.startsWith("https://")) {

        score += 20;

        explanation.push(
            "HTTPS missing"
        );
    }

    if (url.length > 30) {

        score += 20;

        explanation.push(
            "Long URL detected"
        );
    }

    let risk =
    Math.min(score, 100);

    document.getElementById(
        "riskFill"
    ).style.width =
    risk + "%";

    if (score >= 40) {

        phishingCount++;

        result.innerHTML =
        "🔴 PHISHING WEBSITE DETECTED<br>" +
        "Risk Score: " +
        risk +
        "%";

        result.style.color =
        "#ff1744";

    } else {

        safeCount++;

        result.innerHTML =
        "🟢 SAFE WEBSITE<br>" +
        "Risk Score: " +
        risk +
        "%";

        result.style.color =
        "#00e676";
    }

    reason.innerHTML =
    explanation.join("<br>");

    updateDashboard();

    historyData.push({
        url: url,
        result:
        score >= 40 ?
        "Phishing" :
        "Safe"
    });

    localStorage.setItem(
        "history",
        JSON.stringify(historyData)
    );

    showHistory();

}

// ================= DASHBOARD =================

function updateDashboard() {

    document.getElementById("total").innerText =
    totalScans;

    document.getElementById("safe").innerText =
    safeCount;

    document.getElementById("phishing").innerText =
    phishingCount;

    localStorage.setItem(
        "totalScans",
        totalScans
    );

    localStorage.setItem(
        "safeCount",
        safeCount
    );

    localStorage.setItem(
        "phishingCount",
        phishingCount
    );

    chart.data.datasets[0].data = [
        safeCount,
        phishingCount
    ];

    chart.update();

}

// ================= HISTORY =================

function showHistory() {

    let list =
    document.getElementById(
        "historyList"
    );

    list.innerHTML = "";

    historyData
    .slice()
    .reverse()
    .forEach(item => {

        list.innerHTML += `
        <li>
        🌐 ${item.url}
        <br>
        Result: ${item.result}
        </li>
        `;

    });

}

showHistory();

// ================= CLEAR HISTORY =================

function clearHistory() {

    historyData = [];

    localStorage.removeItem(
        "history"
    );

    showHistory();

}

// ================= RESET =================

function resetDashboard() {

    localStorage.clear();

    location.reload();

}

// ================= QR DEMO =================

function scanQR() {

    let qrLink =
    prompt(
        "Enter QR URL"
    );

    if (qrLink) {

        document.getElementById(
            "urlInput"
        ).value =
        qrLink;

        checkURL();

    }

}

// ================= CSV =================

function downloadCSV() {

    let csv =
    "URL,Result\n";

    historyData.forEach(item => {

        csv +=
        item.url +
        "," +
        item.result +
        "\n";

    });

    let blob =
    new Blob([csv]);

    let a =
    document.createElement("a");

    a.href =
    URL.createObjectURL(blob);

    a.download =
    "history.csv";

    a.click();

}

// ================= CLOCK =================

setInterval(() => {

    let time =
    new Date();

    document.getElementById(
        "clock"
    ).innerHTML =
    time.toLocaleTimeString();

}, 1000);

// ================= DARK MODE =================

document.getElementById(
    "themeBtn"
).onclick = function () {

    document.body.classList.toggle(
        "light"
    );

};

// ================= TYPING EFFECT =================

let text =
"Protect Yourself From Phishing Attacks";

let i = 0;

function type() {

    if (i < text.length) {

        document.getElementById(
            "typing"
        ).innerHTML +=
        text.charAt(i);

        i++;

        setTimeout(type, 70);

    }

}

type();