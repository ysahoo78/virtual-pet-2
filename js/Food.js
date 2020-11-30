class Food{
    constructor(){

        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png")
    }

    getFoodStock(){
        database.ref('food').on("value", (data)=>{
            this.foodStock = data.val();
            
        })
    }
    updateFoodStock(stock){
        database.ref('/').update({
            food:stock
        })
    }
    deductFood(){
        this.foodStock = this.foodStock - 1;
    }
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image, x, y, 50, 50)

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y=y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;

            }
        }
    
    }
}






