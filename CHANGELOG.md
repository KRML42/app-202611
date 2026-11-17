# Cambios

Cada versión publicada cambia `APP_VERSION` en `index.html` y `V` en `sw.js` (mismo valor).

## 2026.11.17.3 · Finanzas 2.0

- **Dividir un movimiento** en varias líneas con su categoría (como abrir la línea en Excel). El movimiento del banco no se modifica; presupuestos y resúmenes usan las líneas. La última línea puede quedar vacía y toma lo que falte.
- **Gastos compartidos:** reglas por categoría o subcategoría con su parte en porcentaje o importe fijo, con fecha de inicio. Excepciones por movimiento o por línea ("solo mío", 50 %, otro %, importe). En presupuestos y resúmenes cuenta solo tu parte.
- **Aportaciones de pareja:** nueva categoría "Pareja › Aportación", que no cuenta como ingreso. Resumen informativo de su parte frente a lo aportado, con "Poner a cero desde este mes".
- **Traspasos entre tus cuentas:** se emparejan solos (mismo importe, fechas a 4 días o menos). No cuentan como ingreso ni gasto; el ahorro del mes es lo que pasa de la corriente al ahorro menos lo que vuelve. Se pueden deshacer desde el movimiento.
- Quitada la sección de contactos por teléfono (el banco no exporta teléfonos).


- Corregido: al volver a importar el archivo más antiguo aparecía un aviso falso de "el saldo inicial no enlaza". Ahora se compara solo con movimientos que no vienen en el propio archivo.
- Detección de teléfonos más tolerante (+34, 0034, 34, espacios, puntos) sin confundir tarjetas ni IBAN.
- El resultado de cada importación indica cuántos teléfonos encontró en Observaciones.

## 2026.11.17

**Mejoras de uso**
- Notas en los movimientos: se ven en la lista y se pueden buscar.
- Elementos de las listas de compra editables: texto, mover a otra lista o eliminar.
- "Por clasificar": ordenar por monto o por número de movimientos, ver los movimientos de cada grupo y saltar al día del movimiento.
- Teléfonos de Bizum: al importar se guarda solo el teléfono de la columna Observaciones. Reimportar un archivo rellena el teléfono en los movimientos que ya existían, sin duplicar nada.
- Las reglas pueden usar el teléfono, para clasificar automáticamente los Bizum de un contacto.
- La búsqueda de Movimientos incluye notas y nombres de contactos.

**Base técnica**
- La app abre al instante con la copia guardada, con o sin conexión, y se actualiza en segundo plano.
- Fuentes incluidas en el proyecto: ya no se conecta a Google Fonts.
- Aviso "Hay una versión nueva" con botón para actualizar.
- Copia de seguridad descargable como archivo `.json` y restauración desde archivo.
- Aviso si una copia viene de una versión más nueva de la app.
- Indicador del espacio usado.
- Aviso si no se pueden guardar los cambios (almacenamiento lleno o bloqueado).
- Ajustes para iPhone (nombre del icono, sin zoom en el cuadro de copia).

## 2026.11.16

- Presupuestos mensuales por categoría con sugerencia a partir del historial.
- App instalable (PWA) publicada en GitHub Pages.
- Tarjetas e IBAN guardados solo con los últimos 4 dígitos; contactos para teléfonos de Bizum.
- Importación de varios archivos a la vez.
- Primera versión: Hoy, tareas, quehaceres, compras, hábitos y finanzas.
