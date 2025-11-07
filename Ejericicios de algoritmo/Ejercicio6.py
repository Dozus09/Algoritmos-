# Ejercicio 6: Calificacion de un Estudiante
class Alumno:
    def __init__(self, codigo, cal1, cal2, cal3):
        self.codigo = codigo
        self.final = (cal1 + cal2 + cal3) / 3

class Sistema:
    def __init__(self):
        self.alumnos = []
    
    def agregar(self, codigo, cal1, cal2, cal3):
        if all(1.0 <= c <= 5.0 for c in [cal1, cal2, cal3]):
            self.alumnos.append(Alumno(codigo, cal1, cal2, cal3))
    
    def stats(self):
        a = sum(1 for x in self.alumnos if 3.0 <= x.final <= 5.0)
        b = sum(1 for x in self.alumnos if 2.0 <= x.final <= 2.9)
        c = sum(1 for x in self.alumnos if x.final == 5.0)
        print(f"Aprobados: {a}\nRecuperación: {b}\nMáxima: {c}")

s = Sistema()
s.agregar("EST001", 4.5, 4.8, 4.7)
s.agregar("EST002", 2.5, 2.3, 2.7)
s.agregar("EST003", 5.0, 5.0, 5.0)
s.stats()