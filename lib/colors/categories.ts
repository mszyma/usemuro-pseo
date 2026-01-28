// Color categories for browsing and SEO

export interface ColorCategory {
  id: string;
  nameEN: string;
  nameDE: string;
  namePL: string;
  descriptionEN: string;
  descriptionDE: string;
  descriptionPL: string;
  type: 'hue' | 'style';
}

// Color categories by hue
export const HUE_CATEGORIES: ColorCategory[] = [
  {
    id: 'white',
    nameEN: 'White Paint Colors',
    nameDE: 'Weiße Farbtöne',
    namePL: 'Białe Kolory Farb',
    descriptionEN: 'Explore our collection of white paint colors, from pure whites to soft off-whites. Perfect for creating bright, airy spaces with timeless elegance.',
    descriptionDE: 'Entdecken Sie unsere Kollektion weißer Farbtöne, von reinem Weiß bis zu sanften Cremetönen. Perfekt für helle, luftige Räume mit zeitloser Eleganz.',
    descriptionPL: 'Poznaj naszą kolekcję białych kolorów farb, od czystej bieli po delikatne odcienie kremowe. Idealne do tworzenia jasnych, przestronnych wnętrz o ponadczasowej elegancji.',
    type: 'hue',
  },
  {
    id: 'gray',
    nameEN: 'Gray Paint Colors',
    nameDE: 'Graue Farbtöne',
    namePL: 'Szare Kolory Farb',
    descriptionEN: 'Discover versatile gray paint colors, from warm greiges to cool slate tones. Gray provides the perfect neutral backdrop for any design style.',
    descriptionDE: 'Entdecken Sie vielseitige graue Farbtöne, von warmen Greige bis zu kühlen Schiefertönen. Grau bietet die perfekte neutrale Kulisse für jeden Einrichtungsstil.',
    descriptionPL: 'Odkryj wszechstronne szare kolory farb, od ciepłych greige po chłodne odcienie łupka. Szary stanowi idealne neutralne tło dla każdego stylu projektowania.',
    type: 'hue',
  },
  {
    id: 'blue',
    nameEN: 'Blue Paint Colors',
    nameDE: 'Blaue Farbtöne',
    namePL: 'Niebieskie Kolory Farb',
    descriptionEN: 'Browse calming blue paint colors, from soft sky blues to deep navy tones. Blue creates serene, sophisticated spaces that inspire tranquility.',
    descriptionDE: 'Stöbern Sie in beruhigenden blauen Farbtönen, von sanften Himmelblau bis zu tiefen Marineblau. Blau schafft ruhige, raffinierte Räume, die Gelassenheit inspirieren.',
    descriptionPL: 'Przeglądaj uspokajające niebieskie kolory farb, od delikatnego błękitu nieba po głęboki granat. Niebieski tworzy spokojne, wyrafinowane przestrzenie inspirujące do relaksu.',
    type: 'hue',
  },
  {
    id: 'green',
    nameEN: 'Green Paint Colors',
    nameDE: 'Grüne Farbtöne',
    namePL: 'Zielone Kolory Farb',
    descriptionEN: 'Explore refreshing green paint colors, from sage to emerald. Green brings nature indoors, creating peaceful and rejuvenating environments.',
    descriptionDE: 'Entdecken Sie erfrischende grüne Farbtöne, von Salbei bis Smaragd. Grün bringt die Natur nach drinnen und schafft friedliche, erholsame Umgebungen.',
    descriptionPL: 'Poznaj odświeżające zielone kolory farb, od szałwii po szmaragd. Zieleń przynosi naturę do wnętrz, tworząc spokojne i regenerujące otoczenie.',
    type: 'hue',
  },
  {
    id: 'beige',
    nameEN: 'Beige Paint Colors',
    nameDE: 'Beige Farbtöne',
    namePL: 'Beżowe Kolory Farb',
    descriptionEN: 'Discover warm beige paint colors that create cozy, inviting spaces. Beige offers timeless versatility with a touch of warmth.',
    descriptionDE: 'Entdecken Sie warme beige Farbtöne, die gemütliche, einladende Räume schaffen. Beige bietet zeitlose Vielseitigkeit mit einem Hauch von Wärme.',
    descriptionPL: 'Odkryj ciepłe beżowe kolory farb tworzące przytulne, zachęcające przestrzenie. Beż oferuje ponadczasową wszechstronność z nutą ciepła.',
    type: 'hue',
  },
  {
    id: 'brown',
    nameEN: 'Brown Paint Colors',
    nameDE: 'Braune Farbtöne',
    namePL: 'Brązowe Kolory Farb',
    descriptionEN: 'Browse rich brown paint colors, from chocolate to taupe. Brown creates warm, grounding spaces with natural elegance.',
    descriptionDE: 'Stöbern Sie in satten braunen Farbtönen, von Schokolade bis Taupe. Braun schafft warme, erdende Räume mit natürlicher Eleganz.',
    descriptionPL: 'Przeglądaj bogate brązowe kolory farb, od czekolady po taupe. Brąz tworzy ciepłe, uziemiające przestrzenie o naturalnej elegancji.',
    type: 'hue',
  },
  {
    id: 'yellow',
    nameEN: 'Yellow Paint Colors',
    nameDE: 'Gelbe Farbtöne',
    namePL: 'Żółte Kolory Farb',
    descriptionEN: 'Explore cheerful yellow paint colors that brighten any room. Yellow brings warmth, energy, and optimism to your space.',
    descriptionDE: 'Entdecken Sie fröhliche gelbe Farbtöne, die jeden Raum aufhellen. Gelb bringt Wärme, Energie und Optimismus in Ihren Raum.',
    descriptionPL: 'Poznaj wesołe żółte kolory farb rozjaśniające każde pomieszczenie. Żółty wnosi ciepło, energię i optymizm do przestrzeni.',
    type: 'hue',
  },
  {
    id: 'red',
    nameEN: 'Red Paint Colors',
    nameDE: 'Rote Farbtöne',
    namePL: 'Czerwone Kolory Farb',
    descriptionEN: 'Discover bold red paint colors, from crimson to burgundy. Red creates dramatic, energetic spaces that make a statement.',
    descriptionDE: 'Entdecken Sie kräftige rote Farbtöne, von Karmesinrot bis Burgunderrot. Rot schafft dramatische, energiegeladene Räume, die auffallen.',
    descriptionPL: 'Odkryj odważne czerwone kolory farb, od karmazynu po burgund. Czerwień tworzy dramatyczne, energetyczne przestrzenie robiące wrażenie.',
    type: 'hue',
  },
  {
    id: 'orange',
    nameEN: 'Orange Paint Colors',
    nameDE: 'Orange Farbtöne',
    namePL: 'Pomarańczowe Kolory Farb',
    descriptionEN: 'Browse vibrant orange paint colors, from terracotta to coral. Orange brings warmth, creativity, and vitality to any space.',
    descriptionDE: 'Stöbern Sie in lebendigen orangefarbenen Tönen, von Terrakotta bis Koralle. Orange bringt Wärme, Kreativität und Vitalität in jeden Raum.',
    descriptionPL: 'Przeglądaj żywe pomarańczowe kolory farb, od terakoty po koral. Pomarańcz wnosi ciepło, kreatywność i witalność do każdej przestrzeni.',
    type: 'hue',
  },
  {
    id: 'purple',
    nameEN: 'Purple Paint Colors',
    nameDE: 'Violette Farbtöne',
    namePL: 'Fioletowe Kolory Farb',
    descriptionEN: 'Explore elegant purple paint colors, from lavender to plum. Purple adds sophistication, creativity, and luxury to your home.',
    descriptionDE: 'Entdecken Sie elegante violette Farbtöne, von Lavendel bis Pflaume. Violett fügt Ihrem Zuhause Raffinesse, Kreativität und Luxus hinzu.',
    descriptionPL: 'Poznaj eleganckie fioletowe kolory farb, od lawendy po śliwkę. Fiolet dodaje wyrafinowania, kreatywności i luksusu do domu.',
    type: 'hue',
  },
  {
    id: 'black',
    nameEN: 'Black Paint Colors',
    nameDE: 'Schwarze Farbtöne',
    namePL: 'Czarne Kolory Farb',
    descriptionEN: 'Discover dramatic black paint colors, from pure black to charcoal. Black creates bold, sophisticated spaces with modern elegance.',
    descriptionDE: 'Entdecken Sie dramatische schwarze Farbtöne, von reinem Schwarz bis Anthrazit. Schwarz schafft kühne, raffinierte Räume mit moderner Eleganz.',
    descriptionPL: 'Odkryj dramatyczne czarne kolory farb, od czystej czerni po antracyt. Czerń tworzy odważne, wyrafinowane przestrzenie o nowoczesnej elegancji.',
    type: 'hue',
  },
  {
    id: 'neutral',
    nameEN: 'Neutral Paint Colors',
    nameDE: 'Neutrale Farbtöne',
    namePL: 'Neutralne Kolory Farb',
    descriptionEN: 'Browse versatile neutral paint colors that work with any style. Neutrals provide the perfect canvas for your design vision.',
    descriptionDE: 'Stöbern Sie in vielseitigen neutralen Farbtönen, die zu jedem Stil passen. Neutrale Töne bieten die perfekte Leinwand für Ihre Designvision.',
    descriptionPL: 'Przeglądaj wszechstronne neutralne kolory farb pasujące do każdego stylu. Neutralne odcienie stanowią idealne płótno dla wizji projektowej.',
    type: 'hue',
  },
];

// Color categories by style
export const STYLE_CATEGORIES: ColorCategory[] = [
  {
    id: 'modern-neutrals',
    nameEN: 'Modern Neutrals',
    nameDE: 'Moderne Neutraltöne',
    namePL: 'Nowoczesne Neutralne',
    descriptionEN: 'Curated collection of contemporary neutral colors perfect for modern interiors. These sophisticated shades create clean, minimalist spaces.',
    descriptionDE: 'Kuratierte Kollektion zeitgenössischer Neutraltöne, perfekt für moderne Innenräume. Diese raffinierten Farbtöne schaffen klare, minimalistische Räume.',
    descriptionPL: 'Wyselekcjonowana kolekcja współczesnych kolorów neutralnych idealnych do nowoczesnych wnętrz. Te wyrafinowane odcienie tworzą czyste, minimalistyczne przestrzenie.',
    type: 'style',
  },
  {
    id: 'scandinavian-whites',
    nameEN: 'Scandinavian Whites',
    nameDE: 'Skandinavische Weißtöne',
    namePL: 'Skandynawskie Biele',
    descriptionEN: 'Light, airy white and off-white colors inspired by Scandinavian design. Perfect for creating bright, minimalist Nordic-style interiors.',
    descriptionDE: 'Helle, luftige Weiß- und Cremetöne inspiriert vom skandinavischen Design. Perfekt für helle, minimalistische Innenräume im nordischen Stil.',
    descriptionPL: 'Jasne, przewiewne białe i kremowe kolory inspirowane skandynawskim designem. Idealne do tworzenia jasnych, minimalistycznych wnętrz w stylu nordyckim.',
    type: 'style',
  },
  {
    id: 'earth-tones',
    nameEN: 'Earth Tones',
    nameDE: 'Erdtöne',
    namePL: 'Odcienie Ziemi',
    descriptionEN: 'Warm, natural colors inspired by earth and nature. These grounding tones create cozy, organic spaces that feel connected to the outdoors.',
    descriptionDE: 'Warme, natürliche Farben inspiriert von Erde und Natur. Diese erdenden Töne schaffen gemütliche, organische Räume mit Verbindung zur Natur.',
    descriptionPL: 'Ciepłe, naturalne kolory inspirowane ziemią i naturą. Te uziemiające odcienie tworzą przytulne, organiczne przestrzenie łączące się z otoczeniem.',
    type: 'style',
  },
  {
    id: 'coastal-blues',
    nameEN: 'Coastal Blues',
    nameDE: 'Küstenblau',
    namePL: 'Nadmorskie Błękity',
    descriptionEN: 'Refreshing blue tones inspired by the ocean and sky. Perfect for creating serene, beach-inspired spaces with a relaxed atmosphere.',
    descriptionDE: 'Erfrischende Blautöne inspiriert von Meer und Himmel. Perfekt für ruhige, strandinsipirierte Räume mit entspannter Atmosphäre.',
    descriptionPL: 'Odświeżające niebieskie odcienie inspirowane oceanem i niebem. Idealne do tworzenia spokojnych przestrzeni w stylu nadmorskim o relaksującej atmosferze.',
    type: 'style',
  },
  {
    id: 'warm-grays',
    nameEN: 'Warm Grays',
    nameDE: 'Warme Grautöne',
    namePL: 'Ciepłe Szarości',
    descriptionEN: 'Sophisticated gray tones with warm undertones. These greige colors combine the versatility of gray with the warmth of beige.',
    descriptionDE: 'Raffinierte Grautöne mit warmen Untertönen. Diese Greige-Farben kombinieren die Vielseitigkeit von Grau mit der Wärme von Beige.',
    descriptionPL: 'Wyrafinowane odcienie szarości z ciepłymi podtonami. Te kolory greige łączą wszechstronność szarości z ciepłem beżu.',
    type: 'style',
  },
  {
    id: 'bold-accents',
    nameEN: 'Bold Accents',
    nameDE: 'Kräftige Akzente',
    namePL: 'Odważne Akcenty',
    descriptionEN: 'Vibrant, saturated colors perfect for accent walls and statement spaces. Make a dramatic impact with these bold hues.',
    descriptionDE: 'Lebendige, gesättigte Farben perfekt für Akzentwände und Räume mit Aussage. Erzielen Sie dramatische Wirkung mit diesen kräftigen Farbtönen.',
    descriptionPL: 'Żywe, nasycone kolory idealne na ściany akcentowe i przestrzenie robiące wrażenie. Osiągnij dramatyczny efekt dzięki tym odważnym odcieniom.',
    type: 'style',
  },
];

export const ALL_CATEGORIES = [...HUE_CATEGORIES, ...STYLE_CATEGORIES];

// Helper function to get category by ID
export function getCategoryById(id: string): ColorCategory | undefined {
  return ALL_CATEGORIES.find((cat) => cat.id === id);
}

// Helper function to check if a string is a valid category ID
export function isValidCategoryId(id: string): boolean {
  return ALL_CATEGORIES.some((cat) => cat.id === id);
}

// Get category name by language
export function getCategoryName(category: ColorCategory, lang: 'en' | 'de' | 'pl'): string {
  switch (lang) {
    case 'de':
      return category.nameDE;
    case 'pl':
      return category.namePL;
    default:
      return category.nameEN;
  }
}

// Get category description by language
export function getCategoryDescription(category: ColorCategory, lang: 'en' | 'de' | 'pl'): string {
  switch (lang) {
    case 'de':
      return category.descriptionDE;
    case 'pl':
      return category.descriptionPL;
    default:
      return category.descriptionEN;
  }
}
