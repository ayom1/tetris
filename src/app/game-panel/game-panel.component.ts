import { Component, OnInit } from '@angular/core';

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
  constructor() { 
    this.square = [];
    for(let i=0;i<this.HEIGHT;i++){
      this.square[i]=[];
      for(let j=0;j<this.WIDTH;j++){
        this.square[i][j] = new Square(false);
        this.square[i][j].backGround = 'red';
      }  
    }
    this.selectedShape = new Shape(1);
  }

  ngOnInit(): void {
      
  }

}

export class Shape{
  squares: Square[][];
  locationX:number;
  locationY:number;
  constructor(private s:number){
    if(s==1){
      this.squares =  [];
      this.squares[0] = [];
      this.squares[0][0] = new Square(true);
      this.squares[0][1] = new Square(true);
      this.squares[1] = [];
      this.squares[1][0] = new Square(true);
      this.squares[1][1] = new Square(true);
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
  constructor(private fillIt:boolean){
    this.fill = fillIt;
  }
}