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
