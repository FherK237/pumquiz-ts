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
    {
      email: 'player2@pumquiz.com',
      username: 'player2',
      password: 'Player@123',
      phone: '+520000000002',
      birthday: '2000-09-23',
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
