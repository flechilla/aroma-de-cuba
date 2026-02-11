export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';

export const ui = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.news': 'Noticias',
    'nav.history': 'Historia',
    'nav.culture': 'Cultura',
    'nav.about': 'Nosotros',
    'nav.discover': 'Descubre',
    'nav.flavor': 'Sabor',
    'nav.tourism': 'Turismo',
    'nav.gastronomy': 'Gastronomía',
    'nav.products': 'Productos',
    'nav.cubaUsa': 'Cuba-EE.UU.',
    'nav.migration': 'Migración',

    // Header
    'header.logoLabel': 'Aroma de Cuba — Inicio',
    'header.openMenu': 'Abrir menú de navegación',
    'header.mainNav': 'Navegación principal',
    'header.search': 'Buscar',

    // Footer
    'footer.sections': 'Secciones',
    'footer.more': 'Más',
    'footer.rights': 'Todos los derechos reservados.',

    // Homepage
    'home.title': 'Aroma de Cuba',
    'home.subtitle': 'Noticias, cultura y sabor desde la isla',
    'home.heroTagline': 'Tu ventana auténtica a la isla',
    'home.heroCta': 'Explora ahora',
    'home.featuredHeading': 'Artículo destacado',
    'home.latestNews': 'Últimas noticias',
    'home.viewAllNews': 'Ver todas las noticias',
    'home.exploreCuba': 'Explora Cuba',
    'home.sectionHistory': 'Historia',
    'home.sectionHistoryDesc': 'Cinco siglos de una historia fascinante y compleja',
    'home.sectionCulture': 'Cultura',
    'home.sectionCultureDesc': 'Música, arte, danza y tradición viva',
    'home.sectionTourism': 'Turismo',
    'home.sectionTourismDesc': 'Destinos, playas y ciudades que enamoran',
    'home.sectionGastronomy': 'Gastronomía',
    'home.sectionGastronomyDesc': 'Sabores auténticos y recetas tradicionales',
    'home.sectionProducts': 'Productos',
    'home.sectionProductsDesc': 'Café, tabaco, ron y artesanía cubana',
    'home.sectionNews': 'Noticias',
    'home.sectionNewsDesc': 'Lo último desde la isla, día a día',
    'home.sectionAbout': 'Nosotros',
    'home.sectionAboutDesc': 'Conoce al equipo detrás de Aroma de Cuba',
    'home.sectionCubaUsa': 'Cuba-EE.UU.',
    'home.sectionCubaUsaDesc': 'Relaciones, política, diplomacia y noticias entre ambas naciones',
    'home.sectionMigration': 'Migración Cubana',
    'home.sectionMigrationDesc': 'Diáspora, deportaciones, rutas migratorias y la experiencia del exilio',
    'home.metaTitle': 'Aroma de Cuba — Noticias, cultura y sabor desde la isla',
    'home.metaDescription': 'Blog dedicado a Cuba: noticias actuales, historia, turismo, productos y cultura cubana.',

    // Newsletter
    'home.newsletterTitle': 'Recibe lo mejor de Cuba en tu correo',
    'home.newsletterDesc': 'Suscríbete y recibe noticias, artículos culturales y lo más destacado cada semana.',
    'home.newsletterPlaceholder': 'Tu correo electrónico',
    'home.newsletterButton': 'Suscribirme',
    'home.newsletterSuccess': '¡Gracias por suscribirte!',

    // Dato del Dia
    'home.datoDelDia': 'Dato del Día',

    // Blog listing
    'blog.title': 'Noticias',
    'blog.subtitle': 'Lo último desde la isla',
    'blog.filterLabel': 'Filtrar por categoría',
    'blog.filterAll': 'Todos',
    'blog.metaTitle': 'Noticias — Aroma de Cuba',
    'blog.metaDescription': 'Las últimas noticias y artículos sobre Cuba.',
    'blog.noPosts': 'No hay artículos en esta categoría todavía.',

    // Blog post
    'post.updated': 'Actualizado:',
    'post.tags': 'Etiquetas:',
    'post.readingTime': 'min de lectura',
    'post.relatedPosts': 'Artículos relacionados',
    'post.shareTitle': 'Compartir',
    'post.copyLink': 'Copiar enlace',
    'post.linkCopied': '¡Enlace copiado!',
    'post.toc': 'En este artículo',

    // About
    'about.metaTitle': 'Nosotros — Aroma de Cuba',
    'about.metaDescription': 'Conoce al equipo detrás de Aroma de Cuba, un blog dedicado a compartir la cultura, historia y noticias de Cuba.',
    'about.title': 'Nosotros',
    'about.subtitle': 'Quiénes somos y por qué hacemos lo que hacemos',
    'about.heading1': 'Sobre Aroma de Cuba',
    'about.p1': 'Aroma de Cuba nació de una pasión profunda por la isla y su gente. Somos un equipo de periodistas, escritores y amantes de Cuba que creemos en contar las historias que importan — las que huelen a café recién colado, suenan a son montuno y saben a mango maduro en una tarde de verano.',
    'about.p2': 'Nuestro objetivo es ofrecer una ventana auténtica a Cuba: sus noticias, su historia milenaria, su cultura vibrante y los productos que han puesto a la isla en el mapa mundial. No buscamos el sensacionalismo ni la nostalgia superficial. Buscamos la verdad, contada con respeto y con amor.',
    'about.heading2': 'Nuestra misión',
    'about.p3': 'Creemos que Cuba merece ser contada desde dentro, con las voces de quienes la viven y la sienten. Cada artículo que publicamos es una invitación a descubrir — o redescubrir — una isla que nunca deja de sorprender.',
    'about.heading3': 'Contacto',
    'about.p4': '¿Tienes una historia que contar? ¿Quieres colaborar con nosotros? Escríbenos a',
    'about.email': 'hola@aromadecuba.com',

    // Categories
    'category.noticias': 'Noticias',
    'category.historia': 'Historia',
    'category.turismo': 'Turismo',
    'category.productos': 'Productos',
    'category.cultura': 'Cultura',
    'category.gastronomia': 'Gastronomía',
    'category.opinion': 'Opinión',

    // Section pages
    'section.cultura.metaTitle': 'Cultura Cubana — Aroma de Cuba',
    'section.cultura.metaDescription': 'Explora la rica cultura cubana: música, arte, danza, literatura y tradiciones que hacen única a la isla.',
    'section.cultura.heroTitle': 'Cultura Cubana',
    'section.cultura.heroDesc': 'Música, arte, danza, literatura y las tradiciones que hacen única a la isla',
    'section.cultura.intro': 'La cultura cubana es un crisol vibrante de influencias africanas, españolas y caribeñas. Desde el son hasta la rumba, desde la pintura de Wifredo Lam hasta la literatura de Alejo Carpentier, Cuba ha regalado al mundo un legado artístico inigualable.',

    'section.turismo.metaTitle': 'Turismo en Cuba — Aroma de Cuba',
    'section.turismo.metaDescription': 'Descubre los destinos más fascinantes de Cuba: La Habana, Trinidad, Viñales, playas paradisíacas y mucho más.',
    'section.turismo.heroTitle': 'Turismo en Cuba',
    'section.turismo.heroDesc': 'Destinos, playas y ciudades que enamoran a cada visitante',
    'section.turismo.intro': 'Cuba ofrece una experiencia turística única en el mundo: ciudades coloniales declaradas Patrimonio de la Humanidad, playas de arena blanca, montañas verdes y una hospitalidad que conquista el corazón de cada visitante.',

    'section.gastronomia.metaTitle': 'Gastronomía Cubana — Aroma de Cuba',
    'section.gastronomia.metaDescription': 'Descubre los sabores auténticos de Cuba: recetas tradicionales, platos típicos y la evolución de la cocina cubana.',
    'section.gastronomia.heroTitle': 'Gastronomía Cubana',
    'section.gastronomia.heroDesc': 'Sabores auténticos, recetas tradicionales y la evolución culinaria de la isla',
    'section.gastronomia.intro': 'La gastronomía cubana es un reflejo de la historia de la isla. Del ajiaco al ropa vieja, del café cubano al mojito, cada plato cuenta una historia de mestizaje, creatividad y tradición que ha traspasado fronteras.',

    'section.productos.metaTitle': 'Productos Cubanos — Aroma de Cuba',
    'section.productos.metaDescription': 'Conoce los productos emblemáticos de Cuba: café, tabaco, ron, artesanía y los tesoros que la isla ofrece al mundo.',
    'section.productos.heroTitle': 'Productos Cubanos',
    'section.productos.heroDesc': 'Café, tabaco, ron y los tesoros que Cuba ofrece al mundo',
    'section.productos.intro': 'Cuba es sinónimo de calidad artesanal. Sus habanos son los puros más codiciados del mundo, su ron es legendario, su café es un tesoro aromático y su artesanía refleja siglos de creatividad e ingenio.',

    'section.viewAll': 'Ver todos los artículos',

    // Pagination
    'pagination.prev': 'Anterior',
    'pagination.next': 'Siguiente',
    'pagination.page': 'Página',

    // Breadcrumbs
    'breadcrumbs.home': 'Inicio',

    // Search
    'search.placeholder': 'Buscar artículos...',
    'search.title': 'Buscar',
    'search.noResults': 'No se encontraron resultados',

    // RSS
    'rss.title': 'Aroma de Cuba',
    'rss.description': 'Noticias, cultura y sabor desde la isla — las últimas publicaciones del blog Aroma de Cuba.',

    // SEO
    'seo.siteName': 'Aroma de Cuba',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.history': 'History',
    'nav.culture': 'Culture',
    'nav.about': 'About',
    'nav.discover': 'Discover',
    'nav.flavor': 'Flavor',
    'nav.tourism': 'Tourism',
    'nav.gastronomy': 'Gastronomy',
    'nav.products': 'Products',
    'nav.cubaUsa': 'Cuba-USA',
    'nav.migration': 'Migration',

    // Header
    'header.logoLabel': 'Aroma de Cuba — Home',
    'header.openMenu': 'Open navigation menu',
    'header.mainNav': 'Main navigation',
    'header.search': 'Search',

    // Footer
    'footer.sections': 'Sections',
    'footer.more': 'More',
    'footer.rights': 'All rights reserved.',

    // Homepage
    'home.title': 'Aroma de Cuba',
    'home.subtitle': 'News, culture, and flavor from the island',
    'home.heroTagline': 'Your authentic window to the island',
    'home.heroCta': 'Explore now',
    'home.featuredHeading': 'Featured article',
    'home.latestNews': 'Latest news',
    'home.viewAllNews': 'View all news',
    'home.exploreCuba': 'Explore Cuba',
    'home.sectionHistory': 'History',
    'home.sectionHistoryDesc': 'Five centuries of a fascinating and complex history',
    'home.sectionCulture': 'Culture',
    'home.sectionCultureDesc': 'Music, art, dance, and living tradition',
    'home.sectionTourism': 'Tourism',
    'home.sectionTourismDesc': 'Destinations, beaches, and captivating cities',
    'home.sectionGastronomy': 'Gastronomy',
    'home.sectionGastronomyDesc': 'Authentic flavors and traditional recipes',
    'home.sectionProducts': 'Products',
    'home.sectionProductsDesc': 'Coffee, tobacco, rum, and Cuban craftsmanship',
    'home.sectionNews': 'News',
    'home.sectionNewsDesc': 'The latest from the island, day by day',
    'home.sectionAbout': 'About us',
    'home.sectionAboutDesc': 'Meet the team behind Aroma de Cuba',
    'home.sectionCubaUsa': 'Cuba-USA',
    'home.sectionCubaUsaDesc': 'Relations, politics, diplomacy, and news between both nations',
    'home.sectionMigration': 'Cuban Migration',
    'home.sectionMigrationDesc': 'Diaspora, deportations, migration routes, and the exile experience',
    'home.metaTitle': 'Aroma de Cuba — News, culture, and flavor from the island',
    'home.metaDescription': 'A blog dedicated to Cuba: current news, history, tourism, products, and Cuban culture.',

    // Newsletter
    'home.newsletterTitle': 'Get the best of Cuba in your inbox',
    'home.newsletterDesc': 'Subscribe and receive news, cultural articles, and highlights every week.',
    'home.newsletterPlaceholder': 'Your email address',
    'home.newsletterButton': 'Subscribe',
    'home.newsletterSuccess': 'Thanks for subscribing!',

    // Dato del Dia
    'home.datoDelDia': 'Fact of the Day',

    // Blog listing
    'blog.title': 'News',
    'blog.subtitle': 'The latest from the island',
    'blog.filterLabel': 'Filter by category',
    'blog.filterAll': 'All',
    'blog.metaTitle': 'News — Aroma de Cuba',
    'blog.metaDescription': 'The latest news and articles about Cuba.',
    'blog.noPosts': 'No articles in this category yet.',

    // Blog post
    'post.updated': 'Updated:',
    'post.tags': 'Tags:',
    'post.readingTime': 'min read',
    'post.relatedPosts': 'Related articles',
    'post.shareTitle': 'Share',
    'post.copyLink': 'Copy link',
    'post.linkCopied': 'Link copied!',
    'post.toc': 'In this article',

    // About
    'about.metaTitle': 'About — Aroma de Cuba',
    'about.metaDescription': 'Meet the team behind Aroma de Cuba, a blog dedicated to sharing Cuban culture, history, and news.',
    'about.title': 'About Us',
    'about.subtitle': 'Who we are and why we do what we do',
    'about.heading1': 'About Aroma de Cuba',
    'about.p1': 'Aroma de Cuba was born from a deep passion for the island and its people. We are a team of journalists, writers, and Cuba enthusiasts who believe in telling the stories that matter — the ones that smell of freshly brewed coffee, sound like son montuno, and taste of ripe mango on a summer afternoon.',
    'about.p2': 'Our goal is to offer an authentic window into Cuba: its news, its centuries-old history, its vibrant culture, and the products that have put the island on the world map. We don\'t seek sensationalism or superficial nostalgia. We seek the truth, told with respect and love.',
    'about.heading2': 'Our mission',
    'about.p3': 'We believe Cuba deserves to be told from within, with the voices of those who live it and feel it. Every article we publish is an invitation to discover — or rediscover — an island that never ceases to amaze.',
    'about.heading3': 'Contact',
    'about.p4': 'Have a story to tell? Want to collaborate with us? Write to us at',
    'about.email': 'hola@aromadecuba.com',

    // Categories
    'category.noticias': 'News',
    'category.historia': 'History',
    'category.turismo': 'Tourism',
    'category.productos': 'Products',
    'category.cultura': 'Culture',
    'category.gastronomia': 'Gastronomy',
    'category.opinion': 'Opinion',

    // Section pages
    'section.cultura.metaTitle': 'Cuban Culture — Aroma de Cuba',
    'section.cultura.metaDescription': 'Explore the rich Cuban culture: music, art, dance, literature, and traditions that make the island unique.',
    'section.cultura.heroTitle': 'Cuban Culture',
    'section.cultura.heroDesc': 'Music, art, dance, literature, and the traditions that make the island unique',
    'section.cultura.intro': 'Cuban culture is a vibrant melting pot of African, Spanish, and Caribbean influences. From son to rumba, from Wifredo Lam\'s paintings to Alejo Carpentier\'s literature, Cuba has given the world an unparalleled artistic legacy.',

    'section.turismo.metaTitle': 'Tourism in Cuba — Aroma de Cuba',
    'section.turismo.metaDescription': 'Discover the most fascinating destinations in Cuba: Havana, Trinidad, Viñales, paradise beaches, and much more.',
    'section.turismo.heroTitle': 'Tourism in Cuba',
    'section.turismo.heroDesc': 'Destinations, beaches, and cities that captivate every visitor',
    'section.turismo.intro': 'Cuba offers a unique tourist experience: colonial cities declared World Heritage Sites, white sand beaches, green mountains, and a hospitality that wins every visitor\'s heart.',

    'section.gastronomia.metaTitle': 'Cuban Gastronomy — Aroma de Cuba',
    'section.gastronomia.metaDescription': 'Discover the authentic flavors of Cuba: traditional recipes, typical dishes, and the evolution of Cuban cuisine.',
    'section.gastronomia.heroTitle': 'Cuban Gastronomy',
    'section.gastronomia.heroDesc': 'Authentic flavors, traditional recipes, and the culinary evolution of the island',
    'section.gastronomia.intro': 'Cuban gastronomy is a reflection of the island\'s history. From ajiaco to ropa vieja, from Cuban coffee to mojito, each dish tells a story of cultural blending, creativity, and tradition that has crossed borders.',

    'section.productos.metaTitle': 'Cuban Products — Aroma de Cuba',
    'section.productos.metaDescription': 'Learn about Cuba\'s iconic products: coffee, tobacco, rum, crafts, and the treasures the island offers to the world.',
    'section.productos.heroTitle': 'Cuban Products',
    'section.productos.heroDesc': 'Coffee, tobacco, rum, and the treasures Cuba offers to the world',
    'section.productos.intro': 'Cuba is synonymous with artisanal quality. Its habanos are the world\'s most coveted cigars, its rum is legendary, its coffee is an aromatic treasure, and its craftsmanship reflects centuries of creativity and ingenuity.',

    'section.viewAll': 'View all articles',

    // Pagination
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'pagination.page': 'Page',

    // Breadcrumbs
    'breadcrumbs.home': 'Home',

    // Search
    'search.placeholder': 'Search articles...',
    'search.title': 'Search',
    'search.noResults': 'No results found',

    // RSS
    'rss.title': 'Aroma de Cuba',
    'rss.description': 'News, culture, and flavor from the island — the latest posts from the Aroma de Cuba blog.',

    // SEO
    'seo.siteName': 'Aroma de Cuba',
  },
} as const;
