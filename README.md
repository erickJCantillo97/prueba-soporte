# Prueba Técnica - Sistema de Gestión de Tareas

## Descripción del Proyecto

Este proyecto es un sistema básico de gestión de tareas desarrollado con Laravel y Vue.js. El objetivo de esta prueba técnica es identificar y corregir errores en el código tanto en el backend como en el frontend. El sistema permite a los usuarios crear, actualizar, eliminar y visualizar tareas.

## Objetivo de la Prueba

El objetivo principal de esta prueba es evaluar tus habilidades para depurar y corregir errores en un proyecto existente que utiliza Laravel, PHP, JavaScript, y Vue.js. Deberás:

- Identificar y corregir errores en el backend relacionado con la creación, actualización, eliminación y validación de tareas.
- Corregir problemas en el frontend que afectan la visualización y manejo de la lista de tareas.
- Asegurarte de que las tareas se gestionen correctamente en la interfaz de usuario.

Además, deberás agregar una funcionalidad extra para filtrar las tareas completadas y pendientes.

## Instrucciones de Instalación

Sigue los siguientes pasos para configurar el proyecto en tu entorno local:


1. **Clona el repositorio:**

       Prueba-Soporte
   
2. **Instala las dependencias de PHP y Node.js:**

   .Composer: Para instalar las dependencias de PHP, ejecuta:
   
        composer install

   .NPM: Para instalar las dependencias de Node.js, ejecuta:

        npm install
        npm run dev

3. **Configura el archivo de entorno .env:**

   .Copia el archivo .env.example a .env:

       cp .env.example .env
   
   .Genera la clave de la aplicación:

       php artisan key:generate
   
   .Configura la base de datos en el archivo .env. Asegúrate de tener una base de datos MySQL disponible y configurada.
   
4. **Ejecuta las migraciones para crear las tablas necesarias:**

       php artisan migrate

5. **Compilar Recursos de Frontend:**

   .Compila los archivos de frontend utilizando Laravel Mix:

       npm run dev

6. **Iniciar el Servidor:**

   .Inicia el servidor de desarrollo de Laravel:

       php artisan serve

       
**Objetivo de la Prueba**

El proyecto contiene errores tanto en el backend (Laravel/PHP) como en el frontend (JavaScript). Tu objetivo es:

 1.Identificar los errores en el código.
 2.Corregir los errores para que la aplicación funcione correctamente.
 3.Probar la aplicación después de realizar las correcciones para asegurarte de que todo funcione como se espera.
 
**Entrega**

Sube el código corregido a un repositorio de GitHub y envíanos el enlace. Asegúrate de describir los problemas que encontraste y cómo los solucionaste en este archivo README.md.

**Notas**

Puedes añadir cualquier comentario adicional sobre las decisiones que tomaste al corregir el código.
Recuerda que el objetivo es demostrar tu capacidad para depurar y mejorar código existente.

¡Buena suerte!


# Apartir de Aqui inician las notas del Desarrollador

En primer lugar gracias por la oportunidad nuevamente.

como primera obersavación note que el proyecto esta basa de laravel 7, siendo que este esta en su version 11, y usa php version ^7.1, siendo que este mismo ya esta en la version 8.3, como no sabia si el objetivo de esta prueba tambien era hacer a actualización me abstube de realizarla y en su lugar use una instancia con las versiones que sokicita la prueba (Espero eso no sea un problema, mas adelante).

Los errores encontrados los dividiré en secciones para que sea facil de identificar

## Errores de Back-end

1. **Error de Base de datos**
- El sistema esta trabajando en la gestión de tareas por usuario pero en el modelo la tabla donde se hace referecia es la tabla *users* pero en la migración se contruye una tabe *user*, por lo tanto hice el cambio al nombre corrrecto de la tabla y corregí la referencia en la tabla tasks 

2. El back-end no tenia una ruta para obtener las tareas de la base de datos, por lo que le informacion no percitia mas alla del Store

3. Los datos del usuario que solicitaba el back para crear un a tarea no estaban acordes al modelo que se presentó ya que deberia solicitar el id unico de cada usuario.

4. Use el antiguo metodo para creación de rutas en el back-end, eso no debe afectar la funcionalidad del sistema, pero la versión de laravel que se usó en este proyecto tiene mejor obtimizadas esa forma.

5. No existia una forma de crear nuevos usuario (No me di a la tarea de dar la opcion de actulizar dichos usuario por efectos del alcance de esta prueba).

6. El back no devolvia el listado de los usuario existentes en la base de datos, de ese modo al usuario le seria mas dificil encontrar los usuarios para añadirle una nueva tarea.

7. Apesar que la funcionalidad es la misma Laravel en su version 7, ya podia añadir relaciones directas con el Modelo para refactorizar el codigo facilemte (el model usuario usaba el string del nombre de la calse en vez de la clase)

8. No existia una ruta que me devolviera todas las tareas con el usuario asignado

## Errores de Front-end


1. No se estaban haciendo consultas para traer la informacion de la base de datos, todo se guardaba en memoria

2. El listado de tareas crecia indefinidamente, ocultando el formulario para la creacion de las mismas lo que hice fue poner el formulario primero y añadir un overflow y un tamaño fijo al div donde esta la lista de tareas.

3. Se solicitaba el nombre o correo del usuario, pero eso seria dificil de encontralos en la BD, lo que hice fue cambiar ese input por un selec para que se seleccione uno de la base de datos

4. Añadí un modal para la creacion de los usuario nuevos para matenernos en la seccion de una SPA.

5. No existia un boton para editar las tareas


   
