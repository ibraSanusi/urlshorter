export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)

    .catch(function (error) {
      console.error("No se pudo copiar el texto: ", error);
    });
}
