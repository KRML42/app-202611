# Cambios

Cada versión publicada cambia `APP_VERSION` en `index.html` y `V` en `sw.js` (mismo valor), y añade sus novedades a `CHANGES` en `index.html`.

## 2026.11.27 · Importación con encabezados en inglés

- Importación: botón «Deshacer esta importación» (instantánea de `S.fin` en memoria, se descarta en el siguiente `save()`) y avisos (`warn[]`: sin novedades, hueco >45 días, solapa sin coincidir, saldo en tarjeta / sin saldo).
- `hdrKey()` unifica los sinónimos de columnas (es/en); `findHeader` e `importRows` lo usan. El error de «no reconozco el archivo» muestra los encabezados vistos.

## 2026.11.22 · Tarjeta de crédito (fase 7)

- **Cuenta tipo `tarjeta`:** `limit`, `tin`, `pay` (pago mensual) y `anchor {date,debt}`. Su Excel se importa como el de las demás cuentas (sin saldo). `accBalance()` devuelve la deuda en negativo: `cardDebt()` = ancla − movimientos posteriores.
- **Pagos emparejados:** el pago desde la corriente se empareja con su abono en la tarjeta (`pairTransfers`) y no cuenta como gasto; el gasto es cada compra. `recDetect` lo nombra «Pago de la tarjeta» (`card:true`) y la previsión lo cuenta como salida.
- **Cuadre mensual (`openCuadreSheet`):** deuda del extracto + fecha de corte; la diferencia con los movimientos se guarda como movimiento `adj:'int'` (Finanzas › Intereses). Primer cuadre = solo ancla. Aviso si la diferencia ≫ intereses esperados.
- **Bloque de deuda** en Finanzas › Cuentas: deuda, disponible, compras/pagos del mes, intereses, meses para liquidar (`cardPayoff` con TIN real).
- **Avisos:** ≥80 % del límite, límite superado, sin ancla, cuadre con más de 35 días.
- Demo con tarjeta ficticia; tests `f7_test.js` y `f7b.js`.

## 2026.11.21 · Fijos, previsión y avisos (fase 6 + 3b)

- **Fijos (`S.fin.recur`):** cada fijo guarda nombre, importe con signo, frecuencia (semanal, mensual, trimestral, anual), día habitual (`off`; si los días caen a ambos lados del cambio de mes se guarda como desplazamiento desde el día 1, `bd`), margen de retraso (`win`, para ingresos), si el importe varía (`vr`), texto del banco (`key`), categoría y fecha de inicio (`start`/`since`). `recMatchTx()` empareja cada movimiento real por palabras del texto, signo y tolerancia de importe; la próxima fecha sale del último movimiento emparejado (`recNext()`/`recStep()`), anclada al ciclo más cercano, así una nómina adelantada no se confunde con la del mes siguiente. Un fijo sin texto del banco avanza por calendario.
- **Detección (`recDetect()`):** agrupa los movimientos de cuentas corrientes por texto sin cifras ni «recibo»; propone los que se repiten cada mes (3 veces o más), semana (4), trimestre (3) o año (2) con importe estable (±12 %). El importe variable (luz, agua) solo si es mensual, de 15 € o más y con intervalos de 25 a 37 días. Descartar guarda la clave en `recurNo`. No propone lo que ya está cubierto por un fijo con palabras en común.
- **Previsión (`forecast(n, late)`):** saldo del último extracto de las cuentas corrientes, más lo apuntado después y una estimación de gasto variable desde el extracto, más los fijos en su fecha. El gasto variable diario es la media de los últimos 3 meses completos sin fijos, viajes ni gastos no mensuales. Un gasto que venció sin aparecer cuenta hoy; un ingreso que no llega no cuenta. El escenario `late` retrasa los ingresos hasta el último día de su margen.
- **Libre hasta la nómina (`freePay()`):** punto más bajo del escenario `late` antes de cobrar el mayor ingreso fijo de categoría Ingresos, menos el mínimo de seguridad; también en €/día.
- **Mínimo de seguridad (`S.fin.safe`):** en euros o en % del gasto mensual medio; se guarda lo que el usuario escribió (`src`) y el otro valor se calcula.
- **Avisos (`finAlerts()`):** saldo previsto bajo el mínimo (o negativo), presupuestos pasados y cerca del límite (agrupados), cargos de los próximos 7 días, fijos que no aparecen, cambios de importe (con «Aceptar nuevo importe») y fijos detectados por confirmar. Cada aviso tiene clave propia: «Luego» lo oculta 3 días y «Silenciar» de forma permanente (`alertOff`).
- **Pantallas:** Hoy › tarjeta Dinero; Finanzas › Previsión (tiles, gráfico SVG con línea del peor caso, avisos, próximos movimientos, cómo se calcula) y Fijos (totales al mes y al año, detectados, lista, alta manual).
- **Nómina hasta el último día hábil:** un ingreso mensual puede tener `lastBiz`: su fecha esperada se limita al último día hábil del mes (sin contar fines de semana ni festivos) y ese es el peor caso de la previsión. Se activa solo al detectar ingresos que llegan el día 25 o después, y se puede cambiar en la hoja del fijo.
- **Fijos cada 2 meses (`bim`):** detección (intervalos de 52 a 70 días; 3 recibos, o 2 si el importe es estable), importe variable por mediana, paso de 2 meses y equivalente mensual de la mitad. Al registrarlos como fijos salen de la media de gasto variable y se colocan en su fecha.
- **Demo:** nómina con día variable, nueve fijos confirmados, cuatro por detectar, mínimo de 400 € y un cambio de precio en Spotify.
- Pruebas nuevas: `f6_test.js` (detección, emparejamiento, ciclos de fin de mes, previsión con cifras controladas, avisos, mínimo cifra↔%, persistencia y datos antiguos).

## 2026.11.19.2 · Balance por categoría y desayunos

- **Resumen semanal por balance de categoría:** `spendResid()` compensa, dentro de cada categoría, los ingresos o devoluciones con los gastos que están a 14 días o menos (cada importe se usa una sola vez, así la suma de dos semanas no cuenta nada dos veces). «Gastado», «Semana anterior» y «Donde más» usan lo que queda; las categorías sin gasto neto no aparecen.
- **Meal prep con desayunos:** `recipe.meal` (`almuerzo` por defecto, también `desayuno`). Referencias propias: `cfg.ref`/`cfg.target` para el almuerzo (7 € y 5 €) y `cfg.refB`/`cfg.targetB` para el desayuno (5 € y 3 €), editables en Ajustes. Hoy muestra una fila por comida con tanda activa y se pueden marcar las dos el mismo día. Las tandas, el ahorro, el resumen semanal y la receta usan la referencia de su tipo. Los datos antiguos siguen siendo almuerzos. La demo incluye una receta de desayuno.

## 2026.11.19.1 · Copias y reglas

- **Copia de seguridad por correo:** una app sin servidor no puede enviar correos sola, así que Más › «Enviar copia por correo» abre el menú de compartir del móvil (`navigator.share` con el archivo `.json` como `text/plain`) y, si el navegador no lo admite, descarga el archivo. Cada copia anota `prefs.bkLast`. Aviso en Hoy (`bkDue()`) cuando pasan los días elegidos (`prefs.bkEvery`: nunca, 14, 30 por defecto o 60) desde `bkLast` o, si no hay, desde `bkSince` (fecha en que se creó o se actualizó la app). «Luego» lo oculta 3 días (`bkSnooze`). Cancelar el menú no cuenta como copia hecha. Sin aviso en modo demo.
- **Reglas:** buscador por texto o categoría y edición al tocar una regla (texto y categoría, con comprobación de duplicados); al guardar o borrar se reclasifican los movimientos no clasificados a mano.

## 2026.11.19 · Modo demo

- **Modo demo (Más › Modo demo):** perfil ficticio completo para enseñar la app sin mostrar datos reales. Se activa con `localStorage['mi-dia-mode']='demo'` y la app recarga; usa claves propias (`mi-dia-demo`, `mi-dia-draft-demo`), así que lo real no se lee ni se escribe. Etiqueta "DEMO" en la cabecera; en Más: "Salir de la demo" y "Reiniciar la demo" (borra solo la demo y regenera el perfil). Sin ventana de novedades. En la demo se ocultan la copia de seguridad y "Borrar todo".
- **Perfil ficticio (`demoData()`):** fechas relativas a hoy (siempre "reciente"). Dos meses completos y el actual en dos cuentas (corriente y ahorro), con traspasos emparejados, gastos compartidos, un movimiento dividido, notas, 7 por clasificar y 2 gastos apuntados (uno con candidato del banco). Presupuestos, 3 metas (viaje con plan y gastos asignados, vivienda, fondo de emergencia) con repartos, 3 recetas con precios por tienda y tandas, hábitos de los cuatro tipos, tareas con prioridades, quehaceres con historial y listas de compra.

## 2026.11.18.7 · Lote de mejoras

- **Gasto rápido y conciliación:** apuntes manuales (`fin.pend`) que cuentan en presupuestos y resúmenes. Al importar, cada apunte se une con un movimiento de la misma cuenta y signo entre 1 día antes y 5 días después: si hay un único candidato con el mismo importe, automáticamente; si el importe difiere (hasta 15 %, retenciones) o hay varios, en "Movimientos › Apuntados" para confirmar. El movimiento hereda categoría, nota y reparto (`rec`). Aviso "No apareció en el banco" cuando ya hay extracto 6 días después.
- **Resumen semanal:** el día elegido en Más (lunes por defecto) y siempre en Hoy › Semana. Últimos 7 días: hábitos frente a la semana anterior, tareas y quehaceres, gasto frente a la semana anterior y al ritmo del presupuesto, categorías principales, meal prep, metas y pendientes.
- **Prioridades de la semana:** tareas con `star`, visibles en Hoy; se eligen en el resumen o en cualquier momento.
- **Quehaceres:** aviso con la próxima vez, "Hechos hoy" con deshacer, actividad de 14 días e historial editable en cada quehacer.
- **Meal prep:** lista nueva desde la receta, una lista por tienda, tienda habitual por ingrediente y modo de precio "tienda habitual". Los ingredientes de recetas no cuentan como frecuentes.

## 2026.11.18.6 · Lote de mejoras

- **Hábitos:** tocar un círculo de la semana marca o desmarca ese día (hábitos de "hacer"); en reducir/dejar abre un cuadro para corregir ese día, con "Ver el día completo".
- **Hábitos de reducir:** límite por día o por semana (lunes a domingo): total semanal, colores, círculos en rojo desde el día en que se pasa, semana pasada y semanas seguidas dentro del límite.
- **Finanzas:** sección "Ingresos y aportaciones" en el Resumen con historial; "Ver todos los movimientos" de una categoría (todos los meses); selección múltiple en Movimientos (pulsación larga o "Seleccionar", "Todos", "Ninguno") y "Cambiar categoría" sin crear regla.
- **Borradores:** recetas, ingredientes, metas, planes y divisiones se guardan mientras se escriben (`mi-dia-draft`) y se ofrecen al volver si la app se recargó. Gesto de deslizar para recargar desactivado (`overscroll-behavior`) y aviso del navegador al recargar con un formulario a medias.
- **Datos de ejemplo:** el aviso lleva a una lista para quitar solo los ejemplos que queden (o conservarlos y ocultar el aviso). "Empezar de cero" avisa de que lo borra todo.
- **Corregido:** el cuadro de novedades no salía a quien no había guardado nada desde que instaló la app.
- **Botón atrás:** también sale del modo selección.

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
