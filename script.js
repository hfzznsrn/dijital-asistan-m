function sayfaAc(sayfaId) {
    var sayfalar = document.getElementsByClassName("sayfa-icerik");
    for (var i = 0; i < sayfalar.length; i++) {
        sayfalar[i].style.display = "none";
    }
    document.getElementById(sayfaId).style.display = "block";
}

function notEkle() {
    var notMetni = document.getElementById("not-alani").value;
    if (notMetni === "") return;

    var liste = document.getElementById("kayitli-notlar");
    var yeniNot = document.createElement("div");
    yeniNot.style.marginBottom = "10px";
    yeniNot.style.fontSize = "18px";
    
    yeniNot.innerHTML = `
        <input type="checkbox" onclick="tamamla(this)" style="transform: scale(1.5); margin-right: 10px;"> 
        <span>${notMetni}</span>
    `;
    
    liste.appendChild(yeniNot);
    document.getElementById("not-alani").value = "";
}

function tamamla(eleman) {
    var tamamlananlar = document.getElementById("tamamlanan-notlar");
    var notSatiri = eleman.parentElement;
    
    if (eleman.checked) {
        tamamlananlar.appendChild(notSatiri);
        notSatiri.style.textDecoration = "line-through";
        notSatiri.style.color = "gray";
    } else {
        document.getElementById("kayitli-notlar").appendChild(notSatiri);
        notSatiri.style.textDecoration = "none";
        notSatiri.style.color = "black";
    }
}
