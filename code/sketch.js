let cols,rows;
let size=50;
let i,j,k;
let start=10;
let w=1000;
let h=2000;
let freezing=0;
let button1,button2,button3,button4,button5,button6,button7;
let heights=[];
let switcher=0;
let colors=0;
let lines=0;
let mountain_height=200;
let sea_depth=-300;
let spheres=0;
let sp_frame=0;
let rotation=0;
let x,y,z;

function setup(){
  createCanvas(1000,1000,WEBGL);
  cols=floor(w/size);
  rows=floor(h/size);

  //sliders
  x=createSlider(-180,180,0,1);
  y=createSlider(-180,180,0,1);
  z=createSlider(-180,180,0,1);

  //buttons
  button1=createButton("Press to freeze")
  button1.mousePressed(freeze);
  button1.position(1000,962.962);
  button2=createButton("Press to switch mode")
  button2.mousePressed(change);
  button2.position(1000,912.962);
  button3=createButton("Press to reduce to frame only")
  button3.mousePressed(grid);
  button3.position(1000,862.962);
  button4=createButton("Press to remove lines")
  button4.mousePressed(line_rem);
  button4.position(1000,937.962);
  button5=createButton("Press to remove sphere")
  button5.mousePressed(sphere_rem);
  button5.position(1000,887.962);
  button6=createButton("Press to reduce sphere to frame")
  button6.mousePressed(sphere_frame);
  button6.position(1000,837.962);
  button7=createButton("Rotation Lock")
  button7.mousePressed(rotation_lock);
  button7.position(1000,750);
  button7.size(80,80);
}


function draw(){

  let xoff=1000;
  let yoff=start;
  background(0);

  if(rotation==1){
    rotateX((PI/180)*x.value());
    rotateY((PI/180)*y.value());
    rotateZ((PI/180)*z.value());
  }

  if(switcher==0){
    if(freezing==0){
      for(i=0;i<=cols+1;i++){
        heights[i]=[]
        for(j=0;j<rows;j++){
          if(i<cols/3.5 || i>cols/2){
            heights[i][j]=map(noise(xoff,yoff),0,1,sea_depth+100,mountain_height+100);
          }
          else{
            heights[i][j]=0
          }
          yoff+=0.1;
        }
        xoff+=0.01;
      }
      start-=0.03;
    }

    if(lines==0){
      stroke(50,232,244);
    }
    else{
      noStroke();
    }
    if(colors==0){
      fill(118,40,170)
    }
    else{
      noFill()
    }

    rotateX(PI/2.3+10*(PI/180));
    translate(-w/2,-h/2)
    translate(100,0,0)

    if(spheres==0){
      push();
      if(sp_frame==0){
        noStroke()
        fill(214,6,240)
      }
      else{
          stroke(50,232,244);
          noFill();
      }
      translate(400,0,0)
      sphere(250)
      pop();
    }

    for(i=0;i<cols;i++){
      beginShape(TRIANGLE_STRIP);
      for(j=0;j<rows;j++){
        vertex(i*size,j*size,heights[i][j]);
        vertex((i+1)*size,j*size,heights[i+1][j]);
      }
      endShape();
    }
  }

  else{

    if(freezing==0){
      for(i=0;i<=cols+1;i++){
        heights[i]=[]
        for(j=0;j<rows;j++){
            heights[i][j]=map(noise(xoff,yoff),0,1,sea_depth,mountain_height);
          yoff+=0.1;
        }
        xoff+=0.1;
      }
      start-=0.04
    }
    if(lines==0){
      stroke(50,232,244);
    }
    else{
      noStroke();
    }
    if(colors==0){
      fill(118,40,170)
    }
    else{
      noFill()
    }

    rotateX(PI/2.3);
    translate(-w/2,-h/2)

    if(spheres==1){
      push();
      if(sp_frame==0){
        noStroke()
        fill(214,6,240)
      }
      else{
          stroke(50,232,244);
          noFill();
      }
      translate(400,0,0)
      sphere(250)
      pop();
    }

    for(i=0;i<cols;i++){
      beginShape(TRIANGLE_STRIP);
      for(j=0;j<rows;j++){
        vertex(i*size,j*size,heights[i][j]);
        vertex((i+1)*size,j*size,heights[i+1][j]);
      }
      endShape();
    }
  }
}


function freeze(){
  if(freezing==0){
    freezing=1;
  }
  else{
    freezing=0;
  }
}

function change(){
  if(switcher==0){
    switcher=1;
  }
  else{
    switcher=0;
  }
}

function grid(){
  if(colors==0){
    colors=1;
  }
  else{
    colors=0;
  }
}

function line_rem(){
  if(lines==0){
    lines=1;
  }
  else{
    lines=0;
  }
}

function sphere_rem(){
  if(spheres==0){
    spheres=1;
  }
  else{
    spheres=0;
  }
}

function sphere_frame(){
  if(sp_frame==0){
    sp_frame=1;
  }
  else{
    sp_frame=0;
  }
}

function rotation_lock(){
  if(rotation==0){
    rotation=1;
  }
  else{
    rotation=0;
    x.value(0);
    y.value(0);
    z.value(0);
  }
}
