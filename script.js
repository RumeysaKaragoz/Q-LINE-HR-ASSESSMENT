// Sorular
const sorular = [
    {
        soru: "JavaScript tek thread (single-threaded) çalışmasına rağmen kullanıcı arayüzü neden donmaz?",
        secenekler: [
            "Çünkü aynı anda birden fazla thread çalıştırır",
            "Çünkü Event Loop ve Web API’ler arka planda işleri yönetir",
            "Çünkü tarayıcı kodu paralel çalıştırır",
            "Çünkü CSS yükü azaltır"
        ],
        dogruCevap: 1
    },
    {
        soru: "Aşağıdaki kodda çıktı sırası ne olur?\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
        secenekler: [
            "1 - 2 - 3",
            "3 - 1 - 2",
            "2 - 1 - 3",
            "1 - 3 - 2"
        ],
        dogruCevap: 3
    },
    {
        soru: "Bir değişken 'undefined' ise bu genellikle ne anlama gelir?",
        secenekler: [
            "Değişken hiç oluşturulmamıştır",
            "Değişken tanımlanmış ama değer atanmamıştır",
            "Değişken null’dur",
            "Bellek dolmuştur"
        ],
        dogruCevap: 1
    },
    {
        soru: "Tarayıcı bir web sayfasını yüklerken hangi sırayla işler?",
        secenekler: [
            "HTML → DOM oluşturma → CSS parse → Render",
            "CSS → HTML → JavaScript → DOM",
            "JavaScript → CSS → HTML",
            "Önce görseller, sonra HTML"
        ],
        dogruCevap: 0
    }
];


const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const questionNumber = document.getElementById("question-number");
const scoreBoard = document.getElementById("score-board");
const finalScore = document.getElementById("final-score");

let soruIndex = 0;
let puan = 0;

// Başlangıç ekranı
startScreen.addEventListener("click", () => {

    if (!startScreen.classList.contains("active")) return;

    soruIndex = 0;
    puan = 0;

    ekranDegistir(startScreen, quizScreen);

    setTimeout(() => {
        soruyuGoster();
    }, 400);
});

// Soruyu ekrana Göster
function soruyuGoster() {

    const aktifSoru = sorular[soruIndex];

    questionText.textContent = aktifSoru.soru;
    questionNumber.textContent = `Soru ${soruIndex + 1} / ${sorular.length}`;
    scoreBoard.textContent = `Puan: ${puan}`;

    optionsContainer.innerHTML = "";

    aktifSoru.secenekler.forEach((secenek, index) => {

        const btn = document.createElement("button");
        btn.textContent = secenek;
        btn.classList.add("option-btn");

        btn.addEventListener("click", () => {
            cevabiKontrolEt(index);
        });

        optionsContainer.appendChild(btn);
    });
}
//kontrol
function cevabiKontrolEt(secilen) {

    const dogru = sorular[soruIndex].dogruCevap;

    if (secilen === dogru) {
        puan += 25;
    }

    soruIndex++;

    if (soruIndex < sorular.length) {
        soruyuGoster();
    } else {
        sinaviBitir();
    }
}

function sinaviBitir() {

    quizScreen.classList.remove("active");
    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");
    resultScreen.classList.add("active");

    finalScore.textContent = `${puan} / 100`;
}

// Ekran geçişinin fonksiyonu
function ekranDegistir(eski, yeni) {

    eski.classList.remove("active");
    eski.classList.add("exit-up");

    setTimeout(() => {

        eski.classList.remove("exit-up");
        eski.classList.add("hidden");

        yeni.classList.remove("hidden");
        yeni.classList.add("active");

    }, 400);
}
