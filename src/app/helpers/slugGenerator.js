"use cliente";

/**
 * @name Generador de slug
 * @description Se devuelve la suma en base 36 de la fecha y un numero aleatorio (recortado para que no sea tan largo)
 * @returns String
 */
export function slugGenerator() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}
