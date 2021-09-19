function Box(x, y, width, height, category, ins) {
    //Private
    var x = x;
    var y = y;
    var width;
    var height;

    //Public
    this.category = category;

    //Mouse Over each picture to show data
    this.mouseOver = function(mouseX, mouseY) {
        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
            ins.stroke(this.category.color);
            ins.noFill();
            ins.rect(x, y, width, height);
            var textOver = this.category.name + ' ' + this.category.percentage + '%';
            return textOver;
        }
        return false;
    };

    //Creates a pictogram using icons
    this.draw = function () {
        ins.image(this.category.pic, x, y, width, height);
    };
    
}