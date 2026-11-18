# Cambios

Cada versión publicada cambia `APP_VERSION` en `index.html` y `V` en `sw.js` (mismo valor), y añade sus novedades a `CHANGES` en `index.html`.

## 2026.11.18.5

- Botón atrás del móvil: cada cambio de pantalla (pestaña, sección de Finanzas, día, meta, receta, historial…) se guarda en el historial del navegador, así que atrás vuelve a la pantalla anterior. Con una hoja o el cuadro de novedades abiertos, atrás los cierra.
- En la pantalla inicial, el primer atrás muestra "Pulsa atrás otra vez para salir"; el segundo (en menos de 2,5 s) sale.

## 2026.11.18.4 · Meal prep

- Compras tiene dos vistas: Listas y Meal prep.
- Ingredientes (g, ml o unidades) con precios por tienda e historial; precio usado: el más barato, el último o el de una tienda. Precios de más de 90 días marcados para revisar.
- Recetas (meal prep o para casa) con coste total y por ración, aviso si supera el objetivo y qué ingrediente pesa más. Los ingredientes nuevos se crean al escribirlos en la receta.
- "Cociné esta receta" crea una tanda; en Hoy (y en días pasados) se marca "Comí meal prep". Ahorro = referencia de comer fuera − coste de la ración.
- Ingredientes de una receta a la lista de compras, escalados a las raciones, con la tienda más barata.
- Ajustes: referencia (7 €), objetivo (5 €), modo de precio y tiendas.
- Historial de categorías: total de los 12 meses en lugar del mes actual.
- Corregido: un estado nuevo (primera instalación) ahora pasa siempre por la normalización.

## 2026.11.18.3

- Corregido: duplicados al importar descargas que se solapan cuando un movimiento pendiente cambia de posición (su saldo "Disponible" cambia). Ahora cada fila se empareja por clave exacta, luego por saldo y, si no, por día valor + importe + texto (como multiconjunto, para no fusionar compras repetidas reales). Los movimientos emparejados se actualizan con la fecha contable y el saldo de la descarga más reciente (`src`), sin que reimportar un archivo antiguo los revierta.
- El saldo de la cuenta usa el movimiento más reciente por fecha contable, archivo y posición.
- Cuentas: "Revisar duplicados" (mismo día valor, importe y texto), con borrar o "Son distintos".

## 2026.11.18.2 · Metas

- **Sobres:** el saldo de la cuenta de ahorro se reparte entre metas y "Sin asignar" (saldo = sobres + sin asignar). Sin cuenta de ahorro importada, el ahorro se calcula con los traspasos.
- **Plantillas:** fondo de emergencia (propone 3 meses de gastos fijos), vivienda (entrada, gastos de compra, mudanza), viaje (partidas + colchón 10 %) y libre.
- **Reparto mensual automático** del ahorro neto de cada mes completo según porcentajes, con aviso, deshacer y propuesta de ajuste según el tiempo que falta.
- **Mover entre sobres**, repartir lo sin asignar, y elegir de qué sobre sale el dinero cuando se retira más de lo sin asignar.
- **Viajes:** fechas de ida y vuelta, revisión con casillas de los gastos de esas fechas (cargos fijos desmarcados), asignación manual desde el movimiento con partida, plan frente a lo gastado y gasto diario disponible durante el viaje.
- **Tareas por meta** (aparecen también en Tareas y, con fecha, en Hoy). Archivar una meta devuelve su saldo a sin asignar.

## 2026.11.18

- Compartir una lista de compras (menú de compartir del móvil) o copiarla completa al portapapeles.
- Historial de 12 meses por categoría o subcategoría: media y mínimo de meses completos, máximo, presupuesto y acceso a los movimientos de cada mes (filtro por categoría en Movimientos).
- "Por clasificar": casillas en cada grupo y opción "Solo los marcados, sin regla".
- Cuadro de novedades una vez por versión (las notas están en `CHANGES` dentro de `index.html`) y sección Novedades en Más.

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
