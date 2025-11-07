#  Backend - App Discapacitacion

##  Descripción
    Este proyecto es el backend de la aplicación **App Discapacitacion**, desarrollado con **Node.js**, **Express**, **TypeScript** y **MySQL**.  
    La API permite gestionar información sobre pacientes, zonas, sexo, discapacidad, víctimas, grado de estudio, entre otros módulos, y provee estadísticas para el frontend en React.


##  Tecnologías utilizadas
    - **Node.js** - Entorno de ejecución
    - **Express** - Framework para crear el servidor y las rutas
    - **TypeScript** - Tipado estático y mejor mantenibilidad
    - **MySQL2** - Conector para base de datos MySQL
    - **JWT** - Autenticación por tokens
    - **bcrypt** - Encriptación de contraseñas
    - **dotenv** - Manejo de variables de entorno
    - **Zod** - Validación de datos



##  Instalación y configuración
##  Clonar el repositorio
    ```bash
    git clone https://github.com/Gutip04/App-Discapacitados
    cd app-discapacitacion

## Instalar Dependencias    
    - npm install

## Configurar variables de entorno
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=contraseña_usada
    DB_NAME=nombre_base_datos
    JWT_SECRET=tu_secreto_jwt
    
    | Comando         | Descripción                                             |
    | --------------- | ------------------------------------------------------- |
    | `npm run dev`   | Ejecuta el servidor en modo desarrollo (usa tsx watch)  |
    | `npm run build` | Compila TypeScript en la carpeta `dist/`                |
    | `npm run start` | Ejecuta la versión compilada del servidor en producción |
    | `npm run seeder`| Ejecuta una funcion que cumple con ingresar el admin    |


## Estructura del Proyecto 
    app-discapacitacion/
    │
    ├── dist/                   # Archivos compilados de TypeScript (generados por npm run build)
    ├── node_modules/           # Dependencias instaladas
    ├── Scripts/                # Scripts utilitarios (migraciones, seeds o pruebas)
    ├── src/                    # Código fuente principal del proyecto
    │   ├── controllers/        # Controladores de las rutas (lógica de negocio)
    │   ├── models/             # Modelos y consultas SQL
    │   ├── routes/             # Definición de rutas de la API
    │   ├── database/           # Configuración de conexión a MySQL
    │   ├── middlewares/        # Middlewares (auth, validaciones, etc.)
    │   ├── services/           # Lógica reutilizable (como EstadisticasService)
    │   ├── seeder/             # Funcion para ingresar un superAdmin 
    │   ├── index.ts            # Punto de entrada de la app
    │   └── app.ts              # Configuración de Express
    │
    ├── .env                    # Variables de entorno para desarrollo
    ├── .env.production         # Variables de entorno para producción
    ├── .gitignore              # Archivos



 ### Estructura de Base de Datos

## Esquema Relacional
    Tablas Principales
        - paciente - Información central de pacientes
        
        - usuarios - Sistema de autenticación y roles

## Tablas de Configuración
    zona - Clasificación urbana/rural


    barrio - Barrios por zona
    vereda - Veredas por zona
    eps - Entidades prestadoras de salud
    sexo - Masculino/Femenino
    grupo_etnico - Pertenencia étnica
    tipo_discapacidad - Tipos de discapacidad
    grado_estudio - Niveles educativos
    victima - Tipos de victimización
    estado_vida - Vivo/Fallecido

    --- Relaciones Claves 
        paciente
        ├── sexo (Masculino/Femenino)
        ├── zona (Urbana/Rural)
        ├── barrio/vereda (según zona)
        ├── eps (Entidad de salud)
        ├── tipo_discapacidad (11 categorías)
        ├── grupo_etnico (6 categorías)
        ├── victima (11 categorías)
        ├── grado_estudio (9 niveles)
        └── estado_vida (Vivo/Fallecido)

    --- Vista de Estadísticas - vista_paciente_ciclo_vida
        Propósito
            Vista especializada para generar reportes estadísticos agrupando pacientes por ciclos de vida.

            Campos Calculados
                edad - Edad actual calculada automáticamente

            ciclo_vida_nombre - Clasificación automática por rangos de edad:

                Primera infancia (0-5 años)

                Infancia (6-11 años)

                Juventud (12-25 años)

                Adultez (26-59 años)

                Adulto mayor (60+ años)

    Datos Relacionados Incluidos
    - Nombres completos de todas las relaciones (EPS, discapacidad, víctima, etc.)

    Información geográfica (zona, barrio, vereda)

    Datos demográficos (sexo, grupo étnico)


### Orden de Ejecución de Scripts

    1. Script de Creación de Base de Datos
        - modeloBaseDatos.sql
    2. Script de Población de Datos Base
        - pobladoBaseDatos.sql  
    3. Script de Datos de Prueba (Opcional)
        - datosDePrueba.sql
    4. Script de Vista para Estadísticas
        - vista_paciente_ciclo_vida.sql

### Contenido de los Scripts
    modeloBaseDatos.sql
        - Creación de base de datos
        - Tablas principales (paciente, usuarios)
        - Tablas de configuración (EPS, discapacidad, víctima, etc.)
        - Relaciones y claves foráneas
        - Restricciones de unicidad

    pobladoBaseDatos.sql
        -Sexo (Masculino, Femenino)
        -Zonas (Urbana, Rural)
        -EPS (SURA, Sanitas, Nueva EPS)
        -Tipos de discapacidad (11 categorías)
        -Grupos étnicos (6 categorías)
        -Grados de estudio (9 niveles)
        -Tipos de víctima (11 categorías)
        -Barrios y veredas por zona
        -Estados de vida (Vivo, Fallecido)

    datosDePrueba.sql
        -Pacientes de ejemplo con datos completos
        -Relaciones probadas entre todas las tablas
        -Datos para testing del sistema

    vista_paciente_ciclo_vida.sql
        -Vista con cálculos automáticos de edad
        -Clasificación por ciclos de vida
        -Todos los nombres de relaciones incluidos
        -Optimizada para consultas de dashboard


### Controladores (Controllers)

    // Gestión completa de pacientes
        src/controller/PacienteController.ts
            - listarPacientes()     // Listar con paginación y filtros
            - obtenerPaciente()     // Obtener por ID
            - crearPaciente()       // Crear nuevo paciente
            - actualizarPaciente()  // Actualizar existente
            - eliminarPaciente()    // Eliminar paciente

    // Generación de reportes estadísticos
        src/controller/EstadisticasController.ts
            - PorSexo()             // Distribución por género
            - PorZona()             // Urbana vs Rural
            - PorDiscapacidad()     // Tipos de discapacidad
            - PorEstadoVida()       // Vivo/Fallecido
            - PorVictima()          // Tipos de victimización
            - PorVictimaSiNo()      // Es Victima/No es Victima
            - PorGradoEstudio()     // Niveles educativos
            - PorGrupoEtnico()      // Pertenencia étnica
            - PorCicloVida()        // Por rangos de edad
            - pacientesPorEps()     // Distribución por EPS
            - estadisticaGeneral()  // Resumen completo

    // Autenticación y gestión de usuarios
        src/controller/AuthController.ts
            - login()               // Iniciar sesión
            - register()            // Registrar usuario
            - perfil()              // Obtener perfil
            - logout()              // Cerrar sesión
            - listarUsuarios()      // Listar usuarios (admin)
            - actualizarUsuario()   // Actualizar usuario
            - eliminarUsuario()     // Eliminar usuario

    // Controladores por Catalogo
        src/controller/
            BarrioController    // Gestión de barrios
            EpsController       // Gestión de EPS
            VeredaController    // Gestión de veredas
            TablasController    // Datos maestros (combos)

    // Controlador de Usuario
        AutController (Autenticación)
            src/controller/AuthController
                login()         // Autenticar usuario y generar sesión
                logout()        // Cerrar sesión
                verificarSesion() // Verificar sesión activa

    // UsuarioController (Gestión)
            src/controller/AuthController
                register()          // Registrar nuevo usuario (admin)
                listar()           // Listar todos los usuarios
                editar()           // Actualizar usuario
                obtenerId()        // Obtener usuario por ID  
                eliminar()         // Eliminar usuario
                cambiarPassword()  // Cambiar contraseña (superAdmin)



### Modelos (Models)

    // Operaciones CRUD para pacientes
        src/model/PacienteModel.ts    
            - obtenerTodos()        // Listar con filtros
            - obtenerPorId()        // Buscar por ID
            - crear()               // Insertar nuevo
            - actualizar()          // Actualizar existente
            - eliminar()            // Eliminar por ID
            - contar()              // Total de registros

    // Consultas especializadas para reportes
        src/model/EstadisticasModel.ts
            - contarPorSexo()           // Agrupar por género
            - contarPorZona()           // Urbana/Rural
            - contarPorDiscapacidad()   // Tipos de discapacidad
            - contarPorEstadoVida()     // Vivo/Fallecido
            - contarPorVictima()        // Tipos de victimización
            - contarPorVictimaSiNo()    // Si es Victima/No es Victima
            - contarPorGradoEstudio()   // Niveles educativos
            - contarPorGrupoEtnico()    // Grupos étnicos
            - contarPorCicloVida()      // Rangos de edad
            - contarPorEps()            // Distribución por EPS
            - obtenerResumenGeneral()   // Métricas globales

    // Modelos de Catalogos
        src/model
            BarrioModel     // CRUD barrios
            EpsModel        // CRUD EPS
            VeredaModel     // CRUD veredas
            UsuarioModel    // CRUD usuarios
            TablasAdiModel  // Datos maestros

    // Modelos de UsuarioModel
        src/model/UsuarioModel.ts
            obtener(): Promise<Usuario[]>               // Listar todos los usuarios
            buscarEmail(email: string)                  // Buscar por email
            buscarPorId(id: number)                     // Buscar por ID
            estaActivo(email: string)                   // Verificar estado activo/inactivo
            crear(nombre, email, password, rol)         // Crear usuario con hash
            actualizar(id, nombre, email, rol, activo)  // Actualizar datos
            cambiarPassword(id, nuevaPassword)          // Cambiar contraseña
            eliminar(id)                                // Eliminar usuario


### Rutas (Routes)

    // pacientesRoutes.ts
        src/routes/pacientesRoutes.ts
            GET     /api/pacientes           // Listar pacientes
            POST    /api/pacientes           // Crear paciente  
            GET     /api/pacientes/:id       // Obtener paciente
            PUT     /api/pacientes/:id       // Actualizar paciente
            DELETE  /api/pacientes/:id       // Eliminar paciente

    // estadisticasRoutes.ts
        src/routes/estadisticasRoutes.ts
            GET     /api/estadisticas/sexo              // Por género
            GET     /api/estadisticas/zona              // Por zona
            GET     /api/estadisticas/discapacidad      // Por discapacidad
            GET     /api/estadisticas/estado-vida       // Por estado vida
            GET     /api/estadisticas/victima           // Por victimización
            GET     /api/estadisticas/grado-estudio     // Por educación
            GET     /api/estadisticas/eps               // Por EPS
            GET     /api/estadisticas/grupoetnico       // Por grupo étnico
            GET     /api/estadisticas/ciclodevida       // Por ciclo vida
            GET     /api/estadisticas/general           // Resumen general

    // authRoutes.ts
        src/routes/authRoutes
            POST    /api/auth/login          // Iniciar sesión
            POST    /api/auth/register       // Registrar usuario
            GET     /api/auth/perfil         // Obtener perfil
            POST    /api/auth/logout         // Cerrar sesión
            GET     /api/auth/check          // Verificar autenticación

    ## rutas de Catalogo
        
    // barrioRoutes.ts
        src/routes/BarrioRoutes.ts
            GET     /api/barrios             // Listar barrios
            POST    /api/barrios             // Crear barrio
            PUT     /api/barrios/:id         // Actualizar barrio
            DELETE  /api/barrios/:id         // Eliminar barrio

    // epsRoutes.ts, veredaRoutes.ts - Tienen una Estructura similar


    // authRoutes
        src/routes/authRoutes
            //  Público
                POST    /api/auth/login              // Iniciar sesión
            //  Autenticado
                POST    /api/auth/logout             // Cerrar sesión
                GET     /api/auth/check              // Verificar autenticación
            //  Admin/SuperAdmin
                POST    /api/auth/register           // Registrar usuario
                GET     /api/auth/listar             // Listar usuarios
                PUT     /api/auth/editar/:id         // Actualizar usuario
                GET     /api/auth/ver/:id            // Obtener usuario por ID
                DELETE  /api/auth/:id                // Eliminar usuario
            // Solo SuperAdmin
                PUT     /api/auth/:id/password       // Cambiar contraseña forzada


### Middleware

    //AuthMiddleware
        // protegerRuta() - Verificar autenticación
        - Valida token JWT en cookies
        - Verifica que el usuario esté activo
        - Agrega información del usuario al request

        // protegerRutaAdmin() - Acceso administrativo
        - Verifica rol de administrador
        - Restringe acceso a funciones críticas

        //adminOSuperAdmin()
        - Verifica rol admin o superAdmin
        - Restringe acceso a funciones administrativas

        //soloSuperAdmin()
        - Verifica rol superAdmin exclusivamente
        - Acceso solo para operaciones críticas

    Capacidades por Rol:
        superAdmin
            -Gestión completa de usuarios
            -Cambio forzado de contraseñas
            -Todas las funciones de admin

        admin
            - Registrar/editar/eliminar usuarios
            - Gestión de pacientes y catálogos
            - Acceso a estadísticas

        usuario
            - Consulta de pacientes
            - Acceso a dashboard básico


### Validación de Datos
    // Schemas con Zod para validación
        - PacienteSchema     // Validación creación/actualización pacientes
        - UsuarioSchema      // Validación usuarios
        - BarrioSchema       // Validación barrios
        - EpsSchema          // Validación EPS
        - VeredaSchema       // Validación veredas


### Patrones Implementados
    - MVC (Model-View-Controller)
    - Model: Lógica de datos y consultas
    - View: Respuestas JSON (API REST)
    -Controller: Orquestación de lógica de negocio

    -- Separación de Responsabilidades
    -- Routes: Definición de endpoints
    -- Controllers: Lógica de aplicación
    -- Models: Acceso a datos
    -- Middleware: Cross-cutting concerns
    -- Validación Centralizada
        Schemas Zod para consistencia de datos
    -- Middleware de autenticación reutilizable
    -- Manejo centralizado de errores

### Validación con Zod

    // PacienteSchema.ts
        - Validación para creación/actualización de pacientes
        - Campos requeridos, tipos de datos, formatos

    // BarrioSchema.ts, EpsSchema.ts, VeredaSchema.ts
        - Validación para tablas de configuración

### Types
    Propósito: Definir la estructura de datos que esperan los controladores y modelos

        -- Pacientes
            // Interfaz principal - Datos completos del paciente
                export interface Paciente
            // Creación - Datos para registrar nuevo paciente (sin ID ni campos calculados)
                export type NuevoPaciente
            // MySQL - Extensión para resultados de base de datos  
                export interface PacienteSql
            // Búsqueda - Filtros para consultas paginadas
            export type PacientesFiltrados
            // SQL - Filtros para consultas sin paginación
            export type FiltrosPacienteSQL
            // Conteo - Resultado de total de registros
            interface PacienteTotalResult

        -- Usuarios
            // Interfaz principal - Datos completos del usuario
                export interface Usuario
            // MySQL - Extensión para resultados de base de datos
                export interface UsuarioSql
            // Estado - Resultado de verificación de usuario activo
                export interface ActivoResult
            // Token - Datos del usuario para JWT y autenticación
                export interface UsuarioToken

        -- Eps
            // Interfaz principal - Datos completos de la EPS
                export interface Eps
            // Creación - Datos para registrar nueva EPS (sin ID)
                export type NuevaEps
            // MySQL - Extensión para resultados de base de datos
                export interface EpsSql
            // Conteo - Resultado de total de registros
                interface EpsTotalResult
            // Búsqueda - Filtros para consultas paginadas
                export interface EpsFiltrados
            // SQL - Filtros para consultas sin paginación
                export type FiltrosEpsSql       

        -- Veredas
            // Interfaz principal - Datos completos de la vereda
                export interface Vereda
            // Creación - Datos para registrar nueva vereda (sin ID)
                export type nuevaVereda
            // MySQL - Extensión para resultados de base de datos
                export interface VeredaSql
            // Conteo - Resultado de total de registros
                interface VeredaTotalResult
            // Búsqueda - Filtros para consultas paginadas
                export interface VeredasFiltrados
            // SQL - Filtros para consultas sin paginación
                export type FiltrosVeredaSQL

        -- Barrios
            // Interfaz principal - Datos completos del barrio
                export interface Barrio
            // Creación - Datos para registrar nuevo barrio (sin ID)
                export type nuevoBarrio
            // MySQL - Extensión para resultados de base de datos
                export interface BarrioSql
            // Conteo - Resultado de total de registros
                interface BarrioTotalResult
            // Búsqueda - Filtros para consultas paginadas
                export interface BarriosFiltrados
            // SQL - Filtros para consultas sin paginación
                export type FiltrosBarrioSQL

## Servidor (index.ts)

    // Configuración inicial - Carga de variables de entorno y dependencias
        dotenv.config()

    // Middleware esencial - Manejo de cookies y JSON
        app.use(cookieParser())
        app.use(express.json())

    // Configuración CORS - Seguridad para comunicación frontend/backend
        app.use(cors({ ... }))

    // Definición de rutas API - Organización modular por recursos
        app.use('/api/barrios', barrioRoutes)
        app.use('/api/veredas', veredaRoutes)
        app.use('/api/eps', epsRoutes)
        app.use('/api/pacientes', pacienteRoutes)
        app.use('/api/auth', authRoutes)
        app.use('/api/tablas', tablasRoutes)
        app.use('/api/estadisticas', estadisticasRoutes)

    // Endpoint de salud - Monitoreo del estado del servidor
        app.get('/api/health', (_req, res) => { ... })

    // Inicialización del servidor
        app.listen(PORT, () => { ... })