const HomeCategoryData = [
  {
    id: 1,
    link: "/category/mobiles",
    title: "Mobiles & Tablets",
    image: "/assets/images/category/mobile.webp",
    alt: "Mobile Category",
    subcategorys: [
      {
        id: 101,
        title: "Mobiles",
        link: "/category/mobiles",
        children: [
          { id: 1011, title: "All Mobiles", link: "/category/mobiles" },
          {
            id: 1012,
            title: "Smartphones",
            link: "/category/mobiles/smartphones",
          },
          {
            id: 1013,
            title: "Feature Phones",
            link: "/category/mobiles/feature",
          },
          { id: 1014, title: "5G Phones", link: "/category/mobiles/5g" },
        ],
      },
      {
        id: 102,
        title: "Tablets",
        link: "/category/tablets",
        children: [
          { id: 1021, title: "All Tablets", link: "/category/tablets" },
          {
            id: 1022,
            title: "Android Tablets",
            link: "/category/tablets/android",
          },
          { id: 1023, title: "iPads", link: "/category/tablets/ipad" },
        ],
      },
    ],
  },

  {
    id: 2,
    link: "/category/electronic",
    title: "Electronics",
    image: "/assets/images/category/electronic.webp",
    alt: "Electronic Category",
    subcategorys: [
      {
        id: 201,
        title: "Audio",
        link: "/category/electronic/audio",
        children: [
          {
            id: 2011,
            title: "Bluetooth Headphones",
            link: "/category/electronic/audio",
          },
          {
            id: 2012,
            title: "Wired Headphones",
            link: "/category/electronic/audio",
          },
          {
            id: 2013,
            title: "True Wireless Earbuds",
            link: "/category/electronic/audio",
          },
          { id: 2014, title: "Speakers", link: "/category/electronic/audio" },
          { id: 2015, title: "Soundbars", link: "/category/electronic/audio" },
        ],
      },
      {
        id: 202,
        title: "Computers",
        link: "/category/electronic/computers",
        children: [
          { id: 2021, title: "Laptops", link: "/category/electronic/laptops" },
          {
            id: 2022,
            title: "Desktops",
            link: "/category/electronic/desktops",
          },
          {
            id: 2023,
            title: "Monitors",
            link: "/category/electronic/monitors",
          },
          {
            id: 2024,
            title: "Keyboards & Mouse",
            link: "/category/electronic/accessories",
          },
        ],
      },
      {
        id: 203,
        title: "Cameras",
        link: "/category/electronic/cameras",
        children: [
          {
            id: 2031,
            title: "DSLR",
            link: "/category/electronic/cameras/dslr",
          },
          {
            id: 2032,
            title: "Mirrorless",
            link: "/category/electronic/cameras/mirrorless",
          },
          {
            id: 2033,
            title: "Action Cameras",
            link: "/category/electronic/cameras/action",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    link: "/category/tvs-appliances",
    title: "TVs & Appliances",
    image: "/assets/images/category/tv-applicance.webp",
    alt: "TVs & Appliances Category",
    subcategorys: [
      {
        id: 301,
        title: "Televisions",
        link: "/category/tvs",
        children: [
          { id: 3011, title: "Smart TVs", link: "/category/tvs/smart" },
          { id: 3012, title: "LED TVs", link: "/category/tvs/led" },
          { id: 3013, title: "OLED TVs", link: "/category/tvs/oled" },
        ],
      },
      {
        id: 302,
        title: "Home Appliances",
        link: "/category/appliances",
        children: [
          {
            id: 3021,
            title: "Refrigerators",
            link: "/category/appliances/refrigerator",
          },
          {
            id: 3022,
            title: "Washing Machines",
            link: "/category/appliances/washing-machine",
          },
          {
            id: 3023,
            title: "Microwaves",
            link: "/category/appliances/microwave",
          },
          {
            id: 3024,
            title: "Air Conditioners",
            link: "/category/appliances/ac",
          },
        ],
      },
    ],
  },

  {
    id: 4,
    link: "/category/fashion",
    title: "Fashion",
    image: "/assets/images/category/fashion.webp",
    alt: "Fashion Category",
    subcategorys: [
      {
        id: 401,
        title: "Men",
        link: "/category/fashion/men",
        children: [
          {
            id: 4011,
            title: "Top Wear",
            link: "/category/fashion/men/topwear",
          },
          {
            id: 4012,
            title: "Bottom Wear",
            link: "/category/fashion/men/bottomwear",
          },
          {
            id: 4013,
            title: "Footwear",
            link: "/category/fashion/men/footwear",
          },
        ],
      },
      {
        id: 402,
        title: "Women",
        link: "/category/fashion/women",
        children: [
          {
            id: 4021,
            title: "Dresses",
            link: "/category/fashion/women/dresses",
          },
          {
            id: 4022,
            title: "Ethnic Wear",
            link: "/category/fashion/women/ethnic",
          },
          { id: 4023, title: "Handbags", link: "/category/fashion/women/bags" },
        ],
      },
    ],
  },

  {
    id: 5,
    link: "/category/furniture",
    title: "Furniture",
    image: "/assets/images/category/furniture.webp",
    alt: "Furniture Category",
    subcategorys: [
      {
        id: 501,
        title: "Living Room",
        link: "/category/furniture/living",
        children: [
          { id: 5011, title: "Sofas", link: "/category/furniture/sofas" },
          {
            id: 5012,
            title: "Coffee Tables",
            link: "/category/furniture/tables",
          },
          { id: 5013, title: "TV Units", link: "/category/furniture/tv-units" },
        ],
      },
      {
        id: 502,
        title: "Bedroom",
        link: "/category/furniture/bedroom",
        children: [
          { id: 5021, title: "Beds", link: "/category/furniture/beds" },
          {
            id: 5022,
            title: "Wardrobes",
            link: "/category/furniture/wardrobes",
          },
          {
            id: 5023,
            title: "Side Tables",
            link: "/category/furniture/side-tables",
          },
        ],
      },
    ],
  },

  {
    id: 6,
    link: "/category/beauty-toys",
    title: "Beauty & Toys",
    image: "/assets/images/category/toys.webp",
    alt: "Beauty & Toys Category",
    subcategorys: [
      {
        id: 601,
        title: "Beauty",
        link: "/category/beauty",
        children: [
          { id: 6011, title: "Makeup", link: "/category/beauty/makeup" },
          { id: 6012, title: "Skincare", link: "/category/beauty/skincare" },
          { id: 6013, title: "Haircare", link: "/category/beauty/haircare" },
        ],
      },
      {
        id: 602,
        title: "Toys",
        link: "/category/toys",
        children: [
          { id: 6021, title: "Action Figures", link: "/category/toys/action" },
          {
            id: 6022,
            title: "Educational Toys",
            link: "/category/toys/educational",
          },
          { id: 6023, title: "Remote Control Toys", link: "/category/toys/rc" },
        ],
      },
    ],
  },

  {
    id: 7,
    link: "/category/groceries",
    title: "Groceries",
    image: "/assets/images/category/grocery.webp",
    alt: "Groceries Category",
    subcategorys: [
      {
        id: 701,
        title: "Daily Essentials",
        link: "/category/groceries/essentials",
        children: [
          { id: 7011, title: "Rice & Atta", link: "/category/groceries/rice" },
          { id: 7012, title: "Pulses", link: "/category/groceries/pulses" },
          { id: 7013, title: "Cooking Oil", link: "/category/groceries/oil" },
        ],
      },
      {
        id: 702,
        title: "Beverages",
        link: "/category/groceries/beverages",
        children: [
          { id: 7021, title: "Tea", link: "/category/groceries/tea" },
          { id: 7022, title: "Coffee", link: "/category/groceries/coffee" },
          {
            id: 7023,
            title: "Soft Drinks",
            link: "/category/groceries/soft-drinks",
          },
        ],
      },
    ],
  },
];

export default HomeCategoryData;
