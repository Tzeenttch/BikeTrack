# 🏍️ BikeTrack

BikeTrack es una aplicación de gestión para concesionarios especializados en la venta de motocicletas. Realizada como proyecto de final de grado.

BikeTrack permite a los concesionarios llevar un control completo sobre sus ventas, ofreciendo también un apartado donde los clientes pueden reservar o comprar motocicletas directamente. Esto proporciona al concesionario un control absoluto sobre sus productos y acceso a datos para analizar sus ventas.

---

## 👥 Roles de usuario

**Usuario (Cliente)**
- Acceso a compras antiguas
- Comprar o reservar motocicletas
- Acceso al perfil personal

**Administrador**
- Acceso completo a la aplicación
- Modificar, añadir o eliminar motocicletas
- Consultar estadísticas y datos personalizados del concesionario

---

## 🛠️ Stack Tecnológico

**Frontend**
- Angular 19.2
- Tailwind CSS
- Chart.js

**Backend**
- Spring Boot 3.4.2 (API RestFul)
- MySQL (Base de datos relacional)

**Otras tecnologías**
- Figma: Diseño de prototipo
- Postman: Pruebas de la API
- GitHub: Control de versiones

---

## 📦 Estructura del Proyecto

| Carpeta   | Descripción                                    |
| --------- | ---------------------------------------------- |
| /backend  | API Rest desarrollada con Spring Boot          |
| /frontend | Aplicación Angular con Tailwind CSS y Chart.js |
| /README.md | README|

---

## 🚀 Cómo ejecutar el proyecto

### ✅ Requisitos previos

Antes de ejecutar la aplicación asegúrate de tener instalado:
- Node.js (v18 o superior)
- Angular CLI (v19.2)
- Java 17 o superior
- MySQL
- Maven
- Git

### 🔧 Configuración paso a paso

#### 🛠️ Backend (Spring Boot 3.4.2)

1.  Configurar la base de datos
    En el archivo `src/main/resources/application.properties`, ajusta la configuración de la base de datos y añade las configuraciones de correo y PayPal:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/biketrack
    spring.datasource.username=YOUR_USER
    spring.datasource.password=YOUR_PASSWORD
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true

    spring.mail.username=YOUR_MAIL
    spring.mail.password=YOUR_MAIL_PASSWORD
    spring.mail.properties.mail.smtp.auth=true
    spring.mail.properties.mail.smtp.starttls.enable=true

    paypal.client-id=YOUR_PAYPAL_CLIENT_ID
    paypal.client-secret=YOUR_PAYPAL_CLIENT_SECRET
    paypal.mode=sandbox //Cambia el modo sandbox por "live" para produccion
    ```

2.  Crear la base de datos


```sql
CREATE DATABASE biketrack;

-- Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role ENUM('employee', 'customer') NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  token VARCHAR(512)
);

-- Tabla de motocicletas
CREATE TABLE motorbikes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(50),
  model VARCHAR(100),
  year INT,
  km INT,
  image_url TEXT,
  price DECIMAL(10,2),
  description TEXT,
  available BOOLEAN DEFAULT TRUE,
  horsepower INT,
  cc INT,
  is_new BOOLEAN,
  type VARCHAR(50)
);

-- Tabla de ventas
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  motorbike_id INT,
  customer_id INT,
  salesperson_id INT,
  sale_date DATETIME DEFAULT NOW(),
  final_price DECIMAL(10,2),
  FOREIGN KEY (motorbike_id) REFERENCES motorbikes(id),
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (salesperson_id) REFERENCES users(id)
);
```

3.  Ejecutar el backend

    ```
    ./mvnw spring-boot:run
    ```

    💡 El backend estará disponible en: `http://localhost:8080`

#### 💻 Frontend (Angular 19.2 + Tailwind CSS + Chart.js)

1.  Acceder al directorio del frontend

    ```
    cd ../frontend
    ```

2.  Instalar dependencias

    ```
    npm install
    ```

3.  Instalar Chart.js

    ```
    npm install chart.js
    ```

4.  Verificar configuración de Tailwind CSS en:

    -   `tailwind.config.js`
    -   `angular.json`

5.  Ejecutar la aplicación Angular

    ```
    ng serve
    ```

    💡 La aplicación estará disponible en: `http://localhost:4200`

---

🔗 **Conexión Frontend - Backend**
El frontend está configurado para consumir la API en: `http://localhost:8080`

Si modificas el puerto o la URL del backend, actualiza las rutas en los servicios de Angular.

---

📝 **Resumen rápido de ejecución**

| Componente | Comando                  | URL                      |
| :--------- | :----------------------- | :----------------------- |
| Backend    | `./mvnw spring-boot:run` | `http://localhost:8080`  |
| Frontend   | `ng serve`               | `http://localhost:4200`  |

---

🗂️ **Estructura de Carpetas**

| Carpeta    | Descripción                                    |
| :--------- | :--------------------------------------------- |
| `/backend` | API Rest desarrollada con Spring Boot          |
| `/frontend` | Aplicación Angular con Tailwind CSS y Chart.js |
| `/README` | Instrucciones del proyecto |


---

🗺️ **Mapa de la aplicación**

### 🔐 Inicio
- Página de login.
- Registro de nuevos usuarios.
- Navegación pública.

### 👤 Cliente (Usuario)
- **Listado de motocicletas:** Visualización de motos nuevas y de ocasión.
- **Detalle de motocicleta:** Información individual de cada moto.
- **Reservar / Comprar motocicleta:** Opciones para gestionar compras o reservas.
- **Perfil de usuario:** Visualización y edición de datos personales.
- **Historial de compras:** Listado de compras anteriores.

### 🛠️ Administrador
- **Acceso total de la aplicacion:** Navegacion regular como usuario.
- **Gestión de motocicletas:** Crear, editar o eliminar motos.
- **Panel de estadísticas:** Gráficas y métricas de ventas.

---

🗃️ **Base de Datos**
Las tablas principales son:

-   `users`
-   `motorbikes`
-   `sales`
