const categories = [
  {
    name: "Popular",
    items: [
      ["Veg Burger (1 pc)", 300, "Veg patty burger with cheese, lettuce, and house sauce.", ["burger", "snack", "kids"]],
      ["Paneer Butter Masala", 450, "Paneer cubes simmered in rich buttery tomato gravy.", ["paneer", "sabji", "curry"]],
      ["Mix Veg Pizza", 600, "Cheesy pizza topped with capsicum, corn, onion, and vegetables.", ["pizza", "cheese", "popular"]],
      ["Sabudana Khichdi", 350, "Light vrat-friendly sabudana with peanuts, potato, and herbs.", ["vrat", "fasting", "sabudana"]]
    ]
  },
  {
    name: "Street Snacks",
    items: [
      ["Vada Pau (1 pc)", 150, "Mumbai-style potato vada in soft pau with chutney.", ["snack", "street food", "potato"]],
      ["French Fries (Peri Peri / Salty)", 150, "Crisp fries tossed salty or peri peri, served hot.", ["fries", "potato", "snack"]],
      ["Nachos With Salsa", 250, "Crunchy nachos served with bright tomato salsa.", ["nachos", "salsa", "sharing"]],
      ["Sweet Corn Chaat", 300, "Sweet corn tossed with masala, lime, and herbs.", ["corn", "chaat", "light"]],
      ["Crispy Corn", 250, "Golden fried corn kernels with peppery seasoning.", ["corn", "crispy", "sharing"]],
      ["Poha", 200, "Flattened rice cooked with peanuts, potato, and mild spices.", ["breakfast", "light", "snack"]],
      ["Vegetable Pakora", 300, "Mixed vegetable fritters fried crisp and golden.", ["pakora", "fried", "starter"]],
      ["Aloo Chop (5 pcs)", 150, "Five potato chops with a crisp spiced coating.", ["potato", "fried", "snack"]],
      ["Onion Pakora / Pyaji (5 pcs)", 200, "Five onion fritters with classic rainy-day crunch.", ["onion", "pakora", "fried"]],
      ["Bread Roll", 220, "Crisp bread rolls stuffed with spiced potato filling.", ["bread", "roll", "snack"]],
      ["Sewai Pulao", 250, "Vermicelli pulao cooked with vegetables and mild spices.", ["sewai", "pulao", "vermicelli"]],
      ["Paneer Tikka", 450, "Marinated paneer tikka with smoky spices.", ["paneer", "tikka", "starter"]]
    ]
  },
  {
    name: "Burgers, Rolls & Sandwiches",
    items: [
      ["Veg Burger (1 pc)", 300, "Veg patty burger with cheese, lettuce, and house sauce.", ["burger", "snack", "kids"]],
      ["Cheese Sandwich (1 pc)", 220, "Grilled sandwich layered with melted cheese.", ["sandwich", "cheese", "snack"]],
      ["Aloo Sandwich (1 pc)", 100, "Grilled potato masala sandwich with chutney.", ["sandwich", "potato", "budget"]],
      ["Club Sandwich", 350, "Layered vegetarian club sandwich with cheese and vegetables.", ["sandwich", "club", "cheese"]],
      ["Veg Katti Roll", 320, "Flaky wrap filled with spiced vegetables and chutney.", ["roll", "wrap", "snack"]],
      ["Aloo Katti Roll", 280, "Flaky wrap filled with potato masala and chutney.", ["roll", "potato", "wrap"]]
    ]
  },
  {
    name: "Chinese & Momos",
    items: [
      ["Veg Chowmin", 180, "Stir-fried noodles with fresh vegetables and sauces.", ["noodles", "chinese", "quick"]],
      ["Veg Lollipop", 300, "Crispy vegetable lollipops with Indo-Chinese flavor.", ["chinese", "crispy", "starter"]],
      ["Spring Rolls", 380, "Crisp rolls filled with seasoned vegetables.", ["rolls", "chinese", "starter"]],
      ["Chinese Bhel", 450, "Crunchy noodles tossed with vegetables and tangy sauces.", ["chinese", "bhel", "spicy"]],
      ["Momo", 120, "Steamed vegetarian momos served with spicy chutney.", ["momo", "snack", "veg"]],
      ["Jhol Momo", 250, "Vegetarian momos served in warm spicy jhol sauce.", ["momo", "jhol", "snack"]],
      ["Paneer Chilli", 400, "Paneer cubes tossed with capsicum and Indo-Chinese chilli sauce.", ["paneer", "chilli", "chinese"]],
      ["Potato Chilli", 350, "Crispy potatoes tossed in Indo-Chinese chilli sauce.", ["potato", "chilli", "chinese"]]
    ]
  },
  {
    name: "Pizza & Pasta",
    items: [
      ["Mix Veg Pizza", 600, "Cheesy pizza topped with capsicum, corn, onion, and vegetables.", ["pizza", "cheese", "popular"]],
      ["Paneer Pizza", 650, "Pizza loaded with paneer, vegetables, and cheese.", ["pizza", "paneer", "cheese"]],
      ["Cheese Pizza", 500, "Simple cheese pizza with a golden melted top.", ["pizza", "cheese", "kids"]],
      ["Sweet Corn Pizza", 600, "Cheesy pizza topped generously with sweet corn.", ["pizza", "corn", "cheese"]],
      ["Kulhad Pizza", 280, "Creamy pizza-style vegetables and cheese served in a kulhad.", ["pizza", "kulhad", "cheese", "snack"]],
      ["Bun Pizza", 250, "Mini bun pizza with vegetables and melted cheese.", ["pizza", "bun", "snack"]],
      ["Bread Pizza", 300, "Crisp bread pizza topped with sauce, cheese, and vegetables.", ["pizza", "bread", "snack"]],
      ["Pasta Pizza Sticks (5 Sticks)", 400, "Five cheesy pizza sticks stuffed with pasta flavors.", ["pizza", "sticks", "cheese"]],
      ["Red Sauce Pasta", 400, "Pasta tossed in tangy tomato sauce with vegetables.", ["pasta", "italian", "tomato"]],
      ["White Sauce Pasta", 450, "Creamy white sauce pasta with vegetables and herbs.", ["pasta", "cream", "cheese"]],
      ["Extra Cheese", 80, "Extra cheese add-on for pizzas and snacks.", ["add on", "cheese", "extra"]]
    ]
  },
  {
    name: "South Indian & Chilla",
    items: [
      ["Masala Dosa", 200, "Crisp dosa filled with spiced potato masala, served with chutney and sambar.", ["dosa", "masala", "south indian"]],
      ["Idli Sambar", 300, "Soft idli served with vegetable sambar.", ["idli", "sambar", "south indian"]],
      ["Masala Idli", 250, "Idli tossed with vegetables and South Indian masala.", ["idli", "south indian", "snack"]],
      ["Plain Moong Daal Chilla", 180, "Protein-rich plain moong daal chilla served with chutney.", ["chilla", "moong", "snack"]],
      ["Paneer Stuffed Moong Daal Chilla", 250, "Moong daal chilla stuffed with paneer filling.", ["chilla", "moong", "paneer"]]
    ]
  },
  {
    name: "Breads",
    items: [
      ["Plain Naan (1 pc)", 80, "Soft plain naan, perfect with paneer and dal.", ["naan", "bread", "tandoor"]],
      ["Butter Naan (1 pc)", 100, "Soft naan brushed with butter.", ["naan", "butter", "bread"]],
      ["Garlic Naan (1 pc)", 120, "Naan topped with garlic and herbs.", ["naan", "garlic", "bread"]],
      ["Plain Fulka (1 pc)", 50, "Light home-style fulka.", ["fulka", "roti", "bread"]],
      ["Butter Fulka (1 pc)", 70, "Home-style fulka finished with butter.", ["fulka", "butter", "bread"]],
      ["Tawa Roti (1 pc)", 60, "Fresh roti cooked on tawa.", ["roti", "tawa", "bread"]],
      ["Butter Tawa Roti (1 pc)", 80, "Tawa roti brushed with butter.", ["roti", "butter", "bread"]],
      ["Aloo Paratha (1 pc)", 120, "Stuffed potato paratha with homestyle spices.", ["paratha", "aloo", "bread"]],
      ["Plain Paratha (1 pc)", 100, "Layered plain paratha cooked on tawa.", ["paratha", "bread", "tawa"]],
      ["Poori Tarkari (4Pcs)", 200, "Four puffed pooris served with homestyle potato tarkari.", ["poori", "tarkari", "bread"]],
      ["Pyaaz Paratha", 120, "Tawa-cooked paratha stuffed with spiced onion filling.", ["paratha", "pyaaz", "onion", "bread"]],
      ["Sattu Paratha", 120, "Stuffed paratha filled with roasted sattu masala.", ["paratha", "sattu", "bread"]]
    ]
  },
  {
    name: "Rice",
    items: [
      ["Jeera Rice", 150, "Basmati-style rice tempered with cumin.", ["rice", "jeera", "simple"]],
      ["Plain Rice", 100, "Steamed rice for dal and curries.", ["rice", "plain", "comfort"]],
      ["Fry Rice", 190, "Vegetable fried rice with Indo-Chinese seasoning.", ["rice", "chinese", "vegetables"]],
      ["Pulao", 300, "Fragrant vegetable pulao with gentle spices.", ["rice", "pulao", "vegetables"]]
    ]
  },
  {
    name: "Sabji",
    items: [
      ["Paneer Butter Masala", 450, "Paneer cubes simmered in rich buttery tomato gravy.", ["paneer", "sabji", "curry"]],
      ["Kadhai Paneer", 500, "Paneer cooked with capsicum and kadhai masala.", ["paneer", "sabji", "spicy"]],
      ["Sahi Paneer", 400, "Creamy paneer gravy with a mild royal-style base.", ["paneer", "creamy", "sabji"]],
      ["Malai Kofta", 500, "Soft kofta dumplings served in creamy gravy.", ["kofta", "malai", "sabji"]],
      ["Plain Dal", 120, "Simple yellow dal, light and comforting.", ["dal", "comfort", "simple"]],
      ["Dal Tadka", 250, "Yellow dal finished with sizzling tadka.", ["dal", "tadka", "comfort"]],
      ["Seasonal Vegetable", 250, "Fresh seasonal vegetable sabji cooked homestyle.", ["sabji", "seasonal", "vegetables"]],
      ["Aloo Sabji", 100, "Simple potato sabji with mild spices.", ["aloo", "potato", "sabji"]],
      ["Aloo Jeera", 250, "Potatoes tossed with cumin and spices.", ["aloo", "jeera", "sabji"]],
      ["Aloo Dum", 300, "Potatoes simmered in spicy dum-style gravy.", ["aloo", "dum", "sabji"]],
      ["Plain Kadhi", 200, "Classic yogurt kadhi with gentle spices.", ["kadhi", "comfort", "curd"]],
      ["Pakora Kadhi", 250, "Kadhi served with soft pakora pieces.", ["kadhi", "pakora", "comfort"]]
    ]
  },
  {
    name: "Vrat Menu",
    items: [
      ["Sabudana Khichdi", 350, "Light vrat-friendly sabudana with peanuts, potato, and herbs.", ["vrat", "fasting", "sabudana"]],
      ["Aloo Tikki", 150, "Crisp potato tikki for fasting-friendly cravings.", ["vrat", "aloo", "tikki"]],
      ["Aloo Peanut Chaat", 300, "Potato and peanut chaat with lime and herbs.", ["vrat", "peanut", "chaat"]],
      ["Makhana Roasted", 200, "Light roasted makhana with mild seasoning.", ["vrat", "makhana", "snack"]],
      ["Tomato Chutney", 150, "Tangy tomato chutney for vrat meals.", ["vrat", "tomato", "chutney"]],
      ["Aloo Chips", 100, "Crisp potato chips for a light bite.", ["vrat", "chips", "potato"]],
      ["Fafar Roti (per pc)", 90, "Fafar roti made for fasting plates.", ["vrat", "fafar", "bread"]],
      ["Falhar Aloo Sabji", 250, "Fasting-style potato sabji with simple spices.", ["vrat", "aloo", "sabji"]],
      ["French Fries", 150, "Classic crisp fries, served hot.", ["vrat", "fries", "potato"]],
      ["Paneer Tikka", 450, "Marinated paneer tikka with smoky spices.", ["vrat", "paneer", "tikka"]],
      ["Aloo Chaat", 250, "Potato chaat tossed with lime and masala.", ["vrat", "chaat", "potato"]],
      ["Fafar Pakori", 300, "Crisp fafar pakori for vrat snacking.", ["vrat", "pakori", "fried"]],
      ["Dum Aloo Sabji", 380, "Vrat-style dum aloo sabji in rich gravy.", ["vrat", "aloo", "sabji"]],
      ["Cucumber Raita", 200, "Cool cucumber raita with curd and cumin.", ["vrat", "raita", "cucumber"]],
      ["Raita", 100, "Simple cooling curd raita.", ["vrat", "raita", "curd"]],
      ["Poori (4 per plate)", 150, "Four vrat-friendly pooris per plate.", ["vrat", "poori", "bread"]],
      ["Aloo Sabudana Tikki", 350, "Crisp tikki made with potato and sabudana.", ["vrat", "sabudana", "tikki"]],
      ["Paneer Sabji With Tomato", 450, "Paneer sabji cooked with tomato gravy.", ["vrat", "paneer", "tomato"]],
      ["Paneer Sabji Without Tomato", 500, "Paneer sabji prepared without tomato.", ["vrat", "paneer", "no tomato"]],
      ["Aloo Seera", 450, "Sweet fasting-style aloo seera.", ["vrat", "sweet", "aloo"]],
      ["Sabudana Kheer", 500, "Sweet sabudana kheer with creamy texture.", ["vrat", "sweet", "kheer"]],
      ["Makhana Kheer", 500, "Creamy makhana kheer for vrat dessert.", ["vrat", "makhana", "kheer"]],
      ["Fruit Salad", 450, "Fresh seasonal fruit salad.", ["vrat", "fruit", "salad"]],
      ["Salad", 280, "Fresh salad plate for a lighter meal.", ["vrat", "salad", "fresh"]]
    ]
  },
  {
    name: "Waffles",
    items: [
      ["Dark Desire Waffle Slice", 200, "Tree O' Slice waffle with rich dark chocolate flavor.", ["waffle", "dessert", "chocolate"]],
      ["Milky Bliss Waffle Slice", 200, "Tree O' Slice waffle with creamy milky sweetness.", ["waffle", "dessert", "milk"]],
      ["Snow White Indulgence Waffle Slice", 225, "Tree O' Slice waffle with white chocolate indulgence.", ["waffle", "dessert", "white chocolate"]],
      ["Choco Trio Fantasy Waffle Slice", 250, "Tree O' Slice waffle with a trio of chocolate flavors.", ["waffle", "dessert", "chocolate"]],
      ["Chip Crunch Delight Waffle Slice", 225, "Tree O' Slice waffle with crunchy chocolate chips.", ["waffle", "dessert", "choco chips"]],
      ["KitKat Krunch Waffle Slice", 225, "Tree O' Slice waffle topped with KitKat crunch.", ["waffle", "dessert", "kitkat"]],
      ["Oreo Dream Stick Waffle Slice", 240, "Tree O' Slice waffle with Oreo crumble and cream.", ["waffle", "dessert", "oreo"]],
      ["Rainbow Gems Magic Waffle Slice", 215, "Tree O' Slice waffle with colorful gems topping.", ["waffle", "dessert", "gems"]],
      ["Royal Nutty Almond Waffle Slice", 225, "Tree O' Slice waffle with almond and nutty crunch.", ["waffle", "dessert", "almond"]],
      ["Golden Crunch Peanut Waffle Slice", 215, "Tree O' Slice waffle with roasted peanut crunch.", ["waffle", "dessert", "peanut"]],
      ["Tropical Coconut Kiss Waffle Slice", 215, "Tree O' Slice waffle with coconut sweetness.", ["waffle", "dessert", "coconut"]],
      ["Fluffy Cloud Treat Waffle Slice", 240, "Tree O' Slice waffle with a soft creamy finish.", ["waffle", "dessert", "sweet"]]
    ]
  },
  {
    name: "Beverages",
    items: [
      ["Espresso", 100, "Strong espresso coffee shot.", ["coffee", "espresso", "hot drink"]],
      ["Doppio", 125, "Double espresso shot for a stronger coffee.", ["coffee", "espresso", "hot drink"]],
      ["Americano Single", 125, "Single-shot Americano coffee.", ["coffee", "americano", "hot drink"]],
      ["Americano Double", 165, "Double-shot Americano coffee.", ["coffee", "americano", "hot drink"]],
      ["Cafe Latte Single", 175, "Single-shot latte with steamed milk.", ["coffee", "latte", "milk"]],
      ["Cafe Latte Double", 215, "Double-shot latte with steamed milk.", ["coffee", "latte", "milk"]],
      ["Cappuccino Single", 175, "Single-shot cappuccino with foamed milk.", ["coffee", "cappuccino", "milk"]],
      ["Cappuccino Double", 215, "Double-shot cappuccino with foamed milk.", ["coffee", "cappuccino", "milk"]],
      ["Cafe Mocha", 225, "Coffee blended with chocolate and milk.", ["coffee", "mocha", "chocolate"]],
      ["Caramel Macchiato", 200, "Coffee with caramel and milk foam.", ["coffee", "caramel", "macchiato"]],
      ["Iced Latte / Cappuccino", 225, "Cold latte or cappuccino served chilled.", ["coffee", "iced", "cold drink"]],
      ["Iced Americano Single", 150, "Single-shot iced Americano.", ["coffee", "iced", "americano"]],
      ["Iced Americano Double", 190, "Double-shot iced Americano.", ["coffee", "iced", "americano"]],
      ["Espresso Macchiato", 175, "Espresso topped with a small touch of milk foam.", ["coffee", "espresso", "macchiato"]],
      ["Peach Tea (Hot)", 100, "Hot peach tea with a fruity aroma.", ["tea", "peach", "hot drink"]],
      ["Apple Tea", 100, "Apple-flavored tea served hot.", ["tea", "apple", "hot drink"]],
      ["Lemon Tea", 100, "Hot lemon tea with a bright citrus finish.", ["tea", "lemon", "hot drink"]],
      ["Milk Tea", 50, "Classic milk tea.", ["tea", "milk", "hot drink"]],
      ["Masala Milk Tea", 75, "Milk tea with warming masala spices.", ["tea", "masala", "milk"]],
      ["Green Tea", 90, "Light green tea served hot.", ["tea", "green", "hot drink"]],
      ["Black Tea", 40, "Simple black tea served hot.", ["tea", "black", "hot drink"]],
      ["Hot Lemon (G&H)", 125, "Hot lemon drink with ginger and honey.", ["tea", "lemon", "ginger", "honey"]],
      ["Frappe", 300, "Oreo, mocha, chocolate, or caramel frappe.", ["frappe", "coffee", "cold drink"]],
      ["Banana Thick Shake", 300, "Thick banana shake served chilled.", ["shake", "banana", "cold drink"]],
      ["Vanilla Thick Shake", 250, "Creamy vanilla thick shake.", ["shake", "vanilla", "cold drink"]],
      ["Chocolate Thick Shake", 250, "Rich chocolate thick shake.", ["shake", "chocolate", "cold drink"]],
      ["Coffee Thick Shake", 290, "Cold thick shake with coffee flavor.", ["shake", "coffee", "cold drink"]],
      ["Strawberry Thick Shake", 300, "Sweet strawberry thick shake.", ["shake", "strawberry", "cold drink"]],
      ["Oreo Thick Shake", 315, "Thick shake blended with Oreo.", ["shake", "oreo", "cold drink"]],
      ["KitKat Thick Shake", 315, "Thick shake blended with KitKat.", ["shake", "kitkat", "cold drink"]],
      ["Coke / Fanta / Sprite", 75, "Chilled soft drink, as available.", ["drink", "cold", "soft drink"]],
      ["Frooti", 50, "Chilled mango drink.", ["drink", "mango", "cold drink"]],
      ["Peach Ice Tea", 175, "Cold peach iced tea.", ["iced tea", "peach", "cold drink"]],
      ["Apple / Lemon Iced Tea", 165, "Cold apple or lemon iced tea.", ["iced tea", "apple", "lemon"]],
      ["Mint Refresher", 175, "Refreshing mint cooler served chilled.", ["refresher", "mint", "cold drink"]],
      ["Strawberry Refresher", 200, "Cold strawberry refresher.", ["refresher", "strawberry", "cold drink"]],
      ["Coke Mojito", 190, "Coke-based mojito-style refresher.", ["mojito", "coke", "cold drink"]],
      ["Virgin Mojito", 215, "Minty virgin mojito refresher.", ["mojito", "mint", "cold drink"]],
      ["Lemonade", 150, "Classic chilled lemonade.", ["lemonade", "lemon", "cold drink"]],
      ["Fanta Lemonade", 150, "Fanta-style chilled lemonade.", ["lemonade", "fanta", "cold drink"]],
      ["Ice Coffee With Ice Cream", 225, "Iced coffee served with ice cream.", ["coffee", "ice cream", "cold drink"]]
    ]
  }
];

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toMenuItem([name, price, description, tags]) {
  const slug = slugify(name);
  return {
    id: slug,
    name,
    price,
    description,
    tags,
    image: `/images/menu/${slug}.jpg`
  };
}

export const menuCategories = categories.map((category) => ({
  ...category,
  items: category.items.map(toMenuItem)
}));

export const categoryNames = ["All", ...menuCategories.map((category) => category.name)];

export const allMenuItems = menuCategories.flatMap((category) => category.items);
