-- =========================================================
-- XÓCHITL BEAUTY - Base de datos
-- Tienda ficticia de maquillaje inspirada en flores mexicanas
-- =========================================================

DROP DATABASE IF EXISTS xochitl_beauty;

CREATE DATABASE xochitl_beauty CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE xochitl_beauty;

-- ---------------------------------------------------------
-- Tabla: marcas
-- ---------------------------------------------------------
CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais_origen VARCHAR(60),
    descripcion TEXT
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: categorias
-- ---------------------------------------------------------
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: productos
-- ---------------------------------------------------------
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    tono VARCHAR(60),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    fecha_caducidad DATE,
    id_marca INT NOT NULL,
    id_categoria INT NOT NULL,
    imagen VARCHAR(255) DEFAULT '/img/producto-default.png',
    CONSTRAINT fk_producto_marca FOREIGN KEY (id_marca) REFERENCES marcas (id_marca) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: clientes
-- ---------------------------------------------------------
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(120) UNIQUE,
    telefono VARCHAR(20),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: ventas
-- ---------------------------------------------------------
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(40) NOT NULL,
    estado VARCHAR(30) DEFAULT 'Completada',
    CONSTRAINT fk_venta_cliente FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: detalle_venta
-- ---------------------------------------------------------
CREATE TABLE detalle_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_detalle_venta FOREIGN KEY (id_venta) REFERENCES ventas (id_venta) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES productos (id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------
-- Tabla: movimientos_inventario
-- ---------------------------------------------------------
CREATE TABLE movimientos_inventario (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    tipo_movimiento ENUM('Entrada', 'Salida', 'Ajuste') NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(200),
    CONSTRAINT fk_movimiento_producto FOREIGN KEY (id_producto) REFERENCES productos (id_producto) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

-- =========================================================
-- DATOS DE EJEMPLO
-- =========================================================

INSERT INTO
    marcas (
        nombre,
        pais_origen,
        descripcion
    )
VALUES (
        'Mac',
        'Estados Unidos',
        'Marca profesional de maquillaje reconocida mundialmente.'
    ),
    (
        'Maybelline',
        'Estados Unidos',
        'Cosméticos accesibles y de alta calidad.'
    ),
    (
        'L\'Oréal',
        'Francia',
        'Marca líder en belleza y cuidado personal.'
    ),
    (
        'Revlon',
        'Estados Unidos',
        'Pionera en cosméticos de color.'
    ),
    (
        'NYX',
        'Estados Unidos',
        'Maquillaje profesional a precios accesibles.'
    ),
    (
        'Fenty Beauty',
        'Estados Unidos',
        'Marca inclusiva fundada por Rihanna.'
    ),
    (
        'Xóchitl',
        'México',
        'Marca ficticia inspirada en flores mexicanas.'
    );

INSERT INTO
    categorias (nombre, descripcion)
VALUES (
        'Labiales',
        'Pintalabios, gloss y delineadores.'
    ),
    (
        'Bases',
        'Bases líquidas, en polvo y cushion.'
    ),
    (
        'Correctores',
        'Correctores y antiojeras.'
    ),
    (
        'Rubores',
        'Rubores en polvo, crema y líquidos.'
    ),
    (
        'Sombras',
        'Paletas y sombras individuales.'
    ),
    (
        'Máscaras de pestañas',
        'Rímeles y primers.'
    ),
    (
        'Skincare',
        'Cuidado de la piel y sérums.'
    );

INSERT INTO
    productos (
        nombre,
        descripcion,
        tono,
        precio,
        stock,
        fecha_caducidad,
        id_marca,
        id_categoria,
        imagen
    )
VALUES (
        'Labial Velvet Rosa Mexicano',
        'Labial mate de larga duración',
        'Rosa mexicano',
        349.00,
        25,
        '2027-06-15',
        1,
        1,
        '/img/labial-rosa.png'
    ),
    (
        'Base Líquida Nude Glow',
        'Cobertura media con acabado luminoso',
        'Beige natural',
        429.00,
        18,
        '2027-03-10',
        2,
        2,
        '/img/base-nude.png'
    ),
    (
        'Corrector Iluminador',
        'Cubre ojeras e ilumina la mirada',
        'Marfil',
        199.00,
        40,
        '2027-01-20',
        3,
        3,
        '/img/corrector.png'
    ),
    (
        'Rubor Durazno Floral',
        'Rubor en polvo con pigmento suave',
        'Durazno',
        259.00,
        30,
        '2027-05-05',
        4,
        4,
        '/img/rubor.png'
    ),
    (
        'Paleta Sombras Jardín',
        '12 tonos inspirados en flores',
        'Multicolor',
        599.00,
        12,
        '2027-08-12',
        5,
        5,
        '/img/paleta.png'
    ),
    (
        'Máscara Volumen Xóchitl',
        'Alarga y da volumen a las pestañas',
        'Negro intenso',
        279.00,
        5,
        '2026-12-01',
        6,
        6,
        '/img/mascara.png'
    ),
    (
        'Sérum Hidratante Pétalo',
        'Hidratación profunda con extracto de rosa',
        'Transparente',
        499.00,
        22,
        '2027-04-18',
        7,
        7,
        '/img/serum.png'
    ),
    (
        'Lip Gloss Cristal',
        'Brillo labial no pegajoso',
        'Rosa cristal',
        189.00,
        0,
        '2027-02-28',
        1,
        1,
        '/img/gloss.png'
    ),
    (
        'Base Matte Flor',
        'Acabo mate de larga duración',
        'Canela',
        389.00,
        15,
        '2027-07-07',
        2,
        2,
        '/img/base-matte.png'
    ),
    (
        'Delineador Líquido Negro',
        'Punta precisa para delineados perfectos',
        'Negro',
        159.00,
        60,
        '2027-09-09',
        3,
        5,
        '/img/delineador.png'
    );

INSERT INTO
    clientes (nombre, correo, telefono)
VALUES (
        'María López',
        'maria.lopez@correo.com',
        '5551234567'
    ),
    (
        'Sofía Ramírez',
        'sofia.r@correo.com',
        '5552345678'
    ),
    (
        'Valentina García',
        'vale.g@correo.com',
        '5553456789'
    ),
    (
        'Camila Hernández',
        'camila.h@correo.com',
        '5554567890'
    ),
    (
        'Isabella Torres',
        'isabella.t@correo.com',
        '5555678901'
    );

INSERT INTO
    ventas (
        id_cliente,
        total,
        metodo_pago,
        estado
    )
VALUES (
        1,
        778.00,
        'Tarjeta',
        'Completada'
    ),
    (
        2,
        429.00,
        'Efectivo',
        'Completada'
    ),
    (
        3,
        1058.00,
        'Transferencia',
        'Completada'
    ),
    (
        4,
        279.00,
        'Tarjeta',
        'Completada'
    ),
    (
        1,
        599.00,
        'Tarjeta',
        'Completada'
    );

INSERT INTO
    detalle_venta (
        id_venta,
        id_producto,
        cantidad,
        precio_unitario,
        subtotal
    )
VALUES (1, 1, 1, 349.00, 349.00),
    (1, 4, 1, 259.00, 259.00),
    (1, 10, 1, 159.00, 159.00),
    (2, 2, 1, 429.00, 429.00),
    (3, 5, 1, 599.00, 599.00),
    (3, 3, 1, 199.00, 199.00),
    (3, 7, 1, 499.00, 499.00),
    (4, 6, 1, 279.00, 279.00),
    (5, 5, 1, 599.00, 599.00);

INSERT INTO
    movimientos_inventario (
        id_producto,
        tipo_movimiento,
        cantidad,
        motivo
    )
VALUES (
        1,
        'Entrada',
        30,
        'Compra a proveedor'
    ),
    (
        2,
        'Entrada',
        20,
        'Compra a proveedor'
    ),
    (
        6,
        'Salida',
        5,
        'Venta en línea'
    ),
    (
        8,
        'Salida',
        10,
        'Venta en tienda'
    ),
    (
        3,
        'Ajuste',
        5,
        'Corrección de inventario'
    );