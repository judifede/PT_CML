# Prueba Técnica CML

- Decisiones técnicas: 
    - **Mono-repo** con el **workspace de pnpm** por su fácil implementación. Esto nos permite ejecutar el servidor de backend y el de frontend a la vez desde la raíz del proyecto. Más detalles en el apartado de Instalación.
    - He elegido **Node + React** por ser el stack más reciente que he utilizado para un proyecto de estas características.
    - He elegido **Tailwind** para el sistema de diseño para maquetar más rápido en línea y para la importación de recursos vinculados a éste (**flowbite-react** para el **Tooltip** de "modo creativo" y el fondo de **https://bg.ibelick.com/**)
    - He usado **Prisma** porque me parece un **ORM** muy flexible y mi favorito para Node. Además para facilitar la prueba de la aplicación elegimos **SQLite** como base de datos.

- Buenas prácticas: 
    - Las peticiones a la API las gestionamos desde la carpeta **src\Services**. Al ser una aplicación pequeña ubicamos todas en **app.service.js** y **config.js** para la baseURL de nuestros endpoints.
    - Separación de áreas en componentes:
        - Lógica del **Aside** que gestiona el historial.
        - Lógica del **Main** para la aplicación principal.
        - **"PhraseResponse"** Respuesta de la IA, dentro de Main que además facilita la **animación de máquina de escribir** al recargar el componente (cambiando el valor de **key** desde el componente Padre).
    - Para asegurar la base de datos durante el desarrollo, empecé por dejar una **función resetPhrase** para mantener las frases. Usando **upsert de Prisma** evitamos que se dupliquen registros o errores relacionados.

# Instalación

- 1. Instalamos las dependencias:

**Backend:** Puerto 3000
```
\PT_CML> cd backend
\backend> npm i
```

**Frontend:** Puerto 4000
```
\PT_CML> cd frontend
\frontend> npm i
```
----------------------------
- 2. Creamos un fichero .env en nuestro backend siguiente el ejemplo del .env.example
----------------------------
- 3. Iniciamos los dos servidores:
Si **tenemos pnpm** podemos iniciar los dos servidores **a la vez**:
```
\PT_CML> npm run dev
```
ó
```
\PT_CML> npm run start
```
----------------------------
Si **no tenemos pnpm** debemos iniciar ambos servidores de forma **individual**:
```
\backend> npm run dev
```
```
\frontend> npm run dev
```


# Base de Datos

Desde la carpeta "backend" se puede usar el comando npx prisma studio para explorar la base de datos en el puerto 5555.

```
\backend> npx prisma studio
```
