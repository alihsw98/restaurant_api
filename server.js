import express from "express";
const PORT = 8000

const app = express()

const menuItems = [
    {
        id: 1,
        category: "Appetizer",
        name: "Bruschetta",
        price: 5.99,
        image: "https://www.simplyorganic.com/media/wysiwyg/tmp/simply-oragnic-Roasted-Tomato-Bruschetta-1080x1080-thumbnail.jpg"
    },
    {
        id: 2,
        category: "Appetizer",
        name: "Stuffed Mushrooms",
        price: 6.99,
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/12/stuffed-mushrooms-1-580x839.jpg"
    },
    {
        id: 3,
        category: "Appetizer",
        name: "Garlic Bread",
        price: 4.99,
        image: "https://www.southernliving.com/thmb/1meQQA0C7ijC7cL6X29Vb5y0nzo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Southern-Living-Garlic_Bread_010-1-064c383295b042e4b11d2dd48ed2448e.jpg"
    },
    {
        id: 4,
        category: "Soup",
        name: "Tomato Basil Soup",
        price: 5.49,
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-6-1024x1536.jpg"
    },
    {
        id: 5,
        category: "Soup",
        name: "Chicken Noodle Soup",
        price: 5.99,
        image: "https://hips.hearstapps.com/hmg-prod/images/chicken-noodle-soup-lead-644c2bec7f4e6.jpg"
    },
    {
        id: 6,
        category: "Salad",
        name: "Caesar Salad",
        price: 7.99,
        image: "https://kate-cooks.com/wp-content/uploads/2022/02/tomato-fried-onion-caesar-salad-1-1920x2880.jpg"
    },
    {
        id: 7,
        category: "Salad",
        name: "Greek Salad",
        price: 8.49,
        image: "https://hips.hearstapps.com/hmg-prod/images/greek-salad-lead-642f29241cceb.jpg"
    },
    {
        id: 8,
        category: "MainCourse",
        name: "Grilled Salmon",
        price: 14.99,
        image: "https://www.thecookierookie.com/wp-content/uploads/2023/05/grilled-salmon-recipe-2.jpg"
    },
    {
        id: 9,
        category: "MainCourse",
        name: "Ribeye Steak",
        price: 19.99,
        image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/rib-eye_steak_with_61963_16x9.jpg"
    },
    {
        id: 10,
        category: "MainCourse",
        name: "Pasta Alfredo",
        price: 12.99,
        image: "https://www.mygorgeousrecipes.com/wp-content/uploads/2017/03/Chicken-Alfredo-Pasta-with-Sun-Dried-Tomatoes-and-Spinach-10-2.jpg"
    },
    {
        id: 11,
        category: "MainCourse",
        name: "Chicken Parmesan",
        price: 13.49,
        image: "https://assets.bonappetit.com/photos/5ea8f0df16738800085ad5d2/1:1/w_1920,c_limit/Chicken-Parmesean-Recipe-Lede.jpg"
    },
    {
        id: 12,
        category: "MainCourse",
        name: "Lamb Chops",
        price: 21.99,
        image: "https://soufflebombay.com/wp-content/uploads/2024/04/Lamb-Loin-Chops-Recipe-Souffle-Bombay.jpg"
    },
    {
        id: 13,
        category: "SideDish",
        name: "Mashed Potatoes",
        price: 4.99,
        image: "https://www.allrecipes.com/thmb/QH_JKQhpxGnX247VU58OVkOW0g8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/18290-garlic-mashed-potatoes-ddmfs-beauty2-4x3-0327-2-47384a10cded40ae90e574bc7fdb9433.jpg"
    },
    {
        id: 14,
        category: "SideDish",
        name: "Steamed Vegetables",
        price: 4.49,
        image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-6-1024x1536.jpg"
    },
    {
        id: 15,
        category: "SideDish",
        name: "French Fries",
        price: 3.99,
        image: "https://thissillygirlskitchen.com/wp-content/uploads/2020/02/homemade-french-fries-5.jpg"
    },
    {
        id: 16,
        category: "Dessert",
        name: "Cheesecake",
        price: 6.99,
        image: "https://www.elmundoeats.com/wp-content/uploads/2024/06/A-slice-of-no-bake-strawberry-cheesecake-1.jpg"
    },
    {
        id: 17,
        category: "Dessert",
        name: "Chocolate Lava Cake",
        price: 7.49,
        image: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes8-640x928.webp"
    },
    {
        id: 18,
        category: "Dessert",
        name: "Ice Cream Sundae",
        price: 5.99,
        image: "https://www.carnation.co.uk/sites/default/files/2020-03/Raspberry_Crush_Sundae%20tablet.jpg"
    },
    {
        id: 19,
        category: "Beverage",
        name: "Iced Tea",
        price: 2.99,
        image: "https://feelgoodfoodie.net/wp-content/uploads/2018/05/Raspberry-Iced-Tea-09.jpg"
    },
    {
        id: 20,
        category: "Beverage",
        name: "Lemonade",
        price: 3.49,
        image: "https://www.eatingwell.com/thmb/MbeCD1w6Ui3Wrv3-BKBAGy9TAsw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/raspberry-lemonade-20ea9d581e294c088fdcdfce22f562bb.jpg"
    }
];


app.get('/menu', (request, response) => {
    const { category, name } = request.query
    let filteredMenu = menuItems

    if (category) {
        filteredMenu = filteredMenu.filter(item => item.category.toLocaleLowerCase() == category.toLowerCase())
    }
    if (name) {
        filteredMenu = filteredMenu.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
    }

    response.status(200).send(filteredMenu)
})



app.listen(PORT, '0.0.0.0', () => {
    console.log(`server running on port ${PORT}`)
})