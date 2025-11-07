# Ejercicio 3: Descuento de Supermercado
class CompraSupermercado:
    def __init__(self, numero_al_azar):
        self.numero_al_azar = numero_al_azar
        self.total_compra = 0
    
    def ingresar_total(self, total):
        self.total_compra = total
    
    def calcular_descuento(self):
        if self.numero_al_azar < 74:
            return self.total_compra * 0.15
        elif self.numero_al_azar == 74:
            return self.total_compra * 0.20
        else:
            return 0
    
    def total_a_pagar(self):
        return self.total_compra - self.calcular_descuento()
    
    def mostrar_resultado(self):
        descuento = self.calcular_descuento()
        porcentaje = (descuento / self.total_compra * 100) if self.total_compra > 0 else 0
        print(f"Número al azar: {self.numero_al_azar}")
        print(f"Total de compra: ${self.total_compra:.2f}")
        print(f"Descuento ({porcentaje:.0f}%): ${descuento:.2f}")
        print(f"Total a pagar: ${self.total_a_pagar():.2f}")
