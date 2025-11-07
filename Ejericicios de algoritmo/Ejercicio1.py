#Ejercicio 1: Valor Absoluto
class ValorAbsoluto:
    def __init__(self, numero):
        self.numero = numero
    
    def calcular(self):
        return int((self.numero**2)**0.5)
