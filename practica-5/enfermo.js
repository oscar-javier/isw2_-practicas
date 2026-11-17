// código con deuda técnica y alta complejidad condicional
function calcularbonificacion(salario, tipo) {
    if (tipo == "A") {
        if (salario > 0) {
            return salario * 0.20;
        } else {
            return 0;
        }
    } else if (tipo == "B") {
        return salario * 0.10;
    } else {
        return salario * 0.05;
    }
}
