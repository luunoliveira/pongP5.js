//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimento = 10;
let altura = 90;

//variáveis oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeYOponente;

let chanceErro = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//fundo
function setup() {
  createCanvas(600,400);
  trilha.loop();
}

// desenho
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBorda();
  mostraRaquete (xRaquete, yRaquete);
  movimentaRaquete ();
  //verificaColisaoRaquete ();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xOponente, yOponente);
  mostraRaquete(xOponente, yOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha (){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBorda(){
  if (xBolinha + raio > width || 
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || 
     yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x,y){
  rect(x,y,comprimento,altura);
}

function movimentaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain (yRaquete, 0, 310);
}

function verificaColisaoRaquete (){
  if (xBolinha - raio < xRaquete + comprimento && yBolinha - raio < yRaquete + altura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
  colidiu = 
  collideRectCircle(x,y,comprimento,altura, xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yOponente - comprimento / 2 - 30; 
  yOponente += velocidadeYOponente + chanceErro;
  calculaChanceErro();
  yOponente = constrain (yOponente, 0, 310)
}
function incluiPlacar (){
  
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(400,10,40,20);
  fill(255);
  text(pontosOponente, 420, 26);
}

function marcaPonto(){
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}

function calculaChanceErro(){
   if (pontosOponente >= meusPontos) {
    chanceErro += 1
   if (chanceErro >= 39){
    chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
    chanceErro = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    XBolinha = 300
    }
}