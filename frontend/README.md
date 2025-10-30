#  Frontend - App Discapacitacion


##  Descripción
    Aplicación frontend desarrollada con React 18, TypeScript y Vite. Proporciona una interfaz moderna y responsive para gestionar pacientes, visualizar estadísticas y administrar el sistema.


### Tecnologías Utilizadas
    ### Dependencias Principales
        // React y Núcleo
            React 19.1.1           // Biblioteca de UI - Versión más reciente
            React DOM 19.1.1       // Renderizado para navegadores
            TypeScript ~5.9.3      // Tipado estático y mejor desarrollo

        // Enrutamiento y Estado
            React Router DOM 7.9.4 // Navegación client-side
            React Hook Form 7.65.0 // Manejo avanzado de formularios

        // HTTP y APIs
            Axios 1.12.2           // Cliente HTTP para comunicación con backend

        // UI y Gráficos
            Recharts 3.3.0         // Librería de gráficos y visualizaciones
            React Select 5.10.2    // Componentes select avanzados
            Lucide React 0.546.0   // Iconografía moderna

        // Validación y Utilidades
            Zod 4.1.12             // Validación de esquemas
            @hookform/resolvers 5.2.2 // Integración Zod con React Hook Form

    ### Dev Dependencies

        // Build y Desarrollo
            Vite 7.1.7             // Build tool rápido y moderno
            @vitejs/plugin-react-swc 4.1.0 // Plugin React con SWC

        // Estilos
            Tailwind CSS 3.4.18    // Framework de CSS utility-first
            PostCSS 8.5.6          // Procesamiento de CSS
            Autoprefixer 10.4.21   // Prefixes automáticos para CSS

        // Linting y Calidad
            ESLint 9.36.0          // Análisis estático de código
            TypeScript ESLint 8.45.0 // Reglas ESLint para TypeScript

        // Tipos
            @types/react 19.1.16   // Tipos para React
            @types/react-dom 19.1.9 // Tipos para React DOM
            @types/react-router-dom 5.3.3 // Tipos para React Router

### Stack Tecnológico Completo
   
    # Framework y Render
        React 19 + TypeScript + Vit
    # Estilos y UI  
        Tailwind CSS + Lucide React
    # Navegación y Estado
        React Router DOM + React Hook Form
    # Gráficos y Visualización
        Recharts + React Select
    # Comunicación y Validación
        Axios + Zod + @hookform/resolvers

### Características Técnicas
    - Hot Module Replacement (HMR) con Vite
    - TypeScript estricto para mayor confiabilidad
    - CSS utility-first con Tailwind
    - Formularios tipo con React Hook Form + Zod
    - Gráficos interactivos con Recharts
    - Iconografía consistente con Lucide
    - Build optimizado para producción

###  Instalación y configuración
    git clone https://github.com/Gutip04/App-Discapacitados.git
    cd App-Discapacitados/frontend

### Instalar Dependencias    
    - npm install

### Configurar Variables de Entorno
    -- Crear archivo .env en la carpeta frontend/:
        - VITE_API_URL=http://localhost:3000/api

    | Comando           | Descripción                                             |
    | ------------------| ------------------------------------------------------- |
    | `npm run dev`     | Ejecuta el servidor en modo desarrollo (usa tsx watch)  |
    | `npm run build`   | Compila TypeScript en la carpeta `dist/`                |
    | `npm run Preview` | Ejecuta la versión compilada del servidor en producción |


### Estructura del Proyecto 
    frontend/
    ├── dist/                          # Build de producción
    ├── node_modules/                  # Dependencias
    ├── public/                        # Archivos estáticos
    ├── src/                           # CÓDIGO FUENTE
    │   ├── assets/                    # Recursos estáticos
    │   ├── components/                # COMPONENTES REUTILIZABLES
    │   │   ├── ui/                    # Componentes de UI base
    │   │   ├── Footer.tsx             # Footer de la aplicación
    │   │   ├── Header.tsx             # Header con navegación
    │   │   └── ProtectedRoute.tsx     # Ruta protegida para auth
    │   ├── config/                    # CONFIGURACIONES
    │   │   └── axios.ts               # Configuración de Axios
    │   ├── context/                   # CONTEXTO GLOBAL
    │   │   ├── AuthContext.tsx        # Contexto de autenticación
    │   │   └── AuthProvider.tsx       # Proveedor del contexto
    │   ├── hooks/                     # CUSTOM HOOKS
    │   │   ├── UseAuth.ts             # Hook para autenticación
    │   │   ├── UseBarrios.ts          # Hook para barrios
    │   │   ├── UseEps.ts              # Hook para EPS
    │   │   ├── UsePacientes.ts        # Hook para pacientes
    │   │   ├── UseTabla.ts            # Hook para tablas
    │   │   └── UseVeredas.ts          # Hook para veredas
    │   ├── pages/                     # PÁGINAS/VISTAS
    │   │   ├── Auth/                  # Páginas de autenticación
    │   │   ├── Autorizacion/          # Páginas de autorización
    │   │   ├── Barrios/               # Gestión de barrios
    │   │   ├── DashBoard/             # Dashboard principal
    │   │   ├── Eps/                   # Gestión de EPS
    │   │   ├── Estadisticas/          # Estadísticas y reportes
    │   │   ├── Index/                 # Página de inicio
    │   │   ├── Pacientes/             # Gestión de pacientes
    │   │   ├── Veredas/               # Gestión de veredas
    │   │   └── LayoutPrincipal.tsx    # Layout principal
    │   ├── router/                    # CONFIGURACIÓN DE RUTAS
    │   │   ├── AppRouter.tsx          # Router principal
    │   │   ├── Auth.tsx               # Rutas de autenticación
    │   │   ├── Barrios.tsx            # Rutas de barrios
    │   │   ├── Dashboard.tsx          # Rutas del dashboard
    │   │   ├── Eps.tsx                # Rutas de EPS
    │   │   ├── Estadisticas.tsx       # Rutas de estadísticas
    │   │   ├── Index.tsx              # Rutas de inicio
    │   │   ├── Pacientes.tsx          # Rutas de pacientes
    │   │   └── Vereda.tsx             # Rutas de veredas
    │   ├── services/                  # SERVICIOS API
    │   │   ├── AuthService.ts         # Servicio de autenticación
    │   │   ├── BarrioService.ts       # Servicio de barrios
    │   │   ├── EpsService.ts          # Servicio de EPS
    │   │   ├── EstadisticasService.ts # Servicio de estadísticas
    │   │   ├── PacientesService.ts    # Servicio de pacientes
    │   │   ├── TablasService.ts       # Servicio de tablas
    │   │   └── VeredaService.ts       # Servicio de veredas
    │   ├── types/                     # DEFINICIONES TYPESCRIPT
    │   │   ├── BarriosTypes.d.ts      # Tipos para barrios
    │   │   ├── EpsTypes.d.ts          # Tipos para EPS
    │   │   ├── PacientesTypes.d.ts    # Tipos para pacientes
    │   │   └── VeredasTypes.d.ts      # Tipos para veredas
    │   ├── utils/                     # UTILIDADES
    │   ├── App.css                    # Estilos globales
    │   ├── App.tsx                    # Componente principal
    │   ├── index.css                  # Estilos base
    │   └── main.tsx                   # Punto de entrada
    ├── .env                           # Variables de entorno
    ├── .gitignore                     # Archivos ignorados por Git
    ├── eslint.config.js               # Configuración ESLint
    ├── index.html                     # HTML principal
    ├── package.json                   # Dependencias y scripts
    ├── postcss.config.js              # Configuración PostCSS
    ├── README.md                      # Documentación
    ├── tailwind.config.js             # Configuración Tailwind
    ├── tsconfig.app.json              # TypeScript (app)
    ├── tsconfig.json                  # TypeScript principal
    ├── tsconfig.node.json             # TypeScript (Node)
    └── vite.config.ts                 # Configuración Vite

### Conexion a la Api
    Axios 1.12.2           // Cliente HTTP para comunicación con backend

    Propósito: Configuración centralizada del cliente HTTP

        ### Características:
            - Base URL dinámica por entorno
            - Cookies automáticas para autenticación
            - Headers JSON estándar
            - Uso centralizado en todos los servicios
        ### Configuración:
            - baseURL: Variable entorno VITE_API_URL o localhost:3000/api
            - withCredentials: true para cookies de autenticación
            - headers: Content-Type: application/json
        ### Servicios que la usan:
            - AuthService - Autenticación y usuarios
            - PacientesService - Gestión de pacientes
            - EstadisticasService - Datos para gráficos
            - BarrioService, EpsService, VeredaService, TablasService - Catálogos


### Descripción de Componentes:
    App-Discapacitacion\frontend\src\components

        #### **Header.tsx**
            - **Propósito**: Navegación principal y información de usuario
            - **Características**:
            - Menú de navegación entre módulos
            - Información de usuario logueado
            - Botón de logout
            - Responsive design
            - **Dependencias**: React Router, AuthContext

        #### **Footer.tsx**
            - **Propósito**: Información general y enlaces secundarios
            - **Contenido**:
            - Copyright
            - Información de la aplicación
            - Enlaces legales

        #### **ProtectedRoute.tsx**
            - **Propósito**: Proteger rutas que requieren autenticación
            - **Lógica**:
            - Verifica si el usuario está autenticado
            - Redirige al login si no está autenticado
            - Renderiza el componente hijo si está autenticado

        #### **ui/**
            - **Propósito**: Componetes Reutilizables
            - **Lógica**:
            - Se usan para reutilizar Componetes y evitar un Codigo mas extenso


### Descripción de Paginas
    App-Discapacitacion\frontend\src\pages

        ## Pages - Vistas de la Aplicación

        ###  Módulos de Páginas:

            #### **Auth/** - Autenticación
                - Login.tsx
                - Register.tsx (si aplica)
                - **Funcionalidad**: Formularios de acceso al sistema

            #### **DashBoard/** - Panel Principal
                - Vista general del sistema
                - Métricas rápidas
                - Accesos directos

            #### **Pacientes/** - Gestión de Pacientes
                - Lista de pacientes
                - Formulario de registro/edición
                - Detalle de paciente
                - **CRUD Completo**: Create, Read, Update, Delete

            #### **Estadisticas/** - Reportes y Análisis
                - Gráficos y visualizaciones
                - Reportes exportables
                - Métricas del sistema

            #### **Catálogos (Barrios/, Eps/, Veredas/)**
                - Gestión de datos maestros
                - Formularios de mantenimiento
                - Listas para selección en otros módulos

            #### **LayoutPrincipal.tsx**
                - **Propósito**: Layout base para páginas autenticadas
                - **Incluye**: Header, Footer, área de contenido principal
                - **Manejo**: Estado de carga y errores globales

### Descripción de Servicios
    App-Discapacitacion\frontend\src\services

    -Indice de Servicios
    Servicio	            Archivo	                    Descripción	                            Métodos

    AuthService	            AuthService.ts	            Autenticación y gestión de usuarios	    10 métodos
    PacientesService	    PacientesService.ts	        Gestión completa de pacientes	        6 métodos
    BarrioService	        BarrioService.ts	        Catálogo de barrios	                    7 métodos
    EpsService	            EpsService.ts	            Catálogo de EPS	                        7 métodos
    VeredaService	        VeredaService.ts	        Catálogo de veredas	                    7 métodos
    EstadisticasService	    EstadisticasService.ts	    Reportes y métricas	                    10 métodos
    TablasService	        TablasService.ts	        Tablas maestras del sistema	            4 métodos


    ### AuthService - Servicio de Autenticación
        Propósito
            Gestión completa de usuarios, autenticación y autorización del sistema.
    Métodos:
        login() - Iniciar sesión de usuario
        Endpoint: POST /auth/login

        logout() - Cerrar sesión del usuario actual
        Endpoint: POST /auth/logout

        check() - Verificar si el usuario está autenticado
        Endpoint: GET /auth/check

        register() - Registrar nuevo usuario en el sistema
        Endpoint: POST /auth/register

        listarUsuarios() - Obtener lista completa de usuarios
        Endpoint: GET /auth/listar

        obtenerUsuarioPorId() - Obtener información de usuario específico por ID
        Endpoint: GET /auth/ver/:id

        editarUsuario() - Actualizar información de usuario existente
        Endpoint: PUT /auth/editar/:id

        cambiarPassword() - Cambiar contraseña de usuario
        Endpoint: PUT /auth/:id/password

        eliminarUsuario() - Eliminar usuario del sistema
        Endpoint: DELETE /auth/:id

    ### PacientesService - Gestión Completa de Pacientes

        Métodos:
        obtenerTodos() - Obtener lista completa de pacientes
        Endpoint: GET /pacientes

        crear() - Crear nuevo paciente en el sistema
        Endpoint: POST /pacientes

        editar() - Actualizar información de paciente existente
        Endpoint: PUT /pacientes/:id

        eliminar() - Eliminar paciente del sistema
        Endpoint: DELETE /pacientes/:id

        buscarPorIdentificacion() - Buscar paciente por número de identificación
        Endpoint: GET /pacientes/:identificacion

        filtrar() - Buscar pacientes con filtros avanzados
        Endpoint: GET /pacientes/filtrados

    ### BarrioService - Catálogo de Barrios
        
        Métodos:
        obtenerTodos() - Obtener lista completa de barrios
        Endpoint: GET /barrios

        crear() - Crear nuevo barrio en el sistema
        Endpoint: POST /barrios

        editar() - Actualizar información de barrio existente
        Endpoint: PUT /barrios/:id

        eliminar() - Eliminar barrio del sistema
        Endpoint: DELETE /barrios/:id

        obtenerUno() - Obtener información de barrio específico
        Endpoint: GET /barrios/:id

        buscarPorNombre() - Buscar barrio por nombre
        Endpoint: GET /nombre/:nombre

        filtrar() - Buscar barrios con filtros avanzados
        Endpoint: GET /barrios/filtrados

    ### EpsService - Catálogo de EPS
        
        Métodos:
        obtenerTodos() - Obtener lista completa de EPS
        Endpoint: GET /eps

        crear() - Crear nueva EPS en el sistema
        Endpoint: POST /eps

        editar() - Actualizar información de EPS existente
        Endpoint: PUT /eps/:id

        eliminar() - Eliminar EPS del sistema
        Endpoint: DELETE /eps/:id

        obtenerUno() - Obtener información de EPS específica
        Endpoint: GET /eps/:id

        buscarPorNombre() - Buscar EPS por nombre
        Endpoint: GET /nombre/:nombre

        filtrar() - Buscar EPS con filtros avanzados
        Endpoint: GET /eps/filtrados

    ### VeredaService - Catálogo de Veredas

        Métodos:
        obtenerTodos() - Obtener lista completa de veredas
        Endpoint: GET /veredas

        crear() - Crear nueva vereda en el sistema
        Endpoint: POST /veredas

        editar() - Actualizar información de vereda existente
        Endpoint: PUT /veredas/:id

        eliminar() - Eliminar vereda del sistema
        Endpoint: DELETE /veredas/:id

        obtenerUno() - Obtener información de vereda específica
        Endpoint: GET /veredas/:id

        buscarPorNombre() - Buscar vereda por nombre
        Endpoint: GET /nombre/:nombre

        filtrar() - Buscar veredas con filtros avanzados
        Endpoint: GET /veredas/filtrados

    ### EstadisticasService - Servicio de Reportes y Métricas

        Métodos:
        General() - Obtener estadísticas generales del sistema
        Endpoint: GET /estadisticas/general

        Sexo() - Obtener estadísticas por sexo/género
        Endpoint: GET /estadisticas/sexo

        Zona() - Obtener estadísticas por zona geográfica
        Endpoint: GET /estadisticas/zona

        EstadoVida() - Obtener estadísticas por estado de vida
        Endpoint: GET /estadisticas/estado-vida

        Discapacidad() - Obtener estadísticas por tipo de discapacidad
        Endpoint: GET /estadisticas/discapacidad

        Victima() - Obtener estadísticas de víctimas
        Endpoint: GET /estadisticas/victima

        VictimaSiNo() - Obtener estadísticas binarias de víctimas
        Endpoint: GET /estadisticas/victima-si-no

        GradoEstudio() - Obtener estadísticas por nivel educativo
        Endpoint: GET /estadisticas/grado-estudio

        Eps() - Obtener estadísticas por EPS
        Endpoint: GET /estadisticas/eps

        GruposEtnicos() - Obtener estadísticas por grupo étnico
        Endpoint: GET /estadisticas/grupoetnico

        CicloVida() - Obtener estadísticas por ciclo de vida
        Endpoint: GET /estadisticas/ciclodevida


    ### TablasService - Tablas Maestras del Sistema
        
        Métodos:
        TodosDiscapacidad() - Obtener catálogo completo de tipos de discapacidad
        Endpoint: GET /tablas/tipoDiscapacidad

        TodosGrupoEtnico() - Obtener catálogo completo de grupos étnicos
        Endpoint: GET /tablas/grupoEtnico

        Todosvictimas() - Obtener catálogo completo de tipos de víctimas
        Endpoint: GET /tablas/victimas

        TodosgradoEstudio() - Obtener catálogo completo de grados de estudio
        Endpoint: GET /tablas/gradoEstudio



### Descripción de Routes
    App-Discapacitacion\frontend\src\router

    Configuración de Protección:
        Rutas Públicas: Acceso sin autenticación
        Rutas Protegidas: Requieren autenticación (ProtectedRoute)
        Rutas Admin: Requieren rol de administrador (AdminRoute)
        Layout Común: LayoutPrincipal para todas las rutas autenticadas

    ## Index.tsx - Rutas Públicas

        Rutas:
            / - Página de inicio (LandingPage)
            /login - Formulario de inicio de sesión
        Componentes:
            LandingPage - Página principal pública
            Login - Formulario de autenticación


    ## Pacientes.tsx - Gestión de Pacientes
        
        Rutas:
            /pacientes/ - Lista de pacientes
            /pacientes/:identificacion - Detalle de paciente específico
            /pacientes/crear - Formulario de creación
            /pacientes/editar/:identificacion - Formulario de edición

        Componentes:
            ListarPacientes - Lista y búsqueda de pacientes
            UnicoPaciente - Vista detallada de paciente
            CrearPaciente - Formulario de registro
            EditarPaciente - Formulario de actualización


    ## Barrios.tsx - Gestión de Barrios

        Rutas:
            /barrios/ - Lista de barrios
            /barrios/crear - Formulario de creación
            /barrios/editar/:id - Formulario de edición
        Componentes:
            ListarBarrios - Lista y gestión de barrios
            CrearBarrio - Formulario de creación
            EditarBarrio - Formulario de actualización


    ## Vereda.tsx - Gestión de Veredas
        
        Rutas:
            /veredas/ - Lista de veredas
            /veredas/crear - Formulario de creación
            /veredas/editar/:id - Formulario de edición

        Componentes:
            ListarVereda - Lista y gestión de veredas
            CrearVereda - Formulario de creación
            EditarVereda - Formulario de actualización

    ## Eps.tsx - Gestión de EPS
        
        Rutas:
            /eps/ - Lista de EPS
            /eps/crear - Formulario de creación
            /eps/editar/:id - Formulario de edición
        Componentes:
            ListarEps - Lista y gestión de EPS
            CrearEps - Formulario de creación
            EditarEps - Formulario de actualización

    ## Estadisticas.tsx - Reportes y Métricas
        
        Rutas:
            /estadisticas/ - Dashboard de estadísticas

        Componentes:
            Estadisticas - Vista principal de reportes

    ## Dashboard.tsx - Panel de Control
        
        Rutas:
            /dashboard/ - Panel principal

        Componentes:
            Dashboard - Vista del dashboard con métricas

    ## Auth.tsx - Administración de Usuarios
        
        Rutas:
            /auth/register - Registro de nuevos usuarios
            /auth/listarusuarios - Lista de usuarios del sistema
            /auth/editarusuario/:id - Edición de usuario
            /auth/editarpassword/:id - Cambio de contraseña (comentado)
        Componentes:
        RegisterPage - Formulario de registro
        ListarUsuarios - Lista y gestión de usuarios
        EditarUsuario - Formulario de edición de usuario
        EditarPassword - Cambio de contraseña (pendiente)




    ## Sistema de Protección de Rutas
        
        - ProtectedRoute
            Propósito: Verificar autenticación antes de renderizar
            Acción: Redirige a login si no está autenticado
            Uso: En todas las rutas de gestión del sistema

        - AdminRoute
            Propósito: Verificar rol de administrador
            Acción: Restringe acceso a usuarios sin privilegios
            Uso: Solo en rutas de administración de usuarios

        - LayoutPrincipal
            Propósito: Layout común para todas las rutas autenticadas
            Contenido: Header, navegación, área de contenido, footer
            Uso: Envuelve todas las rutas protegidas

    ## Flujo de Navegación Típico

        Usuario no autenticado:
            / → /login → (autenticación) → /dashboard/
        Usuario autenticado:
            /dashboard/ → /pacientes/ → /pacientes/crear → /estadisticas/
        Administrador:
            /dashboard/ → /auth/listarusuarios → /auth/register

    ## Patrones de URL

        Para Listas:
            /modulo/                            - Lista principal
        Para Creación:
            /modulo/crear                       - Formulario de creación
        Para Edición:
            /modulo/editar/:id                  - Formulario de edición (por ID)
            /modulo/editar/:identificacion      - Formulario de edición (por identificación)
        Para Detalle:
            /modulo/:id                         - Vista detallada
            /modulo/:identificacion             - Vista detallada por identificación
        




### hooks

    ## Índice de Hooks

        Hook	        Archivo	            Propósito	                            Estado Retornado

        useAuth	        UseAuth.ts	        Acceso al contexto de autenticación 	Contexto auth
        useBarrios	    UseBarrios.ts	    Gestión de estado de barrios	        Barrios, loading, error
        UseEps	        UseEps.ts	        Gestión de estado de EPS	            EPS, loading, error
        usePacientes	UsePacientes.ts	    Gestión de estado de pacientes	        Pacientes, loading, error
        UseVeredas	    UseVeredas.ts	    Gestión de estado de veredas	        Veredas, loading, error
        useTabla	    UseTabla.ts	Hook    genérico para tablas	                Data, loading, error


    ## useAuth - Hook de Autenticación

        Propósito:
            Acceder al contexto de autenticación desde cualquier componente
        Implementación:
            Método: useContext para acceder a AuthContext
        Validación: Verifica que esté dentro de AuthProvider
        Error: Lanza error si se usa fuera del provider

        Retorno:
            typescript
            {
            user,        // Usuario autenticado
            login,       // Función de login
            logout,      // Función de logout
            isLoading    // Estado de carga
            }



    ## useBarrios - Hook de Gestión de Barrios

        Propósito:
            Gestionar el estado, filtros y operaciones CRUD de barrios

        Estado Interno:
            barrios - Lista de barrios
            total - Conteo total de registros
            loading - Estado de carga
            error - Mensajes de error
            filtros - Filtros de búsqueda actuales

        Métodos:
            buscarBarrios() - Buscar barrios con filtros aplicados
            eliminarBarrio(id) - Eliminar barrio por ID
            setFiltros() - Actualizar filtros de búsqueda

        Características:
            - Limpieza automática de filtros vacíos
            - Manejo de errores tipado
            - Actualización optimizada con useCallback
            - Carga automática al cambiar filtros

    ## UseEps - Hook de Gestión de EPS
        
        Propósito:
            Gestionar el estado, filtros y operaciones CRUD de EPS

        Estado Interno:
            eps - Lista de EPS
            total - Conteo total de registros
            loading - Estado de carga
            error - Mensajes de error
            filtros - Filtros de búsqueda actuales

        Métodos:
            buscarEps() - Buscar EPS con filtros aplicados
            eliminarEps(id) - Eliminar EPS por ID
            setFiltros() - Actualizar filtros de búsqueda

        Patrón Similar a:
            useBarrios (misma estructura y comportamiento)

    ## usePacientes - Hook de Gestión de Pacientes
        
        Propósito:
            Gestionar el estado, filtros y operaciones CRUD de pacientes

        Estado Interno:
            pacientes - Lista de pacientes
            total - Conteo total de registros
            loading - Estado de carga
            error - Mensajes de error
            filtros - Filtros de búsqueda avanzados

        Métodos:
            buscarPacientes() - Buscar pacientes con filtros aplicados
            eliminarPaciente(id) - Eliminar paciente por ID
            setFiltros() - Actualizar filtros de búsqueda
            Filtros Especializados:
            nombres_apellidos - Búsqueda por nombre
            eps_id - Filtro por EPS
            zona_id - Filtro por zona

        Características:
            - Limpieza avanzada de filtros opcionales
            - Manejo de múltiples criterios de búsqueda
            - Optimizado para grandes volúmenes de datos

    ## UseVeredas - Hook de Gestión de Veredas
        
        Propósito:
            Gestionar el estado, filtros y operaciones CRUD de veredas

        Estado Interno:
            veredas - Lista de veredas
            total - Conteo total de registros
            loading - Estado de carga
            error - Mensajes de error
            filtros - Filtros de búsqueda actuales

        Métodos:
            buscarVeredas() - Buscar veredas con filtros aplicados
            eliminarVereda(id) - Eliminar vereda por ID
            setFiltros() - Actualizar filtros de búsqueda
            Patrón Similar a:
            useBarrios y UseEps (estructura consistente)

    ## useTabla - Hook Genérico para Tablas

        Propósito:
            Hook reutilizable para manejar datos tabulares con carga y errores

        Estado Interno:
            data - Datos de la tabla (genérico)
            loading - Estado de carga
            error - Mensajes de error
        Parámetros:
            fetchFunction - Función que retorna Promise con datos

        Características:
            - Genérico (TypeScript) para cualquier tipo de datos
            - Prevención de actualizaciones en componentes desmontados
            - Manejo automático de estados de carga y error
            - Reutilizable across diferentes tablas





### context

    - Índice del Context
        Componente	    Archivo	Propósito	Estado                                      Proporcionado
        
        AuthContext	    AuthContext.tsx	    Definir la estructura del contexto	        Tipos e interfaces
        AuthProvider	AuthProvider.tsx	Implementar la lógica de autenticación	    Usuario, estado, funciones

    ## AuthContext - Definición del Contexto
        Propósito:
            Definir la estructura de datos y funciones que estarán disponibles en toda la aplicación para la autenticación.

        Interfaces Definidas:
            Usuario: Modelo de datos del usuario (id, email, rol)
            AuthContextType: Contrato del contexto (usuario, estado, funciones)

        Características:
            Tipado estricto con TypeScript
            Valor inicial undefined para forzar uso dentro del Provider
            Separación clara entre definición e implementació

    ## AuthProvider - Proveedor de Autenticación
        Propósito:
            Gestionar el estado global de autenticación y proporcionar funciones para login/logout a toda la aplicación.

        Estado Interno:
            usuario: Información del usuario autenticado o null
            cargando: Estado de carga durante verificaciones

        Funciones Principales:
            Verificación Automática (useEffect)
            Propósito: Verificar sesión al cargar la aplicación
            Flujo:
                Llama a AuthService.check()
                Si éxito: establece usuario
                Si error: establece usuario null
                Finalmente: desactiva estado de carga

        Login
            Propósito: Autenticar usuario en el sistema
            Flujo:
                Llama AuthService.login con credenciales
                Verifica estado con AuthService.check
                Actualiza estado del usuario
                Retorna datos del usuario

        Logout
            Propósito: Cerrar sesión del usuario
            Flujo:
                Llama AuthService.logout
                Limpia estado del usuario a null

        Valor Proporcionado:
            typescript
            {
            usuario,    // Usuario autenticado o null
            cargando,   // Estado de carga (boolean)
            login,      // Función para iniciar sesión
            logout      // Función para cerrar sesión
            }

    ## Flujos de Autenticación
        Al Iniciar la Aplicación:

            App carga → AuthProvider se monta → 
            Verificación automática con servidor →
            - Éxito: usuario establecido
            - Error: usuario = null
            → Estado cargando = false
            
        Proceso de Login:

            Usuario ingresa credenciales → 
            login() ejecutado → 
            Autenticación con servidor → 
            Verificación de estado → 
            Usuario establecido en contexto

        Proceso de Logout:

            Usuario solicita logout → 
            logout() ejecutado → 
            Cierre de sesión en servidor → 
            Usuario establecido a null




### Types

    - Índice de Tipos
        Archivo	                Tipos Definidos	    Propósito
        
        BarriosTypes.d.ts	    Barrio	            Tipo para datos de barrios
        EpsTypes.d.ts	        Eps	                Tipo para Entidades Promotoras de Salud
        PacientesTypes.d.ts	    Paciente,           PacienteEditar, NuevoPaciente, FiltrosPaciente	Tipos completos para gestión de pacientes
        VeredasTypes.d.ts	    Vereda	            Tipo para datos de veredas

    - BarriosTypes.d.ts - Tipos para Barrios
        
        Propósito:
            Definir la estructura de datos para los barrios del sistema, incluyendo su relación con zonas.

        Campos:
            id: Identificador único en la base de datos
            nombre: Nombre descriptivo del barrio
            zona_id: Relación con la zona geográfica
            zona_nombre: Nombre de la zona para mostrar en interfaces

    - EpsTypes.d.ts - Tipos para EPS
        
        Propósito:
            Definir la estructura básica para las Entidades Promotoras de Salud del sistema.

        Campos:
            id: Identificador único en el sistema
            nombre: Nombre oficial de la EPS

    - PacientesTypes.d.ts - Tipos para Pacientes
        Paciente Interface:
            Propósito: Representa un paciente completo con todos sus datos y relaciones.

        Campos Principales:

        Información Básica:
            id: Identificador único
            identificacion: Número de identificación
            nombres_apellidos: Nombre completo
            fecha_nacimiento: Fecha de nacimiento
            edad: Edad calculada
            telefono: Número de contacto
            direccion: Dirección residencial
            Ubicación Geográfica:
            zona_id, barrio_id, vereda_id: IDs de ubicación
            zona_nombre, barrio_nombre, vereda_nombre: Nombres para display

        Salud y Discapacidad:
            eps_id, eps_nombre: EPS del paciente
            tipo_discapacidad_id, tipo_discapacidad_nombre: Tipo de discapacidad
            diagnostico_discapacidad: Diagnóstico específico

        Situación Social:
            estado_vida_id, estado_vida_nombre: Estado de vida
            victima, victima_id, victima_nombre: Situación de víctima
            grado_estudio_id, grado_estudio_nombre: Nivel educativo
            grupo_etnico_id, grupo_etnico_nombre: Grupo étnico

        Indicadores Booleanos:
            trabaja: Si está empleado
            estudia: Si está estudiando
            sustento: Si tiene sustento económico
            vivienda: Si tiene vivienda
            cultura_recreacion: Si participa en actividades culturales

    - VeredasTypes.d.ts - Tipos para Veredas
        Propósito:
            Definir la estructura de datos para las veredas del sistema, similar a barrios pero para áreas rurales.

        Campos:
            id: Identificador único en la base de datos
            nombre: Nombre descriptivo de la vereda
            zona_id: Relación con la zona geográfica
            zona_nombre: Nombre de la zona para mostrar en interfaces

