var app = new Vue({
    el: "#app",
    data: {
        brand: "Vue mastery",
        product: "socks",
        selectedVariant: 0,
        expression: "wwww",
        link: "http://www.google.com",
        onSale: true,
        details: ["www", "big", "cool"],
        cart: 0,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./socks.jpeg",
                variantQuantity: 10
            }, {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./bluesocks.jpeg",
                variantQuantity: 0
            }
        ]
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        inventory(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }

});

