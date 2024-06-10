document.addEventListener('DOMContentLoaded', function () {
    const productosDisponibles = [
        { nombre: 'Zapatos Deportivos', precio: 100, peso: 1.5 },
        { nombre: 'Camiseta', precio: 20, peso: 0.2 },
        { nombre: 'Pantalones', precio: 50, peso: 0.8 },
        { nombre: 'Sudadera', precio: 70, peso: 1.0 },
        { nombre: 'Chaqueta', precio: 120, peso: 1.5 },
        { nombre: 'Calcetines', precio: 10, peso: 0.1 },
        // Añadir más productos según sea necesario
    ];

    class Producto {
        constructor(nombre, precio, cantidad, peso) {
            this.nombre = nombre;
            this.precio = precio;
            this.cantidad = cantidad;
            this.peso = peso;
            this.iva = 0.12;
            this.descuentoCupon = 0.1;
        }

        precioConDescuento() {
            return this.precio * (1 - this.descuentoCupon);
        }

        precioConIva() {
            return this.precioConDescuento() * (1 + this.iva);
        }

        precioFinal() {
            let precioUnitarioConIva = this.precio * (1 + this.iva);
            // Aplicar descuento "lleva 3, paga 2"
            const setsDeTres = Math.floor(this.cantidad / 3);
            const unidadesSinDescuento = this.cantidad % 3;
            const unidadesPagadas = setsDeTres * 2 + unidadesSinDescuento;
            const precioFinalConDescuento = precioUnitarioConIva * unidadesPagadas;
            return precioFinalConDescuento;
        }

        precioSinDescuento() {
            return this.precio * this.cantidad;
        }

        precioConIvaSinDescuento() {
            return this.precio * (1 + this.iva) * this.cantidad;
        }
    }

    class Carrito {
        constructor() {
            this.productos = [];
            this.costoEnvioBase = 10;
            this.costoPorKg = 2;
        }

        agregarProducto(producto) {
            const index = this.productos.findIndex(p => p.nombre === producto.nombre);
            if (index > -1) {
                this.productos[index].cantidad += producto.cantidad;
            } else {
                this.productos.push(producto);
            }
            this.actualizarCarrito();
        }

        eliminarProducto(indice) {
            this.productos.splice(indice, 1);
            this.actualizarCarrito();
        }

        calcularPesoTotal() {
            return this.productos.reduce((total, producto) => total + (producto.peso * producto.cantidad), 0);
        }

        calcularCostoEnvio(destino) {
            const pesoTotal = this.calcularPesoTotal();
            return this.costoEnvioBase + (this.costoPorKg * pesoTotal);
        }

        calcularCostoFinal(destino) {
            const costoProductos = this.productos.reduce((total, producto) => total + producto.precioFinal(), 0);
            const costoEnvio = this.calcularCostoEnvio(destino);
            return {
                costoProductos,
                costoEnvio,
                costoFinal: costoProductos + costoEnvio
            };
        }

        calcularAhorro() {
            let ahorro = 0;
            this.productos.forEach(producto => {
                const precioSinDescuento = producto.precioConIvaSinDescuento();
                const precioConDescuento = producto.precioFinal();
                ahorro += (precioSinDescuento - precioConDescuento);
            });
            return ahorro;
        }

        actualizarCarrito() {
            const tbody = document.querySelector('#cart tbody');
            tbody.innerHTML = '';
            let totalPreliminar = 0;

            this.productos.forEach((producto, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${(producto.peso * producto.cantidad).toFixed(2)} kg</td>
                    <td>$${producto.precio.toFixed(2)}</td>
                    <td>$${(producto.precioConIva() - producto.precioConDescuento()).toFixed(2)}</td>
                    <td>$${producto.precioFinal().toFixed(2)}</td>
                    <td class="remove" data-index="${index}">X</td>
                `;
                tbody.appendChild(tr);
                totalPreliminar += producto.precioFinal();
            });

            document.getElementById('preliminary-total').innerText = `$${totalPreliminar.toFixed(2)}`;

            // Añadimos el evento de eliminación a cada botón X
            document.querySelectorAll('.remove').forEach(button => {
                button.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'), 10);
                    carrito.eliminarProducto(index);
                });
            });
        }
    }

    const carrito = new Carrito();

    // Poblamos la lista de productos disponibles en el formulario
    const productSelect = document.getElementById('product-select');
    productosDisponibles.forEach(producto => {
        const option = document.createElement('option');
        option.value = JSON.stringify(producto);
        option.text = producto.nombre;
        productSelect.add(option);
    });

    document.getElementById('product-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const productoSeleccionado = JSON.parse(document.getElementById('product-select').value);
        const cantidad = parseInt(document.getElementById('product-quantity').value, 10);

        carrito.agregarProducto(new Producto(productoSeleccionado.nombre, productoSeleccionado.precio, cantidad, productoSeleccionado.peso));

        document.getElementById('product-form').reset();
    });

    window.calcularCosto = function () {
        const destino = document.getElementById('destination').value;
        const { costoProductos, costoEnvio, costoFinal } = carrito.calcularCostoFinal(destino);
        const pesoTotal = carrito.calcularPesoTotal();
        const ahorro = carrito.calcularAhorro();

        document.getElementById('final-breakdown').innerText = `
            Costo de los productos: $${costoProductos.toFixed(2)}
            Costo de envío: $${costoEnvio.toFixed(2)}
            Peso total: ${pesoTotal.toFixed(2)} kg
            Costo final: $${costoFinal.toFixed(2)}
            Realizando esta compra ahorras: $${ahorro.toFixed(2)}
        `;
    };
});
