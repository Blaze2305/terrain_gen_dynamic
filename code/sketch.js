let cols,rows;
let size=50;
let i,j,k;
let start=10;
let w=1000;
let h=2000;
let num=0;
let button;
let heights=[];

function setup(){
  createCanvas(1000,1000,WEBGL);
  cols=floor(w/size);
  rows=floor(h/size);
  button=createButton("Press to freeze")
  button.mousePressed(freeze);

}


function draw(){

  let xoff=1000;
  let yoff=start;

  if(num==0){

  for(i=0;i<=cols+1;i++){
    heights[i]=[]
    for(j=0;j<rows;j++){
      if(i>cols/2){
        heights[i][j]=map(noise(xoff,yoff),0,1,-100,200);
      }
      else{
        heights[i][j]=0
      }
      yoff+=0.1;
    }
    xoff+=0.1;
  }
  start-=0.04
}
  background(0);
  stroke(255);
  fill(100)
  rotateX(PI/2.3)
  translate(-w/2,-h/2)

  for(i=0;i<cols;i++){
    beginShape(TRIANGLE_STRIP);
    for(j=0;j<rows;j++){
      vertex(i*size,j*size,heights[i][j]);
      vertex((i+1)*size,j*size,heights[i+1][j]);
    }
    endShape();
  }


}


function freeze(){
  if(num==0){
    num=1;
  }
  else{
    num=0;
  }
}
