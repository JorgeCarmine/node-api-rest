class Product {
    
    constructor(id, name, price) {
        this.id = id;;
        this.name = name;
        this.price = price;
        this.createdDate = new Date('2017-1-1');
        this.deliveryDate = new Date();
        this.days = this.getDaysCount();
    }

    getDaysCount () {
        return new Date(this.deliveryDate - this.createdDate);
    }

}

module.exports = Product;