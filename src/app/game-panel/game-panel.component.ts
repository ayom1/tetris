import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {
  WIDTH = 10;
  HEIGHT = 20;
  square : Square[][];
  selectedShape: Shape;
  score = 0;
  constructor() { 
    this.square = [];
    for(let i=0;i<this.HEIGHT;i++){
      this.square[i]=[];
      for(let j=0;j<this.WIDTH;j++){
        this.square[i][j] = new Square(false);
      }  
    }
    this.selectedShape = new Shape(1);
    this.drawSquares();
    // x--i,y--j 
  }
  onKey(key: any) { // without type info
    console.log( (this.selectedShape.locationY)+'---'+(this.selectedShape.locationX));
    //move left
    if(key=='left'){
      // can move left?
      if(this.square[this.selectedShape.locationY][this.selectedShape.locationX-1].painted
        || this.square[this.selectedShape.locationY-1][this.selectedShape.locationX-1].painted){
          console.log('can not move left');
          return;
      }
      if(!this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].painted){
        this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill=false;
      }
      if(!this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].painted){
        this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill=false;
      }
      this.selectedShape.locationX--;
    }else if(key=='right'){
      // can move right?
      if(this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+2].painted
        || this.square[this.selectedShape.locationY][this.selectedShape.locationX+2].painted){
          console.log('can not move right');
          return;
      }
      if(!this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].painted){
        this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill=false;
      }
      if(!this.square[this.selectedShape.locationY][this.selectedShape.locationX].painted){
        this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill=false;
      }
      this.selectedShape.locationX++;
    }else if(key=='down'){
      if(this.selectedShape.locationY-2>=0){
        this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill=false;
      }
      if(this.selectedShape.locationY-1>=0){
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill=false;
      }
      this.selectedShape.locationY++;
    }
    this.drawSquares();
  }
 drawSquares(){
   //console.log(this.selectedShape.locationY+' ' +this.selectedShape.locationX);
  //hit bottom
  let newShape = false;
  // detect intersect
    if(this.selectedShape.locationY+1<this.HEIGHT){
      console.log(this.square[this.selectedShape.locationY+1][this.selectedShape.locationX].painted);
      if(this.square[this.selectedShape.locationY+1][this.selectedShape.locationX].painted==true
      || this.square[this.selectedShape.locationY+1][this.selectedShape.locationX+1].painted==true){
        this.drawSquareShape();
        console.log('y '+this.selectedShape.locationY);
        this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].painted=true;
        this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].painted=true;
        this.square[this.selectedShape.locationY][this.selectedShape.locationX].painted=true;
        this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].painted=true;
        return true;
      }
    }
   if(this.selectedShape.type==1){
      this.drawSquareShape();
   }else if(this.selectedShape.type==2){
    this.drawRightLShape();
   }else{
      
   }
   if(this.HEIGHT==this.selectedShape.locationY+1){
    console.log('hit bottom');
    for(let i=0;i<this.HEIGHT;i++){
      for(let j=0;j<this.WIDTH;j++){
        if(this.square[i][j].painted==false && this.square[i][j].fill==true){
          this.square[i][j].painted = this.square[i][j].fill;
          console.log('painter');
        }
      }
    }
    return true;
    // set squares to be painted ( if it is filled in the shape)
    }
  return false;
  }
  drawRightLShape() {

    if(this.selectedShape.locationY==0){
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }else if(this.selectedShape.locationY==1){
      
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }else if(this.selectedShape.locationY==2){

      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }else if(this.selectedShape.locationY==3){
      this.square[0][this.selectedShape.locationX].fill = false;
      this.square[0][this.selectedShape.locationX+1].fill = false;

      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }else if(this.selectedShape.locationY==4){
      this.square[0][this.selectedShape.locationX].fill = false;
      this.square[0][this.selectedShape.locationX+1].fill = false;
      this.square[1][this.selectedShape.locationX].fill = false;
      this.square[1][this.selectedShape.locationX+1].fill = false;

      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }else{
      this.square[this.selectedShape.locationY-3][this.selectedShape.locationX].fill = false;
      this.square[this.selectedShape.locationY-3][this.selectedShape.locationX+1].fill = false;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = false;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = false;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = false;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = false;
      
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[2][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[2][1].fill;
    }
  }
  drawSquareShape() {
    console.log(this.selectedShape.locationY);
    if(this.selectedShape.locationY==0){
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
    }else if(this.selectedShape.locationY==1){
      
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
    }else if(this.selectedShape.locationY==2){
      this.square[0][this.selectedShape.locationX].fill = false;
      this.square[0][this.selectedShape.locationX+1].fill = false;
      this.square[1][this.selectedShape.locationX].fill = false;
      this.square[1][this.selectedShape.locationX+1].fill = false;

      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
      this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
    }else{
      if(!this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].painted ){
        this.square[this.selectedShape.locationY-2][this.selectedShape.locationX].fill = false;
      }
      if(!this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].painted ){
      this.square[this.selectedShape.locationY-2][this.selectedShape.locationX+1].fill = false;
      }
      if(!this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].painted ){
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = false;
      }
      if(!this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].painted ){
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = false;
      }
      
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX].fill = this.selectedShape.squares[0][0].fill;
      this.square[this.selectedShape.locationY-1][this.selectedShape.locationX+1].fill = this.selectedShape.squares[0][1].fill;
      if(this.selectedShape.locationY<this.HEIGHT){
        this.square[this.selectedShape.locationY][this.selectedShape.locationX].fill = this.selectedShape.squares[1][0].fill;
        this.square[this.selectedShape.locationY][this.selectedShape.locationX+1].fill = this.selectedShape.squares[1][1].fill;
      }
    }
  }

  ngOnInit(): void {
    interval(500).subscribe(x => {
      // checkrows all filled?
      let newShape = false;
      if(this.selectedShape.locationY<19){
      this.selectedShape.locationY++;
      }
      newShape = this.drawSquares();
      if(newShape){
        let checked = this.checkRows(false);
        if(checked){
        setTimeout(() => {
          this.checkRows(true);
        }, 200);
        }
        this.selectedShape = new Shape(1);
      }
  });
  }
  checkRows(checked:boolean) {
    let rowComplete = false;
    let hasEarased = false;
    for(let i=0;i<this.HEIGHT;i++){
      rowComplete = true;
      for(let j=0;j<this.WIDTH;j++){
        rowComplete = rowComplete && this.square[i][j].fill;
      }
      if(rowComplete){
        hasEarased = true;
        if(checked){
        this.score +=10;
        for(let j=0;j<this.WIDTH;j++){
          this.square[i][j].fill=false;
          this.square[i][j].painted=false;
        }
      }
      }
    }
    return hasEarased;
  }

}

export class Shape{
  squares: Square[][];
  locationX:number;
  locationY:number;
  type:number;
  moving:boolean;
  constructor(private s:number){
    this.type=s;
    this.moving=true;
    if(s==1){ // square shape
      this.squares =  [];
      this.squares[0] = [];
      this.squares[0][0] = new Square(true);
      this.squares[0][1] = new Square(true);
      this.squares[1] = [];
      this.squares[1][0] = new Square(true);
      this.squares[1][1] = new Square(true);
    }else if(s==2){ // right l shape
      this.squares =  [];
      this.squares[0] = [];
      this.squares[0][0] = new Square(false);
      this.squares[0][1] = new Square(true);
      this.squares[1] = [];
      this.squares[1][0] = new Square(false);
      this.squares[1][1] = new Square(true);
      this.squares[2] = [];
      this.squares[2][0] = new Square(true);
      this.squares[2][1] = new Square(true);
    }else{
      this.squares =  [];
    }
    this.locationX = 5;
    this.locationY = 0;
  }
}

export class Square{
  fill: boolean;
  backGround: any;
  painted:boolean
  constructor(private fillIt:boolean){
    this.fill = fillIt;
    this.painted=false;
  }
}