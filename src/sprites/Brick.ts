import { Vector } from "../types";

export class Brick{//клас камень
    private brickImage: HTMLImageElement = new Image();

    constructor(
        private brickWidth: number,
        private brickHeight: number,
        private position: Vector,
        private brickEnergy: number,
        image: string
    ){
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.brickEnergy = brickEnergy;
        this.brickImage.src = image;
    }//конструктор для ініцілазії камнів

    get width(): number{
        return this.brickWidth;
    }//геттер для ширини

    get height(): number{
        return this.brickHeight;
    }//гетер для висоти

    get pos(): Vector{
        return this.position;
    }//гетер для позиції

    get image(): HTMLImageElement{
        return this.brickImage;
    }//гетер для картинки

    get energy(): number{
        return this.brickEnergy;
    }//гетер для енергії

    set energy(energy: number){
        this.brickEnergy = energy;
    }//сеттр для енергії
}