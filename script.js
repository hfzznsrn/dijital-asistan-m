// 1. Sayfalar arası geçişi sağlayan fonksiyon
function sayfaAc(sayfaId) {
    var sayfalar = document.getElementsByClassName("sayfa-icerik");
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = "none";
    }
    document.getElementById(sayfaId).style.display = "block";
}

// 2. Not ekleme fonksiyonu
function notEkle() {
    // BURAYA EKLEDİK: Test için uyarı kutusu
    alert("Butona basıldı, fonksiyon çalışıyor!"); 

    var notMetni = document.getElementById("not-alani").value;
    if (notMetni === "") return;

    var liste = document.getElementById("kayitli-notlar");
    var yeniNot = document.createElement("div");
    yeniNot.style.marginBottom = "10px";
    yeniNot.style.fontSize = "18px";

    yeniNot.innerHTML = `
        <input type="checkbox" onclick="tamamla(this)" style="transform: scale(1.5); margin-right: 10px;">
        <span>${notMetni}</span>
    `;

    liste.appendChild(yeniNot);
    document.getElementById("not-alani").value = "";
}

// 3. Notu tamamlananlar kısmına taşıyan fonksiyon (Buradan aşağısı aynı kalsın)
