// 1. Sayfalar arası geçişi sağlayan ana fonksiyon
function sayfaAc(sayfaId) {
    var sayfalar = document.getElementsByClassName("sayfa-icerik");
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = "none";
    }

    var secilenSayfa = document.getElementById(sayfaId);
    if (secilenSayfa) {
        secilenSayfa.style.display = "block";
        
        // Eğer aylık butonuna basıldıysa kutuları oluştur
        if (sayfaId === 'aylik') {
            aylikPlaniHazirla();
        }
    }
}

// 2. Günlük Not Ekleme Fonksiyonu
function notEkle() {
    var notAlani = document.getElementById("not-alani");
    var liste = document.getElementById("kayitli-notlar");

    if (!notAlani || !liste || notAlani.value.trim() === "") return;

    var yeniNot = document.createElement("div");
    yeniNot.style.marginBottom = "10px";
    yeniNot.style.fontSize = "18px";
    yeniNot.style.display = "flex";
    yeniNot.style.alignItems = "center";

    // Notun içeriği, checkbox ve silme butonu
    yeniNot.innerHTML = `
        <input type="checkbox" onclick="tamamla(this)" style="transform: scale(1.5); margin-right: 10px;">
        <span style="flex-grow: 1;">${notAlani.value}</span>
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold; margin-left:10px;">X</button>
    `;

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

// 4. Aylık Planlayıcı Kutularını Oluşturan Fonksiyon
function aylikPlaniHazirla() {
    const takvim = document.getElementById("takvim-kutusu");
    if (!takvim) return;

    takvim.innerHTML = ""; // İçini temizle

    for (let i = 1; i <= 30; i++) {
        let kutu = document.createElement("div");
        kutu.style.border = "2px solid navy";
        kutu.style.borderRadius = "10px";
        kutu.style.padding = "10px";
        kutu.style.minHeight = "80px";
        kutu.style.backgroundColor = "white";
        
        kutu.innerHTML = `
            <span style="font-weight: bold; color: navy;">${i}</span>
            <textarea style="width: 100%; border: none; resize: none; outline: none; margin-top: 5px; background: transparent;" placeholder="Not al..."></textarea>
        `;
        takvim.appendChild(kutu);
    }
}
