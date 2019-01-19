Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    template: `
    <div class="product">
        <div class="product-image">
            <a v-bind:href="link"> 
                <img v-bind:src="image">
            </a>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="onSale">On Sale!</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <=10&& inventory>0">Almost soldOut</p>
            <p v-else>Out of Stock</p>
            <p>User is premium:{{ premium }}</p>
            <p> Shipping: {{shipping}}</p>
            <product-details :details="details"></product-details>
            <div v-for="(variant,index) in variants" :key="variant.variantId" class="color-box"
                 :style="{backgroundColor: variant.variantColor}"
                 @mouseover="updateProduct(index)">
            </div>
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{disabledButton:!inStock}"
            >Add to Cart
            </button>
            <button v-on:click="removeItem"
                    :disabled="!inStock"
                    :class="{disabledButton:!inStock}"
            >Remove this Item
            </button>
             
         </div>
    </div>`,
    data() {
        return {
            brand: "Vue mastery",
            product: "socks",
            selectedVariant: 0,
            expression: "wwww",
            link: "http://www.google.com",
            onSale: true,
            details: ["www", "big", "cool"],
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
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        removeItem: function () {
            this.$emit("remove-item", this.variants[this.selectedVariant].variantId)
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
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "free"
            }
            return 2.99
        }
    }　

})
Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
<ul>
    <li v-for="detail in details">{{ detail }}</li>
</ul>`
});


var app = new Vue({
    el: "#app",
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeItem(id){
            this.cart.pop()
        }

    }
});

