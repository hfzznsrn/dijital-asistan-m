function sayfaAc(sayfaId) {
    // Önce tüm sayfaları gizle
    var sayfalar = document.getElementsByClassName('sayfa-icerik');
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = 'none';
    }
    
    // Sadece tıklanan sayfayı göster
    document.getElementById(sayfaId).style.display = 'block';
}
