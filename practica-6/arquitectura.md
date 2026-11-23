# Arquitectura del Sistema (Modelo C4)

## Nivel 1 · Diagrama de Contexto del Sistema

Muestra el sistema de ventas de camisas (*Tienda Camisas*) en su entorno, los actores que interactúan con él y los sistemas externos de los que depende.

```mermaid
flowchart TB
    cliente["👤 Cliente / Comprador\nNavega el catálogo y realiza pedidos"]
    admin["🛠️ Administrador / QA\nGestiona productos, roles y valida entregas"]
    sistema["🛒 Tienda Camisas\nAplicación web de e-commerce y gestión de pedidos"]
    supabase["☁️ Supabase\nBase de datos PostgreSQL y autenticación"]
    pagos["💳 Pasarela / Notificaciones\nProcesamiento de pagos y avisos de pedido"]

    cliente -->|"Consulta catálogo y registra compras"| sistema
    admin -->|"Administra inventario, roles y revisa flujo QA"| sistema
    sistema -->|"Lee/escribe datos y valida sesión"| supabase
    sistema -->|"Envía confirmaciones y estados de orden"| pagos
```

### Justificación · Nivel 1 (Contexto)
* **Delimitación clara del alcance:** Separa el sistema central de e-commerce de los actores externos (`Cliente`, `Administrador / QA`) y de las dependencias externas (`Supabase` y servicios de pago/notificación).
* **Trazabilidad de reglas de negocio:** Permite ubicar dónde residen las validaciones de pedidos, cálculos de totales y permisos por rol antes de bajar a detalles técnicos de implementación.

---

## Nivel 2 · Diagrama de Contenedores

Detalla las piezas ejecutables/almacenamiento principales dentro del sistema y cómo se comunican entre sí.

```mermaid
flowchart TB
    usuario["👤 Cliente / Admin"]

    subgraph webApp["Contenedor: Aplicación Web (Frontend)"]
        ui["🖥️ Interfaz Web & Vistas\nCatálogo, carrito y panel de administración"]
        appLogic["⚙️ Casos de Uso y Reglas de Negocio\nCálculo de desglose de pedido, validaciones y control de roles"]
        adapter["🔌 Adaptador de Datos / Cliente Supabase\nEncapsula consultas y mapea entidades"]
    end

    subgraph cloud["Contenedor: Plataforma Backend (Supabase)"]
        auth["🔐 Auth & Roles\nGestión de sesiones y permisos"]
        db[("🗄️ PostgreSQL Database\nTablas de productos, pedidos y usuarios")]
    end

    usuario -->|"Interactúa vía navegador"| ui
    ui -->|"Invoca casos de uso y validaciones"| appLogic
    appLogic -->|"Usa interfaz/adaptador de persistencia"| adapter
    adapter -->|"Consultas y mutaciones (HTTPS/API)"| db
    appLogic -->|"Verifica sesión y rol"| auth
```

### Justificación · Nivel 2 (Contenedores)
* **Separación de responsabilidades y regla de dependencia:** La capa de interfaz (`Interfaz Web & Vistas`) y las reglas/casos de uso (`Cálculo de desglose de pedido`, validaciones y control de roles) se mantienen desacopladas de los detalles de infraestructura (`Supabase` / `PostgreSQL`).
* **Facilidad de pruebas y evolución:** Aislar el acceso a datos detrás de un adaptador permite probar la lógica de negocio sin depender directamente de la base de datos remota y facilita cambiar o extender integraciones en el futuro.