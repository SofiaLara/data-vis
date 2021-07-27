function Box(x, y, width, height, category, ins) {
    //Private
    var x = x;
    var y = y;
    var width;
    var height;
    //var ins = ins;

    //Public
    this.category = category;

    //this.pic = ins.loadImage('img/person.png');

    //Mouse Over
    this.mouseOver = function(mouseX, mouseY) {
        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
            return this.category.name;
        }
        return false;
    };

    this.draw = function () {
        ins.fill(category.color);
        ins.rect(x, y, width, height);
        //ins.image(this.pic, x, y, width, height); Different for each cat.
    };
    
}