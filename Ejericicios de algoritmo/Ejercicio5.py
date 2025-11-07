# EJERCICIO 5: VECTOR AL CUADRADO

class VectorCuadrado:
    def __init__(self):
        self.vector_original = []
        self.vector_cuadrado = []
    
    def llenar_vector(self, numeros):
        self.vector_original = numeros
    
    def calcular_cuadrados(self):
        self.vector_cuadrado = [num**2 for num in self.vector_original]
    
    def mostrar_vectores(self):
        print("Vector original:", self.vector_original)
        print("Vector al cuadrado:", self.vector_cuadrado)