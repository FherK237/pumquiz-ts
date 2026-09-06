# Documento de Requisitos

## Introducción

PumQuiz! es una aplicación web de trivia orientada al aprendizaje y la competencia. Los usuarios se registran, juegan trivias cronometradas de opción múltiple en diversas categorías, ganan puntos según la velocidad de respuesta, mantienen rachas diarias y compiten en tablas de clasificación. Los administradores cargan contenido de trivia mediante archivos JSON. La aplicación utiliza un frontend en React con un backend en Node.js/Express y base de datos PostgreSQL.

## Glosario

- **System**: La aplicación web PumQuiz! en su conjunto (frontend y backend combinados)
- **Auth_Service**: El servicio backend responsable del registro de usuarios, inicio de sesión, verificación de email y gestión de sesiones
- **Trivia_Engine**: El servicio backend que gestiona las sesiones de trivia, entrega de preguntas, validación de respuestas y puntuación
- **Leaderboard_Service**: El servicio backend que calcula y sirve los datos de ranking
- **Streak_Tracker**: El servicio backend que rastrea la completación diaria de trivias y mantiene el conteo de rachas
- **Admin_Panel**: La interfaz administrativa para subir y gestionar contenido de trivias
- **User**: Una persona registrada que interactúa con la aplicación
- **Trivia**: Un conjunto de 10 preguntas fijas con título, categoría y nivel de dificultad
- **Question**: Un ítem individual de opción múltiple con 4 opciones y una respuesta correcta
- **Attempt**: Una partida completa de una trivia realizada por un usuario
- **Best_Score**: La puntuación más alta que un usuario ha obtenido en una trivia específica
- **Streak**: El conteo de días consecutivos en que un usuario ha completado al menos una trivia
- **Category**: Una clasificación temática para trivias (ej: cultura general, videojuegos, historia, programación, Mundial 2026)
- **Difficulty**: Una clasificación de complejidad de la trivia: fácil, media o difícil

## Requisitos

### Requisito 1: Registro de Usuario

**Historia de Usuario:** Como visitante, quiero registrar una cuenta con mi información personal, para poder acceder a los juegos de trivia y seguir mi progreso.

#### Criterios de Aceptación

1. WHEN un visitante envía un formulario de registro con email, número de teléfono, nombre de usuario y fecha de nacimiento, THE Auth_Service SHALL crear una nueva cuenta de usuario y enviar un email de verificación a la dirección proporcionada
2. WHEN un visitante envía una contraseña de menos de 8 caracteres o que no incluye al menos un símbolo, una letra mayúscula o un número, THE Auth_Service SHALL rechazar el registro y devolver un error de validación descriptivo
3. WHEN un visitante envía un email o nombre de usuario que ya existe en la base de datos, THE Auth_Service SHALL rechazar el registro e indicar que el email o nombre de usuario ya está en uso
4. THE Auth_Service SHALL enviar emails de verificación usando Nodemailer con un proveedor de email configurable

### Requisito 2: Verificación de Email

**Historia de Usuario:** Como usuario registrado, quiero verificar mi dirección de email, para que mi cuenta se active y pueda iniciar sesión.

#### Criterios de Aceptación

1. WHEN el Auth_Service crea una nueva cuenta de usuario, THE Auth_Service SHALL generar un código de verificación de 6 digitos y enviarlo a la dirección de email del usuario
2. WHEN un usuario envía un código de verificación válido, THE Auth_Service SHALL marcar el email del usuario como verificado y activar la cuenta
3. WHEN un usuario envía un código de verificación inválido o expirado, THE Auth_Service SHALL rechazar la verificación y devolver un mensaje de error

### Requisito 3: Inicio de Sesión

**Historia de Usuario:** Como usuario registrado, quiero iniciar sesión con mi email y contraseña, para acceder a mi cuenta y jugar trivias.

#### Criterios de Aceptación

1. WHEN un usuario envía credenciales válidas de email y contraseña para una cuenta verificada, THE Auth_Service SHALL autenticar al usuario y devolver un token de sesión
2. WHEN un usuario envía credenciales inválidas, THE Auth_Service SHALL rechazar el inicio de sesión y devolver un error de autenticación
3. WHEN un usuario intenta iniciar sesión con un email no verificado, THE Auth_Service SHALL rechazar el inicio de sesión e indicar que se requiere verificación de email

### Requisito 4: Gestión de Perfil

**Historia de Usuario:** Como usuario autenticado, quiero actualizar mi foto de perfil y nombre de usuario, para personalizar mi cuenta.

#### Criterios de Aceptación

1. WHEN un usuario autenticado envía una nueva foto de perfil, THE System SHALL actualizar la foto de perfil del usuario y confirmar el cambio
2. WHEN un usuario autenticado envía un nuevo nombre de usuario, THE System SHALL validar la unicidad, actualizar el nombre de usuario y confirmar el cambio
3. WHEN un usuario autenticado envía un nombre de usuario que ya está en uso, THE System SHALL rechazar la actualización e indicar que el nombre de usuario no está disponible

### Requisito 5: Listado y Selección de Trivias

**Historia de Usuario:** Como usuario, quiero explorar las trivias disponibles por categoría y dificultad, para elegir una trivia para jugar.

#### Criterios de Aceptación

1. WHEN un usuario solicita el catálogo de trivias, THE System SHALL devolver una lista de trivias disponibles con su título, categoría y dificultad
2. WHEN un usuario filtra trivias por categoría, THE System SHALL devolver solo las trivias que coincidan con la categoría seleccionada
3. WHEN un usuario filtra trivias por dificultad, THE System SHALL devolver solo las trivias que coincidan con el nivel de dificultad seleccionado

### Requisito 6: Jugabilidad de Trivia

**Historia de Usuario:** Como usuario, quiero jugar una trivia con preguntas cronometradas mostradas una a la vez en orden aleatorio, para poner a prueba mi conocimiento bajo presión de tiempo.

#### Criterios de Aceptación

1. WHEN un usuario inicia una trivia, THE Trivia_Engine SHALL presentar las 10 preguntas en orden aleatorio, una pregunta por pantalla
2. WHEN una pregunta se muestra, THE Trivia_Engine SHALL iniciar un temporizador de cuenta regresiva de 7 segundos visible para el usuario
3. WHEN el temporizador de 7 segundos expira sin respuesta del usuario, THE Trivia_Engine SHALL marcar la pregunta como no respondida y revelar la respuesta correcta resaltada en verde
4. WHEN un usuario selecciona una respuesta incorrecta, THE Trivia_Engine SHALL resaltar la respuesta seleccionada en rojo y la respuesta correcta en verde
5. WHEN un usuario selecciona la respuesta correcta, THE Trivia_Engine SHALL resaltar la respuesta seleccionada en verde
6. WHEN las 10 preguntas han sido respondidas o se ha agotado el tiempo, THE Trivia_Engine SHALL mostrar un resumen de resultados indicando qué preguntas fueron respondidas correctamente y cuáles incorrectamente

### Requisito 7: Sistema de Puntuación

**Historia de Usuario:** Como usuario, quiero ganar puntos según la rapidez con la que respondo correctamente, para que las respuestas rápidas y precisas sean recompensadas.

#### Criterios de Aceptación

1. WHEN un usuario responde una pregunta correctamente en 1-2 segundos, THE Trivia_Engine SHALL otorgar 100 puntos por esa pregunta
2. WHEN un usuario responde una pregunta correctamente en 3-4 segundos, THE Trivia_Engine SHALL otorgar 75 puntos por esa pregunta
3. WHEN un usuario responde una pregunta correctamente en 5-6 segundos, THE Trivia_Engine SHALL otorgar 50 puntos por esa pregunta
4. WHEN un usuario responde una pregunta correctamente a los 7 segundos, THE Trivia_Engine SHALL otorgar 0 puntos por esa pregunta
5. WHEN un usuario responde una pregunta incorrectamente o no responde, THE Trivia_Engine SHALL otorgar 0 puntos por esa pregunta
6. WHEN un usuario completa un intento de trivia, THE Trivia_Engine SHALL calcular la puntuación total como la suma de puntos de las 10 preguntas

### Requisito 8: Seguimiento de Mejor Puntuación

**Historia de Usuario:** Como usuario, quiero que solo mi mejor puntuación por trivia cuente para los rankings, para poder practicar sin penalización y mejorar mi posición.

#### Criterios de Aceptación

1. WHEN un usuario completa un intento de trivia con una puntuación superior a su Best_Score actual para esa trivia, THE Trivia_Engine SHALL actualizar el Best_Score a la nueva puntuación
2. WHEN un usuario completa un intento de trivia con una puntuación igual o inferior a su Best_Score actual, THE Trivia_Engine SHALL mantener el Best_Score existente sin cambios
3. THE System SHALL permitir reintentos ilimitados e inmediatos en cualquier trivia

### Requisito 9: Rankings de Tabla de Clasificación

**Historia de Usuario:** Como usuario, quiero ver los mejores rankings por categoría y globalmente, para comparar mi rendimiento con otros jugadores.

#### Criterios de Aceptación

1. WHEN un usuario solicita la tabla de clasificación por categoría, THE Leaderboard_Service SHALL devolver los 10 mejores usuarios clasificados por la suma de sus Best_Scores en todas las trivias de esa categoría.
2. WHEN un usuario solicita la tabla de clasificación global, THE Leaderboard_Service SHALL devolver los 10 mejores usuariosclasificados por la suma de sus Best_Scores en todas las categorías
3. THE Leaderboard_Service SHALL mantener rankings históricos sin reinicios mensuales.

### Requisito 10: Rachas Diarias

**Historia de Usuario:** Como usuario, quiero mantener una racha diaria completando al menos una trivia por día, para motivarme a jugar consistentemente.

#### Criterios de Aceptación

1. WHEN un usuario completa al menos una trivia en un día calendario, THE Streak_Tracker SHALL incrementar el conteo de racha del usuario en uno al final de ese día
2. WHEN un usuario no completa ninguna trivia en un día calendario, THE Streak_Tracker SHALL reiniciar el conteo de racha del usuario a cero
3. THE System SHALL mostrar la racha actual del usuario como un ícono de llama que crece visualmente con el conteo de racha

### Requisito 11: Aprendizaje Post-Trivia

**Historia de Usuario:** Como usuario, quiero ver la respuesta correcta después de fallar una pregunta, para aprender de mis errores.

#### Criterios de Aceptación

1. WHEN un usuario responde una pregunta incorrectamente o el temporizador expira, THE Trivia_Engine SHALL mostrar la respuesta correcta junto con una breve explicación de por qué es correcta
2. WHEN todas las preguntas han sido completadas, THE System SHALL incluir las explicaciones de las preguntas respondidas incorrectamente en el resumen de resultados

### Requisito 12: Carga de Trivias por Admin

**Historia de Usuario:** Como administrador, quiero subir trivias en formato JSON, para poder añadir contenido nuevo a la plataforma de manera eficiente.

#### Criterios de Aceptación

1. WHEN un administrador envía un archivo JSON válido conteniendo una trivia con título, categoría, dificultad y exactamente 10 preguntas, cada una con texto de pregunta, 4 opciones y un correctIndex, THE Admin_Panel SHALL crear la trivia y confirmar la carga exitosa
2. WHEN un administrador envía un archivo JSON con campos requeridos faltantes o con más o menos de 10 preguntas, THE Admin_Panel SHALL rechazar la carga y devolver un error de validación descriptivo
3. WHEN un administrador envía un archivo JSON con un correctIndex fuera del rango 0-3, THE Admin_Panel SHALL rechazar la carga y devolver un error de validación indicando el índice inválido

### Requisito 13: Modelo de Datos Preparado para el Futuro

**Historia de Usuario:** Como desarrollador, quiero que el modelo de datos soporte características futuras como trivias comunitarias y pools de preguntas, para que la plataforma pueda evolucionar sin reestructuraciones mayores.

#### Criterios de Aceptación

1. THE System SHALL almacenar un campo type en cada trivia con valores "official" o "community"
2. THE System SHALL almacenar un campo createdBy en cada trivia referenciando al usuario que la creó
3. THE System SHALL establecer el campo type como "official" por defecto para trivias subidas por administradores

