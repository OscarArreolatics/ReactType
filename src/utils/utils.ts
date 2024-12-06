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