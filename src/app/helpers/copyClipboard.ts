export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      console.log("Texto copiado al portapapeles!");
    })
    .catch(function (error) {
      console.error("No se pudo copiar el texto: ", error);
    });
}
