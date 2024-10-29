/*
Calcula la longitud total del texto que 
name: Frase
author: Nombre del autor
+3: Por la separación ' - '
*/
export const calcTextResponseLength = (name, author) => {
  return author.length + name.length + 3
}
