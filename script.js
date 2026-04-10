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
    
    // Eğer kutu boşsa veya hedef liste bulunamadıysa işlem yapma
    if (!notAlani || !liste || notAlani.value.trim() === "") {
        return;
    }

    var yeniNot = document.createElement("div");
    yeniNot.style.marginBottom = "10px";
    yeniNot.style.fontSize = "18px";
    yeniNot.style.display = "flex";
    yeniNot.style.alignItems = "center";

    // Notun içeriği ve onay kutusu
    yeniNot.innerHTML = `
        <input type="checkbox" onclick="tamamla(this)" style="transform: scale(1.5); margin-right: 10px;">
        <span style="flex-grow: 1;">$
        {notAlani.value}</span>
        <button onclick="this.parentElement.remove()"
        style="background: none border: none; color: red; cursor:pointer; font-weight: bold;margin-left: 10px;">X</button>
        `;

    // Notu listeye ekle ve yazı alanını temizle
    liste.appendChild(yeniNot);
    notAlani.value = "";
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
