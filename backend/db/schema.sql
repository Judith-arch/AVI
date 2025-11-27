export const schema = {
    tiendas: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        nombre: "VARCHAR(100) NOT NULL",
        cadena: "VARCHAR(100)",
        direccion: "VARCHAR(255) NOT NULL",
        ciudad: "VARCHAR(100) NOT NULL",
        codigo_postal: "VARCHAR(10)",
        latitud: "DECIMAL(10,8) NOT NULL",
        longitud: "DECIMAL(11,8) NOT NULL",
        telefono: "VARCHAR(20)",
        horario_apertura: "TIME",
        horario_cierre: "TIME",
        activa: "BOOLEAN DEFAULT TRUE",
        fecha_registro: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    },
    categorias: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        nombre: "VARCHAR(100) NOT NULL",
        descripcion: "TEXT",
        icono: "VARCHAR(50)"
    },
    productos: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        nombre: "VARCHAR(200) NOT NULL",
        descripcion: "TEXT",
        marca: "VARCHAR(100)",
        categoria_id: "INT",
        codigo_barras: "VARCHAR(50) UNIQUE",
        unidad_medida: "VARCHAR(20)",
        imagen_url: "VARCHAR(500)"
    },
    precios: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        producto_id: "INT NOT NULL",
        tienda_id: "INT NOT NULL",
        precio: "DECIMAL(10,2) NOT NULL",
        precio_oferta: "DECIMAL(10,2)",
        en_stock: "BOOLEAN DEFAULT TRUE",
        fecha_actualizacion: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    },
    usuarios: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        email: "VARCHAR(150) UNIQUE NOT NULL",
        nombre: "VARCHAR(100)",
        password_hash: "VARCHAR(255) NOT NULL",
        latitud_favorita: "DECIMAL(10,8)",
        longitud_favorita: "DECIMAL(11,8)",
        fecha_registro: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    },
    listas_compra: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        usuario_id: "INT NOT NULL",
        nombre: "VARCHAR(100) DEFAULT 'Mi Lista'",
        fecha_creacion: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
        },
        items_lista: {
        id: "INT PRIMARY KEY AUTO_INCREMENT",
        lista_id: "INT NOT NULL",
        producto_id: "INT NOT NULL",
        cantidad: "INT DEFAULT 1"
    }
    };
