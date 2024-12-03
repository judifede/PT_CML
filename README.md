# Prueba Técnica "Generación de Texto IA"

# Enunciado:

- Instrucciones Generales:

    - Este ejercicio evalúa tus habilidades en Front-End y Back-End para construir una aplicación que interactúa con un modelo de IA de generación de texto.
    Se evaluarán las buenas prácticas de programación, el diseño estructurado y el manejo adecuado de la interacción con la IA.

    - No está permitido el uso de generadores de código automático, herramientas de IA o cualquier otro tipo de herramientas que autogeneren el código por ti.

    - Al finalizar, entrega el código junto con un **README** donde expliques las **decisiones técnicas**, cómo aplicaste las **buenas prácticas** y cualquier otra consideración importante.

- Desarrollo:
    - Descripción del Problema:
    Vas a desarrollar una aplicación que permita a los usuarios generar texto utilizando una API que simule el comportamiento de una Inteligencia Artificial para generación de texto.

    - Requisitos Back-End:
        API RESTful en Node.js (Express o similar) que exponga un endpoint para la generación de texto a través de un servicio simulado de IA:

        - Endpoint: POST /generate-text
        Parámetros: Un objeto JSON que incluya:
        prompt: El texto inicial que el usuario proporciona a la IA.
        maxLength: Número máximo de caracteres que debe generar la IA.
        temperature: Un valor numérico que controle la "creatividad" del modelo.

        - Respuesta: Un JSON con el texto generado por la IA, basado en el prompt.

        - Simula la generación de texto en tu back-end, usando cualquier algoritmo de generación aleatoria que tengas (puedes crear un simple generador que elija frases predefinidas o generar texto aleatorio con algún patrón).

        - Valida los parámetros de entrada, asegurando que el prompt no esté vacío y que maxLength y temperature estén dentro de valores aceptables.

        - Gestiona adecuadamente los errores y envía mensajes de error claros cuando algo salga mal.

        - Conecta tu API a una base de datos (a elegir).

        - Guardar los prompts enviados por el usuario junto con el texto generado.

        - Permitir que los usuarios consulten el historial de prompts generados.
        Crear un endpoint adicional GET /history para recuperar todos los prompts anteriores generados por el usuario.

    - Requisitos Front-End:
        Desarrolla una interfaz de usuario simple con React, vue, (o framework de tu preferencia) que permita a los usuarios:

        - Ingresar un prompt y seleccionar parámetros de generación (como el número máximo de caracteres y el nivel de "creatividad").
        - Enviar la solicitud al servidor y mostrar el texto generado por la IA.
        Consultar el historial de prompts previamente generados y mostrarlo en una lista accesible.
        - Validaciones:
            - Asegúrate de que el campo del prompt no esté vacío antes de enviar la solicitud.
            - Validar los valores numéricos (por ejemplo, asegurarse de que maxLength esté entre 10 y 1000, y temperature entre 0 y 1).
            - La interfaz debe ser responsiva y estar diseñada de manera clara y sencilla, sin necesidad de un diseño gráfico avanzado, pero sí con un enfoque en la usabilidad.

# Guía de Configuración

1. Instalamos las dependencias:

    **Backend:** Puerto 3000
    ```
    \Carpeta Raíz del proyecto> cd backend
    \backend> npm i
    ```

    **Frontend:** Puerto 4000
    ```
    \Carpeta Raíz del proyecto> cd frontend
    \frontend> npm i
    ```
---
2. Creamos un fichero .env en nuestro backend siguiente el ejemplo del .env.example
---
3. Iniciamos los dos servidores:

    Si **tenemos pnpm** podemos iniciar los dos servidores **a la vez**:

        \Carpeta Raíz del proyecto> npm run dev
    ó
        
        \Carpeta Raíz del proyecto> npm run start
    ---
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

Como hemos usado SQLite también podemos ver el fichero \backend\prisma\dev.db

# Decisiones técnicas: 

- **Mono-repo** con el **workspace de pnpm** por su fácil implementación. Esto nos permite ejecutar el servidor de backend y el de frontend a la vez desde la raíz del proyecto. Más detalles en el apartado de Guía de Configuración.
- He elegido **Node + React** por ser el stack más reciente que he utilizado para un proyecto de estas características.
- He elegido **Tailwind** para el sistema de diseño para maquetar más rápido y para la importación de recursos vinculados a éste (**flowbite-react** para el **Tooltip** de "modo creativo" y el fondo de **https://bg.ibelick.com/**).
- He usado **Prisma** porque me parece un **ORM** muy flexible y mi favorito para Node. Además para facilitar la prueba de la aplicación elegimos **SQLite** como base de datos.

# Buenas prácticas: 

- La devolución de la API, exista o no un error, se gestiona con un **objeto** con las siguientes posibilidades:

    - **resultado** (OK o error),
    - **mensaje** (tipo de error) o el **objeto** con la respuesta de la consulta de base de datos en caso positivo.
- Las peticiones a la API las gestionamos desde la carpeta **src\Services**. Al ser una aplicación pequeña ubicamos todas en **app.service.js** y **config.js** para la baseURL de nuestra API. **Si la aplicación escala** permite separar en una **entidad por fichero**, por ejemplo, phrase.service.js o history.service.js.
- Separación de áreas en componentes:
    - Lógica del **Aside** que gestiona el historial.
    - Lógica del **Main** para la aplicación principal.
    - **"PhraseResponse"** Respuesta de la IA, dentro de Main que además facilita la **animación de máquina de escribir** al recargar el componente (cambiando el valor de **key** desde el componente Padre).
- Para asegurar la base de datos durante el desarrollo, definimos una **función resetPhrase** para mantener las frases, pasando del formato json a nuestra tabla. Usando **upsert de Prisma** evitamos que se dupliquen registros o errores relacionados, ya que insertará los registros si no existen o los actualizará con los datos correctos.