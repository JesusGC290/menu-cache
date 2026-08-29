/**
 * Carta completa de CACHÉ RESTAURANTE.
 *
 * Fuente: MENU DESAYUNOS / MENU COMIDAS / MENU BEBIDAS (documentos del restaurante).
 * Las bebidas se comparten en los dos menús de alimentos.
 *
 * Para actualizar la carta sólo se edita este archivo: la web se regenera sola.
 *  - `note`  → línea secundaria en dorado (extras, precios alternos, aclaraciones).
 *  - `price` → sin signo de pesos, se formatea automáticamente.
 */

export type Product = {
  name: string;
  /**
   * Porción o gramaje del elemento principal. PROFECO obliga a declararlo.
   *
   * Se escribe sólo la cantidad —"160 g", "2 pzas", "3 claras"—, sin
   * paréntesis. Se dibuja al inicio de la descripción, en dorado y separado
   * con «·», para que se lea como especificación y no como parte del texto.
   * Si el platillo no tiene descripción, el gramaje ocupa ese renglón.
   *
   * Lo cualitativo ("fruta del día") va en `description`, no aquí: este campo
   * es para cantidades.
   */
  gramaje?: string;
  description?: string;
  price?: string;
  /** Aclaración o precios alternos, p. ej. "Con huevo $169 o pollo $169". */
  note?: string;
};

export type Category = {
  id: string;
  title: string;
  /** Nota que aplica a toda la categoría. */
  note?: string;
  products: Product[];
};

export type Menu = {
  id: string;
  /** Etiqueta corta para las pestañas. */
  tab: string;
  title: string;
  subtitle: string;
  categories: Category[];
};

const desayunos: Menu = {
  id: 'desayunos',
  tab: 'Desayunos',
  title: 'Desayunos',
  subtitle: 'Pa’ empezar el día como se debe',
  categories: [
    {
      id: 'pa-empezar',
      title: 'Pa’ empezar',
      products: [
        {
          name: 'Tasajo de Peinecillo con Jocoque',
          description: 'Cebollitas asadas, nopal y tortillas hechas a mano.',
          price: '199',
        },
        {
          name: 'Quesadillas con Lengua en Salsa Verde',
          gramaje: '3 pzas',
          price: '149',
        },
        {
          name: 'Quesabirrias',
          gramaje: '2 pzas',
          description: 'Tortilla hecha a mano.',
          price: '99',
        },
        {
          name: 'Tacos de Frijol a las Brasas',
          gramaje: '3 pzas',
          price: '89',
        },
        // Recuperados de la carta anterior (iban en Entradas de desayuno).
        {
          name: 'Hot Cakes con Fruta',
          gramaje: '3 pzas',
          description: 'Con fruta del día.',
          price: '109',
        },
        {
          name: 'Plato de Fruta con Yogurt',
          gramaje: '60 g de yogurt',
          description: 'Con fruta del día y granola.',
          price: '109',
        },
        {
          name: 'Pan Francés',
          gramaje: '2 pzas',
          price: '109',
        },
      ],
    },
    {
      id: 'chilaquiles',
      title: 'Pa’ seguir · Chilaquiles',
      note: 'Todos nuestros chilaquiles llevan crema, queso y cebolla.',
      products: [
        {
          name: 'Rojos',
          price: '159',
          note: 'Con huevo o pollo: $189',
        },
        {
          name: 'Verdes',
          price: '159',
          note: 'Con huevo o pollo: $189',
        },
        {
          name: 'Enchipotlados con Lengua',
          description: 'En salsa de chipotle, con lengua de res.',
          price: '199',
        },
        {
          name: 'Verdes con Labio',
          description: 'En salsa verde, con labio de res.',
          price: '199',
        },
        {
          name: 'Birriaquiles Gratinados',
          description: 'Con birria y queso gratinado.',
          price: '199',
        },
      ],
    },
    {
      id: 'molletes',
      title: 'Pal gusto · Molletes',
      products: [
        {
          name: 'Tradicionales',
          description: 'Frijol y queso, con salsa mexicana.',
          price: '99',
        },
        {
          name: 'Dulces',
          description: 'Cajeta, o mantequilla con azúcar.',
          price: '79',
        },
        {
          name: 'Divorciados con Chicharrón',
          description: 'Uno en salsa verde y otro en roja.',
          price: '110',
        },
      ],
    },
    {
      id: 'huevos',
      title: 'De la granja · Huevos',
      note: 'Todos los huevos van con frijoles o papa rayada.',
      products: [
        {
          name: 'Huevos al Gusto',
          gramaje: '2 huevos',
          description: 'Revueltos, con jamón, chorizo, salchicha, tocino, o rancheros.',
          price: '149',
        },
        {
          name: 'Huevos con Machaca y Salsa Norteña',
          gramaje: '2 huevos, 50 g de machaca',
          description: 'Acompañados con tortilla de harina.',
          price: '189',
        },
        {
          name: 'Huevos con Chilorio',
          gramaje: '100 g de chilorio, 2 pzas de huevo',
          description: 'Con un toque de la casa.',
          price: '189',
        },
        {
          name: 'Huevos a Caballo',
          description:
            'Par de huevos en tostada, con bistec de res bañado en salsa de molcajete, nopal asado, cebollitas y chile toreado.',
          price: '199',
        },
      ],
    },
    {
      id: 'pal-capricho',
      title: 'Pal capricho',
      note: 'Acompañado de frijoles y un trozo de panela.',
      products: [
        {
          name: 'Chicharrón (Pancita) en Salsa Roja',
          price: '179',
        },
        {
          name: 'Chicharrón (Pancita) en Salsa Verde',
          price: '179',
        },
      ],
    },
    {
      id: 'burritos',
      title: 'Pal glotón · Burritos gigantes',
      note: 'Todos los burritos van acompañados de papas a la francesa.',
      products: [
        {
          name: 'Huevo, Machaca, Queso y Frijol',
          price: '189',
        },
        {
          name: 'Carne Asada, Queso y Frijol',
          gramaje: '100 g de carne',
          price: '189',
        },
        {
          name: 'Camarón, Queso y Verdura',
          description: 'Con aderezo de cilantro.',
          price: '199',
        },
      ],
    },
    {
      id: 'infantil-desayunos',
      title: 'Pal chilpayate',
      products: [
        {
          name: 'Hamburguesa Infantil',
          gramaje: '140 g de carne, 100 g de papas',
          price: '139',
        },
        {
          name: 'Hot Cakes con Nieve',
          gramaje: '4 pzas, 1 bola de nieve',
          price: '110',
        },
        {
          name: 'Pechuga Empanizada',
          gramaje: '140 g de pechuga, 100 g de papas',
          price: '110',
        },
      ],
    },
  ],
};

const comidas: Menu = {
  id: 'comidas',
  tab: 'Comidas',
  title: 'Comidas',
  subtitle: 'La cocina de siempre, la de la casa',
  categories: [
    {
      id: 'pa-entrarle',
      title: 'Pa’ entrarle',
      products: [
        {
          name: 'Panela del Rancho Asada',
          gramaje: '180 g',
          description: 'Bañada en salsa verde.',
          price: '149',
        },
        {
          name: 'Queso Fundido Natural',
          gramaje: '180 g',
          price: '149',
        },
        {
          name: 'Queso Fundido con Chorizo',
          gramaje: '180 g',
          price: '149',
        },
        {
          name: 'Guacamole',
          gramaje: '180 g',
          price: '110',
        },
        {
          name: 'Chistorra',
          gramaje: '200 g',
          description: 'Acompañada de chiles toreados y cebolla.',
          price: '149',
        },
        {
          name: 'Queso Empanizado',
          description: 'Bañado en salsa verde.',
          price: '149',
        },
        {
          name: 'Frijoles con Queso',
          price: '99',
        },
        {
          name: 'Tacos de Frijol al Carbón',
          price: '89',
        },
      ],
    },
    {
      id: 'sopas',
      title: 'Pa’ sopear · Sopas',
      products: [
        {
          name: 'Tortilla',
          description: 'Fritura de tortilla, panela, aguacate y chicharrón.',
          price: '139',
        },
        {
          name: 'Tlalpeño',
          gramaje: '70 g',
          description: 'Consomé de pollo con arroz, verdura y pechuga.',
          price: '159',
        },
      ],
    },
    {
      id: 'pa-no-rendirse',
      title: 'Pa’ no rendirse',
      note: 'Las pechugas van con papas a la francesa y ensalada.',
      products: [
        {
          name: 'Pechuga a la Plancha',
          gramaje: '180 g',
          price: '199',
        },
        {
          name: 'Pechuga Empanizada',
          gramaje: '180 g',
          price: '199',
        },
        {
          name: 'Enchiladas Arrieras',
          description: 'De arrachera, bañadas en salsa verde y queso Oaxaca.',
          price: '169',
        },
        {
          name: 'Enchiladas de la Abuela',
          description: 'Muy rojas, con pollo, crema y queso Oaxaca.',
          price: '149',
        },
      ],
    },
    {
      id: 'las-inolvidables',
      title: 'Las inolvidables',
      products: [
        {
          name: 'Chile en Nogada',
          gramaje: '100 g',
          description: 'Acompañado de arroz. De temporada.',
          price: '249',
        },
        {
          name: 'Chile Relleno',
          description: 'Acompañado de arroz.',
          price: '189',
        },
      ],
    },
    {
      id: 'pa-los-carnivoros',
      title: 'Pa’ los carnívoros',
      note: 'Peinecillo y arrachera se sirven con papa horneada, ensalada y nopal asado.',
      products: [
        {
          name: 'Carne Asada',
          gramaje: '180 g',
          description:
            'Muy suavecita, con guacamole, frijoles, quesadilla, nopal, cebollitas y chile toreado.',
          price: '199',
        },
        {
          name: 'Peinecillo',
          gramaje: '180 g',
          price: '199',
        },
        {
          name: 'Arrachera',
          price: '199',
        },
      ],
    },
    {
      id: 'muy-nuestros',
      title: 'Muy nuestros',
      products: [
        {
          name: 'Chamorro al Horno',
          gramaje: '900 g',
          price: '199',
        },
        {
          name: 'Mixiote de Pollo al Horno',
          price: '199',
        },
        {
          name: 'Molcajete de Peinecillo',
          price: '229',
        },
        {
          name: 'Molcajete Mar y Tierra',
          gramaje: '100 g de picaña, 100 g de camarón',
          description:
            'Picaña, camarón, nopal asado con cebolla cambray y panela asada, bañados en salsa de tomate, morrón y un toque de serrano.',
          price: '289',
        },
        {
          name: 'Plato Botanero',
          gramaje: '4 personas',
          description:
            '2 chiles jalapeños con queso, chicharrón duro 100 g, chistorra 200 g, queso fundido natural 180 g, guacamole 180 g y frijoles fritos 180 g.',
          price: '550',
        },
        {
          name: 'Parrillada',
          gramaje: '3 a 4 personas',
          description:
            'Peinecillo 200 g, pollo adobado 200 g, espaldilla 200 g y panza de cerdo 200 g. Queso fundido con chorizo 250 g, guacamole 180 g y frijoles refritos con queso 180 g.',
          price: '850',
        },
      ],
    },
    {
      id: 'postres',
      title: 'Pa’ acabar · Postres',
      products: [
        { name: 'Jericalla', price: '89' },
        { name: 'Flan de Elote', price: '89' },
        { name: 'Pan de Elote', price: '79' },
        { name: 'Pastel de Chocolate', price: '99' },
        { name: 'Carlota de Limón', price: '89' },
      ],
    },
  ],
};

const bebidas: Menu = {
  id: 'bebidas',
  tab: 'Bebidas',
  title: 'Bebidas',
  subtitle: 'Disponibles todo el día',
  categories: [
    {
      id: 'cafe',
      title: 'Café',
      products: [
        {
          name: 'Café Americano',
          gramaje: '450 ml',
          description: 'Refill.',
          price: '59',
        },
        {
          name: 'Espresso',
          gramaje: '30 ml',
          description: '1 carga de café.',
          price: '45',
        },
        {
          name: 'Espresso Doble',
          gramaje: '60 ml',
          description: '2 cargas de café.',
          price: '59',
        },
        {
          name: 'Café de Olla',
          gramaje: '450 ml',
          description: 'Café, canela, anís y piloncillo.',
          price: '59',
        },
        {
          name: 'Latte',
          gramaje: '220 ml',
          price: '79',
        },
        {
          name: 'Capuccino',
          gramaje: '180 ml',
          price: '79',
        },
        {
          name: 'Capuccino Baileys',
          gramaje: '180 ml',
          price: '149',
        },
        {
          name: 'Café Lechero',
          gramaje: '400 ml',
          description: 'Especialidad de la casa.',
          price: '79',
        },
        {
          name: 'Chocolate Caliente',
          gramaje: '220 ml',
          price: '59',
        },
      ],
    },
    {
      id: 'refrescos',
      title: 'Refrescos',
      products: [
        {
          name: 'Coca Cola',
          gramaje: '355 ml',
          description: 'Regular, Zero o Light.',
          price: '55',
        },
        {
          name: 'Fanta, Sprite o Manzanita',
          gramaje: '355 ml',
          price: '55',
        },
        {
          name: 'Squirt',
          gramaje: '600 ml',
          price: '55',
        },
        {
          name: 'Topo Chico',
          gramaje: '600 ml',
          price: '55',
        },
        {
          name: 'Topo Chico Sangría',
          gramaje: '600 ml',
          price: '55',
        },
        {
          name: 'Fuze Tea',
          gramaje: '600 ml',
          description: 'Durazno o limón.',
          price: '55',
        },
        {
          name: 'Agua Mineralizada (Ciel)',
          gramaje: '350 ml',
          price: '55',
        },
        {
          name: 'Jugo del Valle Manzana Kids',
          gramaje: '250 ml',
          price: '25',
        },
        {
          name: 'Agua Ciel Natural',
          gramaje: '600 ml',
          price: '35',
        },
      ],
    },
    {
      id: 'sin-alcohol',
      title: 'Bebidas sin Alcohol',
      products: [
        {
          name: 'Jugo Natural de Naranja',
          gramaje: '350 ml',
          price: '59',
        },
        {
          name: 'Jugo Verde Natural',
          gramaje: '350 ml',
          description: 'Piña, naranja, perejil, apio y espinaca.',
          price: '69',
        },
        {
          name: 'Limonada',
          gramaje: '350 ml',
          description: 'Mineral o natural, con jarabe natural.',
          price: '59',
        },
        {
          name: 'Naranjada',
          gramaje: '350 ml',
          description: 'Mineral o natural, con jarabe natural.',
          price: '59',
        },
        {
          name: 'Aguas Frescas',
          gramaje: '400 ml',
          description: 'Avena, jamaica, piña o pepino con hierbabuena.',
          price: '49',
        },
        {
          name: 'Piñada',
          gramaje: '400 ml',
          description: 'Crema de coco, jugo de piña y leche evaporada.',
          price: '79',
        },
        {
          name: 'Canica',
          gramaje: '350 ml',
          description: 'Soda lima limón con granadina.',
          price: '49',
        },
        {
          name: 'Cazuela',
          gramaje: '500 ml',
          description: 'Squirt, naranja, lima, toronja, limón y sal.',
          price: '89',
        },
      ],
    },
    {
      id: 'vino',
      title: 'Vino Tinto',
      products: [
        {
          name: 'Copa de Vino de la Casa',
          gramaje: '150 ml',
          description: 'La Cetto, Cabernet Sauvignon.',
          price: '89',
        },
      ],
    },
    {
      id: 'cocteles-vino',
      title: 'Cócteles con Vino',
      products: [
        {
          name: 'Clericot',
          gramaje: '300 ml',
          description:
            'Jugo de naranja, limón, soda de manzana y un toque de vino tinto, decorado con nuez y fruta de temporada.',
          price: '79',
        },
        {
          name: 'Sangría',
          gramaje: '300 ml',
          description: 'Limón, jarabe, agua mineral y vino tinto.',
          price: '79',
        },
        {
          name: 'Tinto de Verano',
          gramaje: '300 ml',
          description: 'Soda lima limón, vino tinto y jugo de limón.',
          price: '79',
        },
        {
          name: 'Mimosas',
          gramaje: '180 ml',
          description:
            'Jugo a elección: naranja, arándano o piña, con vino espumoso.',
          price: '99',
        },
      ],
    },
    {
      id: 'malteadas',
      title: 'Malteadas y Frappés',
      note: 'Con leche entera o deslactosada',
      products: [
        {
          name: 'Mazapán',
          gramaje: '400 ml',
          description: 'Pieza de mazapán, helado de vainilla y leche.',
          price: '89',
        },
        {
          name: 'Oreo',
          gramaje: '400 ml',
          description: 'Galleta Oreo, helado de vainilla, chocolate y leche.',
          price: '89',
        },
        {
          name: 'Chocolate',
          gramaje: '400 ml',
          description: 'Jarabe de chocolate, helado de chocolate y leche.',
          price: '89',
        },
        {
          name: 'Fresa',
          gramaje: '400 ml',
          description: 'Fresa natural, helado de fresa y leche.',
          price: '89',
        },
        {
          name: 'Frappuccino',
          gramaje: '400 ml',
          description: 'Carga de espresso, leche y chocolate.',
          price: '79',
        },
      ],
    },
    {
      id: 'smoothies',
      title: 'Smoothies',
      note: 'Con agua o leche entera o deslactosada',
      products: [
        {
          name: 'Mango',
          gramaje: '400 ml',
          description: 'Mango natural y jarabe.',
          price: '69',
        },
        {
          name: 'Fresa',
          gramaje: '400 ml',
          description: 'Fresa natural y jarabe.',
          price: '69',
        },
      ],
    },
    {
      id: 'mocktails',
      title: 'Mocktails',
      products: [
        {
          name: 'Manzana Muck',
          gramaje: '350 ml',
          description: 'Jugo de manzana, jarabe, limón y ginger ale.',
          price: '79',
        },
        {
          name: 'Frutos Rojos Muck',
          gramaje: '350 ml',
          description: 'Frutos rojos, jarabe, limón, arándano y ginger ale.',
          price: '79',
        },
        {
          name: 'Maracuyá Muck',
          gramaje: '300 ml',
          description: 'Pulpa de maracuyá, jarabe, limón y piña.',
          price: '79',
        },
        {
          name: 'Pepino Muck',
          gramaje: '300 ml',
          description: 'Pepino natural, jarabe, limón y jugo de piña.',
          price: '79',
        },
      ],
    },
    {
      id: 'digestivos',
      title: 'Digestivos',
      products: [
        {
          name: 'Carajilla',
          gramaje: '200 ml',
          description: 'Licor Baileys y 1 carga de espresso.',
          price: '159',
        },
        {
          name: 'Carajillo',
          gramaje: '200 ml',
          description: 'Licor 43 y 1 carga de espresso.',
          price: '159',
        },
      ],
    },
    {
      id: 'cerveza',
      title: 'Cerveza',
      products: [
        {
          name: 'Tecate Roja',
          gramaje: '325 ml',
          price: '49',
        },
        {
          name: 'Tecate Light',
          gramaje: '325 ml',
          price: '49',
        },
        {
          name: 'Carta Blanca',
          gramaje: '300 ml',
          price: '49',
        },
        {
          name: 'Miller High Life',
          gramaje: '355 ml',
          price: '69',
        },
        {
          name: 'Heineken',
          gramaje: '355 ml',
          price: '69',
        },
        {
          name: 'Heineken Barril',
          gramaje: '355 ml',
          price: '75',
        },
        {
          name: 'Heineken 0.0',
          gramaje: '355 ml',
          price: '49',
        },
        {
          name: 'Bohemia Clara',
          gramaje: '355 ml',
          price: '69',
        },
        {
          name: 'Bohemia Cristal',
          gramaje: '355 ml',
          price: '69',
        },
        {
          name: 'Bohemia Obscura',
          gramaje: '355 ml',
          price: '69',
        },
        {
          name: 'Indio',
          gramaje: '325 ml',
          price: '45',
        },
        {
          name: 'XX Lager',
          gramaje: '325 ml',
          price: '45',
        },
        {
          name: 'XX Ámbar',
          gramaje: '325 ml',
          price: '45',
        },
        {
          name: 'Amstel Ultra',
          gramaje: '355 ml',
          price: '69',
        },
      ],
    },
    {
      id: 'micheladas',
      title: 'Micheladas y Especiales',
      products: [
        {
          name: 'Vaso Michelado',
          gramaje: '90 ml',
          description:
            'Escarchado con Tajín, salsas negras, limón, sal y clamato.',
          price: '30',
        },
        {
          name: 'Vaso Ruso',
          gramaje: '30 ml',
          description: 'Escarcha de sal y jugo de limón.',
          price: '15',
        },
        {
          name: 'Vaso Cubano',
          gramaje: '45 ml',
          description: 'Escarchado con sal, jugo de limón y salsas negras.',
          price: '25',
        },
        {
          name: 'Michelada de Fresa',
          gramaje: '600 ml',
          description:
            'Limón, concentrado de fresa, cerveza, tamarindo y pica fresa.',
          price: '149',
        },
        {
          name: 'Michelada de Tamarindo',
          gramaje: '600 ml',
          description: 'Limón, pulpa de tamarindo, cerveza y dulce de tamarindo.',
          price: '149',
        },
        {
          name: 'Michelada de Mango',
          gramaje: '600 ml',
          description: 'Limón, pulpa de mango, cerveza y gomitas de mango.',
          price: '149',
        },
      ],
    },
    {
      id: 'spritz',
      title: 'Spritz',
      products: [
        {
          name: 'Aperol Spritz',
          gramaje: '250 ml',
          description: 'Vino espumoso, agua mineral y Aperol. Naranja fresca.',
          price: '149',
        },
        {
          name: '43 Spritz',
          gramaje: '250 ml',
          description: 'Vino espumoso, agua mineral, limón y Licor 43.',
          price: '159',
        },
        {
          name: 'Hugo Spritz',
          gramaje: '250 ml',
          description: 'Licor de flor de saúco, agua mineral y vino espumoso.',
          price: '169',
        },
      ],
    },
  ],
};

export const menus: Menu[] = [desayunos, comidas, bebidas];
