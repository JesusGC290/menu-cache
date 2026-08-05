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
  subtitle: 'Para empezar el día con caché',
  categories: [
    {
      id: 'entradas-desayuno',
      title: 'Entradas',
      products: [
        {
          name: 'Pan Dulce de Canasta',
          gramaje: '1 pza',
          price: '29',
        },
        {
          name: 'Plato de Jocoque',
          gramaje: '160 g',
          description: 'Acompañado de tortillas hechas a mano.',
          price: '69',
        },
        {
          name: 'Hot Cakes con Fruta',
          gramaje: '3 pzas',
          description: 'Con fruta del día.',
          price: '109',
        },
        {
          name: 'Pan Francés',
          gramaje: '2 pzas',
          price: '109',
        },
        {
          name: 'Plato de Fruta con Yogurt',
          gramaje: '60 g de yogurt',
          description: 'Con fruta del día y granola.',
          price: '109',
        },
      ],
    },
    {
      id: 'chilaquiles',
      title: 'Chilaquiles',
      products: [
        {
          name: 'Rojos',
          description:
            'Tira de maíz frita bañada en salsa de jitomate y serrano. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
        },
        {
          name: 'Verdes',
          description:
            'Tira de maíz frita bañada en salsa de tomate verde, chile serrano, cilantro, cebolla y epazote. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
        },
        {
          name: 'Enchipotlados',
          description:
            'Tira de maíz frita bañada en salsa de jitomate, cebolla, chile chipotle y crema. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
        },
        {
          name: 'Enmolados',
          description:
            'Tira de maíz frita bañada en mole de la casa, acompañados de queso fresco, cebolla morada y ajonjolí.',
          price: '169',
        },
        {
          name: 'Entre Chilaquiles',
          description:
            'Delicado omelette bañado en chilaquiles a elección. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '169',
        },
        {
          name: 'Poblanos',
          description:
            'Tira de maíz frita bañada en salsa poblana, con elote, flor de calabaza, cebolla, queso fresco, crema y cilantro.',
          price: '169',
        },
        {
          name: 'Tatemados',
          description:
            'Tira de maíz frita bañada en salsa tatemada de tomate verde y jitomate. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
        },
        {
          name: 'Chilaquiles Caché',
          description:
            'Tira de maíz frita bañada en salsa de frijol, acompañados de chorizo y espaldilla asada, salsa molcajeteada, crema y queso.',
          price: '190',
        },
        {
          name: 'Chilaquitas',
          description:
            'Tira de maíz bañada en salsa roja o verde, acompañada de fajitas de pollo adobado, con cebolla, queso fresco, crema y cilantro.',
          price: '190',
        },
      ],
      note: 'Con chorizo, chicharrón o asada 80 g: más $60 · Huevo 1 pza: más $20 · Pollo 80 g: más $40',
    },
    {
      id: 'huevos',
      title: 'Omelette y Huevos',
      products: [
        {
          name: 'Omelette al Gusto',
          gramaje: '2 pzas de huevo, 60 g de proteína',
          description: 'Mexicana, salchicha, jamón, chorizo o tocino.',
          price: '149',
          note: 'Con espinaca, flor de calabaza o panela asada: más $30',
        },
        {
          name: 'Embarazada de Huevo',
          gramaje: '1 pza de huevo, 80 g de chicharrón',
          description:
            'Tortilla hecha a mano rellena de huevo, bañada en chicharrón rojo o verde y frijoles.',
          price: '149',
        },
        {
          name: 'Plato de Chilorio',
          gramaje: '100 g de chilorio, 2 pzas de huevo',
          description:
            'A la mexicana, acompañado de frijoles refritos, aguacate y queso fresco.',
          price: '179',
        },
        {
          name: 'Huevos al Gusto',
          gramaje: '2 huevos',
          description:
            'Estrellados o revueltos. A la mexicana, jamón, tocino, salchicha o chorizo. Acompañados de frijoles refritos, aguacate y queso fresco.',
          price: '139',
          note: 'Con espinaca, flor de calabaza o panela asada: más $30',
        },
        {
          name: 'Huevos Rancheros',
          gramaje: '2 huevos',
          description:
            'Fritos y montados en tortillas doradas, bañados en salsa ranchera. Acompañados de frijol con queso fresco y aguacate.',
          price: '139',
        },
        {
          name: 'Huevos con Machaca',
          gramaje: '2 huevos, 50 g de machaca',
          description:
            'Revueltos y guisados a la mexicana. Acompañados de frijol con queso fresco, aguacate y tortillas de harina.',
          price: '179',
        },
        {
          name: 'Tradicional Huevo Ahogado',
          gramaje: '2 huevos',
          description:
            'Cocinados en cazuela de hierro en salsa de tomate verde y panela, acompañados de pan o tortilla.',
          price: '149',
        },
        {
          name: 'Huevos Caché',
          gramaje: '2 huevos',
          description:
            'Huevo pochado montado en nido de papa, bañado en crema de chipotle, tocino crujiente, espinaca y queso.',
          price: '169',
        },
        {
          name: 'Desayuno Americano',
          gramaje: '2 huevos',
          description: 'Al gusto, con tocino, hot cakes, papa hash brown y café.',
          price: '159',
        },
      ],
    },
    {
      id: 'toast',
      title: 'Toast',
      products: [
        {
          name: 'Toast de Jamón Serrano',
          gramaje: '30 g de jamón serrano',
          description:
            'Con aguacate y 1 huevo estrellado. Acompañado de ensalada dulce con espinaca.',
          price: '149',
        },
        {
          name: 'Toast de Salmón',
          gramaje: '100 g de salmón',
          description:
            'Con aderezo de yogurt griego y pesto de finas hierbas. Acompañado de ensalada dulce con espinaca y plátano macho.',
          price: '199',
        },
        {
          name: 'Toast de Aguacate',
          gramaje: '50 g de tocino, 50 g de panela',
          description:
            'Con aguacate y huevo. Acompañado de ensalada dulce con espinaca.',
          price: '149',
        },
      ],
    },
    {
      id: 'molletes',
      title: 'Molletes',
      products: [
        {
          name: 'Molletes Tradicionales',
          description:
            'Bolillo con frijol y queso gratinado, acompañado de salsa mexicana.',
          price: '99',
        },
        {
          name: 'Mollete de Chicharrón',
          gramaje: '80 g de chicharrón',
          description: 'Bolillo con frijoles, queso gratinado y chicharrón verde o rojo.',
          price: '129',
        },
        {
          name: 'Mollete de Chilaquiles',
          description:
            'A su elección. Bolillo con frijoles, chilaquiles, queso fresco, crema, cebolla y cilantro.',
          price: '129',
        },
        {
          name: 'Molletes Divorciados',
          description:
            'Mitad bolillo dulce a elección y mitad mollete salado con frijoles y queso gratinado.',
          price: '99',
        },
        {
          name: 'Molletes Dulces',
          description: 'Bolillo con mantequilla, mermelada, cajeta o lechera.',
          price: '79',
        },
      ],
    },
    {
      id: 'sandwich',
      title: 'Sandwich',
      products: [
        {
          name: 'Club Sandwich',
          gramaje: '140 g de proteína, 100 g de papas',
          description:
            'Pan tostado con queso, tocino, pollo y aguacate, acompañado de papas fritas.',
          price: '169',
        },
        {
          name: 'Crispy Chicken Cesar Sandwich',
          gramaje: '200 g de proteína, 100 g de papas',
          description:
            'Pan baguette tostado con pechuga empanizada, aderezo césar, lechuga y queso parmesano, acompañado de papas fritas.',
          price: '179',
        },
      ],
    },
    {
      id: 'enchiladas',
      title: 'Enchiladas',
      note: 'Todas llevan 100 g de proteína',
      products: [
        {
          name: 'Suizas',
          description:
            'Cuatro enchiladas rellenas de pollo deshebrado, bañadas en salsa suiza, gratinadas.',
          price: '149',
        },
        {
          name: 'Poblanas',
          description:
            'Cuatro enchiladas rellenas de diezmillo asado o pollo deshebrado, bañadas en salsa de chile poblano, gratinadas con crema y queso.',
          price: '169',
        },
        {
          name: 'Entomatadas',
          description:
            'Cuatro enchiladas rellenas de pollo deshebrado, bañadas en salsa cremosa de jitomate. Gratinadas.',
          price: '139',
        },
        {
          name: 'Enmoladas',
          description:
            'Cuatro enchiladas rellenas de pollo deshebrado, bañadas en mole de la casa, con cebolla morada desflemada y ajonjolí.',
          price: '149',
        },
        {
          name: 'Enfrijoladas',
          description:
            'Cuatro enchiladas rellenas de pollo deshebrado, bañadas en salsa de frijoles de la casa, con queso fresco y crema.',
          price: '139',
        },
      ],
    },
    {
      id: 'burritos',
      title: 'Burritos',
      products: [
        {
          name: 'Burrito de Machaca',
          gramaje: '50 g de machaca, 100 g de papas',
          description:
            'Tortilla de harina con machaca a la mexicana, acompañado de papas fritas.',
          price: '179',
        },
        {
          name: 'Burrito a la Mexicana',
          gramaje: '2 huevos',
          description:
            'Tortilla de harina con huevo a la mexicana, acompañado de frijoles.',
          price: '139',
        },
        {
          name: 'Burrito de Carne Asada',
          gramaje: '100 g de carne',
          description:
            'Tortilla de harina con carne asada, queso y frijoles.',
          price: '169',
        },
      ],
    },
    {
      id: 'birria',
      title: 'Birria',
      products: [
        { name: 'Quesabirria Individual', price: '49' },
        {
          name: 'Volteados con Queso',
          gramaje: '1 pza',
          price: '49',
        },
      ],
    },
    {
      id: 'quesadillas',
      title: 'Quesadillas',
      products: [
        {
          name: 'Quesadilla de Comal',
          gramaje: '1 pza',
          description: 'Tortilla hecha a mano con queso.',
          price: '39',
          note: 'Con chorizo, chicharrón o asada 80 g: más $60 · Pollo 80 g: más $40',
        },
      ],
    },
    {
      id: 'menudo',
      title: 'Menudo',
      note: 'Solo sábados y domingos',
      products: [{ name: 'Menudo', price: '100' }],
    },
    {
      id: 'fitness',
      title: 'Menú Fitness',
      products: [
        {
          name: 'Panela Asada',
          gramaje: '180 g',
          description: 'Bañada en salsa verde, con guarnición de ensalada.',
          price: '139',
        },
        {
          name: 'Rollo de Pollo',
          gramaje: '180 g',
          description:
            'Relleno de panela y espinaca, bañado en salsa roja o verde, con guarnición de ensalada.',
          price: '189',
        },
        {
          name: 'Omelette de Claras de Huevo',
          gramaje: '3 claras',
          description:
            'Con panela asada y espinacas, acompañado de ensalada fresca y aguacate.',
          price: '169',
        },
        {
          name: 'Hot Cakes de Avena',
          gramaje: '3 pzas',
          description: 'Acompañados de topping de fruta del día.',
          price: '139',
        },
      ],
    },
    {
      id: 'infantil-desayunos',
      title: 'Menú Infantil',
      products: [
        {
          name: '3 Mini Hamburguesitas',
          gramaje: '140 g de carne, 100 g de papas',
          description: 'Con pan brioche, carne de res y queso, con papas fritas.',
          price: '119',
        },
        {
          name: 'Pechuga Empanizada',
          gramaje: '140 g de pechuga, 100 g de papas',
          description: 'Con guarnición de papas fritas.',
          price: '119',
        },
        {
          name: 'Mini Hot Cakes',
          gramaje: '4 pzas, 1 bola de nieve',
          price: '99',
        },
      ],
    },
  ],
};

const comidas: Menu = {
  id: 'comidas',
  tab: 'Comidas',
  title: 'Comidas',
  subtitle: 'La cocina mexicana de la casa',
  categories: [
    {
      id: 'entradas',
      title: 'Entradas',
      products: [
        {
          name: 'Chicharrón Duro',
          gramaje: '80 g',
          description: 'Con salsa martajada.',
          price: '99',
        },
        {
          name: 'Panela Asada',
          gramaje: '180 g',
          description: 'Bañada en salsa verde.',
          price: '139',
        },
        {
          name: 'Queso Fundido Natural',
          gramaje: '180 g',
          price: '139',
          note: 'Con chorizo, flor de calabaza o champiñón 80 g: $169',
        },
        {
          name: 'Manitas en Escabeche Frías',
          gramaje: '4 pzas, 500 g',
          price: '139',
        },
        {
          name: 'Guacamole con Totopos',
          gramaje: '180 g',
          price: '109',
        },
        {
          name: 'Taco de Chile Güero Empanizado',
          gramaje: '30 g de asada',
          description: 'Relleno de asada.',
          price: '79',
        },
        {
          name: 'Chistorra Asada al Carbón',
          gramaje: '200 g',
          description: 'Acompañada de chiles toreados y cebolla.',
          price: '129',
        },
      ],
    },
    {
      id: 'ensaladas',
      title: 'Ensaladas',
      products: [
        {
          name: 'Ensalada César con Pollo',
          gramaje: '100 g de pollo',
          description:
            'Corazón de lechuga bañado en aderezo césar, crotones y queso parmesano.',
          price: '139',
        },
        {
          name: 'Ensalada de Frutos Rojos',
          description:
            'Mix de lechugas con fresa, suprema de naranja, arándano y queso suizo, con vinagreta de fresa, vino tinto y miel.',
          price: '120',
          note: 'Con pollo 80 g: $160 · Con peinecillo 80 g: $180',
        },
      ],
    },
    {
      id: 'sopas',
      title: 'Sopas',
      products: [
        {
          name: 'Caldo Tlalpeño',
          gramaje: '70 g',
          description:
            'Consomé con verduras, arroz, pollo, un toque de chipotle, garbanzos y aguacate.',
          price: '149',
        },
        {
          name: 'Sopa de Fideo Seco o en Caldo',
          description:
            'Receta de la abuela, decorada con panela, aguacate y chipotle.',
          price: '99',
        },
        {
          name: 'Sopa de Tortilla Azteca',
          description:
            'Salsa a base de jitomate y epazote con fritura de tortilla de maíz, decorada con panela, aguacate, chicharrón duro, crema y chile pasilla.',
          price: '119',
        },
        {
          name: 'Crema del Día',
          description: 'Preguntar al mesero.',
          price: '99',
        },
      ],
    },
    {
      id: 'platos-fuertes',
      title: 'Platos Fuertes',
      products: [
        {
          name: 'Pollo a la Plancha',
          gramaje: '180 g',
          description: 'Acompañado de arroz y ensalada.',
          price: '190',
        },
        {
          name: 'Milanesa de Pollo',
          gramaje: '180 g',
          description: 'Acompañada de ensalada y papas fritas.',
          price: '190',
        },
        {
          name: 'Chile en Nogada',
          gramaje: '100 g',
          description:
            'Chile relleno de carne con un toque dulce, bañado en salsa nogada con nuez, perejil y granada.',
          price: '259',
        },
        {
          name: 'Chiles Rellenos',
          description:
            '2 piezas rellenas de queso, bañadas en salsa roja y acompañadas de arroz.',
          price: '180',
        },
        {
          name: 'Pollo en Mole',
          gramaje: '250 g',
          description:
            'Pierna y muslo bañados en mole de la casa, espolvoreados con ajonjolí y acompañados de arroz.',
          price: '240',
        },
        {
          name: 'Carne Asada',
          gramaje: '180 g',
          description:
            'Carne en tasajo, quesadilla, nopal asado, cebolla cambray, guacamole y frijoles con queso fresco.',
          price: '199',
        },
        {
          name: 'Chamorro',
          gramaje: '900 g',
          description:
            '1 pieza de chamorro horneado lentamente, bañado con salsa de la casa y acompañado de frijoles y cebolla curtida.',
          price: '189',
        },
        {
          name: 'Molcajete Mar y Tierra',
          gramaje: '100 g de picaña, 100 g de camarón',
          description:
            'Picaña, camarón, nopal asado con cebolla cambray y panela asada, bañados en salsa de tomate, morrón y un toque de serrano.',
          price: '299',
        },
        {
          name: 'Peinecillo',
          gramaje: '180 g',
          description:
            'Acompañado de frijoles fritos, nopal y cebolla cambray asados, y guacamole.',
          price: '199',
        },
      ],
    },
    {
      id: 'del-mar',
      title: 'Del Mar',
      products: [
        {
          name: 'Salmón al Gusto',
          gramaje: '200 g',
          description:
            'A las finas hierbas, a la mantequilla o al limón. Acompañado de puré y ensalada.',
          price: '259',
        },
        {
          name: 'Camarones al Gusto',
          gramaje: '180 g',
          description:
            'A la diabla, al ajillo, a la momia, empanizados o al coco. Guarnición de arroz y ensalada.',
          price: '259',
        },
        {
          name: 'Pescado al Gusto',
          gramaje: '180 g',
          description:
            'A la plancha, al ajillo, a la diabla o empanizado. Guarnición de arroz y ensalada.',
          price: '210',
        },
      ],
    },
    {
      id: 'especialidades',
      title: 'Especialidades',
      products: [
        {
          name: 'Plato Botanero',
          gramaje: '4 personas',
          description:
            '2 jaladas de chile jalapeño con queso, chicharrón duro 100 g, chistorra 200 g, queso fundido natural 180 g, guacamole 180 g y frijoles fritos 180 g.',
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
      id: 'infantil-comidas',
      title: 'Menú Infantil',
      note: 'Todo en cajitas',
      products: [
        {
          name: '3 Mini Hamburguesas',
          gramaje: '140 g de carne, 100 g de papas',
          description:
            'Carne de res, pan brioche y queso amarillo, con papas a la francesa.',
          price: '119',
        },
        {
          name: 'Tiras de Pechuga de Pollo',
          gramaje: '140 g de pollo, 100 g de papas',
          description: 'Con papas a la francesa.',
          price: '119',
        },
        {
          name: 'Camarones Empanizados',
          gramaje: '100 g',
          description: 'Con aderezo de la casa.',
          price: '129',
        },
      ],
    },
    {
      id: 'postres',
      title: 'Postres',
      products: [
        { name: 'Jericallas', price: '79' },
        { name: 'Flan de Elote', price: '79' },
        { name: 'Carlota de Limón', price: '69' },
        { name: 'Pan de Elote', price: '69' },
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
          name: 'Tonicol',
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
          name: 'Pantera Rosa',
          gramaje: '400 ml',
          description: 'Crema de coco, fresa y granadina.',
          price: '79',
        },
        {
          name: 'Canica',
          gramaje: '350 ml',
          description: 'Soda lima limón con granadina.',
          price: '49',
        },
        {
          name: 'Tejuino',
          gramaje: '400 ml',
          description: 'Fermento a base de maíz nixtamalizado, piloncillo y limón.',
          price: '65',
        },
        {
          name: 'Tepache',
          gramaje: '300 ml',
          description:
            'Fermento a base de piña, piloncillo y especias: clavo de olor, canela, pimienta gorda y anís.',
          price: '59',
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
          gramaje: '50 ml',
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
        {
          name: 'Tejuino Muck',
          gramaje: '400 ml',
          description: 'Tejuino, limón, jugo de piña y agua mineral.',
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
          name: 'Vaso Tejuichela',
          gramaje: '90 ml',
          description: 'Preparación de tejuino, limón y sal.',
          price: '39',
        },
        {
          name: 'Tejuichela Caché',
          gramaje: '300 ml',
          description: 'Tejuino, sal de grano, limón y cerveza de la casa.',
          price: '119',
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
