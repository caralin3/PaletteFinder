const palettes = [
  {
    "score": 6,
    "palette": "Urban Decay Born to Run Eyeshadow Palette",
    "description": "The perfect palette for all types of occasions.",
    "price": 49,
    "link": "https://www.sephora.com/product/born-to-run-eyeshadow-palette-P431748?icid2=products%20grid:p431748:product"
  },
  {
    "score": 9,
    "palette": "Tarte Tarteist PRO Amazonian Clay Palette",
    "description": "This palette has some of the prettiest shades ever!",
    "price": 49,
    "link": "https://www.sephora.com/product/tarteist-pro-amazonian-clay-palette-P413177?icid2=products%20grid:p413177:product"
  },
  {
    "score": 12,
    "palette": "Jeffree Star Cosmetics Thirsty Palette",
    "description": "A palette with fun pops of color and plenty of spunk.",
    "price": 48,
    "link": "https://jeffreestarcosmetics.com/collections/eyes/products/thirsty-palette"
  },
  {
    "score": 15,
    "palette": "Morphe The James Charles Palette",
    "description": "Large and in charge, this palette has any color you would ever need.",
    "price": 39,
    "link": "https://www.ulta.com/james-charles-palette?productId=pimprod2001848"
  },
  {
    "score": 18,
    "palette": "Morphe Jaclyn Hill Eyeshadow Palette",
    "description": "One word comes to mind�OBSESSED!!!",
    "price": 38,
    "link": "https://www.ulta.com/jaclyn-hill-eyeshadow-palette?productId=xlsImpprod17081131"
  },
  {
    "score": 21,
    "palette": "Huda Beauty Obsessions Eyeshadow Palette in Amethyst",
    "description": "A gorgeous palette for the ultimate purple fantasy.",
    "price": 27,
    "link": "https://www.sephora.com/product/obsessions-gemstone-eyeshadow-palette-P45188659?icid2=products%20grid:p45188659:product&skuId=2137271"
  },
  {
    "score": 24,
    "palette": "BH Cosmetics Aurora Lights",
    "description": "A fun palette to brighten up your day that lets you shine.",
    "price": 18,
    "link": "https://www.ulta.com/aurora-lights-18-color-baked-eyeshadow-palette?productId=xlsImpprod18771165"
  },
  {
    "score": 27,
    "palette": "Makeup Revolution Reloaded Palette Division",
    "description": "A palette with beautiful colors for a girl on a budget.",
    "price": 7,
    "link": "https://www.ulta.com/reloaded-palette?productId=xlsImpprod17681065"
  },
  {
    "score": 30,
    "palette": "Huda Beauty The New Nude Palette",
    "description": "A beautiful palette to create both everyday looks and some serious red carpet glam.",
    "price": 65,
    "link": "https://www.sephora.com/product/the-new-nude-eyeshadow-palette-P43818047"
  },
  {
    "score": 33,
    "palette": "Too Faced Chocolate Gold Eyeshadow Palette",
    "description": "A palette with enough shimmers to get you noticed.",
    "price": 49,
    "link": "https://www.sephora.com/product/chocolate-gold-eyeshadow-palette-P426848?icid2=products%20grid:p426848:product"
  },
  {
    "score": 36,
    "palette": "Urban Decay Naked Cherry Eyeshadow Palette",
    "description": "It looks good enough to eat! Want to take a bite?",
    "price": 49,
    "link": "https://www.ulta.com/naked-cherry-eyeshadow-palette?productId=pimprod2000806"
  },
  {
    "score": 39,
    "palette": "Violet Voss Like a Boss Pro Eyeshadow Palette",
    "description": "The perfect palette to create any number of looks that are either simple or sassy.",
    "price": 45,
    "link": "https://www.sephora.com/product/like-boss-palette-P429925?icid2=products%20grid:p429925:product"
  },
  {
    "score": 42,
    "palette": "Anastasia Beverly Hills Sultry Palette",
    "description": "A palette that lives up to its name, with gorgeous metallics and blendable mattes.",
    "price": 45,
    "link": "https://www.ulta.com/sultry-eyeshadow-palette?productId=pimprod2000871"
  },
  {
    "score": 45,
    "palette": "Anastasia Beverly Hills Soft Glam Eyeshadow Palette",
    "description": "Perfect to achieve your everyday glam looks!",
    "price": 42,
    "link": "https://www.ulta.com/soft-glam-eyeshadow-palette?productId=xlsImpprod17841007"
  },
  {
    "score": 48,
    "palette": "Morphe 35F Fall into Frost Eyeshadow Palette",
    "description": "From natural to dramatic smoky looks, this palette is a great addition to anyone's makeup collection.",
    "price": 24,
    "link": "https://www.ulta.com/35f-fall-into-frost-eyeshadow-palette?productId=xlsImpprod17081135"
  },
  {
    "score": 51,
    "palette": "Too Faced Sweet Peach Eyeshadow Palette",
    "description": "A palette with some of the prettiest neutral shades around!",
    "price": 49,
    "link": "https://www.ulta.com/sweet-peach-eyeshadow-palette?productId=xlsImpprod13941029"
  },
  {
    "score": 54,
    "palette": "Kat Von D Shade + Light Eye Contour Palette",
    "description": "A must-have matte palette that lets you bring dimension to any eye look.",
    "price": 48,
    "link": "https://www.sephora.com/product/shade-light-eye-contour-palette-P413457?icid2=products%20grid:p413457:product"
  },
  {
    "score": 57,
    "palette": "Tartelette 2 In Bloom Clay Eyeshadow Palette",
    "description": "A great palette to create the most beautiful, classic looks.",
    "price": 39,
    "link": "https://www.ulta.com/tartelette-2-in-bloom-clay-eyeshadow-palette?productId=xlsImpprod13281007"
  },
  {
    "score": 60,
    "palette": "Smashbox + Vlada Cover Shot: Petal Metal Eye Shadow",
    "description": "An adorable palette with beautiful rose gold hues.",
    "price": 29,
    "link": "https://www.ulta.com/smashbox-vlada-cover-shot-petal-metal-eyeshadow-palette?productId=xlsImpprod18121009"
  },
  {
    "score": 63,
    "palette": "ColourPop Fame Pressed Powder Eyeshadow Palette",
    "description": "A fun palette for those cool-toned queens.",
    "price": 22,
    "link": "https://www.ulta.com/fame-pressed-powder-eyeshadow-palette?productId=xlsImpprod18951011&sku=2535053&_requestid=5236933"
  },
  {
    "score": 66,
    "palette": "Juvia's Place The Warrior Eyeshadow Palette",
    "description": "A beautiful neutral palette with shimmery kick.",
    "price": 20,
    "link": "https://www.ulta.com/warrior-eyeshadow-palette?productId=xlsImpprod18771145"
  },
  {
    "score": 69,
    "palette": "Tartelette Flirt Eyeshadow Palette",
    "description": "A cute little palette you can take anywhere!",
    "price": 19,
    "link": "https://www.sephora.com/product/tartlette-flirt-eyeshadow-palette-P424438?icid2=products%20grid:p424438:product"
  },
  {
    "score": 72,
    "palette": "NYX Warm Neutrals Ultimate Shadow Palette",
    "description": "A cute palette for everyday looks.",
    "price": 18,
    "link": "https://www.ulta.com/warm-neutrals-ultimate-shadow-palette?productId=xlsImpprod13901019"
  },
  {
    "score": 75,
    "palette": "Flower Beauty Shimmer and Shade Eyeshadow Palette Golden Natural",
    "description": "A great drugstore find to keep you looking elegant.",
    "price": 16.99,
    "link": "https://www.ulta.com/shimmer-shade-eyeshadow-palette?productId=xlsImpprod17631409"
  },
  {
    "score": 78,
    "palette": "ColourPop Brown Sugar Pressed Powder Shadow Palette",
    "description": "A palette that is as sweet as its name.",
    "price": 12,
    "link": "https://colourpop.com/products/brown-sugar"
  }
]

module.exports = palettes;
