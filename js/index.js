(() => {

    const gravity = 0.1245;
    const frction = 0.8945;

    class Bubble {
        constructor(x, y, radius, color, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.dx = dx;
            this.dy = dy;
        }

        draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = this.color;
            ctx.stroke();
            const grd = ctx.createRadialGradient(this.x + ((this.radius * 40) / 100), (this.y - ((this.radius * 40) / 100)), (this.radius * 30) / 100, this.x, this.y, this.radius);
            grd.addColorStop(0, "#FFF");
            grd.addColorStop(1, this.color);
            ctx.fillStyle = grd;
            ctx.fill()
        }

        update = () => {


            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx
            }

            if (this.y + this.radius > canvas.height) {
                this.dy = -this.dy * frction
            } else {
                this.dy += gravity;
            }

            this.y += this.dy;
            this.x += this.dx;
            this.draw()
        }
    }

    const canvas = document.getElementById('canvasId');
    resizeCanvas()

    const ctx = canvas.getContext('2d');


    // Variables
    let toalBubbleCount = 1
    bubbleArray = []
    let colorArray = ['#FF6263', '#E21717', '#E6425E', '#1B98F5', '#B9345A', '#23C4ED', '#207398', '#3944F7', '#120E43', '#1FAA59', '#E8BD0D', '#A77B06', '#8D3DAF', '#FF6666', '#6A1B4D', '#6A1B4D']

    pushBubble()

    function pushBubble() {
        let radius = 45
        let x = radius + 20;
        let y = radius + 20;
        let dx = Math.random() * 2;
        let dy = randomIntFromInterval(1, 4);
        let color = getRandomItemFromArray(colorArray)
        bubbleArray.push(
            new Bubble(x, y, radius, color, dx, dy)
        )

        console.log(bubbleArray)
    }

    window.addEventListener('resize', () => {
        resizeCanvas()
    })


    function resizeCanvas() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }


    function getRandomItemFromArray(items) {
        return items[Math.floor(Math.random() * items.length)]
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    function animateBubble() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        bubbleArray.forEach(bubble => {
            bubble.update()
        });
        requestAnimationFrame(animateBubble)
    }

    const addButton = document.getElementById('addBubble');
    addButton?.addEventListener('click', () => {
        pushBubble()
    })

    animateBubble();

})();