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
        <span style="flex-grow: 1;">${notAlani.value}</span>
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

    }
}
function aylikPlaniHazirla() {
    const takvim = document.getElementById("takvim-kutusu");
    if (!takvim) return;

    takvim.innerHTML = ""; // İçini her seferinde temizle ki üst üste binmesin

    // 1'den 30'a kadar döngü kuruyoruz
    for (let i = 1; i <= 30; i++) {
        let kutu = document.createElement("div");
        
        // Kutuların görünüşü (Navy çerçeve ve beyaz arka plan)
        kutu.style.border = "2px solid navy";
        kutu.style.borderRadius = "10px";
        kutu.style.padding = "10px";
        kutu.style.minHeight = "80px";
        kutu.style.backgroundColor = "white";
        kutu.style.display = "flex";
        kutu.style.flexDirection = "column";

        // İçine gün numarasını (i) ve not alanını yerleştiriyoruz
        kutu.innerHTML = `
            <span style="font-weight: bold; color: navy; font-size: 16px;">${i}</span>
            <textarea style="width: 100%; border: none; resize: none; outline: none; margin-top: 5px; background: transparent;" placeholder="Not al..."></textarea>
        `;
        
        takvim.appendChild(kutu);
    }
}
