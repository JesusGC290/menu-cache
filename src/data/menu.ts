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
        { name: 'Pan Dulce de Canasta', price: '29' },
        {
          name: 'Plato de Jocoque',
          description: 'Acompañado de tortillas hechas a mano.',
          price: '69',
        },
        { name: 'Hot Cakes con Fruta', description: '3 piezas.', price: '109' },
        { name: 'Pan Francés', description: '2 piezas.', price: '109' },
        { name: 'Plato de Fruta con Yogurt', price: '109' },
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
          note: 'Con huevo $169 o pollo $169',
        },
        {
          name: 'Verdes',
          description:
            'Tira de maíz frita bañada en salsa de tomate verde, chile serrano, cilantro, cebolla y epazote. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
          note: 'Con huevo $169 o pollo $169',
        },
        {
          name: 'Enchipotlados',
          description:
            'Tira de maíz frita bañada en salsa de jitomate, cebolla, chile chipotle y crema. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
          note: 'Con huevo $169 o pollo $169',
        },
        {
          name: 'Enmolados',
          description:
            'Tira de maíz frita bañada en mole de la casa, acompañados de queso fresco, cebolla morada y ajonjolí.',
          price: '169',
          note: 'Con pollo $189 o huevo $189',
        },
        {
          name: 'Entre Chilaquiles',
          description:
            'Delicado omelette bañado en chilaquiles a elección. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '169',
          note: 'Con pollo $189',
        },
        {
          name: 'Poblanos',
          description:
            'Tira de maíz frita bañada en salsa poblana, con elote, flor de calabaza, cebolla, queso fresco, crema y cilantro.',
          price: '169',
          note: 'Con pollo o huevo $189',
        },
        {
          name: 'Tatemados',
          description:
            'Tira de maíz frita bañada en salsa tatemada de tomate verde y jitomate. Coronados con cebolla, queso fresco, crema y cilantro.',
          price: '149',
          note: 'Con huevo $169 o pollo $169',
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
      note: 'Con chicharrón, asada o suadero: más $60',
    },
    {
      id: 'huevos',
      title: 'Omelette y Huevos',
      products: [
        {
          name: 'Omelette al Gusto',
          description: 'Mexicana, salchicha, jamón, chorizo y tocino.',
          price: '149',
          note: 'Con espinaca, flor de calabaza o panela asada: más $10',
        },
        {
          name: 'Embarazada de Huevo',
          description:
            'Tortilla hecha a mano rellena de huevo, bañada en chicharrón rojo o verde y frijoles.',
          price: '149',
        },
        {
          name: 'Plato de Chilorio',
          description:
            'A la mexicana con huevo, acompañado de frijoles refritos, aguacate y queso fresco.',
          price: '149',
        },
        {
          name: 'Huevos al Gusto',
          description:
            'Estrellados o revueltos. A la mexicana, jamón, tocino, salchicha o chorizo.',
          price: '139',
          note: 'Con espinaca, flor de calabaza o panela asada: más $10',
        },
        {
          name: 'Huevos Rancheros',
          description:
            '2 huevos fritos montados en tortillas doradas, bañados en salsa ranchera. Acompañados de frijol con queso fresco y aguacate.',
          price: '139',
        },
        {
          name: 'Huevos con Machaca',
          description:
            'Huevos revueltos con machaca, guisados a la mexicana. Acompañados de frijol con queso fresco, aguacate y tortillas de harina.',
          price: '169',
        },
        {
          name: 'Tradicional Huevo Ahogado',
          description:
            '2 huevos cocinados en cazuela de hierro en salsa de tomate verde y panela, acompañados de pan o tortilla.',
          price: '149',
        },
        {
          name: 'Huevos Caché',
          description:
            'Huevo pochado montado en nido de papa, bañado en crema de chipotle, tocino crujiente, espinaca y queso.',
          price: '169',
        },
        {
          name: 'Desayuno Americano',
          description: '2 huevos al gusto, tocino, hot cakes y papas hash brown (3).',
          price: '149',
        },
      ],
    },
    {
      id: 'toast',
      title: 'Toast',
      note: 'Nuestros toast son de 3 panes',
      products: [
        {
          name: 'Toast de Jamón Serrano',
          description:
            'Aguacate, jamón serrano y huevo estrellado. Acompañado de ensalada dulce con espinaca.',
          price: '149',
        },
        {
          name: 'Toast de Salmón',
          description:
            'Salmón, aderezo de yogurt griego y pesto de finas hierbas. Acompañado de ensalada dulce con espinaca y plátano macho.',
          price: '199',
        },
        {
          name: 'Toast de Aguacate',
          description:
            'Panela, tocino, aguacate y huevo. Acompañado de ensalada dulce con espinaca.',
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
          description:
            'Pan tostado con queso, tocino, pollo y aguacate, acompañado de papas fritas.',
          price: '169',
        },
        {
          name: 'Crispy Chicken Cesar Sandwich',
          description:
            'Pan baguette tostado con pechuga empanizada, aderezo césar, lechuga y queso parmesano, acompañado de papas fritas.',
          price: '179',
        },
      ],
    },
    {
      id: 'enchiladas',
      title: 'Enchiladas',
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
          description:
            'Un burrito de tortilla de harina relleno de machaca a la mexicana, acompañado de papas fritas.',
          price: '179',
        },
        {
          name: 'Burrito a la Mexicana',
          description:
            'Un burrito de tortilla de harina relleno de huevo a la mexicana, acompañado de frijoles.',
          price: '139',
        },
        {
          name: 'Burrito de Carne Asada',
          description:
            'Un burrito de tortilla de harina relleno de carne asada, queso y frijoles.',
          price: '169',
        },
      ],
    },
    {
      id: 'birria',
      title: 'Birria',
      products: [
        { name: 'Quesabirria Individual', price: '49' },
        { name: 'Volteados con Queso', price: '49' },
      ],
    },
    {
      id: 'quesadillas',
      title: 'Quesadillas',
      products: [
        {
          name: 'Quesadillas de Comal',
          description: 'Tortilla hecha a mano con queso.',
          price: '39',
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
          description: 'Bañada en salsa verde, con guarnición de ensalada.',
          price: '139',
        },
        {
          name: 'Rollo de Pollo',
          description:
            'Relleno de panela y espinaca, bañado en salsa roja o verde, con guarnición de ensalada.',
          price: '189',
        },
        {
          name: 'Omelette de Claras de Huevo',
          description:
            'Con panela asada y espinacas, acompañado de ensalada fresca y aguacate.',
          price: '169',
        },
        {
          name: 'Hot Cakes de Avena',
          description: '3 piezas acompañadas de topping de frutas.',
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
          description: 'Con pan brioche, carne de res y queso, con papas fritas.',
          price: '119',
        },
        {
          name: 'Pechuga Empanizada',
          description: 'Con guarnición de papas fritas.',
          price: '119',
        },
        {
          name: 'Mini Hot Cakes',
          description: 'Acompañados de bolita de nieve.',
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
          description: 'Con salsa martajada.',
          price: '99',
        },
        {
          name: 'Panela Asada',
          description: 'Bañada en salsa verde.',
          price: '139',
        },
        {
          name: 'Queso Fundido Natural',
          price: '139',
          note: 'Con chorizo, flor de calabaza o champiñón $169',
        },
        { name: 'Manitas en Escabeche Frías', description: '6 piezas.', price: '139' },
        { name: 'Guacamole con Totopos', price: '109' },
        {
          name: 'Taco de Chile Güero Empanizado',
          description: 'Relleno de asada.',
          price: '79',
        },
        {
          name: 'Chistorra Asada al Carbón',
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
          description:
            'Corazón de lechuga bañado en aderezo césar, crotones y queso parmesano.',
          price: '139',
        },
        {
          name: 'Ensalada de Frutos Rojos',
          description:
            'Mix de lechugas con fresa, suprema de naranja, arándano y queso suizo, con vinagreta de fresa, vino tinto y miel.',
          price: '120',
          note: 'Con pollo o peinecillo $170',
        },
      ],
    },
    {
      id: 'sopas',
      title: 'Sopas',
      products: [
        {
          name: 'Caldo Tlalpeño',
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
          description: 'Acompañado de arroz y ensalada.',
          price: '190',
        },
        {
          name: 'Milanesa de Pollo',
          description: 'Acompañada de ensalada y papas fritas.',
          price: '190',
        },
        {
          name: 'Chile en Nogada',
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
          description:
            'Pierna o muslo bañado en mole de la casa, espolvoreado con ajonjolí y acompañado de arroz.',
          price: '240',
        },
        {
          name: 'Carne Asada',
          description:
            'Carne en tasajo, quesadilla, nopal asado, cebolla cambray, guacamole y frijoles con queso fresco.',
          price: '199',
        },
        {
          name: 'Chamorro',
          description:
            '1 pieza de chamorro horneado lentamente, bañado con salsa de la casa y acompañado de frijoles y cebolla curtida.',
          price: '189',
        },
        {
          name: 'Molcajete Mar y Tierra',
          description:
            'Picaña, camarón, nopal asado con cebolla cambray y panela asada, bañados en salsa de tomate, morrón y un toque de serrano.',
          price: '299',
        },
        {
          name: 'Peinecillo',
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
          description:
            'A las finas hierbas, a la mantequilla o al limón. Acompañado de puré y ensalada.',
          price: '259',
        },
        {
          name: 'Camarones al Gusto',
          description:
            'A la diabla, al ajillo, a la momia, empanizados o al coco. Guarnición de arroz y ensalada.',
          price: '259',
        },
        {
          name: 'Pescado al Gusto',
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
          description:
            'Para 4 personas. 2 jaladas de chile jalapeño con queso, chicharrón duro, chistorra, queso fundido natural, guacamole y frijoles fritos.',
          price: '550',
        },
        {
          name: 'Parrillada',
          description:
            'Para 3 a 4 personas. 800 gramos en crudo de peinecillo, pollo adobado, espaldilla y panza de cerdo. Queso fundido con chorizo, guacamole y frijoles refritos con queso.',
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
          description:
            'Carne de res, pan brioche y queso amarillo, con papas a la francesa.',
          price: '119',
        },
        {
          name: 'Tiras de Pechuga de Pollo',
          description: 'Acompañadas de papas a la francesa.',
          price: '119',
        },
        {
          name: 'Camarones Empanizados',
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
        { name: 'Café Americano', description: 'Refill.', price: '59' },
        { name: 'Espresso', description: '1 carga de café.', price: '45' },
        { name: 'Espresso Doble', description: '2 cargas de café.', price: '59' },
        {
          name: 'Café de Olla',
          description: 'Café, pimienta, canela, anís y piloncillo.',
          price: '59',
        },
        { name: 'Latte', price: '79' },
        { name: 'Capuccino', price: '79' },
        { name: 'Capuccino Baileys', price: '149' },
        {
          name: 'Café Lechero',
          description: 'Especialidad de la casa.',
          price: '79',
        },
      ],
    },
    {
      id: 'refrescos',
      title: 'Refrescos',
      products: [
        { name: 'Coca Cola', description: 'Regular, Zero o Light.', price: '55' },
        { name: 'Fanta, Sprite o Manzanita', price: '55' },
        { name: 'Squirt', price: '55' },
        { name: 'Topo Chico', price: '55' },
        { name: 'Topo Chico Sangría', price: '55' },
        { name: 'Tonicol', price: '55' },
        { name: 'Fuze Tea', description: 'Durazno o limón.', price: '55' },
        { name: 'Agua Mineralizada', price: '55' },
        { name: 'Jugo del Valle Manzana Kids', price: '25' },
        { name: 'Agua Ciel Natural', price: '35' },
      ],
    },
    {
      id: 'sin-alcohol',
      title: 'Bebidas sin Alcohol',
      products: [
        { name: 'Jugo Natural de Naranja', description: '350 ml.', price: '59' },
        {
          name: 'Jugo Verde Natural',
          description: 'Piña, naranja, perejil, apio y espinaca.',
          price: '69',
        },
        {
          name: 'Limonada',
          description: 'Mineral o natural, con jarabe natural.',
          price: '59',
        },
        {
          name: 'Naranjada',
          description: 'Mineral o natural, con jarabe natural.',
          price: '59',
        },
        {
          name: 'Aguas Frescas',
          description: 'Avena, jamaica, piña o pepino con hierbabuena.',
          price: '49',
        },
        {
          name: 'Piñada',
          description: 'Crema de coco, jugo de piña y leche evaporada.',
          price: '79',
        },
        {
          name: 'Pantera Rosa',
          description: 'Crema de coco, fresa y granadina.',
          price: '79',
        },
        {
          name: 'Canica',
          description: 'Soda lima limón con granadina.',
          price: '49',
        },
        {
          name: 'Tejuino',
          description: 'Fermento a base de maíz nixtamalizado, piloncillo y limón.',
          price: '65',
        },
        {
          name: 'Tepache',
          description:
            'Fermento a base de piña, piloncillo y especias: clavo de olor, canela, pimienta gorda y anís.',
          price: '59',
        },
      ],
    },
    {
      id: 'vino',
      title: 'Vino Tinto',
      products: [
        {
          name: 'Copa de Vino de la Casa',
          description: 'Lacetto, Cabernet Sauvignon.',
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
          description:
            'Jugo de naranja, limón, soda de manzana y un toque de vino tinto. Decorado con nuez.',
          price: '79',
        },
        {
          name: 'Sangría',
          description: 'Limón, jarabe, agua mineral y vino tinto.',
          price: '79',
        },
        {
          name: 'Tinto de Verano',
          description: 'Soda lima limón, vino tinto y jugo de limón.',
          price: '79',
        },
        {
          name: 'Mimosas',
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
          description: 'Pieza de mazapán, helado de vainilla y leche.',
          price: '89',
        },
        {
          name: 'Oreo',
          description: 'Galleta Oreo, helado de vainilla, chocolate y leche.',
          price: '89',
        },
        {
          name: 'Chocolate',
          description: 'Jarabe de chocolate, helado de chocolate y leche.',
          price: '89',
        },
        {
          name: 'Fresa',
          description: 'Fresa natural, helado de fresa y leche.',
          price: '89',
        },
        {
          name: 'Frappuccino',
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
        { name: 'Mango', description: 'Mango natural y jarabe.', price: '69' },
        { name: 'Fresa', description: 'Fresa natural y jarabe.', price: '69' },
      ],
    },
    {
      id: 'mocktails',
      title: 'Mocktails',
      products: [
        {
          name: 'Manzana Muck',
          description: 'Jugo de manzana, jarabe, limón y ginger ale.',
          price: '79',
        },
        {
          name: 'Frutos Rojos Muck',
          description: 'Frutos rojos, jarabe, limón, arándano y ginger ale.',
          price: '79',
        },
        {
          name: 'Maracuyá Muck',
          description: 'Pulpa de maracuyá, jarabe, limón y piña.',
          price: '79',
        },
        {
          name: 'Pepino Muck',
          description: 'Pepino natural, jarabe, limón y jugo de piña.',
          price: '79',
        },
        {
          name: 'Tejuino Muck',
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
          description: 'Carga de espresso y licor Baileys.',
          price: '159',
        },
        {
          name: 'Carajillo',
          description:
            'Licor 43 y 1 carga de espresso. Decorado con granos de café.',
          price: '159',
        },
      ],
    },
    {
      id: 'cerveza',
      title: 'Cerveza',
      products: [
        { name: 'Tecate Roja', price: '49' },
        { name: 'Tecate Light', price: '49' },
        { name: 'Carta Blanca', price: '49' },
        { name: 'Miller High Life', price: '69' },
        { name: 'Heineken', price: '69' },
        { name: 'Heineken Barril', price: '75' },
        { name: 'Heineken 0.0', price: '49' },
        { name: 'Bohemia Clara', price: '69' },
        { name: 'Bohemia Cristal', price: '69' },
        { name: 'Bohemia Obscura', price: '69' },
        { name: 'Indio', price: '45' },
        { name: 'XX Lager', price: '45' },
        { name: 'XX Ámbar', price: '45' },
        { name: 'Amstel Ultra', price: '69' },
      ],
    },
    {
      id: 'micheladas',
      title: 'Micheladas y Especiales',
      products: [
        {
          name: 'Vaso Michelado',
          description:
            'Escarchado con Tajín, salsas negras, limón, sal y clamato.',
          price: '30',
        },
        {
          name: 'Vaso Ruso',
          description: 'Escarcha de sal y jugo de limón.',
          price: '15',
        },
        {
          name: 'Vaso Cubano',
          description: 'Escarchado con sal, jugo de limón y salsas negras.',
          price: '25',
        },
        {
          name: 'Vaso Tejuichela',
          description:
            'Preparación de tejuino, limón y sal. Cerveza a elección.',
          price: '39',
        },
        {
          name: 'Tejuichela Caché',
          description: 'Tejuino, sal de grano, limón y cerveza de la casa.',
          price: '119',
        },
        {
          name: 'Michelada de Fresa',
          description:
            'Limón, concentrado de fresa, cerveza, tamarindo y pica fresa.',
          price: '149',
        },
        {
          name: 'Michelada de Tamarindo',
          description: 'Limón, pulpa de tamarindo, cerveza y dulce de tamarindo.',
          price: '149',
        },
        {
          name: 'Michelada de Mango',
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
          description: 'Vino espumoso, agua mineral y Aperol. Naranja fresca.',
          price: '149',
        },
        {
          name: '43 Spritz',
          description:
            'Vino espumoso, agua mineral, limón y Licor 43. Limón deshidratado.',
          price: '159',
        },
        {
          name: 'Hugo Spritz',
          description:
            'Licor de flor de saúco, agua mineral y vino espumoso. Hojas de menta.',
          price: '169',
        },
      ],
    },
  ],
};

export const menus: Menu[] = [desayunos, comidas, bebidas];
