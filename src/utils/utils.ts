import { toast } from 'react-toastify';

export const catchError = (error :unknown): void => {
    if (error instanceof Error) {
        toast.error(error.message, {
          position: "bottom-center",
          theme: "dark",
        });
      } else {
        console.log("Ocurrió un error desconocido", error);
        toast.error("Ocurrió un error desconocido", {
          position: "bottom-center",
          theme: "dark",
        });
      }
}

export function validarExpresion(
  event: React.KeyboardEvent,
  expresion: RegExp
): void {
  const target = event.target as HTMLInputElement; // Forzamos el tipo al input.
  if (target.tagName !== "INPUT") return; // Aseguramos que el target sea un input.
  if (event.key === "Backspace") return;
  
  const valorArray = target.value.split("");
  valorArray.splice(target.selectionStart || 0, 0, event.key);
  const valor = valorArray.join("");
  const test = expresion.test(valor);
  if (!test) {
      event.preventDefault();
  }
}

