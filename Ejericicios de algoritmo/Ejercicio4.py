
# EJERCICIO 4: COMISIÓN VENDEDORES MAZDA

class Vendedor:
    def __init__(self, ventas):
        self.ventas = ventas
    
    def calcular_comision(self):
        if self.ventas < 1000000:
            return self.ventas * 0.03
        elif self.ventas < 3000000:
            return self.ventas * 0.04
        elif self.ventas < 5000000:
            return self.ventas * 0.05
        elif self.ventas < 7000000:
            return self.ventas * 0.06
        else:
            return self.ventas * 0.06

class SistemaVendedores:
    def __init__(self):
        self.vendedores = []
    
    def agregar_vendedor(self, ventas):
        vendedor = Vendedor(ventas)
        self.vendedores.append(vendedor)
    
    def mostrar_comisiones(self):
        for vendedor in self.vendedores:
            comision = vendedor.calcular_comision()
            print(f"{comision:.2f}")
