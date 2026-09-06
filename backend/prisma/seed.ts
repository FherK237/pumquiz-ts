import { PrismaClient, Difficulty, Role, TriviaType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import { hashPassword } from '../src/utils/password';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface SeedQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

interface SeedTrivia {
  title: string;
  category: string;
  difficulty: Difficulty;
  questions: SeedQuestion[];
}

const trivias: SeedTrivia[] = [
  {
    title: 'Mundial 2026',
    category: 'Mundial 2026',
    difficulty: Difficulty.EASY,
    questions: [
      {
        question:
          '¿Qué tres países serán los anfitriones oficiales de la Copa Mundial de la FIFA 2026?',
        options: [
          'Estados Unidos, México y Canadá',
          'Estados Unidos, México y Guatemala',
          'México, Brasil y Argentina',
          'Estados Unidos, Canadá y Costa Rica',
        ],
        correctIndex: 0,
        explanation:
          'El Mundial 2026 será el primero organizado de forma conjunta por tres países: Estados Unidos, México y Canadá, en lo que la FIFA denominó la candidatura "United 2026".',
      },
      {
        question:
          '¿Cuántas selecciones nacionales participarán en la fase final del Mundial 2026, marcando un récord histórico?',
        options: ['32 selecciones', '40 selecciones', '48 selecciones', '64 selecciones'],
        correctIndex: 2,
        explanation:
          'Por primera vez el torneo se ampliará a 48 selecciones, frente a las 32 que participaron desde Francia 1998 hasta Catar 2022.',
      },
      {
        question:
          '¿En qué histórico estadio de la Ciudad de México está previsto que se dispute el partido inaugural del Mundial 2026?',
        options: [
          'Estadio BBVA',
          'Estadio Azteca',
          'Estadio Akron',
          'Estadio Olímpico Universitario',
        ],
        correctIndex: 1,
        explanation:
          'El Estadio Azteca albergará el partido inaugural y se convertirá en el primer estadio del mundo en ser sede de partidos en tres Copas del Mundo distintas (1970, 1986 y 2026).',
      },
      {
        question:
          '¿Qué selección se consagró campeona del Mundial de Catar 2022, la edición inmediatamente anterior a 2026?',
        options: ['Francia', 'Argentina', 'Brasil', 'Croacia'],
        correctIndex: 1,
        explanation:
          'Argentina conquistó su tercera estrella al vencer a Francia en la final de Catar 2022, definida en la tanda de penales tras un empate 3-3.',
      },
      {
        question:
          '¿Cuántas ciudades sede repartidas entre los tres países albergarán partidos del Mundial 2026?',
        options: ['11 ciudades', '13 ciudades', '16 ciudades', '20 ciudades'],
        correctIndex: 2,
        explanation:
          'El torneo se disputará en 16 ciudades sede: 11 en Estados Unidos, 3 en México (Ciudad de México, Guadalajara y Monterrey) y 2 en Canadá (Toronto y Vancouver).',
      },
      {
        question:
          '¿Qué organismo internacional es el responsable de organizar la Copa Mundial de fútbol?',
        options: ['La UEFA', 'La CONMEBOL', 'La FIFA', 'El Comité Olímpico Internacional'],
        correctIndex: 2,
        explanation:
          'La FIFA (Federación Internacional de Fútbol Asociación) es el organismo rector del fútbol mundial y el encargado de organizar la Copa del Mundo cada cuatro años.',
      },
      {
        question:
          '¿Cuál es la selección más laureada de la historia de los Mundiales, con cinco títulos hasta la fecha?',
        options: ['Alemania', 'Italia', 'Brasil', 'Uruguay'],
        correctIndex: 2,
        explanation:
          'Brasil ostenta el récord de cinco Copas del Mundo (1958, 1962, 1970, 1994 y 2002), siendo además la única selección que ha participado en todas las ediciones.',
      },
      {
        question:
          '¿En qué meses del año está previsto que se dispute el Mundial 2026, retomando las fechas tradicionales del torneo?',
        options: [
          'Junio y julio',
          'Noviembre y diciembre',
          'Enero y febrero',
          'Septiembre y octubre',
        ],
        correctIndex: 0,
        explanation:
          'El Mundial 2026 volverá al calendario clásico de verano boreal, disputándose entre junio y julio, a diferencia de Catar 2022 que se jugó en noviembre y diciembre por el clima.',
      },
      {
        question:
          'Además de la Ciudad de México, ¿qué otras dos ciudades mexicanas serán sede del Mundial 2026?',
        options: [
          'Cancún y Tijuana',
          'Guadalajara y Monterrey',
          'Puebla y Querétaro',
          'León y Toluca',
        ],
        correctIndex: 1,
        explanation:
          'Las tres sedes mexicanas serán la Ciudad de México (Estadio Azteca), Guadalajara (Estadio Akron) y Monterrey (Estadio BBVA).',
      },
      {
        question:
          '¿Cuál es el trofeo que levanta el campeón de la Copa Mundial de la FIFA desde 1974?',
        options: [
          'La Copa Jules Rimet',
          'El Trofeo de la Copa Mundial de la FIFA',
          'La Copa Libertadores',
          'El Trofeo Henri Delaunay',
        ],
        correctIndex: 1,
        explanation:
          'Desde 1974 se entrega el Trofeo de la Copa Mundial de la FIFA, de oro macizo; el anterior, la Copa Jules Rimet, fue entregado en propiedad a Brasil tras su tercer título en 1970.',
      },
    ],
  },
  {
    title: 'Fundamentos de Programación',
    category: 'Programación',
    difficulty: Difficulty.MEDIUM,
    questions: [
      {
        question:
          'En programación, ¿qué es una variable y para qué se utiliza principalmente?',
        options: [
          'Un espacio de memoria con nombre que almacena un valor que puede cambiar durante la ejecución',
          'Una función que nunca devuelve ningún valor',
          'Un archivo donde se guarda el código fuente del programa',
          'Un comentario que el compilador ignora al ejecutar',
        ],
        correctIndex: 0,
        explanation:
          'Una variable es una ubicación de memoria con un identificador (nombre) que guarda un dato; su valor puede modificarse a lo largo de la ejecución del programa.',
      },
      {
        question:
          '¿Qué estructura de datos sigue el principio LIFO (Last In, First Out), donde el último elemento en entrar es el primero en salir?',
        options: ['La cola (queue)', 'La pila (stack)', 'La lista enlazada', 'El árbol binario'],
        correctIndex: 1,
        explanation:
          'La pila (stack) opera bajo el principio LIFO: las operaciones push y pop añaden y retiran elementos por el mismo extremo, por lo que el último en entrar es el primero en salir.',
      },
      {
        question:
          '¿Cuál es la complejidad temporal en el peor caso de una búsqueda binaria sobre un arreglo ordenado de n elementos?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctIndex: 2,
        explanation:
          'La búsqueda binaria descarta la mitad de los elementos restantes en cada comparación, por lo que su complejidad es O(log n), muy superior a la búsqueda lineal O(n) en grandes volúmenes.',
      },
      {
        question:
          'En la programación orientada a objetos, ¿qué describe el concepto de "encapsulamiento"?',
        options: [
          'La capacidad de una clase de heredar atributos de otra clase',
          'La agrupación de datos y métodos, ocultando el estado interno tras una interfaz controlada',
          'La existencia de múltiples métodos con el mismo nombre pero distinto comportamiento',
          'La creación automática de objetos al iniciar el programa',
        ],
        correctIndex: 1,
        explanation:
          'El encapsulamiento consiste en agrupar los datos (atributos) y el comportamiento (métodos) dentro de un objeto, restringiendo el acceso directo al estado interno y exponiéndolo mediante una interfaz pública controlada.',
      },
      {
        question:
          'En la mayoría de los lenguajes de programación, ¿cuál es el índice del primer elemento de un arreglo (array)?',
        options: ['El índice 1', 'El índice 0', 'El índice -1', 'Depende del tamaño del arreglo'],
        correctIndex: 1,
        explanation:
          'La gran mayoría de lenguajes (C, Java, Python, JavaScript, entre otros) utilizan indexación basada en cero, por lo que el primer elemento se encuentra en la posición 0.',
      },
      {
        question:
          '¿Qué diferencia fundamental existe entre un bucle "while" y un bucle "do-while"?',
        options: [
          'El "while" solo funciona con números y el "do-while" con texto',
          'El "do-while" garantiza al menos una ejecución porque evalúa la condición al final',
          'No existe ninguna diferencia, son sinónimos',
          'El "while" no puede contener otras instrucciones en su interior',
        ],
        correctIndex: 1,
        explanation:
          'El bucle "while" evalúa la condición antes de ejecutar el cuerpo (puede no ejecutarse nunca), mientras que "do-while" ejecuta el cuerpo primero y evalúa la condición al final, garantizando al menos una iteración.',
      },
      {
        question:
          '¿Qué es la recursividad en programación?',
        options: [
          'Una técnica en la que una función se llama a sí misma para resolver un problema',
          'Un error que provoca que el programa se cierre inesperadamente',
          'La ejecución de dos programas al mismo tiempo',
          'Un tipo de dato que solo almacena números enteros',
        ],
        correctIndex: 0,
        explanation:
          'La recursividad ocurre cuando una función se invoca a sí misma para resolver subproblemas más pequeños; requiere un caso base que detenga las llamadas para evitar una recursión infinita.',
      },
      {
        question:
          '¿Cuál es el propósito principal de un sistema de control de versiones como Git?',
        options: [
          'Compilar el código fuente a lenguaje máquina',
          'Registrar el historial de cambios del código y facilitar la colaboración',
          'Ejecutar pruebas automáticas sobre el software',
          'Diseñar la interfaz gráfica de las aplicaciones',
        ],
        correctIndex: 1,
        explanation:
          'Un sistema de control de versiones como Git guarda un historial de los cambios en el código, permite revertir a estados anteriores y coordina el trabajo de varios desarrolladores sobre un mismo proyecto.',
      },
      {
        question:
          'En términos de tipado, ¿qué caracteriza a un lenguaje con "tipado estático" como Java o TypeScript?',
        options: [
          'Los tipos de las variables se verifican en tiempo de compilación, antes de ejecutar',
          'Las variables no tienen ningún tipo asociado',
          'Los tipos solo se conocen mientras el programa se está ejecutando',
          'Todas las variables deben ser obligatoriamente números',
        ],
        correctIndex: 0,
        explanation:
          'En el tipado estático los tipos se conocen y verifican en tiempo de compilación, lo que ayuda a detectar errores antes de la ejecución; en el tipado dinámico se resuelven en tiempo de ejecución.',
      },
      {
        question:
          '¿Qué representa el valor booleano en programación?',
        options: [
          'Un número decimal de alta precisión',
          'Un valor lógico que solo puede ser verdadero (true) o falso (false)',
          'Una cadena de texto de longitud fija',
          'Una colección ordenada de elementos',
        ],
        correctIndex: 1,
        explanation:
          'El tipo booleano representa únicamente dos estados lógicos: verdadero (true) o falso (false), y es la base de las condiciones y de la lógica de control de flujo.',
      },
    ],
  },
  {
    title: 'Cultura General',
    category: 'cultura general',
    difficulty: Difficulty.MEDIUM,
    questions: [
      {
        question:
          '¿Qué científico formuló la teoría de la relatividad general, publicada en 1915?',
        options: ['Isaac Newton', 'Albert Einstein', 'Nikola Tesla', 'Galileo Galilei'],
        correctIndex: 1,
        explanation:
          'Albert Einstein presentó la teoría de la relatividad general en 1915, describiendo la gravedad como una curvatura del espacio-tiempo provocada por la masa y la energía.',
      },
      {
        question:
          '¿Cuál es el río más largo del mundo, tema de debate histórico frente al Amazonas?',
        options: ['El río Misisipi', 'El río Yangtsé', 'El río Nilo', 'El río Danubio'],
        correctIndex: 2,
        explanation:
          'Tradicionalmente el Nilo, con unos 6.650 km, ha sido considerado el río más largo del mundo, aunque algunas mediciones recientes disputan ese título con el Amazonas.',
      },
      {
        question:
          '¿Quién escribió la obra "Don Quijote de la Mancha", considerada una cumbre de la literatura en español?',
        options: [
          'Lope de Vega',
          'Miguel de Cervantes',
          'Federico García Lorca',
          'Gabriel García Márquez',
        ],
        correctIndex: 1,
        explanation:
          'Miguel de Cervantes publicó la primera parte de "Don Quijote de la Mancha" en 1605; la obra es considerada la primera novela moderna de la literatura universal.',
      },
      {
        question:
          'En química, ¿cuál es el símbolo del elemento oro en la tabla periódica?',
        options: ['Go', 'Or', 'Au', 'Ag'],
        correctIndex: 2,
        explanation:
          'El símbolo del oro es "Au", derivado de su nombre en latín "aurum". El símbolo "Ag" corresponde a la plata (argentum).',
      },
      {
        question:
          '¿En qué año cayó el Muro de Berlín, un hecho clave para el fin de la Guerra Fría?',
        options: ['1985', '1989', '1991', '1995'],
        correctIndex: 1,
        explanation:
          'El Muro de Berlín cayó el 9 de noviembre de 1989, símbolo del final de la división de Alemania y del deshielo entre bloques al término de la Guerra Fría.',
      },
      {
        question:
          '¿Cuál es el órgano más grande del cuerpo humano?',
        options: ['El hígado', 'El cerebro', 'La piel', 'Los pulmones'],
        correctIndex: 2,
        explanation:
          'La piel es el órgano más grande del cuerpo humano; actúa como barrera protectora, regula la temperatura y contiene receptores sensoriales.',
      },
      {
        question:
          '¿Qué pintor neerlandés es autor de "La noche estrellada" y "Los girasoles"?',
        options: ['Rembrandt', 'Johannes Vermeer', 'Vincent van Gogh', 'Salvador Dalí'],
        correctIndex: 2,
        explanation:
          'Vincent van Gogh, máximo exponente del postimpresionismo, pintó "La noche estrellada" en 1889 durante su estancia en el sanatorio de Saint-Rémy-de-Provence.',
      },
      {
        question:
          '¿Cuál es la capital de Australia, que no coincide con su ciudad más poblada?',
        options: ['Sídney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctIndex: 2,
        explanation:
          'La capital de Australia es Canberra, elegida como solución de compromiso entre Sídney y Melbourne, que son las dos ciudades más grandes del país.',
      },
      {
        question:
          '¿Qué gas es el más abundante en la atmósfera terrestre?',
        options: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Hidrógeno'],
        correctIndex: 2,
        explanation:
          'El nitrógeno representa aproximadamente el 78 % de la atmósfera terrestre, mientras que el oxígeno constituye cerca del 21 %.',
      },
      {
        question:
          '¿Qué civilización antigua construyó la ciudadela de Machu Picchu, en los Andes peruanos?',
        options: ['Los mayas', 'Los aztecas', 'Los incas', 'Los olmecas'],
        correctIndex: 2,
        explanation:
          'Machu Picchu fue construida por la civilización inca en el siglo XV, probablemente como residencia del emperador Pachacútec, y hoy es Patrimonio de la Humanidad.',
      },
    ],
  },
  {
    title: 'Minecraft - Conceptos Básicos',
    category: 'Videojuegos',
    difficulty: 'EASY',
    questions: [
      {
        question: '¿Cuál es el material necesario para crear un portal al Nether?',
        options: ['Piedra luminosa', 'Obsidiana', 'Bedrock', 'Diamante'],
        correctIndex: 1,
        explanation: 'Se necesitan al menos 10 bloques de obsidiana acomodados en un marco y un encendedor para activar el portal al Nether.'
      },
      {
        question: '¿Qué criatura hostil es conocida por acercarse silenciosamente y explotar?',
        options: ['Zombi', 'Esqueleto', 'Creeper', 'Enderman'],
        correctIndex: 2,
        explanation: 'El Creeper es un mob icónico que se acerca sin hacer ruido de pasos y detona tras un breve siseo.'
      },
      {
        question: '¿Cuál es el pico de menor nivel que puede picar menas de diamante?',
        options: ['Pico de madera', 'Pico de piedra', 'Pico de hierro', 'Pico de oro'],
        correctIndex: 2,
        explanation: 'El pico de hierro es el requisito mínimo para extraer diamantes. Si usas madera, piedra u oro, el bloque se destruirá sin soltar nada.'
      },
      {
        question: '¿Cuál es la altura máxima (límite de construcción) a partir de la versión 1.18?',
        options: ['256', '320', '512', '128'],
        correctIndex: 1,
        explanation: 'Con la actualización Caves & Cliffs Parte 2, el límite de altura se amplió a 320 bloques.'
      },
      {
        question: '¿Qué jefe final debes derrotar en la dimensión de The End?',
        options: ['Wither', 'Guardián Anciano', 'Ender Dragón', 'Warden'],
        correctIndex: 2,
        explanation: 'El Ender Dragón es el jefe principal de la dimensión de The End, y su derrota activa los créditos del juego.'
      },
      {
        question: '¿Qué objeto se utiliza para domesticar a un lobo?',
        options: ['Carne cruda', 'Hueso', 'Pescado', 'Manzana'],
        correctIndex: 1,
        explanation: 'Al darle huesos a un lobo, hay una probabilidad de domesticarlo, lo cual se indica con corazones y la aparición de un collar.'
      },
      {
        question: '¿Con qué alimento puedes aparear a dos vacas?',
        options: ['Semillas', 'Zanahorias', 'Trigo', 'Papas'],
        correctIndex: 2,
        explanation: 'El trigo es el alimento que atrae a las vacas y, al dárselo a dos adultas, se reproducirán.'
      },
      {
        question: '¿Qué ingrediente clave se necesita para crear una poción de respiración acuática?',
        options: ['Ojo de araña', 'Pez globo', 'Crema de magma', 'Lágrima de Ghast'],
        correctIndex: 1,
        explanation: 'Destilar un pez globo en una rara poción da como resultado la poción de respiración acuática.'
      },
      {
        question: '¿Cuál es la principal moneda de cambio que utilizan los aldeanos?',
        options: ['Diamante', 'Oro', 'Hierro', 'Esmeralda'],
        correctIndex: 3,
        explanation: 'Las esmeraldas se utilizan como moneda estándar para comprar y vender artículos con los aldeanos.'
      },
      {
        question: '¿Qué encantamiento aumenta la cantidad de minerales que caen al minar un bloque?',
        options: ['Toque de seda', 'Eficiencia', 'Fortuna', 'Irrompibilidad'],
        correctIndex: 2,
        explanation: 'El encantamiento Fortuna permite que bloques como el diamante o carbón suelten múltiples unidades al ser minados.'
      },
    ],
  },  
  {
    title: 'JavaScript - Conceptos Básicos y Métodos',
    category: 'Desarrollo Web',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Qué método se utiliza para crear un nuevo arreglo transformando cada elemento?',
        options: ['filter()', 'reduce()', 'map()', 'forEach()'],
        correctIndex: 2,
        explanation: 'El método map() crea un nuevo arreglo transformando cada elemento, a diferencia de forEach() que solo itera sin retornar un nuevo arreglo.'
      },
      {
        question: '¿Qué método devuelve \'true\' si al menos un elemento del array cumple con la condición dada?',
        options: ['some()', 'every()', 'filter()', 'includes()'],
        correctIndex: 0,
        explanation: 'some() verifica si algún elemento pasa la prueba. every() requiere que todos la pasen.'
      },
      {
        question: '¿Cómo se agrega uno o más elementos al final de un arreglo?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctIndex: 0,
        explanation: 'push() añade al final, unshift() al inicio. pop() elimina el último y shift() elimina el primero.'
      },
      {
        question: '¿Cuál es la principal diferencia entre \'let\' y \'const\'?',
        options: ['let tiene alcance global, const no', 'Los valores de const no pueden ser reasignados, los de let sí', 'const solo se usa para números', 'let eleva su declaración (hoisting), const no'],
        correctIndex: 1,
        explanation: 'Las variables declaradas con const deben ser inicializadas y no pueden reasignarse después.'
      },
      {
        question: '¿Qué devuelve la expresión `typeof null` en JavaScript?',
        options: ['null', 'undefined', 'object', 'string'],
        correctIndex: 2,
        explanation: 'Es un error histórico conocido en JavaScript donde typeof null devuelve \'object\' en lugar de \'null\'.'
      },
      {
        question: '¿Qué función convierte una cadena de texto en un objeto JSON de JavaScript?',
        options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.convert()'],
        correctIndex: 1,
        explanation: 'JSON.parse() toma un string JSON y lo transforma en un objeto o valor de JavaScript.'
      },
      {
        question: '¿Cuáles son los tres estados posibles de una Promesa (Promise)?',
        options: ['Start, Run, Stop', 'Pending, Fulfilled, Rejected', 'Wait, Success, Error', 'Open, Loading, Closed'],
        correctIndex: 1,
        explanation: 'Una Promesa puede estar pendiente (pending), cumplida (fulfilled) o rechazada (rejected).'
      },
      {
        question: '¿Qué operador evalúa tanto el valor como el tipo de dato (igualdad estricta)?',
        options: ['=', '==', '===', '!=='],
        correctIndex: 2,
        explanation: 'El operador \'===\' verifica la igualdad estricta sin realizar coerción de tipos.'
      },
      {
        question: '¿Qué propiedad devuelve la cantidad de elementos en un array?',
        options: ['size', 'count', 'length', 'index'],
        correctIndex: 2,
        explanation: 'La propiedad .length se utiliza en arrays para saber cuántos elementos contienen y en strings para saber el número de caracteres.'
      },
      {
        question: '¿Cuál es la palabra clave para definir una función tradicional en JavaScript?',
        options: ['def', 'func', 'function', 'method'],
        correctIndex: 2,
        explanation: 'Se utiliza \'function\' seguida del nombre (opcional), los parámetros y el bloque de código.'
      },
    ],
  },
  {
    title: 'Hardware - Ensamblaje de PC',
    category: 'Tecnología',
    difficulty: 'HARD',
    questions: [
      {
        question: '¿Cuál es la función principal de la pasta térmica en una computadora?',
        options: ['Enfriar activamente la tarjeta gráfica', 'Mejorar la conducción de calor entre el procesador y el disipador', 'Unir los módulos de memoria RAM a la placa base', 'Proteger la fuente de poder contra sobrecargas'],
        correctIndex: 1,
        explanation: 'La pasta térmica elimina los espacios de aire microscópicos entre el CPU y el disipador metálico, maximizando la transferencia térmica.'
      },
      {
        question: '¿Qué componente retiene la información de forma volátil mientras la computadora está encendida?',
        options: ['Disco Duro Sólido (SSD)', 'Tarjeta Gráfica (GPU)', 'Memoria RAM', 'Placa Base'],
        correctIndex: 2,
        explanation: 'La memoria RAM almacena los datos de los programas en uso, pero al apagar el equipo, toda esta información se pierde.'
      },
      {
        question: '¿Qué garantiza la certificación \'80 PLUS\' en una fuente de poder (PSU)?',
        options: ['Que ofrece 80 watts extra de capacidad', 'Una eficiencia energética de al menos 80%', 'Una garantía de 80 meses por el fabricante', 'Es compatible con 80 tipos de procesadores'],
        correctIndex: 1,
        explanation: 'Asegura que al menos el 80% de la energía de la corriente eléctrica se entrega a los componentes, perdiendo el 20% o menos en forma de calor.'
      },
      {
        question: '¿Qué significa SSD?',
        options: ['Solid State Drive', 'System Storage Disk', 'Super Speed Drive', 'Secure Storage Device'],
        correctIndex: 0,
        explanation: 'Solid State Drive (Unidad de Estado Sólido) utiliza memoria flash, lo que la hace mucho más rápida que los discos duros mecánicos (HDD).'
      },
      {
        question: '¿Qué componente es considerado el \'cerebro\' de la computadora?',
        options: ['Placa Base', 'CPU (Procesador)', 'Disco Duro', 'Memoria RAM'],
        correctIndex: 1,
        explanation: 'La Unidad Central de Procesamiento (CPU) ejecuta las instrucciones y procesa los datos de los programas.'
      },
      {
        question: '¿Cuál es el factor de forma más común para placas base de computadoras de escritorio de tamaño estándar?',
        options: ['Mini-ITX', 'Micro-ATX', 'ATX', 'E-ATX'],
        correctIndex: 2,
        explanation: 'El formato ATX (Advanced Technology eXtended) es el estándar más extendido en torres de PC de tamaño medio.'
      },
      {
        question: '¿Cuál es la función del firmware BIOS o UEFI?',
        options: ['Instalar el sistema operativo automáticamente', 'Inicializar y probar el hardware durante el arranque', 'Mejorar los gráficos de los videojuegos', 'Conectar la PC a internet'],
        correctIndex: 1,
        explanation: 'Se encarga del POST (Power-On Self-Test) para verificar que el hardware funcione correctamente antes de ceder el control al sistema operativo.'
      },
      {
        question: '¿En qué se mide la unidad de actualización de un monitor?',
        options: ['FPS (Fotogramas por segundo)', 'Hz (Hertzios)', 'PPI (Píxeles por pulgada)', 'Nits'],
        correctIndex: 1,
        explanation: 'La tasa de refresco (como 60Hz o 144Hz) indica cuántas veces por segundo el monitor puede actualizar la imagen en pantalla.'
      },
      {
        question: '¿Qué conector de video moderno transmite tanto video de alta resolución como audio digital?',
        options: ['VGA', 'DVI', 'HDMI', 'PS/2'],
        correctIndex: 2,
        explanation: 'El High-Definition Multimedia Interface (HDMI) transmite video y audio digital sin compresión.'
      },
      {
        question: '¿Qué proceso implica aumentar la frecuencia de reloj de un componente por encima de sus especificaciones de fábrica?',
        options: ['Bottlenecking', 'Overclocking', 'Undervolting', 'Thermal Throttling'],
        correctIndex: 1,
        explanation: 'El overclocking se usa para exprimir más rendimiento de procesadores, tarjetas gráficas o RAM, a costa de mayor consumo y calor.'
      },
    ],
  },
  {
    title: 'Mecánica Básica - Mantenimiento',
    category: 'Autos',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Qué componente del sistema de suspensión mantiene las llantas en contacto con el suelo al absorber los impactos?',
        options: ['Las balatas', 'Los amortiguadores', 'El cárter', 'La bomba de agua'],
        correctIndex: 1,
        explanation: 'Los amortiguadores controlan los movimientos y oscilaciones de los resortes de suspensión, asegurando la estabilidad y adherencia del vehículo.'
      },
      {
        question: '¿Qué indica la letra \'W\' en la clasificación de viscosidad de un aceite de motor (ej. 5W-30)?',
        options: ['Weight (Peso)', 'Winter (Invierno)', 'Water (Agua)', 'Width (Grosor)'],
        correctIndex: 1,
        explanation: 'La \'W\' significa Winter. El número anterior indica la fluidez del aceite a bajas temperaturas (arranque en frío).'
      },
      {
        question: '¿Cuál es la función principal del líquido anticongelante/refrigerante?',
        options: ['Evitar que los frenos se cristalicen', 'Regular la temperatura de operación del motor', 'Lubricar los pistones', 'Limpiar el sistema de escape'],
        correctIndex: 1,
        explanation: 'El refrigerante absorbe el calor del motor y lo disipa a través del radiador, además de prevenir que se congele en climas extremos.'
      },
      {
        question: '¿Qué función tienen las bujías en un motor de combustión a gasolina?',
        options: ['Inyectar gasolina a los cilindros', 'Filtrar las impurezas del aceite', 'Generar la chispa para encender la mezcla de aire y combustible', 'Refrigerar el bloque del motor'],
        correctIndex: 2,
        explanation: 'La chispa eléctrica producida por las bujías detona la compresión de la mezcla, generando el movimiento del pistón.'
      },
      {
        question: '¿Qué componente se encarga de recargar la batería mientras el motor está encendido?',
        options: ['El motor de arranque', 'El alternador', 'La caja de fusibles', 'El convertidor catalítico'],
        correctIndex: 1,
        explanation: 'El alternador transforma la energía mecánica del motor en energía eléctrica para mantener cargada la batería y alimentar el sistema eléctrico.'
      },
      {
        question: '¿Qué significa que se encienda la luz de \'Check Engine\' (Revisar Motor) en el tablero?',
        options: ['Que es necesario cambiar el aceite de inmediato', 'Que la computadora del vehículo detectó un problema en los sistemas de emisiones o sensores', 'Que el motor está a punto de explotar', 'Que hay que cambiar las llantas'],
        correctIndex: 1,
        explanation: 'Indica un código de falla (DTC) que debe ser leído con un escáner OBD2 para diagnosticar el origen del problema.'
      },
      {
        question: '¿Qué pieza sincroniza el movimiento del cigüeñal con el árbol de levas?',
        options: ['La banda o cadena de distribución', 'El eje de transmisión', 'El volante bimasa', 'La bomba de aceite'],
        correctIndex: 0,
        explanation: 'Es vital para que las válvulas abran y cierren en el momento exacto. Si se rompe, el motor puede sufrir daños catastróficos.'
      },
      {
        question: '¿Cuál es el indicador principal de que las balatas (pastillas de freno) necesitan reemplazo?',
        options: ['El auto consume más gasolina', 'Rechinidos o chirridos agudos al frenar', 'El volante se calienta', 'Humo blanco por el escape'],
        correctIndex: 1,
        explanation: 'Las pastillas tienen un testigo metálico diseñado para rozar y emitir un ruido agudo cuando el material de fricción está muy desgastado.'
      },
      {
        question: '¿Para qué sirve el sistema TPMS en los vehículos modernos?',
        options: ['Monitorear la presión de los neumáticos', 'Asistir en el frenado de emergencia', 'Controlar el sistema de entretenimiento', 'Regular la inyección de combustible'],
        correctIndex: 0,
        explanation: 'El Tire Pressure Monitoring System avisa al conductor mediante una luz en el tablero si alguna llanta está significativamente desinflada.'
      },
      {
        question: '¿Qué función tiene el convertidor catalítico en el sistema de escape?',
        options: ['Aumentar la potencia del motor', 'Silenciar el ruido del motor', 'Reducir la toxicidad de los gases de escape', 'Enfriar los gases que salen del cilindro'],
        correctIndex: 2,
        explanation: 'Utiliza metales preciosos para generar una reacción química que transforma gases nocivos en gases menos perjudiciales antes de que salgan a la atmósfera.'
      },
    ],
  },
  {
    title: 'Los Polinesios - Curiosidades',
    category: 'Entretenimiento',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Cuáles son los nombres de los tres hermanos que conforman Los Polinesios?',
        options: ['Rafa, Karen y Lesslie', 'Rafa, Ana y Lesslie', 'Luis, Karen y Lesslie', 'Rafa, Karen y Laura'],
        correctIndex: 0,
        explanation: 'El grupo está formado por los hermanos Rafael, Ana Karen y Lesslie Velázquez.'
      },
      {
        question: '¿Cómo se llama el canal principal donde suben sus vlogs de viajes y aventuras diarias?',
        options: ['Musas', 'Extra Polinesios', 'Los Polinesios', 'Juxis'],
        correctIndex: 2,
        explanation: 'Su canal principal homónimo es donde documentan su vida, viajes y retos en familia.'
      },
      {
        question: '¿Qué frase suelen usar para abrir sus videos?',
        options: ['Hola amigos', 'Saludos Polinesios', 'Bienvenidos a un nuevo video', 'Hola a todos'],
        correctIndex: 1,
        explanation: 'La icónica frase ¡Saludos Polinesios! es su marca registrada al iniciar sus videos.'
      },
      {
        question: '¿Cuál es el nombre del canal dedicado principalmente a tutoriales, moda y estilo de vida?',
        options: ['Juxis', 'Musas', 'Tech Polinesios', 'Estilo Polinesio'],
        correctIndex: 1,
        explanation: 'Musas fue creado por Karen y Lesslie para compartir contenido de maquillaje, cocina y manualidades.'
      },
      {
        question: '¿Cómo se llama el perrito bulldog francés de la familia?',
        options: ['Kler', 'Koco', 'Aria', 'Pugberto'],
        correctIndex: 1,
        explanation: 'Koco es el bulldog francés de la familia, junto con Aria y Kler.'
      },
      {
        question: '¿Qué temática principal tiene el canal Juxis?',
        options: ['Bromas', 'Videojuegos', 'Viajes', 'Cocina'],
        correctIndex: 1,
        explanation: 'Juxis es el canal donde los hermanos suben gameplays y retos relacionados con videojuegos.'
      },
      {
        question: '¿En qué año publicaron su primer video en YouTube?',
        options: ['2010', '2012', '2015', '2009'],
        correctIndex: 1,
        explanation: 'Comenzaron su aventura en YouTube a finales de 2012 con videos de bromas.'
      },
      {
        question: '¿De qué país son originarios Los Polinesios?',
        options: ['Colombia', 'España', 'Argentina', 'México'],
        correctIndex: 3,
        explanation: 'Los hermanos nacieron y crecieron en la Ciudad de México.'
      },
      {
        question: '¿Cómo se llama el espectáculo en vivo con el que salieron de gira mundial?',
        options: ['Gira Polinesia', 'Polinesios World Tour', 'Gira de Rescate', 'Jump Show'],
        correctIndex: 1,
        explanation: 'El Polinesios World Tour los llevó a presentarse en múltiples países de Latinoamérica y Estados Unidos.'
      },
      {
        question: '¿Qué integrante de Los Polinesios tuvo a su primera hija llamada Alquimia en 2023?',
        options: ['Karen', 'Rafa', 'Lesslie', 'Ninguno'],
        correctIndex: 2,
        explanation: 'Lesslie Polinesia se convirtió en madre a finales de 2023.'
      },
    ],
  },
  {
    title: 'Minecraft - Nivel Intermedio',
    category: 'Videojuegos',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Qué bloque se necesita obligatoriamente para invocar a un Wither?',
        options: ['Obsidiana', 'Arena de almas', 'Piedra del fin', 'Bloque de carbón'],
        correctIndex: 1,
        explanation: 'Para invocar al Wither necesitas 4 bloques de arena de almas o tierra de almas y 3 calaveras de esqueleto Wither.'
      },
      {
        question: '¿Qué profesión tiene un aldeano que trabaja con un atril?',
        options: ['Clérigo', 'Librero', 'Cartógrafo', 'Herrero'],
        correctIndex: 1,
        explanation: 'El atril es el bloque de trabajo que convierte a un aldeano en librero, útil para conseguir libros encantados.'
      },
      {
        question: '¿Cómo se repara un Élitro (Elytra) en un yunque?',
        options: ['Con cuero', 'Con hilo', 'Con membranas de fantasma', 'Con plumas'],
        correctIndex: 2,
        explanation: 'Las membranas que sueltan los fantasmas al morir se usan para reparar los élitros dañados.'
      },
      {
        question: '¿Cuál es el radio máximo de bloques que puede iluminar un faro (beacon) a su máxima potencia?',
        options: ['30 bloques', '50 bloques', '100 bloques', '75 bloques'],
        correctIndex: 1,
        explanation: 'Un faro con una pirámide completa de 4 niveles tiene un rango de efecto de 50 bloques.'
      },
      {
        question: '¿Qué material base se necesita en el soporte para pociones para crear una poción persistente (lingering)?',
        options: ['Pólvora', 'Redstone', 'Aliento de dragón', 'Polvo de piedra luminosa'],
        correctIndex: 2,
        explanation: 'El aliento de dragón se combina con una poción arrojadiza para crear una poción persistente.'
      },
      {
        question: '¿Qué criatura suelta los caparazones necesarios para craftear una caja de Shulker?',
        options: ['Enderman', 'Shulker', 'Guardián', 'Ghast'],
        correctIndex: 1,
        explanation: 'Los Shulkers, que se encuentran en las Ciudades del End, sueltan caparazones al ser derrotados.'
      },
      {
        question: '¿Cuántos tics de redstone equivale un repetidor ajustado a su nivel máximo?',
        options: ['1 tic', '2 tics', '3 tics', '4 tics'],
        correctIndex: 3,
        explanation: 'Un repetidor de redstone se puede ajustar hasta 4 tics, lo que equivale a 0.4 segundos de retraso.'
      },
      {
        question: '¿Qué mineral se encuentra incrustado en los restos ancestrales (Ancient Debris)?',
        options: ['Diamante', 'Infrita (Netherite)', 'Oro', 'Cuarzo'],
        correctIndex: 1,
        explanation: 'Los restos ancestrales se funden para obtener fragmentos de Netherite.'
      },
      {
        question: '¿Qué objeto evita que caigas al vacío si mueres, devolviéndote a la vida al instante?',
        options: ['Manzana dorada encantada', 'Tótem de la inmortalidad', 'Estrella del Nether', 'Cristal del End'],
        correctIndex: 1,
        explanation: 'El Tótem de la inmortalidad, soltado por los Invocadores, te salva de la muerte si lo tienes equipado.'
      },
      {
        question: '¿Cuál es el nivel máximo del encantamiento Saqueo (Looting)?',
        options: ['II', 'III', 'IV', 'V'],
        correctIndex: 1,
        explanation: 'Saqueo III es el nivel máximo obtenible en supervivencia, aumentando los drops de los enemigos.'
      },
    ],
  },
  {
    title: 'Princesas de Disney',
    category: 'Cine y Animación',
    difficulty: 'EASY',
    questions: [
      {
        question: '¿Cómo se llama el cangrejo consejero en La Sirenita?',
        options: ['Flounder', 'Scuttle', 'Sebastián', 'Tritón'],
        correctIndex: 2,
        explanation: 'Sebastián es el cangrejo compositor de la corte del Rey Tritón.'
      },
      {
        question: '¿Qué princesa pierde una zapatilla de cristal a la medianoche?',
        options: ['Bella', 'Cenicienta', 'Aurora', 'Blancanieves'],
        correctIndex: 1,
        explanation: 'Cenicienta debe huir del baile cuando el hechizo de su hada madrina termina a medianoche.'
      },
      {
        question: '¿Cuál es el nombre del tigre mascota de la princesa Jasmín?',
        options: ['Rajah', 'Abu', 'Jafar', 'Bagheera'],
        correctIndex: 0,
        explanation: 'Rajah es el leal tigre de Bengala que protege a Jasmín en el palacio.'
      },
      {
        question: '¿Qué princesa de Disney es conocida por su larguísimo cabello rubio mágico?',
        options: ['Mérida', 'Elsa', 'Rapunzel', 'Cenicienta'],
        correctIndex: 2,
        explanation: 'Rapunzel tiene un cabello mágico de 21 metros de largo que brilla y sana cuando canta.'
      },
      {
        question: '¿En qué ciudad transcurre la historia de Tiana y el sapo?',
        options: ['Nueva York', 'París', 'Nueva Orleans', 'Londres'],
        correctIndex: 2,
        explanation: 'La historia de La Princesa y el Sapo se desarrolla en Nueva Orleans durante los años 20.'
      },
      {
        question: '¿Quién se disfraza de hombre para tomar el lugar de su padre en el ejército?',
        options: ['Pocahontas', 'Mulán', 'Mérida', 'Moana'],
        correctIndex: 1,
        explanation: 'Mulán asume la identidad de Ping para salvar a su anciano padre de ir a la guerra.'
      },
      {
        question: '¿Cómo se llama el pequeño dragón compañero de Mulán?',
        options: ['Cri-Kee', 'Yao', 'Mushu', 'Shang'],
        correctIndex: 2,
        explanation: 'Mushu es un dragón de tamaño pequeño enviado por los ancestros para proteger a Mulán.'
      },
      {
        question: '¿Qué princesa tiene como sueño abrir su propio restaurante?',
        options: ['Tiana', 'Bella', 'Ariel', 'Cenicienta'],
        correctIndex: 0,
        explanation: 'Tiana trabaja incansablemente para ahorrar dinero y abrir su propio restaurante de ensueño.'
      },
      {
        question: '¿Cómo se llama la princesa que cae en un profundo sueño tras pincharse con una rueca?',
        options: ['Blancanieves', 'Aurora', 'Ariel', 'Bella'],
        correctIndex: 1,
        explanation: 'Aurora, también conocida como la Bella Durmiente, es víctima de la maldición de Maléfica.'
      },
      {
        question: '¿Qué princesa se caracteriza por ser una excelente arquera en las tierras escocesas?',
        options: ['Mérida', 'Rapunzel', 'Moana', 'Aurora'],
        correctIndex: 0,
        explanation: 'Mérida, de la película Valiente (Brave), destaca por su habilidad con el arco y su rebeldía.'
      },
    ],
  },
  {
    title: 'Toy Story - La Saga',
    category: 'Cine y Animación',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Cuál es la frase célebre de Buzz Lightyear?',
        options: ['Hay una serpiente en mi bota', 'Al infinito y más allá', '¡Yija!', 'Preparen sus armas'],
        correctIndex: 1,
        explanation: 'Al infinito y más allá es el lema del comando estelar Buzz Lightyear.'
      },
      {
        question: '¿Cómo se llama el niño dueño original de Woody y Buzz?',
        options: ['Sid', 'Bonnie', 'Andy', 'Al'],
        correctIndex: 2,
        explanation: 'Andy Davis es el dueño que da vida a las aventuras de sus juguetes en su cuarto.'
      },
      {
        question: '¿Qué tipo de juguete es Rex?',
        options: ['Un perro elástico', 'Un tiranosaurio de plástico', 'Un señor cara de papa', 'Un vaquero'],
        correctIndex: 1,
        explanation: 'Rex es un T-Rex verde de plástico con complejo de inferioridad y mucho miedo.'
      },
      {
        question: '¿Cómo se llama el vecino destructivo de Andy en la primera película?',
        options: ['Sid Phillips', 'Al McWhiggin', 'Lotso', 'Gabe'],
        correctIndex: 0,
        explanation: 'Sid es conocido por torturar y desarmar juguetes para crear mutaciones espeluznantes.'
      },
      {
        question: '¿Quién es el villano principal de Toy Story 2 que secuestra a Woody?',
        options: ['El Oloroso Pete', 'Al McWhiggin', 'Lotso', 'Zurg'],
        correctIndex: 1,
        explanation: 'Al, el coleccionista y dueño de El Almacén de Juguetes de Al, roba a Woody en una venta de garaje.'
      },
      {
        question: '¿Cómo se llama el oso con olor a fresas de Toy Story 3?',
        options: ['Teddy', 'Lotso', 'Chuckles', 'Bebote'],
        correctIndex: 1,
        explanation: 'Lotso (Lots-O-Huggin Bear) gobierna la guardería Sunnyside como un dictador.'
      },
      {
        question: '¿Qué personaje es creado por Bonnie con un tenedor-cuchara en Toy Story 4?',
        options: ['Duke Caboom', 'Ducky', 'Bunny', 'Forky'],
        correctIndex: 3,
        explanation: 'Forky es un juguete hecho de basura que sufre una crisis existencial al no sentirse un juguete.'
      },
      {
        question: '¿De qué famosa cadena de pizzerías es la camioneta que aparece en todas las películas?',
        options: ['Pizza Hut', 'Domino\'s', 'Pizza Planet', 'Chuck E. Cheese'],
        correctIndex: 2,
        explanation: 'La camioneta de Pizza Planet es un easter egg clásico que aparece en casi todas las cintas de Pixar.'
      },
      {
        question: '¿Quién es el archienemigo jurado de Buzz Lightyear?',
        options: ['El Oloroso Pete', 'El Emperador Zurg', 'Síndrome', 'Lotso'],
        correctIndex: 1,
        explanation: 'Zurg es el líder del imperio del mal, y hace una parodia directa a Darth Vader.'
      },
      {
        question: '¿Qué palabra tiene escrita Woody en la suela de su bota?',
        options: ['Bonnie', 'Vaquero', 'Andy', 'Sheriff'],
        correctIndex: 2,
        explanation: 'Andy escribió su nombre en las suelas de sus juguetes favoritos para marcar que eran suyos.'
      },
    ],
  },
  {
    title: 'Minecraft - Conceptos Básicos 2',
    category: 'Videojuegos',
    difficulty: 'EASY',
    questions: [
      {
        question: '¿Qué ocurre si intentas dormir en una cama en el Nether o en el End?',
        options: ['Duermes normalmente', 'La cama explota', 'Aparecen monstruos', 'Tu salud se regenera'],
        correctIndex: 1,
        explanation: 'Intentar usar una cama en dimensiones distintas al Overworld causa una explosión letal.'
      },
      {
        question: '¿Qué herramienta es la más rápida para recolectar hojas de los árboles?',
        options: ['Hacha', 'Espada', 'Tijeras (Cizallas)', 'Azada'],
        correctIndex: 2,
        explanation: 'Las tijeras destruyen las hojas instantáneamente y permiten recolectarlas como bloque.'
      },
      {
        question: '¿Qué bloque se utiliza para cultivar semillas de trigo?',
        options: ['Tierra normal', 'Tierra arada (Farmland)', 'Arena', 'Bloque de hierba'],
        correctIndex: 1,
        explanation: 'Se debe usar una azada sobre la tierra para convertirla en tierra arada apta para cultivos.'
      },
      {
        question: '¿Qué material dejan caer las arañas al morir?',
        options: ['Cuero', 'Ojos de araña e hilo', 'Lana', 'Huesos'],
        correctIndex: 1,
        explanation: 'Las arañas pueden soltar hilo y, si el jugador las mata, también pueden soltar ojos de araña.'
      },
      {
        question: '¿Con qué herramienta se extrae más rápido la piedra?',
        options: ['Hacha', 'Pala', 'Pico', 'Mano vacía'],
        correctIndex: 2,
        explanation: 'El pico es la herramienta designada para minar piedra y minerales de manera eficiente.'
      },
      {
        question: '¿Qué animal da lana al ser esquilado?',
        options: ['Vaca', 'Cerdo', 'Oveja', 'Caballo'],
        correctIndex: 2,
        explanation: 'Las ovejas sueltan de 1 a 3 bloques de lana cuando se les aplican unas tijeras.'
      },
      {
        question: '¿Cómo se evita que los Enderman te ataquen al mirarlos?',
        options: ['Llevando una calabaza tallada en la cabeza', 'Usando armadura de diamante', 'Sosteniendo una flor', 'Agachándose'],
        correctIndex: 0,
        explanation: 'La calabaza tallada en el espacio del casco bloquea el contacto visual con los Enderman.'
      },
      {
        question: '¿Qué combustible es más eficiente en un horno estándar?',
        options: ['Madera', 'Carbón', 'Bloque de algas secas', 'Cubo de lava'],
        correctIndex: 3,
        explanation: 'Un cubo de lava puede fundir hasta 100 objetos, siendo el combustible más duradero.'
      },
      {
        question: '¿De qué color es la armadura de los aldeanos herreros?',
        options: ['Verde', 'Blanca', 'Negra con un delantal', 'Morada'],
        correctIndex: 2,
        explanation: 'Los aldeanos herreros (armaduras, armas, herramientas) se distinguen por usar un delantal oscuro o negro.'
      },
      {
        question: '¿Qué efecto te da consumir un ojo de araña fermentado?',
        options: ['Visión nocturna', 'Veneno', 'Ninguno, es para pociones', 'Curación'],
        correctIndex: 2,
        explanation: 'El ojo fermentado no se puede comer directamente, solo sirve como ingrediente para elaborar pociones negativas.'
      },
    ],
  },
  {
    title: 'Astronomía y Espacio',
    category: 'Ciencia',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Cuál es el planeta más grande del sistema solar?',
        options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'],
        correctIndex: 1,
        explanation: 'Júpiter es un gigante gaseoso y el planeta con mayor masa de nuestro sistema solar.'
      },
      {
        question: '¿Cómo se llama nuestra galaxia?',
        options: ['Andrómeda', 'La Vía Láctea', 'Sombrero', 'Centaurus A'],
        correctIndex: 1,
        explanation: 'Nuestro sistema solar reside en la Vía Láctea, una galaxia en forma de espiral.'
      },
      {
        question: '¿Qué planeta es conocido como el Planeta Rojo?',
        options: ['Venus', 'Mercurio', 'Marte', 'Júpiter'],
        correctIndex: 2,
        explanation: 'Marte recibe este apodo debido al óxido de hierro prevalente en su superficie.'
      },
      {
        question: '¿Cuál es la estrella más cercana a la Tierra?',
        options: ['Sirio', 'Próxima Centauri', 'El Sol', 'Alfa Centauri'],
        correctIndex: 2,
        explanation: 'Aunque a menudo olvidamos clasificarlo así, el Sol es la estrella más cercana a nuestro planeta.'
      },
      {
        question: '¿Quién fue el primer ser humano en viajar al espacio exterior?',
        options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn'],
        correctIndex: 2,
        explanation: 'El cosmonauta soviético Yuri Gagarin completó una órbita alrededor de la Tierra en 1961.'
      },
      {
        question: '¿Qué fuerza impide que la luz escape de un agujero negro?',
        options: ['Magnetismo', 'Fricción', 'Gravedad extrema', 'Fuerza nuclear fuerte'],
        correctIndex: 2,
        explanation: 'La gravedad en un agujero negro es tan intensa que ni siquiera los fotones de luz pueden escapar de su horizonte de sucesos.'
      },
      {
        question: '¿Qué planeta del sistema solar tiene los anillos más prominentes y visibles?',
        options: ['Urano', 'Júpiter', 'Neptuno', 'Saturno'],
        correctIndex: 3,
        explanation: 'Los espectaculares anillos de Saturno están compuestos principalmente por trozos de hielo y roca.'
      },
      {
        question: '¿Cuál es la galaxia espiral más cercana a la Vía Láctea?',
        options: ['Andrómeda', 'Galaxia del Triángulo', 'Nubes de Magallanes', 'Cigarro'],
        correctIndex: 0,
        explanation: 'Andrómeda se encuentra a unos 2.5 millones de años luz y está en curso de colisión con la Vía Láctea.'
      },
      {
        question: '¿Aproximadamente cuánto tarda la luz del Sol en llegar a la Tierra?',
        options: ['1 minuto', '8 minutos', '1 hora', 'Instantáneamente'],
        correctIndex: 1,
        explanation: 'La luz viaja a 300,000 km/s, por lo que le toma unos 8 minutos y 20 segundos recorrer la distancia del Sol a la Tierra.'
      },
      {
        question: '¿Qué es una supernova?',
        options: ['El nacimiento de un planeta', 'La explosión estelar de una estrella masiva al final de su vida', 'Un asteroide chocando con un planeta', 'Una nube de gas frío'],
        correctIndex: 1,
        explanation: 'Es una de las explosiones más violentas del universo, marcando la muerte de una estrella masiva.'
      },
    ],
  },
  {
    title: 'Zoología y Datos Curiosos',
    category: 'Naturaleza',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Cuál es el animal terrestre más rápido del mundo?',
        options: ['León', 'Gacela', 'Guepardo', 'Caballo salvaje'],
        correctIndex: 2,
        explanation: 'El guepardo (o chita) puede alcanzar velocidades de hasta 120 km/h en carreras cortas.'
      },
      {
        question: '¿Qué animal marino es conocido por tener tres corazones?',
        options: ['Tiburón blanco', 'Delfín', 'Pulpo', 'Ballena azul'],
        correctIndex: 2,
        explanation: 'El pulpo tiene un corazón principal y dos corazones branquiales que bombean sangre a sus branquias.'
      },
      {
        question: '¿Cuál es el mamífero más grande del mundo?',
        options: ['Elefante africano', 'Rinoceronte blanco', 'Ballena azul', 'Orca'],
        correctIndex: 2,
        explanation: 'La ballena azul es el animal más grande conocido que haya existido en la Tierra.'
      },
      {
        question: '¿Qué mamífero es famoso por poner huevos en lugar de dar a luz crías vivas?',
        options: ['Murciélago', 'Ornitorrinco', 'Perezoso', 'Armadillo'],
        correctIndex: 1,
        explanation: 'El ornitorrinco y los equidnas son los únicos mamíferos monotremas que ponen huevos.'
      },
      {
        question: '¿Cómo se le llama a un grupo de cuervos en inglés (y en traducciones literarias)?',
        options: ['Un asesinato (Murder)', 'Una bandada (Flock)', 'Un congreso (Congress)', 'Una manada (Herd)'],
        correctIndex: 0,
        explanation: 'Debido a viejas leyendas y supersticiones, en inglés a un grupo de cuervos se le llama murder (asesinato).'
      },
      {
        question: '¿Qué ave es conocida por poder volar hacia atrás?',
        options: ['Colibrí', 'Golondrina', 'Halcón', 'Búho'],
        correctIndex: 0,
        explanation: 'La estructura única de las alas del colibrí le permite volar en cualquier dirección, incluso hacia atrás.'
      },
      {
        question: '¿Cuál es la serpiente venenosa más grande del mundo?',
        options: ['Mamba negra', 'Cobra real', 'Cascabel diamante', 'Anaconda'],
        correctIndex: 1,
        explanation: 'La cobra real puede llegar a medir más de 5 metros de longitud.'
      },
      {
        question: '¿Qué animal tiene las huellas dactilares tan parecidas a las humanas que pueden confundir en escenas del crimen?',
        options: ['Chimpancé', 'Gorila', 'Koala', 'Mapache'],
        correctIndex: 2,
        explanation: 'Los koalas tienen huellas dactilares únicas que son virtualmente indistinguibles de las nuestras bajo un microscopio.'
      },
      {
        question: '¿Cuál es el único animal capaz de sobrevivir en el vacío del espacio exterior?',
        options: ['Tardígrado (Oso de agua)', 'Cucaracha', 'Hormiga de fuego', 'Rata topo desnuda'],
        correctIndex: 0,
        explanation: 'Los tardígrados son extremófilos microscópicos capaces de sobrevivir a radiación extrema, vacío y temperaturas extremas.'
      },
      {
        question: '¿De qué color es la piel de un oso polar bajo su pelaje?',
        options: ['Blanca', 'Rosa', 'Negra', 'Gris'],
        correctIndex: 2,
        explanation: 'Su piel es negra para absorber mejor el calor del sol, mientras que su pelaje es translúcido y refleja la luz, viéndose blanco.'
      },
    ],
  },
  {
    title: 'Mitología Griega y Nórdica',
    category: 'Cultura General',
    difficulty: 'HARD',
    questions: [
      {
        question: 'En la mitología griega, ¿quién es el padre de Zeus, Poseidón y Hades?',
        options: ['Urano', 'Apolo', 'Crono', 'Caos'],
        correctIndex: 2,
        explanation: 'Crono (o Cronos) era el líder de los titanes que devoraba a sus hijos hasta que Zeus lo derrocó.'
      },
      {
        question: '¿Cómo se llama el martillo mágico del dios nórdico Thor?',
        options: ['Gungnir', 'Mjolnir', 'Excalibur', 'Leviathán'],
        correctIndex: 1,
        explanation: 'El Mjolnir fue forjado por los enanos y es una de las armas más temibles de la mitología nórdica.'
      },
      {
        question: '¿Quién es la diosa griega de la sabiduría, la guerra justa y la artesanía?',
        options: ['Afrodita', 'Hera', 'Atenea', 'Artemisa'],
        correctIndex: 2,
        explanation: 'Atenea nació ya adulta y armada de la cabeza de Zeus tras sufrir este un gran dolor.'
      },
      {
        question: '¿Cómo se llama el gran árbol de la vida que conecta los nueve mundos en la mitología nórdica?',
        options: ['Yggdrasil', 'Asgard', 'Valhalla', 'Ragnarök'],
        correctIndex: 0,
        explanation: 'Yggdrasil es el colosal fresno perenne cuyas ramas y raíces unen los distintos reinos cósmicos.'
      },
      {
        question: '¿Qué criatura de la mitología griega convertía en piedra a todo el que la mirara a los ojos?',
        options: ['Quimera', 'Medusa', 'Esfinge', 'Minotauro'],
        correctIndex: 1,
        explanation: 'Medusa era una de las tres gorgonas y la única mortal, finalmente decapitada por el héroe Perseo.'
      },
      {
        question: '¿Quién es el dios de las mentiras y las trampas en la mitología nórdica?',
        options: ['Balder', 'Odín', 'Loki', 'Heimdall'],
        correctIndex: 2,
        explanation: 'Loki es el dios embaucador, maestro del engaño y cambiador de formas.'
      },
      {
        question: '¿Cuál es el nombre del perro de tres cabezas que vigila la entrada al inframundo griego?',
        options: ['Ortro', 'Cerbero', 'Quimera', 'Tifón'],
        correctIndex: 1,
        explanation: 'Cerbero, mascota de Hades, asegura que los muertos no salgan y los vivos no entren al inframundo.'
      },
      {
        question: 'En el mito nórdico, ¿quiénes recogen a los guerreros caídos heroicamente en batalla para llevarlos al Valhalla?',
        options: ['Los elfos', 'Las Valquirias', 'Los enanos', 'Los gigantes'],
        correctIndex: 1,
        explanation: 'Las Valquirias, sirvientes de Odín, seleccionan a los guerreros más valientes (los Einherjer).'
      },
      {
        question: '¿Qué héroe griego era invulnerable en todo su cuerpo excepto en el talón?',
        options: ['Odiseo', 'Hércules', 'Aquiles', 'Perseo'],
        correctIndex: 2,
        explanation: 'Aquiles fue sumergido de bebé en el río Estigia por su madre, quien lo sujetó por el talón, dejándolo vulnerable ahí.'
      },
      {
        question: '¿Cómo se llaman los dos cuervos de Odín que vuelan por el mundo trayéndole información?',
        options: ['Hugin y Munin', 'Geri y Freki', 'Sköll y Hati', 'Fenrir y Jörmungandr'],
        correctIndex: 0,
        explanation: 'Hugin (pensamiento) y Munin (memoria) viajan diariamente por Midgard para mantener informado al Padre de Todo.'
      },
    ],
  },
  {
    title: 'Arte y Literatura',
    category: 'Cultura General',
    difficulty: 'HARD',
    questions: [
      {
        question: '¿Quién pintó la famosa obra "La Mona Lisa" (La Gioconda)?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Miguel Ángel'],
        correctIndex: 1,
        explanation: 'El genio renacentista Leonardo da Vinci pintó esta obra maestra a principios del siglo XVI.'
      },
      {
        question: '¿Quién escribió la novela "Don Quijote de la Mancha"?',
        options: ['Lope de Vega', 'Gabriel García Márquez', 'Miguel de Cervantes Saavedra', 'Federico García Lorca'],
        correctIndex: 2,
        explanation: 'Publicada en 1605, es considerada la obra cumbre de la literatura española y la primera novela moderna.'
      },
      {
        question: '¿Qué pintor postimpresionista cortó parte de su propia oreja?',
        options: ['Claude Monet', 'Salvador Dalí', 'Vincent van Gogh', 'Rembrandt'],
        correctIndex: 2,
        explanation: 'Van Gogh sufrió un colapso mental en 1888, evento que culminó en la automutilación de su oreja izquierda.'
      },
      {
        question: '¿Quién es el autor de la obra de realismo mágico "Cien años de soledad"?',
        options: ['Julio Cortázar', 'Mario Vargas Llosa', 'Jorge Luis Borges', 'Gabriel García Márquez'],
        correctIndex: 3,
        explanation: 'El autor colombiano ganó el Premio Nobel de Literatura en gran parte gracias a esta obra maestra sobre la familia Buendía.'
      },
      {
        question: '¿Qué artista esculpió el "David" en mármol blanco?',
        options: ['Donatello', 'Miguel Ángel', 'Rafael', 'Bernini'],
        correctIndex: 1,
        explanation: 'Miguel Ángel Buonarroti creó esta colosal estatua renacentista que representa al rey bíblico antes de enfrentar a Goliat.'
      },
      {
        question: '¿En qué ciudad se encuentra el famoso museo del Louvre?',
        options: ['Roma', 'Madrid', 'Londres', 'París'],
        correctIndex: 3,
        explanation: 'El Louvre, hogar de la Mona Lisa y la Venus de Milo, está situado en la capital francesa.'
      },
      {
        question: '¿A qué autor británico se le atribuyen obras teatrales como "Hamlet" y "Romeo y Julieta"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Oscar Wilde', 'Jane Austen'],
        correctIndex: 1,
        explanation: 'Shakespeare es ampliamente considerado el escritor más importante en lengua inglesa y uno de los dramaturgos más célebres de la historia.'
      },
      {
        question: '¿Qué movimiento pictórico fue encabezado por Salvador Dalí?',
        options: ['Impresionismo', 'Surrealismo', 'Cubismo', 'Expresionismo'],
        correctIndex: 1,
        explanation: 'Dalí es el principal representante del surrealismo, famoso por sus cuadros de relojes derretidos.'
      },
      {
        question: '¿Quién escribió la epopeya antigua de "La Odisea"?',
        options: ['Sófocles', 'Virgilio', 'Homero', 'Platón'],
        correctIndex: 2,
        explanation: 'Se atribuye al poeta griego Homero la composición de La Ilíada y La Odisea.'
      },
      {
        question: '¿Cuál es el fresco más famoso pintado en la bóveda de la Capilla Sixtina?',
        options: ['La Creación de Adán', 'La Última Cena', 'La Escuela de Atenas', 'El Nacimiento de Venus'],
        correctIndex: 0,
        explanation: 'La Creación de Adán, donde Dios extiende su dedo hacia Adán, fue pintada por Miguel Ángel.'
      },
    ],
  },
  {
    title: 'Cultura General 2',
    category: 'Conocimiento General',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿Cuántos océanos hay en el planeta Tierra?',
        options: ['3', '4', '5', '7'],
        correctIndex: 2,
        explanation: 'Son cinco: Atlántico, Pacífico, Índico, Ártico y Antártico.'
      },
      {
        question: '¿Cuál es el hueso más largo del cuerpo humano?',
        options: ['Tibia', 'Radio', 'Costilla', 'Fémur'],
        correctIndex: 3,
        explanation: 'El fémur, ubicado en el muslo, es el hueso más largo y fuerte del esqueleto humano.'
      },
      {
        question: '¿Cuál es la moneda oficial de Japón?',
        options: ['Yuan', 'Yen', 'Won', 'Dólar'],
        correctIndex: 1,
        explanation: 'El Yen japonés es una de las monedas más fuertes e intercambiadas del mercado asiático.'
      },
      {
        question: '¿Cuál es el símbolo químico del Oro en la tabla periódica?',
        options: ['Or', 'Au', 'Ag', 'Gd'],
        correctIndex: 1,
        explanation: 'Proviene del latín aurum, que significa amanecer brillante.'
      },
      {
        question: '¿Cuántos días tiene un año bisiesto?',
        options: ['364', '365', '366', '367'],
        correctIndex: 2,
        explanation: 'Un año bisiesto añade un día extra a febrero (29 de febrero) sumando 366 días en total.'
      },
      {
        question: '¿En qué continente se encuentra el desierto del Sahara?',
        options: ['Asia', 'África', 'América del Sur', 'Oceanía'],
        correctIndex: 1,
        explanation: 'El Sahara es el desierto cálido más grande del mundo y cubre gran parte de África del Norte.'
      },
      {
        question: '¿Qué gas respiran las plantas y absorben durante la fotosíntesis?',
        options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Helio'],
        correctIndex: 2,
        explanation: 'Las plantas absorben dióxido de carbono y liberan oxígeno como subproducto de la fotosíntesis.'
      },
      {
        question: '¿Quién inventó la bombilla eléctrica comercialmente viable?',
        options: ['Nikola Tesla', 'Albert Einstein', 'Thomas Edison', 'Alexander Graham Bell'],
        correctIndex: 2,
        explanation: 'Aunque hubo precursores, Edison patentó y popularizó la primera bombilla incandescente duradera.'
      },
      {
        question: '¿Cuál es el océano más grande del mundo?',
        options: ['Océano Atlántico', 'Océano Índico', 'Océano Pacífico', 'Océano Ártico'],
        correctIndex: 2,
        explanation: 'El Pacífico cubre más área que toda la superficie terrestre del planeta combinada.'
      },
      {
        question: '¿Cuál es el único mamífero capaz de volar activamente?',
        options: ['Ardilla voladora', 'Murciélago', 'Lemur', 'Petauro del azúcar'],
        correctIndex: 1,
        explanation: 'Las ardillas voladoras solo planean, pero los murciélagos tienen un vuelo activo impulsado por sus alas.'
      },
    ],
  },
  {
    title: 'Cultura General 3',
    category: 'Conocimiento General',
    difficulty: 'HARD',
    questions: [
      {
        question: '¿Cuál es el país más pequeño del mundo?',
        options: ['Mónaco', 'San Marino', 'Ciudad del Vaticano', 'Liechtenstein'],
        correctIndex: 2,
        explanation: 'La Ciudad del Vaticano es una ciudad-estado soberana situada dentro de Roma.'
      },
      {
        question: '¿Cuál es el río más largo del mundo?',
        options: ['El Nilo', 'El Amazonas', 'El Yangtsé', 'El Misisipi'],
        correctIndex: 1,
        explanation: 'El río Amazonas en Sudamérica es el más largo y el más caudaloso del mundo.'
      },
      {
        question: '¿Cuál es la capital de Australia?',
        options: ['Sídney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctIndex: 2,
        explanation: 'Canberra fue construida a propósito para ser la capital, resolviendo una disputa entre Sídney y Melbourne.'
      },
      {
        question: '¿Cuál es la montaña más alta del mundo sobre el nivel del mar?',
        options: ['K2', 'Monte Everest', 'Kilimanjaro', 'Aconcagua'],
        correctIndex: 1,
        explanation: 'El Monte Everest alcanza los 8,848 metros de altura en la cordillera del Himalaya.'
      },
      {
        question: '¿Cuál es el mineral natural más duro del planeta?',
        options: ['Acero', 'Grafito', 'Cuarzo', 'Diamante'],
        correctIndex: 3,
        explanation: 'El diamante obtiene un 10 (el máximo) en la escala de dureza de Mohs.'
      },
      {
        question: '¿En qué año llegó el ser humano a la Luna por primera vez?',
        options: ['1965', '1969', '1971', '1959'],
        correctIndex: 1,
        explanation: 'La misión Apolo 11 alunizó con éxito el 20 de julio de 1969.'
      },
      {
        question: '¿Qué elemento químico compone la mayor parte del aire que respiramos?',
        options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'],
        correctIndex: 1,
        explanation: 'La atmósfera terrestre está compuesta por un 78% de nitrógeno y aproximadamente un 21% de oxígeno.'
      },
      {
        question: '¿Cuál es el idioma nativo más hablado del mundo?',
        options: ['Inglés', 'Español', 'Chino Mandarín', 'Hindi'],
        correctIndex: 2,
        explanation: 'El chino mandarín tiene más de 900 millones de hablantes nativos.'
      },
      {
        question: '¿Quién pintó el cuadro de "El Grito"?',
        options: ['Edvard Munch', 'Claude Monet', 'Pablo Picasso', 'Salvador Dalí'],
        correctIndex: 0,
        explanation: 'El artista noruego Edvard Munch pintó esta famosa obra expresionista en 1893.'
      },
      {
        question: '¿Qué país donó la Estatua de la Libertad a los Estados Unidos?',
        options: ['Inglaterra', 'Alemania', 'Francia', 'España'],
        correctIndex: 2,
        explanation: 'Francia donó la estatua en 1886 para conmemorar el centenario de la Declaración de Independencia de EE.UU.'
      },
    ],
  },
  {
    title: 'Historia Universal',
    category: 'Historia',
    difficulty: 'MEDIUM',
    questions: [
      {
        question: '¿En qué año finalizó la Segunda Guerra Mundial?',
        options: ['1941', '1945', '1939', '1950'],
        correctIndex: 1,
        explanation: 'La guerra terminó en 1945 con la rendición incondicional de Alemania en mayo y de Japón en septiembre.'
      },
      {
        question: '¿En qué año cayó el Muro de Berlín?',
        options: ['1989', '1991', '1985', '1993'],
        correctIndex: 0,
        explanation: 'El muro que dividía Berlín cayó el 9 de noviembre de 1989, marcando el fin de la Guerra Fría.'
      },
      {
        question: '¿Qué evento histórico inició con la Toma de la Bastilla en 1789?',
        options: ['Revolución Rusa', 'Revolución Industrial', 'Revolución Francesa', 'Guerra de los Cien Años'],
        correctIndex: 2,
        explanation: 'La Revolución Francesa derrocó la monarquía absoluta y estableció los derechos del hombre y del ciudadano.'
      },
      {
        question: '¿Quién fue el primer presidente de los Estados Unidos?',
        options: ['Abraham Lincoln', 'Thomas Jefferson', 'John Adams', 'George Washington'],
        correctIndex: 3,
        explanation: 'George Washington, comandante en jefe del Ejército Continental, asumió el cargo en 1789.'
      },
      {
        question: '¿En qué año descubrió Cristóbal Colón América?',
        options: ['1492', '1501', '1453', '1521'],
        correctIndex: 0,
        explanation: 'Colón llegó a las islas del Caribe el 12 de octubre de 1492 patrocinado por los Reyes Católicos.'
      },
      {
        question: '¿Qué civilización construyó las pirámides de Giza?',
        options: ['Mayas', 'Antiguos Egipcios', 'Sumerios', 'Babilonios'],
        correctIndex: 1,
        explanation: 'Fueron construidas como inmensas tumbas para los faraones Keops, Kefrén y Micerino.'
      },
      {
        question: '¿Quién fue la primera mujer en ganar un Premio Nobel y la única en ganarlo en dos especialidades científicas distintas?',
        options: ['Rosalind Franklin', 'Ada Lovelace', 'Marie Curie', 'Jane Goodall'],
        correctIndex: 2,
        explanation: 'Marie Curie ganó el premio en Física (1903) y en Química (1911) por su investigación sobre la radiactividad.'
      },
      {
        question: '¿Qué imperio antiguo fue gobernado por Julio César, Augusto y Nerón?',
        options: ['Imperio Otomano', 'Imperio Bizantino', 'Imperio Griego', 'Imperio Romano'],
        correctIndex: 3,
        explanation: 'Julio César y sus sucesores expandieron y gobernaron el vasto y poderoso Imperio Romano.'
      },
      {
        question: '¿Cuál fue la pandemia que asoló Europa en el siglo XIV matando a un tercio de su población?',
        options: ['Gripe Española', 'Peste Negra (Bubónica)', 'Cólera', 'Viruela'],
        correctIndex: 1,
        explanation: 'La Peste Negra se propagó rápidamente a través de pulgas en ratas transportadas por barcos mercantes.'
      },
      {
        question: '¿Quién lideró la independencia de varios países sudamericanos como Colombia, Venezuela y Ecuador?',
        options: ['José de San Martín', 'Simón Bolívar', 'Bernardo O\'Higgins', 'Miguel Hidalgo'],
        correctIndex: 1,
        explanation: 'Simón Bolívar, conocido como El Libertador, fue fundamental en la emancipación de Sudamérica frente al Imperio Español.'
      }
    ]
  }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data in dependency order (respecting foreign keys)
  console.log('🧹 Clearing existing data...');
  await prisma.answer.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.bestScore.deleteMany();
  await prisma.question.deleteMany();
  await prisma.trivia.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  console.log('👤 Creating admin user...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@pumquiz.com',
      username: 'admin',
      phone: '+520000000000',
      birthday: new Date('1990-01-01'),
      passwordHash: await hashPassword('Admin@123'),
      role: Role.ADMIN,
      emailVerified: true,
    },
  });

  // Create two regular verified users (for leaderboard testing)
  console.log('👥 Creating regular users...');
  const regularUsers = [
    {
      email: 'player1@pumquiz.com',
      username: 'player1',
      password: 'Player@123',
      phone: '+520000000001',
      birthday: '1998-05-12',
    },
  ];

  for (const user of regularUsers) {
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        phone: user.phone,
        birthday: new Date(user.birthday),
        passwordHash: await hashPassword(user.password),
        role: Role.USER,
        emailVerified: true,
      },
    });
  }

  // Create trivias with nested questions
  console.log('🎯 Creating trivias with questions...');
  for (const trivia of trivias) {
    const created = await prisma.trivia.create({
      data: {
        title: trivia.title,
        category: trivia.category,
        difficulty: trivia.difficulty,
        type: TriviaType.OFFICIAL,
        createdBy: admin.id,
        questions: {
          create: trivia.questions.map((q) => ({
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
          })),
        },
      },
    });
    console.log(`   ✔ "${created.title}" (${trivia.questions.length} preguntas)`);
  }

  console.log('✅ Seed complete!');
  console.log('   - 1 admin (admin@pumquiz.com / Admin@123)');
  console.log(`   - ${regularUsers.length} regular users (player1|player2@pumquiz.com / Player@123)`);
  console.log(`   - ${trivias.length} trivias, each with 10 questions`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
