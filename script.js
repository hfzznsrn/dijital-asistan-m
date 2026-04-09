// 1. Sayfalar arası geçişi sağlayan fonksiyon
function sayfaAc(sayfaId) {
    var sayfalar = document.getElementsByClassName("sayfa-icerik");
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = "none";
    }
    var secilenSayfa = document.getElementById(sayfaId);
    if (secilenSayfa) {
        secilenSayfa.style.display = "block";
    }
}

// 2. Not ekleme fonksiyonu
function notEkle() {
    var notAlani = document.getElementById("not-alani");
    var liste = document.getElementById("kayitli-notlar");
    
    if (!notAlani || !liste || notAlani.value.trim() === "") {
        return;
    }

    var yeniNot = document.createElement("div");
    yeniNot.style.marginBottom = "10px";
    yeniNot.style.fontSize = "18px";
    yeniNot.style.display = "flex";
    yeniNot.style.alignItems = "center";

    yeniNot.innerHTML = `
        <input type="checkbox" onclick="tamamla(this)" style="transform: scale(1.5); margin-right: 10px;">
        <span>${notAlani.value}</span>
    `;

    liste.appendChild(yeniNot);
    notAlani.value = ""; // Kutuyu temizle
}

// 3. Notu tamamlananlar kısmına taşıyan fonksiyon
function tamamla(eleman) {
    var kayitliListe = document.getElementById("kayitli-notlar");
    var tamamlananListe = document.getElementById("tamamlanan-notlar");
    var notSatiri = eleman.parentElement;

    if (eleman.checked) {
        tamamlananListe.appendChild(notSatiri);
        notSatiri.style.textDecoration = "line-through";
        notSatiri.style.color = "gray";
    } else {
        kayitliListe.appendChild(notSatiri);
        notSatiri.style.textDecoration = "none";
        notSatiri.style.color = "black";
    }
}
