const { calcularBonificacion } = require('./sano.js');

describe('pruebas unitarias para calcularBonificacion', () => {
    test('calcula bonificación tipo A correctamente', () => {
        // Arrange
        const salario = 1000;
        const tipo = "A";

        // Act
        const resultado = calcularBonificacion(salario, tipo);

        // Assert
        expect(resultado).toBe(200);
    });

    test('retorna 0 si el salario es menor o igual a cero', () => {
        expect(calcularBonificacion(0, "A")).toBe(0);
    });
});
