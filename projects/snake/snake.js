const vm = new Vue({
    el: "#snake",
    data: {
        title: "Snake Game",
        canvas: null,
        width: null,
        height: null,
        cell_width: 15,
        direction: "right",
        food: null,
        score: null,
        speed: 130,
        color: "blue",
        snake_array: null,
        reset: false
    },

    methods: {
        create_snake: function () {
            var length = 5;
            this.snake_array = [];
            for (var i=length-1; i >= 0; i--) {
                this.snake_array.push({x:i, y:0});                
            }
        },
        create_food: function () {
            this.food = {
                x: Math.round(Math.random()*(this.width-this.cell_width)/this.cell_width),
                y: Math.round(Math.random()*(this.height-this.cell_width)/this.cell_width),
            }
        },
        paint: function () {
            this.canvas.fillStyle = "black";
            this.canvas.fillRect(0, 0, this.width, this.height);
            this.canvas.strokeStyle = "white";
            this.canvas.strokeRect(0, 0, this.width, this.height);
        
            var nx = this.snake_array[0].x;
            var ny = this.snake_array[0].y;
            
            if(this.direction == "right") nx++;
            else if(this.direction == "left") nx--;
            else if(this.direction == "up") ny--;
            else if(this.direction == "down") ny++;
            
            //Collide code
            if(nx == -1 || nx == this.width/this.cell_width || ny == -1 || ny == this.height/this.cell_width || this.check_collision(nx, ny, this.snake_array)) {			
                $('#final_score').html(this.score);
                //Show Overlay
                $('#overlay').fadeIn(300);
                return;
            }
            
            if(nx == this.food.x && ny == this.food.y){
                var tail = {x: nx, y: ny};
                this.score++;
                //Create Food
                this.create_food();
            } else {
                var tail = this.snake_array.pop();
                tail.x = nx; tail.y = ny;
            }
            
            this.snake_array.unshift(tail);
            
            for(var i = 0;i < this.snake_array.length;i++){
                var c = this.snake_array[i];
                this.paint_cell(c.x,c.y);
            }
            
            //Paint Cell
            this.paint_cell(this.food.x,this.food.y);
            
            //Check Score
            this.checkscore(this.score);
            
            //Display Current Score
            $('#score').html('Your Score: '+this.score);
        },

        paint_cell: function (x,y){
            this.canvas.fillStyle=this.color;
            this.canvas.fillRect(x*this.cell_width,y*this.cell_width,this.cell_width,this.cell_width);
            this.canvas.strokeStyle="white";
            this.canvas.strokeRect(x*this.cell_width,y*this.cell_width,this.cell_width,this.cell_width);
        },
        
        check_collision: function (x, y, array){
            for(var i = 0;i < array.length;i++){
                if(array[i.x == x && array[i].y ==y])
                    return true;
            }
            return false;
        },
        
        checkscore: function (score){
            if(localStorage.getItem('highscore') === null){
                //If there is no high score
                localStorage.setItem('highscore',score);
            } else {
                //If there is a high score
                if(score > localStorage.getItem('highscore')){
                    localStorage.setItem('highscore',score);
                }
            }
            
            $('#high_score').html('High Score: '+localStorage.highscore);
        },

        control: function(e){
            var key = e.which;
            $('#food').html('code: '+key);
            if(key == "37" && this.direction !="right") this.direction  = "left";
            else if(key == "38" && this.direction != "down") this.direction = "up";
            else if(key == "39" && this.direction != "left") this.direction = "right";
            else if(key == "40" && this.direction != "up") this.direction = "down";
        },
        
        resetScore: function (){
            localStorage.highscore = 0;
            //Display High Score
            highscorediv = document.getElementById('high_score');
            highscorediv.innerHTML ='High Score: 0';
        },
        
        startGame: function() {
            $('#overlay').fadeOut(300);

            this.create_snake();
            this.create_food();
            this.score = 0;
            if (typeof game_loop != "undefined") clearInterval(game_loop);
            game_loop = setInterval(this.paint, this.speed);
        }
    },
    
    mounted() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        this.canvas = ctx;
        this.width = $("#myCanvas").width();
        this.height = $("#myCanvas").height();
        
        this.startGame();

        let self = this;
        window.addEventListener('keyup', function(ev) {
            
            self.control(ev); // declared in your component methods
        });

        
    },
})