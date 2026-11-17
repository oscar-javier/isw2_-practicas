// código refactorizado aplicando clean code
function calcularBonificacion(salario, tipo) {
    if (salario <= 0) return 0;

    const bonificaciones = {
        "A": 0.20,
        "B": 0.10,
        "C": 0.05
    };

    const porcentaje = bonificaciones[tipo] || 0.05;
    return salario * porcentaje;
}

module.exports = { calcularBonificacion };
