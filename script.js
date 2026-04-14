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
