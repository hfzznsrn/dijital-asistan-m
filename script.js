window.onload = function() {
    sayfaAc('gunluk'); 
};

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
        } else if (sayfaId === 'aylik') {
            secilenSayfa.style.display = 'block';
            aylikPlaniHazirla(); // Aylık sayfasına basınca kutuları otomatik yapar
        } else {
            secilenSayfa.style.display = 'block';
        }
    }
}
function notEkle() {
    var notAlani = document.getElementById("not-alani");
    var liste = document.getElementById("kayitli-notlar");

    if (!notAlani || notAlani.value.trim() === "") return;

    var yeniNot = document.createElement("div");
    yeniNot.style = "margin-bottom: 10px; display: flex; align-items: center; background: white; padding: 10px; border-radius: 8px; border: 1px solid #ccc;";
    
    yeniNot.innerHTML = `
        <input type="checkbox" onchange="notuTamamla(this)" style="margin-right: 10px; width: 20px; height: 20px;">
        <span style="flex-grow: 1;">${notAlani.value}</span>
    `;

    liste.appendChild(yeniNot);
    notAlani.value = "";
}

function notuTamamla(checkbox) {
    var tamamlananlar = document.getElementById("tamamlanan-notlar");
    if (checkbox.checked) {
        var satir = checkbox.parentElement;
        satir.style.textDecoration = "line-through";
        satir.style.opacity = "0.5";
        tamamlananlar.appendChild(satir);
    }
}
function aylikPlaniHazirla() {
    var takvim = document.getElementById("takvim-kutusu");
    if (!takvim) return;
    
    takvim.innerHTML = ""; // Sayfayı her açtığında sıfırlar, üst üste binmez
    for (let i = 1; i <= 30; i++) {
        var gunKutusu = document.createElement("div");
        gunKutusu.style = "border: 2px solid navy; border-radius: 10px; padding: 8px; min-height: 100px; background: white; display: flex; flex-direction: column;";
        
        gunKutusu.innerHTML = `
            <span style="font-weight: bold; color: navy;">${i}</span>
            <textarea style="width: 100%; height: 100%; border: none; resize: none; font-size: 12px; margin-top: 5px;" placeholder="Not al..."></textarea>
        `;
        takvim.appendChild(gunKutusu);
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
    yeniKutu.style = "background: white; border: 2px solid #333; border-radius: 15px; padding: 15px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; width: 600px;";

    yeniKutu.innerHTML = `
        <div style="text-align: left;">
            <strong style="font-size: 18px; color: navy;">${konu}</strong><br>
            <span style="font-size: 14px; color: #666;">📅 ${zaman.replace("T", " ")}</span>
        </div>
        <input type="checkbox" onchange="this.parentElement.remove()" style="width: 25px; height: 25px; cursor: pointer;">
    `;

    liste.appendChild(yeniKutu);
    document.getElementById("toplanti-konu").value = "";
    document.getElementById("toplanti-zaman").value = "";
}
