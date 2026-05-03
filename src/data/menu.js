const categories = [
  {
    name: "Popular",
    items: [
      ["Veg Burger (1 pc)", 300, "Veg patty burger with cheese, lettuce, and house sauce.", ["burger", "snack", "kids", "best seller"]],
      ["French Fries (Peri Peri / Salty)", 150, "Crisp fries tossed salty or peri peri, served hot.", ["fries", "potato", "snack"]],
      ["Paneer Butter Masala", 450, "Paneer cubes simmered in rich buttery tomato gravy.", ["paneer", "sabji", "curry", "best seller"]],
      ["Aloo Sandwich (1 pc)", 100, "Grilled potato masala sandwich with chutney.", ["sandwich", "potato", "budget"]],
      ["Mix Veg Pizza", 600, "Cheesy pizza topped with capsicum, corn, onion, and vegetables.", ["pizza", "cheese", "popular", "best seller"]],
      ["Jhol Momo", 250, "Vegetarian momos served in warm spicy jhol sauce.", ["momo", "jhol", "snack"]],
      ["Sabudana Khichdi", 350, "Light vrat-friendly sabudana with peanuts, potato, and herbs.", ["vrat", "fasting", "sabudana", "best seller"]],
      ["Garlic Naan (1 pc)", 120, "Naan topped with garlic and herbs.", ["naan", "garlic", "bread"]],
      ["Jeera Rice", 150, "Basmati-style rice tempered with cumin.", ["rice", "jeera", "simple"]],
      ["Virgin Mojito", 215, "Minty virgin mojito refresher.", ["mojito", "mint", "cold drink"]]
    ]
  },
  {
    name: "Street Snacks",
    items: [
      ["Vada Pau (1 pc)", 150, "Mumbai-style potato vada in soft pau with chutney.", ["snack", "street food", "potato", "best seller"]],
      ["French Fries (Peri Peri / Salty)", 150, "Crisp fries tossed salty or peri peri, served hot.", ["fries", "potato", "snack"]],
      ["Nachos With Salsa", 250, "Crunchy nachos served with bright tomato salsa.", ["nachos", "salsa", "sharing", "best seller"]],
      ["Sweet Corn Chaat", 300, "Sweet corn tossed with masala, lime, and herbs.", ["corn", "chaat", "light"]],
      ["Crispy Corn", 250, "Golden fried corn kernels with peppery seasoning.", ["corn", "crispy", "sharing", "best seller"]],
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
      ["Veg Burger (1 pc)", 300, "Veg patty burger with cheese, lettuce, and house sauce.", ["burger", "snack", "kids", "best seller"]],
      ["Cheese Sandwich (1 pc)", 220, "Grilled sandwich layered with melted cheese.", ["sandwich", "cheese", "snack", "best seller"]],
      ["Aloo Sandwich (1 pc)", 100, "Grilled potato masala sandwich with chutney.", ["sandwich", "potato", "budget"]],
      ["Club Sandwich", 350, "Layered vegetarian club sandwich with cheese and vegetables.", ["sandwich", "club", "cheese", "best seller"]],
      ["Veg Katti Roll", 320, "Flaky wrap filled with spiced vegetables and chutney.", ["roll", "wrap", "snack"]],
      ["Aloo Katti Roll", 280, "Flaky wrap filled with potato masala and chutney.", ["roll", "potato", "wrap"]]
    ]
  },
  {
    name: "Chinese & Momos",
    items: [
      ["Veg Chowmin", 180, "Stir-fried noodles with fresh vegetables and sauces.", ["noodles", "chinese", "quick", "best seller"]],
      ["Veg Lollipop", 300, "Crispy vegetable lollipops with Indo-Chinese flavor.", ["chinese", "crispy", "starter"]],
      ["Spring Rolls", 380, "Crisp rolls filled with seasoned vegetables.", ["rolls", "chinese", "starter"]],
      ["Chinese Bhel", 450, "Crunchy noodles tossed with vegetables and tangy sauces.", ["chinese", "bhel", "spicy", "best seller"]],
      ["Momo", 120, "Steamed vegetarian momos served with spicy chutney.", ["momo", "snack", "veg", "best seller"]],
      ["Jhol Momo", 250, "Vegetarian momos served in warm spicy jhol sauce.", ["momo", "jhol", "snack"]],
      ["Paneer Chilli", 400, "Paneer cubes tossed with capsicum and Indo-Chinese chilli sauce.", ["paneer", "chilli", "chinese"]],
      ["Potato Chilli", 350, "Crispy potatoes tossed in Indo-Chinese chilli sauce.", ["potato", "chilli", "chinese"]]
    ]
  },
  {
    name: "Pizza & Pasta",
    items: [
      ["Mix Veg Pizza", 600, "Cheesy pizza topped with capsicum, corn, onion, and vegetables.", ["pizza", "cheese", "popular", "best seller"]],
      ["Paneer Pizza", 650, "Pizza loaded with paneer, vegetables, and cheese.", ["pizza", "paneer", "cheese"]],
      ["Cheese Pizza", 500, "Simple cheese pizza with a golden melted top.", ["pizza", "cheese", "kids", "best seller"]],
      ["Sweet Corn Pizza", 600, "Cheesy pizza topped generously with sweet corn.", ["pizza", "corn", "cheese"]],
      ["Kulhad Pizza", 280, "Creamy pizza-style vegetables and cheese served in a kulhad.", ["pizza", "kulhad", "cheese", "snack", "best seller"]],
      ["Bun Pizza", 250, "Mini bun pizza with vegetables and melted cheese.", ["pizza", "bun", "snack"]],
      ["Bread Pizza", 300, "Crisp bread pizza topped with sauce, cheese, and vegetables.", ["pizza", "bread", "snack"]],
      ["Pasta Pizza Sticks (5 Sticks)", 400, "Five cheesy pizza sticks stuffed with pasta flavors.", ["pizza", "sticks", "cheese"]],
      ["Red Sauce Pasta", 400, "Pasta tossed in tangy tomato sauce with vegetables.", ["pasta", "italian", "tomato", "best seller"]],
      ["White Sauce Pasta", 450, "Creamy white sauce pasta with vegetables and herbs.", ["pasta", "cream", "cheese"]],
      ["Extra Cheese", 80, "Extra cheese add-on for pizzas and snacks.", ["add on", "cheese", "extra"]]
    ]
  },
  {
    name: "South Indian & Chilla",
    items: [
      ["Masala Dosa", 200, "Crisp dosa filled with spiced potato masala, served with chutney and sambar.", ["dosa", "masala", "south indian", "best seller"]],
      ["Idli Sambar", 300, "Soft idli served with vegetable sambar.", ["idli", "sambar", "south indian"]],
      ["Masala Idli", 250, "Idli tossed with vegetables and South Indian masala.", ["idli", "south indian", "snack"]],
      ["Plain Moong Daal Chilla", 180, "Protein-rich plain moong daal chilla served with chutney.", ["chilla", "moong", "snack"]],
      ["Paneer Stuffed Moong Daal Chilla", 250, "Moong daal chilla stuffed with paneer filling.", ["chilla", "moong", "paneer", "best seller"]]
    ]
  },
  {
    name: "Breads",
    items: [
      ["Plain Naan (1 pc)", 80, "Soft plain naan, perfect with paneer and dal.", ["naan", "bread", "tandoor"]],
      ["Butter Naan (1 pc)", 100, "Soft naan brushed with butter.", ["naan", "butter", "bread", "best seller"]],
      ["Garlic Naan (1 pc)", 120, "Naan topped with garlic and herbs.", ["naan", "garlic", "bread"]],
      ["Plain Fulka (1 pc)", 50, "Light home-style fulka.", ["fulka", "roti", "bread"]],
      ["Butter Fulka (1 pc)", 70, "Home-style fulka finished with butter.", ["fulka", "butter", "bread"]],
      ["Tawa Roti (1 pc)", 60, "Fresh roti cooked on tawa.", ["roti", "tawa", "bread"]],
      ["Butter Tawa Roti (1 pc)", 80, "Tawa roti brushed with butter.", ["roti", "butter", "bread"]],
      ["Aloo Paratha (1 pc)", 120, "Stuffed potato paratha with homestyle spices.", ["paratha", "aloo", "bread", "best seller"]],
      ["Plain Paratha (1 pc)", 100, "Layered plain paratha cooked on tawa.", ["paratha", "bread", "tawa"]],
      ["Aloo Stuffed Kulcha", 200, "Soft kulcha stuffed with spiced potato filling.", ["kulcha", "aloo", "bread"]],
      ["Poori Tarkari (4Pcs)", 200, "Four puffed pooris served with homestyle potato tarkari.", ["poori", "tarkari", "bread", "best seller"]],
      ["Pyaaz Paratha", 120, "Tawa-cooked paratha stuffed with spiced onion filling.", ["paratha", "pyaaz", "onion", "bread"]],
      ["Sattu Paratha", 120, "Stuffed paratha filled with roasted sattu masala.", ["paratha", "sattu", "bread"]]
    ]
  },
  {
    name: "Rice",
    items: [
      ["Jeera Rice", 150, "Basmati-style rice tempered with cumin.", ["rice", "jeera", "simple"]],
      ["Plain Rice", 100, "Steamed rice for dal and curries.", ["rice", "plain", "comfort"]],
      ["Fry Rice", 190, "Vegetable fried rice with Indo-Chinese seasoning.", ["rice", "chinese", "vegetables", "best seller"]],
      ["Pulao", 300, "Fragrant vegetable pulao with gentle spices.", ["rice", "pulao", "vegetables", "best seller"]]
    ]
  },
  {
    name: "Sabji",
    items: [
      ["Paneer Butter Masala", 450, "Paneer cubes simmered in rich buttery tomato gravy.", ["paneer", "sabji", "curry", "best seller"]],
      ["Kadhai Paneer", 500, "Paneer cooked with capsicum and kadhai masala.", ["paneer", "sabji", "spicy", "best seller"]],
      ["Matar Paneer", 500, "Paneer and green peas cooked in a homestyle spiced gravy.", ["paneer", "matar", "sabji", "best seller"]],
      ["Sahi Paneer", 400, "Creamy paneer gravy with a mild royal-style base.", ["paneer", "creamy", "sabji"]],
      ["Malai Kofta", 500, "Soft kofta dumplings served in creamy gravy.", ["kofta", "malai", "sabji"]],
      ["Plain Dal", 120, "Simple yellow dal, light and comforting.", ["dal", "comfort", "simple"]],
      ["Dal Tadka", 250, "Yellow dal finished with sizzling tadka.", ["dal", "tadka", "comfort"]],
      ["Seasonal Vegetable", 250, "Fresh seasonal vegetable sabji cooked homestyle.", ["sabji", "seasonal", "vegetables"]],
      ["Aloo Sabji", 100, "Simple potato sabji with mild spices.", ["aloo", "potato", "sabji"]],
      ["Aloo Jeera", 250, "Potatoes tossed with cumin and spices.", ["aloo", "jeera", "sabji"]],
      ["Aloo Dum", 300, "Potatoes simmered in spicy dum-style gravy.", ["aloo", "dum", "sabji", "best seller"]],
      ["Plain Kadhi", 200, "Classic yogurt kadhi with gentle spices.", ["kadhi", "comfort", "curd"]],
      ["Pakora Kadhi", 250, "Kadhi served with soft pakora pieces.", ["kadhi", "pakora", "comfort", "best seller"]]
    ]
  },
  {
    name: "Satvik / Vrat Menu",
    items: [
      ["Sabudana Khichdi", 350, "Light vrat-friendly sabudana with peanuts, potato, and herbs.", ["vrat", "fasting", "sabudana", "best seller"]],
      ["Aloo Tikki", 150, "Crisp potato tikki for fasting-friendly cravings.", ["vrat", "aloo", "tikki"]],
      ["Aloo Peanut Chaat", 300, "Potato and peanut chaat with lime and herbs.", ["vrat", "peanut", "chaat", "best seller"]],
      ["Makhana Roasted", 200, "Light roasted makhana with mild seasoning.", ["vrat", "makhana", "snack"]],
      ["Tomato Chutney", 150, "Tangy tomato chutney for vrat meals.", ["vrat", "tomato", "chutney"]],
      ["Aloo Chips", 100, "Crisp potato chips for a light bite.", ["vrat", "chips", "potato"]],
      ["Fafar Roti (per pc)", 90, "Fafar roti made for fasting plates.", ["vrat", "fafar", "bread", "best seller"]],
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
      ["Aloo Seera", 450, "Sweet fasting-style aloo seera.", ["vrat", "sweet", "aloo", "best seller"]],
      ["Sabudana Kheer", 500, "Sweet sabudana kheer with creamy texture.", ["vrat", "sweet", "kheer", "best seller"]],
      ["Makhana Kheer", 500, "Creamy makhana kheer for vrat dessert.", ["vrat", "makhana", "kheer"]],
      ["Fruit Salad", 450, "Fresh seasonal fruit salad.", ["vrat", "fruit", "salad"]],
      ["Salad", 280, "Fresh salad plate for a lighter meal.", ["vrat", "salad", "fresh"]]
    ]
  },
  {
    name: "Waffles",
    items: [
      ["Dark Desire Waffle Slice", 200, "Tree O' Slice waffle with rich dark chocolate flavor.", ["waffle", "dessert", "chocolate", "best seller"]],
      ["Milky Bliss Waffle Slice", 200, "Tree O' Slice waffle with creamy milky sweetness.", ["waffle", "dessert", "milk"]],
      ["Snow White Indulgence Waffle Slice", 225, "Tree O' Slice waffle with white chocolate indulgence.", ["waffle", "dessert", "white chocolate"]],
      ["Choco Trio Fantasy Waffle Slice", 250, "Tree O' Slice waffle with a trio of chocolate flavors.", ["waffle", "dessert", "chocolate", "best seller"]],
      ["Chip Crunch Delight Waffle Slice", 225, "Tree O' Slice waffle with crunchy chocolate chips.", ["waffle", "dessert", "choco chips"]],
      ["KitKat Krunch Waffle Slice", 225, "Tree O' Slice waffle topped with KitKat crunch.", ["waffle", "dessert", "kitkat", "best seller"]],
      ["Oreo Dream Stick Waffle Slice", 240, "Tree O' Slice waffle with Oreo crumble and cream.", ["waffle", "dessert", "oreo", "best seller"]],
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

const itemRatings = {
  "Vada Pau (1 pc)": { rating: 5, ratingCount: 70 },
  "French Fries (Peri Peri / Salty)": { rating: 4.9, ratingCount: 50 },
  "Nachos With Salsa": { rating: 5, ratingCount: 68 },
  "Sweet Corn Chaat": { rating: 4.5, ratingCount: 65 },
  "Crispy Corn": { rating: 4.5, ratingCount: 62 },
  "Poha": { rating: 4, ratingCount: 60 },
  "Vegetable Pakora": { rating: 3.5, ratingCount: 45 },
  "Aloo Chop (5 pcs)": { rating: 4.9, ratingCount: 60 },
  "Onion Pakora / Pyaji (5 pcs)": { rating: 4, ratingCount: 55 },
  "Bread Roll": { rating: 4.5, ratingCount: 57 },
  "Sewai Pulao": { rating: 4, ratingCount: 20 },
  "Paneer Tikka": { rating: 3.5, ratingCount: 15 },
  "Veg Burger (1 pc)": { rating: 5, ratingCount: 80 },
  "Cheese Sandwich (1 pc)": { rating: 4.9, ratingCount: 75 },
  "Aloo Sandwich (1 pc)": { rating: 4.5, ratingCount: 60 },
  "Club Sandwich": { rating: 4.9, ratingCount: 78 },
  "Veg Katti Roll": { rating: 3, ratingCount: 30 },
  "Aloo Katti Roll": { rating: 4, ratingCount: 46 },
  "Veg Chowmin": { rating: 4.5, ratingCount: 60 },
  "Veg Lollipop": { rating: 1, ratingCount: 5 },
  "Spring Rolls": { rating: 3.5, ratingCount: 20 },
  "Chinese Bhel": { rating: 4, ratingCount: 57 },
  "Momo": { rating: 4.5, ratingCount: 75 },
  "Jhol Momo": { rating: 4.8, ratingCount: 70 },
  "Paneer Chilli": { rating: 2, ratingCount: 20 },
  "Potato Chilli": { rating: 3.5, ratingCount: 32 },
  "Mix Veg Pizza": { rating: 5, ratingCount: 15 },
  "Paneer Pizza": { rating: 4, ratingCount: 8 },
  "Cheese Pizza": { rating: 4.8, ratingCount: 10 },
  "Sweet Corn Pizza": { rating: 3.5, ratingCount: 7 },
  "Kulhad Pizza": { rating: 4.5, ratingCount: 13 },
  "Bun Pizza": { rating: 4, ratingCount: 10 },
  "Bread Pizza": { rating: 3.5, ratingCount: 8 },
  "Pasta Pizza Sticks (5 Sticks)": { rating: 2, ratingCount: 9 },
  "Red Sauce Pasta": { rating: 4.9, ratingCount: 19 },
  "White Sauce Pasta": { rating: 4, ratingCount: 18 },
  "Masala Dosa": { rating: 4.5, ratingCount: 25 },
  "Idli Sambar": { rating: 4, ratingCount: 20 },
  "Plain Moong Daal Chilla": { rating: 3, ratingCount: 15 },
  "Paneer Stuffed Moong Daal Chilla": { rating: 4, ratingCount: 25 },
  "Plain Naan (1 pc)": { rating: 4.5, ratingCount: 18 },
  "Butter Naan (1 pc)": { rating: 5, ratingCount: 21 },
  "Garlic Naan (1 pc)": { rating: 4, ratingCount: 40 },
  "Plain Fulka (1 pc)": { rating: 3, ratingCount: 20 },
  "Butter Fulka (1 pc)": { rating: 3.5, ratingCount: 15 },
  "Tawa Roti (1 pc)": { rating: 3, ratingCount: 10 },
  "Butter Tawa Roti (1 pc)": { rating: 3.5, ratingCount: 9 },
  "Aloo Paratha (1 pc)": { rating: 4.8, ratingCount: 15 },
  "Plain Paratha (1 pc)": { rating: 4, ratingCount: 26 },
  "Aloo Stuffed Kulcha": { rating: 4.5, ratingCount: 25 },
  "Poori Tarkari (4Pcs)": { rating: 3.5, ratingCount: 24 },
  "Pyaaz Paratha": { rating: 3, ratingCount: 4 },
  "Sattu Paratha": { rating: 4, ratingCount: 16 },
  "Jeera Rice": { rating: 4, ratingCount: 11 },
  "Plain Rice": { rating: 3.5, ratingCount: 27 },
  "Fry Rice": { rating: 4.5, ratingCount: 1 },
  "Pulao": { rating: 4.2, ratingCount: 5 },
  "Paneer Butter Masala": { rating: 5, ratingCount: 17 },
  "Kadhai Paneer": { rating: 4.5, ratingCount: 24 },
  "Matar Paneer": { rating: 4.5, ratingCount: 12 },
  "Sahi Paneer": { rating: 4, ratingCount: 2 },
  "Malai Kofta": { rating: 4, ratingCount: 6 },
  "Plain Dal": { rating: 3.8, ratingCount: 18 },
  "Dal Tadka": { rating: 4.2, ratingCount: 13 },
  "Aloo Jeera": { rating: 4, ratingCount: 3 },
  "Aloo Dum": { rating: 4.3, ratingCount: 13 },
  "Plain Kadhi": { rating: 3, ratingCount: 7 },
  "Pakora Kadhi": { rating: 3.5, ratingCount: 19 },
  "Espresso": { rating: 4.5, ratingCount: 14 },
  "Doppio": { rating: 3, ratingCount: 13 },
  "Americano Single": { rating: 2, ratingCount: 15 },
  "Americano Double": { rating: 2.5, ratingCount: 10 },
  "Cafe Latte Single": { rating: 4, ratingCount: 12 },
  "Cappuccino Single": { rating: 3.5, ratingCount: 16 },
  "Cappuccino Double": { rating: 1, ratingCount: 11 },
  "Caramel Macchiato": { rating: 4.5, ratingCount: 20 },
  "Iced Latte / Cappuccino": { rating: 2, ratingCount: 19 },
  "Lemon Tea": { rating: 4, ratingCount: 30 },
  "Milk Tea": { rating: 4.5, ratingCount: 50 },
  "Masala Milk Tea": { rating: 4.5, ratingCount: 60 },
  "Green Tea": { rating: 2, ratingCount: 20 },
  "Black Tea": { rating: 3, ratingCount: 30 },
  "Hot Lemon (G&H)": { rating: 2, ratingCount: 45 },
  "Frappe": { rating: 4, ratingCount: 70 },
  "Banana Thick Shake": { rating: 1, ratingCount: 40 },
  "Vanilla Thick Shake": { rating: 4, ratingCount: 50 },
  "Chocolate Thick Shake": { rating: 3.5, ratingCount: 30 },
  "Coffee Thick Shake": { rating: 4.5, ratingCount: 60 },
  "Oreo Thick Shake": { rating: 3, ratingCount: 40 },
  "KitKat Thick Shake": { rating: 4, ratingCount: 70 },
  "Mint Refresher": { rating: 4.5, ratingCount: 50 },
  "Strawberry Refresher": { rating: 2, ratingCount: 10 },
  "Coke Mojito": { rating: 4, ratingCount: 40 },
  "Virgin Mojito": { rating: 4.8, ratingCount: 70 },
  "Lemonade": { rating: 3, ratingCount: 20 },
  "Dark Desire Waffle Slice": { rating: 4.8, ratingCount: 50 },
  "Milky Bliss Waffle Slice": { rating: 4, ratingCount: 40 },
  "Snow White Indulgence Waffle Slice": { rating: 4.2, ratingCount: 10 },
  "Choco Trio Fantasy Waffle Slice": { rating: 4.5, ratingCount: 70 },
  "Chip Crunch Delight Waffle Slice": { rating: 3, ratingCount: 5 },
  "KitKat Krunch Waffle Slice": { rating: 4.9, ratingCount: 70 },
  "Oreo Dream Stick Waffle Slice": { rating: 4.8, ratingCount: 60 },
  "Rainbow Gems Magic Waffle Slice": { rating: 2, ratingCount: 1 },
  "Royal Nutty Almond Waffle Slice": { rating: 3, ratingCount: 10 },
  "Golden Crunch Peanut Waffle Slice": { rating: 1, ratingCount: 6 },
  "Fluffy Cloud Treat Waffle Slice": { rating: 1.5, ratingCount: 3 }
};

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
    ...itemRatings[name],
    image: `/images/menu/${slug}.jpg`
  };
}

export const menuCategories = categories.map((category) => ({
  ...category,
  items: category.items.map(toMenuItem)
}));

export const categoryNames = ["All", ...menuCategories.map((category) => category.name)];

export const allMenuItems = menuCategories.flatMap((category) => category.items);
