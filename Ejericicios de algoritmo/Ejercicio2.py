# Ejercicio 2: Descuento de Artículo
class Articulo:
    def __init__(self, nombre, clave, precio_original):
        self.nombre = nombre
        self.clave = clave
        self.precio_original = precio_original
    
    def calcular_descuento(self):
        if self.clave == 1:
            return self.precio_original * 0.10
        else:
            return self.precio_original * 0.02
    
    def precio_final(self):
        return self.precio_original - self.calcular_descuento()
    
    def mostrar_info(self):
        descuento = self.calcular_descuento()
        precio_final = self.precio_final()
        print(f"Artículo: {self.nombre}")
        print(f"Clave: {self.clave}")
        print(f"Precio original: ${self.precio_original:.2f}")
        print(f"Descuento: ${descuento:.2f}")
        print(f"Precio final: ${precio_final:.2f}")
