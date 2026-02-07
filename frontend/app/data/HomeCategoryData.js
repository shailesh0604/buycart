const HomeCategoryData = [

    {
        id: 1,
        link: "/category/mobiles",
        title: "Mobiles & Tablets",
        image: "/assets/images/category/mobile.webp",
        alt: "Mobile Category",
    }, {
        id: 2,
        link: "/category/electronic",
        title: "Electronic",
        image: "/assets/images/category/electronic.webp",
        alt: "Electronic Category",
        subcategorys: [{
            id: 22,
            title: "Laptop",
            link: "/category/electronic/laptop",
            children: [{
                id: 221,
                title: "Laptops 1",
                link: "/category/electronic/computers/laptops",
            },
            {
                id: 222,
                title: "laptops 2",
                link: "/category/electronic/computers/laptops",
            }, {
                id: 223,
                title: "laptops 3",
                link: "/category/electronic/computers/laptops",
            },
            ]
        }, {
            id: 12,
            title: "desktop",
            link: "/category/electronic/desktop",
            children: [{
                id: 121,
                title: "Desktop 1",
                link: "/category/electronic/computers/desktops",
            },
            {
                id: 122,
                title: "Desktop 2",
                link: "/category/electronic/computers/desktops",
            }, {
                id: 123,
                title: "Desktop 3",
                link: "/category/electronic/computers/desktops",
            },
            ]
        },
        ]
    },

    {
        id: 3,
        link: "/category/tvs-appliances",
        title: "TVs & Appliances",
        image: "/assets/images/category/tv-applicance.webp",
        alt: "TVs & Appliances Category",
    },
    {
        id: 4,
        link: "/category/fashion",
        title: "Fashion",
        image: "/assets/images/category/fashion.webp",
        alt: "Fashion Category",
    },
    {
        id: 5,
        link: "/category/furniture",
        title: "Furniture",
        image: "/assets/images/category/furniture.webp",
        alt: "Furniture Category",
    },
    {
        id: 6,
        link: "/category/beauty-toys",
        title: "Beauty & Toys",
        image: "/assets/images/category/toys.webp",
        alt: "Beauty & Toys Category",
    },
    {
        id: 7,
        link: "/category/groceries",
        title: "Groceries",
        image: "/assets/images/category/grocery.webp",
        alt: "Groceries Category",
    },
    // {
    //     id: 8,
    //     link: "/category/furniture",
    //     title: "Furniture",
    //     image: "/assets/images/category/furniture.webp",
    //     alt: "Furniture Category",
    // },
    // {
    //     id: 9,
    //     link: "/category/beauty-toys",
    //     title: "Beauty & Toys",
    //     image: "/assets/images/category/toys.webp",
    //     alt: "Beauty & Toys Category",
    // },
    // {
    //     id: 10,
    //     link: "/category/groceries",
    //     title: "Groceries",
    //     image: "/assets/images/category/grocery.webp",
    //     alt: "Groceries Category",
    // },

];

export default HomeCategoryData;