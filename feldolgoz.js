$(function () {
    $('#varos').keyup(adatBeolvas);
    $('article').delegate("table th","click", rendezesSort);

});

var irany = true;
var tomb = [];

function rendezesSort() {
    
    var aktOszlop = $(this).attr("id");
    console.log(aktOszlop);
    tomb.sort(function (a, b)
    {
        var number;
        if (irany) {
            number = Number(a[aktOszlop] > b[aktOszlop]) * 2 - 1;
        } else {
            number = Number(a[aktOszlop] < b[aktOszlop]) * 2 - 1;
        }
        return number;
    });
    tablazatba();
    irany = !irany;
    

}

function adatBeolvas() {
    var varos = $('#varos').val();
//    console.log($('#varos').val());
    $.ajax({
        type: "GET",
        url: "Feldolgoz.php?varos=" + varos,
        success: function (eredmeny) {
//            $("article").html(eredmeny);
            tomb = JSON.parse(eredmeny);
            console.log(tomb);
            kiir();

        }
    });
}

function kiir() {
    $('article').html("");
    var txt = "<select>";
    for (var i = 0; i < tomb.length; i++) {
        txt += "<option>" + tomb[i].nev + "</option>";
//        $('article').append(tomb[i].nev).append("<br>");
    }
    txt += "</select>";
    $('#valasztoLista').html(txt);
    tablazatba();
}

function tablazatba() {
    var tablazat = "<table><tr><th id=\"nev\">Név</th><th id=\"jara\">Járás</th><th id=\"megye\">Megye</th></tr>";
    for (var i = 0; i < tomb.length; i++) {
        tablazat += "<tr><td>" + tomb[i].nev + "</td><td>" + tomb[i].jaras + "</td><td>" + tomb[i].megye + "</td></tr>";
    }
    tablazat += "</table>";
    $('article').html(tablazat);

}
