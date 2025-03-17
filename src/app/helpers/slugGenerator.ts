"use client";

/**
 * @name Generador de slug
 * @description Genera un slug basado en el día de la semana en español y un identificador único en base 36.
 * @returns {string}
 */
export function slugGenerator() {
  const day = new Date()
    .toLocaleDateString("es-ES", {
      timeZone: "Europe/Madrid",
    })
    .toLocaleLowerCase();

  const timestamp = new Date(day.split("/").reverse().join("-")).getTime();
  const dayBase36 = timestamp.toString(36);

  const uniqueId = Math.random().toString(36).substring(2, 5);

  return `${dayBase36}${uniqueId}`;
}
