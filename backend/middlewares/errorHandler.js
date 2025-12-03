const errorHandler = (err, req, res, next) => {
    console.error("❌ Error capturado:", err.message);

    // Error de validación
    if (err.message.includes("requeridos") || err.message.includes("Faltan")) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Error de autenticación
    if (err.message.includes("Credenciales") || err.message.includes("Token")) {
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }

    // Error de no encontrado
    if (err.message.includes("no encontrado")) {
        return res.status(404).json({
            success: false,
            message: err.message
        });
    }

    // Error de duplicado
    if (err.message.includes("ya está registrado")) {
        return res.status(409).json({
            success: false,
            message: err.message
        });
    }

    // Error genérico
    res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        ...(process.env.NODE_ENV === "development" && { 
            error: err.message,
            stack: err.stack 
        })
    });
};

export default errorHandler;