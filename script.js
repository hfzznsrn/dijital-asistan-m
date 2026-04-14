// 1. Sayfa // 1. Sayfa yüklendiğinde notları açar
window.onload = function() {
    sayfaAc('gunluk');
};

// 2. Sayfa değiştirme fonksiyonu
function sayfaAc(sayfaId) {
    var sayfalar = document.getElementsByClassName('sayfa-icerik');
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = 'none';
    }
    
    var secilenSayfa = document.getElementById(sayfaId);
    if (secilenSayfa) {
        if (sayfaId === 'toplanti') {
            secilenSayfa.style.display = 'flex';
            secilenSayfa.style.flexDirection = 'column';
            secilenSayfa.style.alignItems = 'center';
        } else {
            secilenSayfa.style.display = 'block';
        }
        
        if (sayfaId === 'aylik') {
            aylikPlaniHazirla();
        }
    }
}

// 3. Günlük Not Ekleme
function notEkle() {
    var notAlani = document.getElementById("not-alani");
    var liste = document.getElementById("kayitli-notlar");

    if (!notAlani || !liste || notAlani.value.trim() === "") return;

    var yeniNot = document.createElement("div");
    yeniNot.style = "margin-bottom: 10px; display: flex; align-items: center; background: white; padding: 10px; border-radius: 8px; border: 1px solid #ccc;";
    
    // Yapılacaklarda çarpı yok, sadece checkbox var
    yeniNot.innerHTML = `
        <input type="checkbox" onchange="tamamla(this)" style="transform: scale(1.5); margin-right: 10px; cursor: pointer;">
        <span style="flex-grow: 1; font-size: 18px;">${notAlani.value}</span>
        <span class="silme-alani"></span>
    `;

    liste.appendChild(yeniNot);
    notAlani.value = "";
}

// 4. Notu Tamamlananlara Taşıma ve Çarpı Ekleme
function tamamla(eleman) {
    var kayitliListe = document.getElementById("kayitli-notlar");
    var tamamlananListe = document.getElementById("tamamlanan-notlar");
    var notSatiri = eleman.parentElement;
    var silmeAlani = notSatiri.querySelector(".silme-alani");

    if (eleman.checked) {
        // Tamamlananlara taşı ve ÇARPI butonunu ekle
        notSatiri.style.textDecoration = "line-through";
        notSatiri.style.color = "gray";
        silmeAlani.innerHTML = `<button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-size: 20px; font-weight:bold; margin-left:10px;">×</button>`;
        tamamlananListe.appendChild(notSatiri);
    } else {
        // Geri alırsan çarpıyı kaldır ve yapılacaklara taşı
        notSatiri.style.textDecoration = "none";
        notSatiri.style.color = "black";
        silmeAlani.innerHTML = "";
        kayitliListe.appendChild(notSatiri);
    }
}

// 5. Toplantı Ekleme
function toplantiEkle() {
    var konu = document.getElementById("toplanti-konu").value;
    var zaman = document.getElementById("toplanti-zaman").value;
    var liste = document.getElementById("toplanti-listesi");

    if (konu === "" || zaman === "" || !liste) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    var yeniKutu = document.createElement("div");
    yeniKutu.style = "background: white; border: 2px solid #333; border-radius: 15px; padding: 15px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 600px;";

    yeniKutu.innerHTML = `
        <div style="text-align: left;">
            <strong style="font-size: 18px; color: navy;">${konu}</strong><br>
            <span style="font-size: 14px; color: #666;">📅 ${zaman.replace("T", " ")}</span>
        </div>
        <div style="display: flex; align-items: center;">
            <input type="checkbox" onchange="toplantiTik(this)" style="width: 25px; height: 25px; cursor: pointer;">
            <span class="t-sil-alani"></span>
        </div>
    `;

    liste.appendChild(yeniKutu);
    document.getElementById("toplanti-konu").value = "";
    document.getElementById("toplanti-zaman").value = "";
}

// 6. Toplantı Tik Atılınca Çarpı Çıkması
function toplantiTik(checkbox) {
    var silAlani = checkbox.parentElement.querySelector(".t-sil-alani");
    if (checkbox.checked) {
        silAlani.innerHTML = `<button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-size: 28px; font-weight:bold; margin-left:10px;">×</button>`;
    } else {
        silAlani.innerHTML = "";
    }
}

// 7. Aylık Planlayıcı
function aylikPlaniHazirla() {
    const takvim = document.getElementById("takvim-kutusu");
    if (!takvim) return;
    takvim.innerHTML = ""; 
    for (let i = 1; i <= 30; i++) {
        let kutu = document.createElement("div");
        kutu.style = "border: 2px solid navy; border-radius: 10px; padding: 10px; min-height: 80px; background: white;";
        kutu.innerHTML = `<strong>${i}</strong><textarea style="width:100%; border:none; resize:none; outline:none; font-size:12px;"></textarea>`;
        takvim.appendChild(kutu);
    }
}
