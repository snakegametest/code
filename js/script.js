const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const audio = new Audio ('../assets/audio.mp3')
const size = 30
const snake = [{x: 270, y: 240}]


const randomnumber = (min, max) => {
    return Math.round (Math.random () * (max -min) +min)
}

const randonposition = () => {
    const number = randomnumber (0,canvas.width - size)
    return Math.round (number /30) *30 
}

const randomcolor = () => {
    const red = randomnumber(0, 255)
    const green = randomnumber(0, 255)
    const blue = randomnumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
x: randonposition (),
y: randonposition (),
color: randomcolor()
}

let direction, loopId

const drawfood = () => {
    const{ x, y, color} = food
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.fillStyle = color
    ctx.fillRect(x, y, size,size) 
    ctx.shadowBlur = 0
}

const drawsnake = ( ) => { 
ctx.fillStyle = "#ddd"

snake.forEach((position, index) => {

    if(index == snake.length - 1) {
        ctx.fillStyle = "white"
    }

    ctx.fillRect(position.x, position.y, size, size)
})

}  

const movesnake = ( ) => { 
    if(!direction) return

    const head = snake[snake.length -1]
    
    if (direction == "right") { 

        snake.push({ x:head.x + size, y:head.y })
    } 

    if (direction == "left") { 

        snake.push({ x:head.x - size, y:head.y })
    }
    
    if (direction == "down") { 

        snake.push({ x:head.x, y:head.y + size })
    }

    if (direction == "up") { 

        snake.push({ x:head.x, y:head.y - size })
    }


    snake.shift()

}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#192020"
    
    for (let i = 30; i <canvas.width; i += 30) {
        ctx.beginPath ()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)        
        ctx.stroke ()
        
        ctx.beginPath ()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)        
        ctx.stroke ()
    
    }

}

const checkeat = () => {
    const head = snake[snake.length -1]
    
    if (head.x == food.x && head.y == food.y) {
        snake.push (head)
        audio.play()
        let x = randonposition()
        let y = randonposition()

        while (snake.find ((position) => position.x == x && position.y == y)) {
            x = randonposition()
            y = randonposition()
        }
        
        food.x = x
        food.y = y 
        food.color = randomcolor()
    }

}

const gameloop = () => { 
    
    clearInterval (loopId)
    ctx.clearRect (0, 0, 600, 600)
    drawGrid ()
    drawfood ()
    movesnake()
    drawsnake()
    checkeat()

    loopId = setTimeout(() => {
        
        gameloop ()

    }, 200)

    
}
gameloop ()

document.addEventListener("keydown", ({key}) => { 
 
    if (key == "ArrowRight" && direction != "left") { 
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") { 
        direction = "left"
    } 

    if (key == "ArrowDown" && direction != "up") { 
        direction = "down"
    } 
    
    if (key == "ArrowUp" && direction != "down" ) { 
        direction = "up"
    } 

    
}) 