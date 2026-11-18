# Mi Día · Roadmap

App personal de organización diaria y finanzas. Un solo usuario, sin servidor, sin conexión obligatoria. Los datos viven solo en el dispositivo.

## Principios

- **Privacidad:** ningún dato personal sale del dispositivo. Sin analítica, sin APIs externas, sin nube.
- **Offline:** la app abre y funciona sin internet. Todos los recursos (fuentes, lector de Excel) se sirven desde el propio proyecto.
- **Integridad financiera:**
  - El saldo de una cuenta es dinero real; los sobres de ahorro son asignaciones de ese dinero, no dinero extra.
  - Un traspaso entre cuentas propias no es ingreso ni gasto.
  - En gastos compartidos se distingue lo pagado, la parte de cada uno, lo pendiente y lo liquidado.
  - Un presupuesto nunca crea movimientos bancarios.
  - Las clasificaciones automáticas se pueden revisar; los movimientos importados no se modifican en silencio.
- **Actualizaciones seguras:** ninguna actualización borra datos. Copia de seguridad antes de cada cambio importante.
- **Simplicidad:** pocos archivos, sin frameworks. Solo se añade lo que se usa.

## Estado actual

Hoy (día/semana/mes), tareas, metas de ahorro con sobres, meal prep, quehaceres recurrentes, listas de compra, hábitos (hacer, reducir, dejar), finanzas (importación del banco, reglas que aprenden, notas, dividir movimientos, gastos compartidos, traspasos entre cuentas, resumen, presupuestos), copia de seguridad en archivo o texto.

## Fases

| # | Fase | Estado |
|---|------|--------|
| 1 | Base técnica ligera: fuentes locales, apertura sin conexión, versión, aviso de actualización, copia en archivo, indicador de espacio | Hecho |
| 2 | Mejoras de uso: notas en movimientos, editar elementos de listas, ordenar "Por clasificar" y ver el día | Hecho |
| 3 | Finanzas 2.0: dividir movimientos, gastos compartidos (informativo, sin deudas), traspasos emparejados entre cuentas | Hecho |
| 3b | Gastos recurrentes y suscripciones (junto con la previsión) | Pendiente |
| 4 | Metas: sobres dentro de la cuenta de ahorro, reparto mensual, tareas por meta, plantillas, viajes con plan frente a lo gastado | Hecho |
| 5 | Meal prep: ingredientes con precios por tienda, recetas con coste por ración, plan semanal a lista de compra, ahorro frente a comer fuera | Hecho |
| 6 | Previsión de flujo de caja y alertas en Hoy (presupuesto excedido, mínimo de seguridad) | Siguiente |
| 7 | Según necesidad: IndexedDB cuando el espacio lo pida, copias cifradas con contraseña | Pendiente |

## Fuera de alcance

Sincronización entre dispositivos, varios usuarios, conexión directa con bancos, IA en la nube, entrenamiento y notas generales.

## Criterios para dar una fase por terminada

- Lo que ya funcionaba sigue funcionando (pruebas automáticas superadas).
- Los datos existentes se conservan y la copia de seguridad se puede restaurar.
- La app abre sin conexión.
- Sin errores en consola.
