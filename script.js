function sayfaAc(sayfaId) {
    // Tüm sayfaları gizle
    var sayfalar = document.getElementsByClassName('sayfa-icerik');
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = 'none';
    }

    // Seçilen sayfayı göster
    var secilenSayfa = document.getElementById(sayfaId);
    if (secilenSayfa) {
      // script.js - Satır 12'yi bul ve bu satırla değiştir:
if (sayfaId === 'toplanti' || sayfaId === 'randevular' || sayfaId === 'randevu' || sayfaId === 'arsiv') {

            secilenSayfa.style.display = 'flex';
            secilenSayfa.style.flexDirection = 'column';
            secilenSayfa.style.alignItems = 'center';
        } else {
            secilenSayfa.style.display = 'block';
        }

        // Aylık takvim kontrolü
        if (sayfaId === 'aylik') { 
            aylikPlaniHazirla(); 
        }
    }
}

window.onload = function() {
    // Hafızadan eski notları çağırıyoruz
    var eskiNotlar = localStorage.getItem('notlarim');
    var eskiTamamlananlar = localStorage.getItem('tamamlananlarim');

    if (eskiNotlar) {
        document.getElementById('kayitli-notlar').innerHTML = eskiNotlar;
    }
    if (eskiTamamlananlar) {
        document.getElementById('tamamlanan-notlar').innerHTML = eskiTamamlananlar;
    }

    sayfaAc('gunluk'); // Sayfa açılınca günlük notları göster
};



function notEkle() {
    var notAlani = document.getElementById("not-alani");
    var liste = document.getElementById("kayitli-notlar");

    if (!notAlani || notAlani.value.trim() === "") return;

    var yeniNot = document.createElement("div");
    yeniNot.style = "margin-bottom: 10px; display: flex; align-items: center; background: white; padding: 10px; border-radius: 8px; border: 1px solid #ccc;";
    
    yeniNot.innerHTML = `
        <input type="checkbox" onchange="tamamla(this)" style="margin-right: 10px; width: 20px; height: 20px;">
        <span style="flex-grow: 1;">${notAlani.value}</span>
        <span class="silme-alani"></span>
    `;

    liste.appendChild(yeniNot);
    notAlani.value = "";
    notlariKaydet();
}

function tamamla(eleman) {
    var tamamlananListe = document.getElementById("tamamlanan-notlar");
    var kayitliListe = document.getElementById("kayitli-notlar");
    var notSatiri = eleman.parentElement;
    var silmeAlani = notSatiri.querySelector(".silme-alani");
    notlariKaydet();

    if (eleman.checked) {
        notSatiri.style.textDecoration = "line-through";
        // TİK ATILINCA KIRMIZI ÇARPI GELSİN:
        silmeAlani.innerHTML = `<button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-size: 20px; font-weight:bold; margin-left:10px;">×</button>`;
        tamamlananListe.appendChild(notSatiri);
        notlariKaydet();
    } else {
        notSatiri.style.textDecoration = "none";
        silmeAlani.innerHTML = ""; // Tik kalkarsa çarpı gitsin
        kayitliListe.appendChild(notSatiri);
        notlariKaydet();
    }
}
function toplantiEkle() {
    var konu = document.getElementById("toplanti-konu").value;
    var zaman = document.getElementById("toplanti-zaman").value;
    var liste = document.getElementById("toplanti-listesi");

    if (konu === "" || zaman === "") {
        alert("Lütfen alanları doldurun!");
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

    liste.appendChild(yeniKutu); // İşte bu satır alta ekler!
    
    document.getElementById("toplanti-konu").value = "";
    document.getElementById("toplanti-zaman").value = "";
}

function toplantiTik(checkbox) {
    var silAlani = checkbox.parentElement.querySelector(".t-sil-alani");
    if (checkbox.checked) {
        // TİK ATILINCA ÇARPI GELSİN
        silAlani.innerHTML = `<button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-size: 28px; font-weight:bold; margin-left:10px;">×</button>`;
    } else {
        silAlani.innerHTML = "";
    }
}
// 7. Aylık Planlayıcı
function aylikPlaniHazirla() {
    const takvim = document.getElementById("takvim-kutusu");
    const secilenAy = document.getElementById("ay-secimi").value;
    const secilenYil = document.getElementById("yil-secimi").value;
    
    // ID üzerinden H1 başlığını yakalıyoruz
    const baslik = document.getElementById("dinamik-baslik"); 
    
    if (baslik) {
        // Başlığın içindeki yazıyı değiştirir
        baslik.innerText = secilenAy + " " + secilenYil;
    }

    if (!takvim) return;
    
    takvim.innerHTML = ""; // Sayfayı temizle
    
    for (let i = 1; i <= 30; i++) {
        let kutu = document.createElement("div");
        kutu.style = "border: 2px solid navy; border-radius: 10px; padding: 10px; min-height: 80px; background: white;";
        kutu.innerHTML = `
            <strong style="color: navy;">${i}</strong>
            <textarea style="width:100%; border:none; resize:none; outline:none; font-size:12px;" 
                      placeholder="${secilenAy} notun..."></textarea>`;
        takvim.appendChild(kutu);
    }
}
 function randevuKaydet() {
    var isim = document.getElementById("randevu-isim").value;
    var konu = document.getElementById("randevu-konu").value;
    var zaman = document.getElementById("randevu-zaman").value;
    var liste = document.getElementById("randevu-listesi");

    if (isim === "" || konu === "" || zaman === "") {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    var yeniKutu = document.createElement("div");
    yeniKutu.style = "background: white; border: 2px solid navy; border-radius: 15px; padding: 15px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 600px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);";

    yeniKutu.innerHTML = `
        <div style="text-align: left;">
            <strong style="font-size: 18px; color: navy;">👤 ${isim}</strong><br>
            <span style="font-size: 16px; color: #333;">📝 ${konu}</span><br>
            <span style="font-size: 14px; color: #666;">⏰ ${zaman.replace("T", " ")}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" onchange="randevuTik(this)" style="width: 25px; height: 25px; cursor: pointer;">
            <span class="r-sil-alani"></span>
        </div>
    `;

    liste.appendChild(yeniKutu);

    // Kutuları temizle
    document.getElementById("randevu-isim").value = "";
    document.getElementById("randevu-konu").value = "";
    document.getElementById("randevu-zaman").value = "";
}

function randevuTik(checkbox) {
    var silAlani = checkbox.parentElement.querySelector(".r-sil-alani");
    var kutu = checkbox.parentElement.parentElement;
    if (checkbox.checked) {
        kutu.style.opacity = "0.5";
        kutu.style.textDecoration = "line-through";
        silAlani.innerHTML = `<button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:none; border:none; color:red; cursor:pointer; font-size: 28px; font-weight:bold; margin-left:10px;">×</button>`;
    } else {
        kutu.style.opacity = "1";
        kutu.style.textDecoration = "none";
        silAlani.innerHTML = "";
    }
}
function notlariKaydet() {
    // Listelerin içindeki HTML yapısını alıyoruz
    var yapilacaklar = document.getElementById('kayitli-notlar').innerHTML;
    var tamamlananlar = document.getElementById('tamamlanan-notlar').innerHTML;
    
    // Bunları tarayıcı hafızasına kaydediyoruz
    localStorage.setItem('notlarim', yapilacaklar);
    localStorage.setItem('tamamlananlarim', tamamlananlar);
}
function arsivle(eleman) {
    var arsivListesi = document.getElementById('arsivlenmis-notlar');
    // Notun satırını bulur
    var notSatiri = eleman.parentElement.parentElement; 
    
    // Arşivde çarpı butonunu gizler
    eleman.style.display = "none";
    
    // Notu arşive taşır
    arsivListesi.appendChild(notSatiri);
    
    // Değişikliği hafızaya kaydeder
    notlariKaydet();
}

