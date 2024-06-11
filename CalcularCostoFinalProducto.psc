Proceso CalcularCostoFinalProducto
    // Declaración de variables
    Definir precioOriginal, precioConDescuento, precioConIVA, precioConDescuentoCantidad, costoEnvio, costoFinal Como Real
    Definir descuentoCupon, IVA, descuentoCantidad, costoEnvioFijo, costoPorKg, pesoPaquete, cantidad Como Real
    Definir destino Como Cadena
    Definir opcionProducto, opcionDestino Como Entero
    
    // Inicialización de productos y destinos
    precioZapatos = 100
    precioCamiseta = 50
    precioPantalon = 75
    precioChaqueta = 150
    precioReloj = 200
    precioLaptop = 300
    
    costoEnvioNuevaYork = 10
    costoEnvioLosAngeles = 12
    costoEnvioChicago = 11
    costoEnvioHouston = 9
    costoEnvioPhoenix = 10
    costoEnvioFiladelfia = 13
    
    costoPorKg = 2 // Costo por kg de envío
    
    // Solicitar información del producto
    Escribir "Seleccione el producto:"
    Escribir "1. Zapatos deportivos ($100)"
    Escribir "2. Camiseta ($50)"
    Escribir "3. Pantalón ($75)"
    Escribir "4. Chaqueta ($150)"
    Escribir "5. Reloj ($200)"
    Escribir "6. Laptop ($300)"
    Leer opcionProducto
    
    Segun opcionProducto Hacer
        1: precioOriginal = precioZapatos
        2: precioOriginal = precioCamiseta
        3: precioOriginal = precioPantalon
        4: precioOriginal = precioChaqueta
        5: precioOriginal = precioReloj
        6: precioOriginal = precioLaptop
    FinSegun
    
    // Solicitar información del destino
    Escribir "Seleccione el destino:"
    Escribir "1. Nueva York"
    Escribir "2. Los Ángeles"
    Escribir "3. Chicago"
    Escribir "4. Houston"
    Escribir "5. Phoenix"
    Escribir "6. Filadelfia"
    Leer opcionDestino
    
    Segun opcionDestino Hacer
        1: costoEnvioFijo = costoEnvioNuevaYork
        2: costoEnvioFijo = costoEnvioLosAngeles
        3: costoEnvioFijo = costoEnvioChicago
        4: costoEnvioFijo = costoEnvioHouston
        5: costoEnvioFijo = costoEnvioPhoenix
        6: costoEnvioFijo = costoEnvioFiladelfia
    FinSegun
    
    // Solicitar información adicional
    Escribir "Ingrese el cupón de descuento (%):"
    Leer descuentoCupon
    Escribir "Ingrese el IVA (%):"
    Leer IVA
    Escribir "Ingrese la cantidad de productos:"
    Leer cantidad
    Escribir "Ingrese el peso del paquete (kg):"
    Leer pesoPaquete
    
    // Calcular el precio con descuento
    precioConDescuento = precioOriginal * (1 - descuentoCupon / 100)
    
    // Calcular el precio con IVA
    precioConIVA = precioConDescuento * (1 + IVA / 100)
    
    // Aplicar descuento por cantidad si es mayor a 1
    Si cantidad > 1 Entonces
        descuentoCantidad = 5 // 5% de descuento por cantidad
    Sino
        descuentoCantidad = 0
    FinSi
    precioConDescuentoCantidad = precioConIVA * (1 - descuentoCantidad / 100)
    
    // Calcular costo de envío
    costoEnvio = costoEnvioFijo + (costoPorKg * pesoPaquete)
    
    // Calcular costo final
    costoFinal = (precioConDescuentoCantidad * cantidad) + costoEnvio
    
    // Mostrar el desglose y costo final
    Escribir "Precio original: $", precioOriginal
    Escribir "Descuento cupón: $", precioOriginal * (descuentoCupon / 100)
    Escribir "Precio con descuento: $", precioConDescuento
    Escribir "IVA: $", precioConDescuento * (IVA / 100)
    Escribir "Precio con IVA: $", precioConIVA
    Escribir "Descuento por cantidad: $", precioConIVA * (descuentoCantidad / 100)
    Escribir "Precio con descuento por cantidad: $", precioConDescuentoCantidad
    Escribir "Costo de envío: $", costoEnvio
    Escribir "Costo final: $", costoFinal
FinProceso
