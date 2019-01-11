var app = new Vue({
    el: "#app",
    data: {
        product: "socks",
        expression: "wwww",
        image:"./socks.jpeg",
        link:"http://www.google.com",
        inStock :false,
        inventory : 9,
        onSale:true,
        details:["www","big","cool"],
        cart:0,
        variants:[
            {
                variantId:2234,
                variantColor:"green",
                variantImage:"./socks.jpeg"
            },{
                variantId:2235,
                variantColor:"blue",
                variantImage:"./bluesocks.jpeg"
            }
        ]
    },
    methods:{
        addToCart:function(){
            this.cart += 1
        },
        updateProduct:function(variantImage){
            this.image=variantImage
        }
    }

});

