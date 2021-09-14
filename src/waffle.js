function Waffle(x, y, width, height, boxes_across, boxes_down, table, column_heading, possible_values, pics, ins) {
    //Private
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    var boxes_down = boxes_down;
    var boxes_across = boxes_across;
    var column = table.getColumn(column_heading);
    var possible_values = possible_values;
    var pics = pics;

    var colours = ['red', 'blue', 'orange', 'pink', 'purple', 'yellow', 'grey'];
    var categories = [];
    var boxes = [];

    //Find category 
    function categoryLocation(categoryNames) {
        for (var i = 0; i < categories.length; i++) {
            if (categoryNames == categories[i].name) {
                return i;
            }
        }
                 return -1;
    }
    //Add categories to the object literal
    function addCategories() {
        for (var i = 0; i < possible_values.length; i++) {
            categories.push({
                "name": possible_values[i],
                "count": 0,
                "color": colours[i % colours.length],
                "pic": pics[i % pics.length],
                //Using ES5 getter to be able to use the object's own keys to compute other props
                get percentage() {
                    return ins.round((this.count / column.length) * (boxes_down * boxes_across));
                },
            });
        }
        for (var i = 0; i < column.length; i++) {
            var catLocation = categoryLocation(column[i]);
            if (catLocation != -1) {
                categories[catLocation].count++;
            }
        }
        //iterate over the cat and add proportions
        for (var i = 0; i < categories.length; i++) {
            categories[i].boxes = ins.round((categories[i].count / column.length) * (boxes_down * boxes_across));
        }
    }

    //Add Boxes
    function addBoxes() {
        var currentCategory = 0;
        var currentCategoryBox = 0;

        var boxWidth = width / boxes_across;
        var boxHeight = height / boxes_down;
    
        for (var i = 0; i < boxes_down; i++){
            boxes.push([]);
            for (var j = 0; j < boxes_across; j++){
                if (currentCategoryBox == categories[currentCategory].boxes) {
                    currentCategory++;
                    currentCategoryBox = 0;
                }
                boxes[i].push(new Box(
                    x + (j * boxWidth),
                    y + (i * boxHeight),
                    boxWidth, boxHeight,
                    categories[currentCategory],
                    ins));
                currentCategoryBox++;
            }
        }
    }

    //add categories
    addCategories();
    addBoxes();

    //Draw the waffle
    this.draw = function () {
        //console.log('boxes', boxes.length);
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) {
                if (boxes[i][j].category != undefined) {
                   boxes[i][j].draw(); 
                }
            }
       }
    };

    //Check mouse over
    this.checkMouse = function(mouseX, mouseY){
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) {
                if (boxes[i][j].category != undefined) {
                    var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                }

                if (mouseOver != false) {
                    ins.push();
                    ins.fill(0,0,0);
                    ins.textSize(20);
                    var tWidth = ins.textWidth(mouseOver);
                    ins.textAlign(ins.LEFT, ins.TOP);
                    ins.rect(mouseX, mouseY, tWidth + 20, 40);
                    ins.fill(255);
                    ins.text(mouseOver, mouseX + 10, mouseY + 10);
                    ins.pop();
                    break;
                }
            }
       }
    }
    
}