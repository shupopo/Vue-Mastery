var eventBus = new Vue();

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
                    :class="{disabledButton:!inStock}">
            Remove this Item
            </button>
         </div>
         
         <product-tabs :reviews="reviews"></product-tabs>
         
        
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
            ],
            reviews: []
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
    })
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

Vue.component("product-review", {

    template: `
<form class="review-form" @submit.prevent="onSubmit ">
<p v-if="errors.length">
    <b>Please correct the following error(s)</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>
</ul>
</p>
<p>
<labal for="name">Name: </labal>
<input v-model="name">
</p> 
<p>
<labal for="review">Review:</labal>
<textarea id="review" v-model="review"></textarea>
</p>
<p>
<label for="rating">Rating:</label>
<select id="rating" v-model.number="rating ">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
</select>
</p>
<p>
<input type="submit" value="Submit">
</p>
</form>  
`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <span class="tab" :class="{activeTab: selectedTab === tab}" 
        v-for="(tab,index) in tabs" 
        :key="index" 
        @click="selectedTab = tab">
        {{ tab }}
    </span>
     <div>
            <h2>Reviews</h2>
            <p v-if="reviews.length==0">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>{{ review.review }}</p>
                <p>{{ review.rating }}</p>
                </li>           
            </ul>
         </div>
         <product-review v-show="selectedTab==='Make a Review'" ></product-review>
    </div>
    `,
    data() {
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
})

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
        removeItem(id) {
            this.cart.pop()
        }

    }
});

