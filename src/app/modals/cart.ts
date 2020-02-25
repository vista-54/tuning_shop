export class CartClass {

    private cart;

    constructor() {
        this.getItems();
    }

    public addToCard(item: object) {
        let x = this.cart.findIndex(el => el['id'] === item['id']);
        if (x !== -1) {
            this.cart[x]['selectCount']++;
        } else {
            item['selectCount'] = 1;
            this.cart.push(item);
        }
        this.saveCart();
    }

    public rmWithCart(item: object) {
        let x = this.cart.findIndex(el => el['id'] === item['id']);
        if (x !== -1) {
            this.cart[x]['selectCount']--;
            if (!this.cart[x]['selectCount']) {
                this.cart.splice(x, 1);
            }
        }
        this.saveCart();
    }

    async getItems() {
        // return new Promise<any>(resolve => {
        this.cart = JSON.parse(localStorage['cart']);
        // resolve(this.cart);
        // });
    }

    getCountThisItem(item) {
        console.log(this.cart);
        let x = this.cart.findIndex(el => el['id'] === item['id']);
        if (x !== - 1) {
            return this.cart[x]['selectCount'];
        } else {
            return 0;
        }
    }

    async changeCount(item, count) {
        if (count >= 0) {
            let x = this.cart.findIndex(el => el['id'] === item['id']);
            if (x !== - 1) {
                this.cart[x]['selectCount'] = count;
            }
            this.saveCart();
        }
    }

    async saveCart() {
        localStorage['cart'] = JSON.stringify(this.cart);
    }

    rmFoolCart(item) {
        let x = this.cart.findIndex(el => el['id'] === item['id']);
        if (x !== -1) {
            this.cart.splice(x, 1);
        }
        this.saveCart();
    }

    public clear() {
        this.cart = [];
        this.saveCart();
    }
}