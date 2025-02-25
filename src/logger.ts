import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

//Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Logger {
  private logFilePath: string;

  constructor() {
    const date = new Date().toISOString().split("T")[0];
    this.logFilePath = path.join(__dirname, `log-${date}.txt`);
    this.ensureLogFileExists();
  }

  // Verificar si el archivo de log existe, si no, crearlo
  private async ensureLogFileExists(): Promise<void> {
    try {
      // Usar promises para acceder al archivo de manera asincrónica
      await fs.promises.access(this.logFilePath);
    } catch (error) {
      // Si el archivo no existe, lo creamos
      fs.writeFileSync(this.logFilePath, "Log file created\n", { flag: "w" });
    }
  }

  // Obtener la información de la llamada (archivo y línea)
  private getCallerInfo(): { file: string; line: number } {
    const stack = new Error().stack;
    if (!stack) return { file: "", line: 0 };

    // La pila contiene la cadena "Error\n    at functionName (/path/to/file.js:line)"
    const stackLines = stack.split("\n");

    // Tomamos la segunda línea (la primera es la de la creación del Error)
    const callerLine = stackLines[2];

    // Extraemos el archivo y la línea usando una expresión regular
    const match = callerLine?.match(/\((.*):(\d+):\d+\)/);

    if (match) {
      return { file: path.basename(match[1]), line: parseInt(match[2], 10) };
    }

    return { file: "", line: 0 };
  }

  // Función principal de log con diferentes niveles
  private logMessage(
    level: string,
    message: string,
    track?: string,
    error?: string
  ): void {
    const { file, line } = this.getCallerInfo();
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] [${file}:${line}] ${message} ${
      track ? `[Track: ${track}]` : ""
    } ${error ? `[Error: ${error}]` : ""}\n`;

    // Escribir el mensaje en el archivo de log
    fs.appendFileSync(this.logFilePath, logMessage, "utf8");
    console.log(logMessage);
  }

  // Métodos para log de diferentes niveles
  public info(message: string, track?: string): void {
    this.logMessage("INFO", message, track);
  }

  public warn(message: string, track?: string): void {
    this.logMessage("WARNING", message, track);
  }

  public error(message: string, track?: string, error?: string): void {
    this.logMessage("ERROR", message, track, error);
  }
}

export default new Logger();
