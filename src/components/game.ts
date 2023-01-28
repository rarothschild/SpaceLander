export interface Frame {
    platform: Platform;
    lander: Lander;
    gameOver: boolean;
    gameStarted: boolean;
    width: number;
    height: number;
    velocity: number;
    score: number;
    ground: Ground;
    }
  
export interface Lander {
    top: number;
    left: number;
    width: number;
    height: number;
    }
  
export interface Ground {
    height: number;
    }
  
export interface Platform {
    top: number;
    left: number;
    height: number;
    width: number;
    show: boolean;
    }
  
export class GameController {
    private frame: Frame;
  
    constructor(
        // Game window params
        public readonly height = 800,
        public readonly width = 1600,
        // Planet props
        public readonly groundHeight = 20,
        public readonly gravity = 0.2,
        public readonly drag = 0.1,
        // Lander props
        public readonly landerHeight = 20,
        public readonly landerWidth = 20,
        public position = {x:0,y:0},
        public velocity = {x:0,y:0},
        public engineOn = false,
        public rotateRight = false,
        public rotateLeft = false,
        public angle = 0,
        public readonly thrust = {x:1,y:0.75},
        public readonly crashVelocity = 1000,
        // Plateform props
        public readonly platformWidth = 50,
        public readonly platformHeight = 50,
        
    ) {}
  
    public start() {
        this.newGame();
        this.frame.gameStarted = true;
        return this.frame;
    }

    public newGame() {
        let platform = this.createPlatform(true);
            
        this.frame = {
            platform,
            score: 0,
            width: this.width,
            height: this.height,
            gameOver: false,
            gameStarted: false,
            lander: {
            left: this.width / 2 - this.landerWidth / 2,
            top: this.height - this.groundHeight - this.landerHeight,
            width: this.landerWidth,
            height: this.landerHeight
            },
            velocity: 0,
            ground: {
            height: this.groundHeight,
            },
        };

        this.position.x = this.frame.lander.left;
        this.position.y = this.frame.lander.top;

        return this.frame;
    }
  
    public nextFrame() {
        if (this.frame.gameOver || !this.frame.gameStarted) {
            return this.frame;
        }
    
        if (this.hasCrashed()) {
            this.frame.gameOver = true;
            return this.frame;
        }
        
        this.updateLanderPosition()

        return this.frame;
    }

    public updateLanderPosition() {
        // Kinematics
        
        if (this.velocity.x > 0) {
            this.velocity.x -= this.drag;
        } else if (this.velocity.x < 0) {
            this.velocity.x += this.drag;
        }
        this.position.x += this.velocity.x;
        if (!this.engineOn && this.position.y >= this.height - this.groundHeight - this.landerHeight) {
            this.velocity.y = 0;
        } else {
            this.position.y -= this.velocity.y;
            this.velocity.y -= this.gravity;
        }

        // Update position
        if (this.rotateRight) this.velocity.x += this.thrust.x;
        if (this.rotateLeft) this.velocity.x -= this.thrust.x;
        if (this.engineOn) this.velocity.y += this.thrust.y; 
        this.frame.lander.top = this.position.y
        this.frame.lander.left = this.position.x
        this.frame.velocity = (this.velocity.x^2 + this.velocity.y^2)^0.5 // RSS to get velocity vector
    }
  
    private isContactingGround() {
        return (this.frame.lander.top >= (this.height - this.groundHeight - this.landerHeight))
    }

    private isLanded() {
        return (this.velocity.y == 0 && this.isContactingGround())
    }

    private hasCrashed() {
        return (this.velocity.y > this.crashVelocity &&
                this.frame.lander.top == this.height - this.groundHeight) 
    }
  
    private randomXYForPlatform(): number {
      return(0)
    }
  
    private createPlatform(show: boolean): Platform {
        const top = this.randomXYForPlatform();
        const left = this.randomXYForPlatform();
    
        return {
            top,
            left,
            height: this.platformWidth,
            width: this.platformHeight,
            show,
        };
    }
}