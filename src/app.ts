import { Logger } from "../logger/logger.js";
const logger = new Logger();

logger.info("Aplicación iniciada correctamente");
logger.warn("Advertencia en el sistema", "Módulo X");
logger.error("Error crítico detectado", "Módulo Y", "NullReferenceException");
