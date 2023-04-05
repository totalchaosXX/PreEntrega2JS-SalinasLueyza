const intentos = 5;

let contador = 0;

document.getElementById("ddlAFPs").onchange = function() {

    let seleccionado = this.value;

    let porcentaje = 0;

    switch(seleccionado){
        case "1":
        porcentaje = 1.44; 
        break;
        case "2":
        porcentaje = 1.44; 
        break;
        case "3":
        porcentaje = 1.27; 
        break;
        case "4":
        porcentaje = 0.58; 
        break;
        case "5":
        porcentaje = 1.16; 
        break;
        case "6":
        porcentaje = 1.45; 
        break;
        case "7":
        porcentaje = 0.69; 
        break;
        default:
        porcentaje=0;
        break
    }

    document.getElementById("txtPorcentajeComision").textContent  = porcentaje + "%";

};


document.getElementById("ddlAPV").onchange = function() {

    let seleccionado = this.value;


    var div_apv = document.getElementById("txtMontoAPV");

    if(seleccionado=="1"){

        div_apv.disabled=false;

        
    }
    else
    {
        document.getElementById("txtMontoAPV").value = 0;
        div_apv.disabled=true;


    }

};

function calcularHaberes(){

    let sueldo_base = parseInt(document.getElementById("txtSueldoBase").value);


    if(isNaN(sueldo_base)){
        sueldo_base = 0;
    }

    let gratificacion = parseInt(document.getElementById("txtGratificacion").value);

    if(isNaN(gratificacion)){
        gratificacion = 0;
    }
    
    let colacion = parseInt(document.getElementById("txtColacion").value);  

    if(isNaN(colacion)){
        colacion = 0;
    }

    let comisiones = parseInt(document.getElementById("txtComisiones").value);  

    if(isNaN(comisiones)){
        comisiones = 0;
    }

    let teletrabajo = parseInt(document.getElementById("txtTeletrabajo").value); 

    if(isNaN(teletrabajo)){
        teletrabajo = 0;
    }

    let movilizacion = parseInt(document.getElementById("txtMovilizacion").value); 

    if(isNaN(movilizacion)){
        movilizacion = 0;
    }

    let bonos = parseInt(document.getElementById("txtBonos").value); 
    
    if(isNaN(bonos)){
        bonos = 0;
    }

    let horas_extras = parseInt(document.getElementById("txtHorasExtras").value);  

    if(isNaN(horas_extras)){
        horas_extras = 0;
    }

    let aguinaldo = parseInt(document.getElementById("txtAguinaldo").value); 

    if(isNaN(aguinaldo)){
        aguinaldo = 0;
    }
    
    let suma = sueldo_base+gratificacion+colacion+comisiones+teletrabajo+movilizacion+bonos+horas_extras+aguinaldo;

    document.getElementById("txtTotalHaberes").value  = suma;

}

function calcularLiquido(){

    if(contador<=intentos){

        contador++;

        let total_haberes =  parseInt(document.getElementById("txtTotalHaberes").value);

        let comision_afp = parseFloat(document.getElementById("txtPorcentajeComision").textContent.replace("%",""));

        comision_afp = (total_haberes * comision_afp) / 100; 

        document.getElementById("txtComisionAfp").value  = parseInt(comision_afp);

        let afp = 10;

        afp = (total_haberes * afp) / 100; 

        document.getElementById("txtAFP").value  = parseInt(afp);

        let comision_salud = 0.55;

        comision_salud = (total_haberes * comision_salud) / 100; 

        document.getElementById("txtComisionSalud").value  = parseInt(comision_salud);

        let salud = 7;

        salud = (total_haberes * salud) / 100; 

        document.getElementById("txtSalud").value  = salud;

        let impuesto_renta = 4;

        if(total_haberes>=622849){

            impuesto_renta = (total_haberes * impuesto_renta) / 100; 

            document.getElementById("txtImpuesto").value  = parseInt(impuesto_renta);
        }

        let seguro_cesantia = 0.6;

        seguro_cesantia = (total_haberes * seguro_cesantia) / 100; 

        document.getElementById("txtSeguroCesantia").value  = parseInt(seguro_cesantia);

        let apv = 0;

        if(document.getElementById("ddlAPV").value == 1){

            apv = parseInt(document.getElementById("txtMontoAPV").value);
        }

        let total_descuentos = comision_afp + afp + comision_salud + salud + impuesto_renta + seguro_cesantia + apv;

        document.getElementById("txtTotalDescuentos").value = parseInt(total_descuentos);

        document.getElementById("txtLiquido").value = total_haberes - parseInt(total_descuentos);

        console.log(contador);

        
    }

    while(contador==5){
        esperar();
    }



}

function esperar() {

    contador = 0;
    const botonCalcular = document.getElementById('btnCalcular');
    botonCalcular.disabled = true;
    botonCalcular.style.opacity = 0.7;
    botonCalcular.value = 'Debe esperar un momento...';
 
    
    setTimeout(function() {
       
        botonCalcular.value = 'Calcular';
        botonCalcular.style.opacity = 1;
        botonCalcular.disabled = false;
    }, 5000);
}

function generarPDF(event) {

    event.preventDefault()

    window.jsPDF = window.jspdf.jsPDF;


    let nombre_trabajador = prompt("Ingrese el nombre del trabajador(a)");
    let nombre_empresa = prompt("Ingrese el nombre de la empresa");


    if(nombre_trabajador == null || nombre_empresa == null || document.getElementById("txtSueldoBase").value == "") {
        alert('Debe ingresar los datos requeridos')
        return
    }

    console.log(document.getElementById("txtSueldoBase").value);


    const doc = new jsPDF()
   

  
    doc.setFontSize(22);
    doc.text(`Liquidación de sueldo`, 20, 20);

    doc.setFontSize(12);

    doc.text(`Nombre de trabajador(a): ${nombre_trabajador}`,20,30);
    doc.text(`Empresa: ${nombre_empresa}`,20,40);

    const datos_haberes = obtenerHaberes();

    var datos = [
    ["Haberes", ""],
    ["Sueldo Base", datos_haberes.sueldo_base],
    ["Gratificación", datos_haberes.gratificacion],
    ["Colacion", datos_haberes.colacion],
    ["Comisiones", datos_haberes.comisiones],
    ["Asignación Teletrabajo", datos_haberes.teletrabajo],
    ["Movilización", datos_haberes.movilizacion],
    ["Bonos", datos_haberes.bonos],
    ["Horas Extras", datos_haberes.horas_extras],
    ["Aguinaldo", datos_haberes.aguinaldo],
    
    ];

    var datos2 = [
        ["Total Haberes", `$${document.getElementById("txtTotalHaberes").value}`],

    ];

    const datos_descuentos = obtenerDescuentos();

    var datos3 = [
        ["Descuentos", ""],
        ["APV", datos_descuentos.apv],
        ["Comisión AFP", datos_descuentos.comision_afp],
        ["AFP", datos_descuentos.afp],
        ["Comisión Salud", datos_descuentos.comision_salud],
        ["Salud", datos_descuentos.salud],
        ["Impuesto a la renta", datos_descuentos.impuesto],
        ["Seguro de Cesantía", datos_descuentos.seguro_cesantia],

        ];

        var datos4 = [
            ["Total Descuentos", `$${document.getElementById("txtTotalDescuentos").value}`],
    
        ];  
        
        
        var datos5 = [
            ["Sueldo Líquido", `$${document.getElementById("txtLiquido").value}`],
    
        ];    



    doc.autoTable({
    head: [datos[0]],
    body: datos.slice(1),
    startY: 50
    });

    doc.autoTable({
        head: [datos2[0]],
        body: datos2.slice(1),
        startY: 130,
        theme:'grid'

    });

    doc.autoTable({
        head: [datos3[0]],
        body: datos3.slice(1),
        startY: 150
    });

    doc.autoTable({
        head: [datos4[0]],
        body: datos4.slice(1),
        startY: 215,
        theme:'grid'

    });


    doc.autoTable({
        head: [datos5[0]],
        body: datos5.slice(1),
        startY: 255,
        theme:'grid'

    });


    doc.save(`Liquidacion_${nombre_trabajador}.pdf`)


}

function obtenerHaberes(){

    let sueldo_base = parseInt(document.getElementById("txtSueldoBase").value);


    if(isNaN(sueldo_base)){
        sueldo_base = 0;
    }

    let gratificacion = parseInt(document.getElementById("txtGratificacion").value);

    if(isNaN(gratificacion)){
        gratificacion = 0;
    }
    
    let colacion = parseInt(document.getElementById("txtColacion").value);  

    if(isNaN(colacion)){
        colacion = 0;
    }

    let comisiones = parseInt(document.getElementById("txtComisiones").value);  

    if(isNaN(comisiones)){
        comisiones = 0;
    }

    let teletrabajo = parseInt(document.getElementById("txtTeletrabajo").value); 

    if(isNaN(teletrabajo)){
        teletrabajo = 0;
    }

    let movilizacion = parseInt(document.getElementById("txtMovilizacion").value); 

    if(isNaN(movilizacion)){
        movilizacion = 0;
    }

    let bonos = parseInt(document.getElementById("txtBonos").value); 
    
    if(isNaN(bonos)){
        bonos = 0;
    }

    let horas_extras = parseInt(document.getElementById("txtHorasExtras").value);  

    if(isNaN(horas_extras)){
        horas_extras = 0;
    }

    let aguinaldo = parseInt(document.getElementById("txtAguinaldo").value); 

    if(isNaN(aguinaldo)){
        aguinaldo = 0;
    }


    const objHaberes = {
        "sueldo_base" : `$${sueldo_base}` ,
        "gratificacion" : `$${gratificacion}`,
        "colacion" : `$${colacion}`,
        "comisiones" : `$${comisiones}`,
        "teletrabajo" : `$${teletrabajo}`,
        "movilizacion" : `$${movilizacion}`,
        "bonos" : `$${bonos}`,
        "horas_extras" : `$${horas_extras}`,
        "aguinaldo" :`$${aguinaldo}`,
        
    }

    return objHaberes;

}

function obtenerDescuentos(){

    let apv = parseInt(document.getElementById("txtMontoAPV").value);


    if(isNaN(apv)){
        apv = 0;
    }

    let comision_afp = parseInt(document.getElementById("txtComisionAfp").value);


    if(isNaN(comision_afp)){
        comision_afp = 0;
    }

    let afp = parseInt(document.getElementById("txtAFP").value);


    if(isNaN(afp)){
        afp = 0;
    }

    let comision_salud = parseInt(document.getElementById("txtComisionSalud").value);


    if(isNaN(comision_salud)){
        comision_salud = 0;
    }

    let salud = parseInt(document.getElementById("txtSalud").value);


    if(isNaN(salud)){
        salud = 0;
    }

    let impuesto = parseInt(document.getElementById("txtImpuesto").value);


    if(isNaN(impuesto)){
        impuesto = 0;
    }

    let seguro_cesantia = parseInt(document.getElementById("txtSeguroCesantia").value);


    if(isNaN(seguro_cesantia)){
        seguro_cesantia = 0;
    }

    const objDescuentos = {
        "apv" : `$${apv}` ,
        "comision_afp" : `$${comision_afp}`,
        "afp" : `$${afp}`,
        "comision_salud" : `$${comision_salud}`,
        "salud" : `$${salud}`,
        "impuesto" : `$${impuesto}`,
        "seguro_cesantia" : `$${seguro_cesantia}`,
        
    }

    return objDescuentos;
}




