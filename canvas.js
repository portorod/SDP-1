var canvas1 = document.querySelector('.canvas1');
var canvas2 = document.querySelector('.canvas2');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');

//VARIÁVEIS PARA CONTROLE RÁPIDO DO JOGO
var telaLargura = 300;
var telaAltura = 150;
var velocidade = 100; //document.getElementById('velocidade').value; //pesquisar termos "dx" e "dy".
var raioPadrao = 1; //raio dos indivíduos, não alterar, precisaria incluir este fator na função de colisão!
var tempo = 10; //tempo de jogo, pesquisar "loop".
var intervalo = 1; //document.getElementById('intervalo').value; //tempo entre frames
var loop = 0 //contador geral
var range = 2 // facilidade de cruzamento
var distanciaNascimento = 20 //Distancia de nascimento dos cruzamentos

//VARIÁVEIS INICIAIS
var freqInAA = 0;
var freqInAa = 0;
var freqInaa = 0;
var arrayAA = [];
var arrayAa = [];
var arrayaa = [];

function Individuo(x, y, raio, dx, dy, cor, genotipo, tempoDeVida) {
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.dx = dx;
    this.dy = dy;
    this.cor = cor;
    this.genotipo = genotipo;
    this.tempoDeVida = tempoDeVida;

    this.desenhar = function () {
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);
        ctx1.strokeStyle = this.cor;
        ctx1.stroke();
        ctx1.fillStyle = this.cor;
        ctx1.fill();
    }

    this.movimentar = function () {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }

    this.colisao = function () {
        if (this.x <= 0 || this.x >= telaLargura) {
            this.dx = - 1 * this.dx;
        }
        if (this.y <= 0 || this.y >= telaAltura) {
            this.dy = - 1 * this.dy;
        }
    }

    this.cruzamento = function () {
        for (var n = 0; n < arrayAA.length; n++) {
            if (this.x != arrayAA[n].x &&
                this.x - range < arrayAA[n].x && this.x + range > arrayAA[n].x &&
                this.y + range > arrayAA[n].y && this.y - range < arrayAA[n].y
            ) {
                //console.log("cruzou AA"); //APAGAR
                switch (this.genotipo) {
                    case 'AA': arrayAA.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 0, 255)', 'AA', 0));
                    case 'Aa': var sorte = Math.random();
                        if (sorte > 0.5) {
                            arrayAA.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 0, 255)', 'AA', 0));
                        } else {
                            arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 128, 00)', 'Aa', 0));
                        }
                    case 'aa': arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 128, 0)', 'Aa', 0));
                }
            }
        }
        for (var n = 0; n < arrayAa.length; n++) {
            if (this.x != arrayAa[n].x &&
                this.x - range < arrayAa[n].x && this.x + range > arrayAa[n].x &&
                this.y + range > arrayAa[n].y && this.y - range < arrayAa[n].y
            ) {
                //console.log("cruzou Aa"); //APAGAR!!!
                switch (this.genotipo) {
                    // case 'AA': var sorte = Math.random();
                    //     if (sorte > 0.5) {
                    //         arrayAA.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 0, 255)', 'AA', 0));
                    //     } else {
                    //         arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 128, 00)', 'Aa', 0));
                    //     }
                    case 'Aa': var sorte = Math.random();
                        if (sorte < 0.25) {
                            arrayAA.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 0, 255)', 'AA', 0));
                        } if (sorte > 0.75) {
                            arrayaa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(255, 255, 0)', 'aa', 0));
                        } else {
                            arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 128, 00)', 'Aa', 0));
                        }
                    case 'aa': var sorte = Math.random();
                        if (sorte > 0.5) {
                            arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(0, 128, 00)', 'Aa', 0));
                        } else {
                            arrayaa.push(new Individuo(this.x + distanciaNascimento * 2, this.y + distanciaNascimento, raioPadrao, Math.random() * dx, Math.random() * dy, 'rgb(255, 255, 0)', 'aa', 0));
                        }
                }
            }
        }
        for (var n = 0; n < arrayAA.length; n++) {
            if (this.x != arrayaa[n].x &&
                this.x - range < arrayaa[n].x && this.x + range > arrayaa[n].x &&
                this.y + range > arrayaa[n].y && this.y - range < arrayaa[n].y
            ) {
                //console.log("cruzou aa"); //APAGAR!!!
                switch (this.genotipo) {
                    // case 'AA': arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, -this.dx, -this.dy, 'rgb(0, 128, 00)', 'Aa', 0));
                    // case 'Aa': var sorte = Math.random();
                    //     if (sorte > 0.5) {
                    //         arrayAa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, -this.dx, -this.dy, 'rgb(0, 128, 00)', 'Aa', 0));
                    //     } else {
                    //         arrayaa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, -this.dx, -this.dy, 'rgb(255, 255, 0)', 'aa', 0));
                    //     }
                    case 'aa': arrayaa.push(new Individuo(this.x + distanciaNascimento, this.y + distanciaNascimento, raioPadrao, -this.dx, -this.dy, 'rgb(255, 255, 0)', 'aa', 0));
                }
            }
        }




    }
}

function Zerar() {
    ctx1.clearRect(0, 0, telaLargura, telaLargura);
    arrayAA = [];
    arrayAa = [];
    arrayaa = [];
    loop = 0;
}

function Inicio() {
    freqInAA = document.getElementById('frequenciaInicialAA').value; //Definir freq inicial de AA
    freqInAa = document.getElementById('frequenciaInicialAa').value; //Definir freq inicial de Aa
    freqInaa = document.getElementById('frequenciaInicialaa').value; //Definir freq inicial de aa

    for (var i = 0; i < freqInAA; i++) {
        var x = Math.random() * telaLargura;
        var y = Math.random() * telaAltura;
        raio = raioPadrao;
        dx = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        dy = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        cor = 'rgb(0, 0, 255)';
        genotipo = 'AA';
        arrayAA.push(new Individuo(x, y, raio, dx, dy, cor, genotipo, 0));
    } //Inicia quantidade de AA em arrayAA
    for (var i = 0; i < freqInAa; i++) {
        var x = Math.random() * telaLargura;
        var y = Math.random() * telaAltura;
        raio = raioPadrao;
        dx = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        dy = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        cor = 'rgb(0, 128, 0)';
        genotipo = 'Aa';
        arrayAa.push(new Individuo(x, y, raio, dx, dy, cor, genotipo, 0));
    } //Inicia quantidade de AA em arrayAa
    for (var i = 0; i < freqInaa; i++) {
        var x = Math.random() * telaLargura;
        var y = Math.random() * telaAltura;
        raio = raioPadrao;
        dx = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        dy = velocidade * (Math.random() / 2 - 0.25) * 0.1;
        cor = 'rgb(255, 255, 0)';
        genotipo = 'aa';
        arrayaa.push(new Individuo(x, y, raio, dx, dy, cor, genotipo, 0));
    } //Inicia quantidade de AA em arrayaa
}

function Update() {
    setInterval(function () {
        ctx1.clearRect(0, 0, telaLargura, telaLargura)
        for (var i = 0; i < arrayAA.length; i++) {
            arrayAA[i].movimentar();
            arrayAA[i].desenhar();
            arrayAA[i].colisao();
            if (arrayAA[i].tempoDeVida > 200) {
                arrayAA[i].cruzamento();
            }
            arrayAA[i].tempoDeVida++;
        }
        for (var i = 0; i < arrayAa.length; i++) {
            arrayAa[i].movimentar();
            arrayAa[i].desenhar();
            arrayAa[i].colisao();
            if (arrayAa[i].tempoDeVida > 200) {
                arrayAa[i].cruzamento();
            }
            arrayAa[i].tempoDeVida++;
        }
        for (var i = 0; i < arrayaa.length; i++) {
            arrayaa[i].movimentar();
            arrayaa[i].desenhar();
            arrayaa[i].colisao();
            if (arrayaa[i].tempoDeVida > 200) {
                arrayaa[i].cruzamento();
            }
            arrayaa[i].tempoDeVida++;
        }
        loop++
    }, 100 * intervalo);

}

function DefinirValores() {
    velocidade = document.getElementById('velocidade').value;
    intervalo = document.getElementById('intervalo').value;
};














// APAGAR DAQUI ----------------------------------------------------------
function Evento1() {
    // var text = document.getElementById("nome").value;
    // ctx1.fillText(text, 20, 20, 20);
    ctx1.beginPath();
    ctx1.arc(299, 149, 1, 0, Math.PI * 2);
    ctx1.fill();
    ctx1.stroke();
}

function Evento2() {
    ctx2.fillText("Olá, mundooooooo!", 20, 20, 20);
    ctx2.fillRect(290, 140, 10, 10);
}
// ATÉ AQUI!!!-------------------------------------------------------------









// function Circle (x, y, vx, vy, raio, cr) {
// 		this.x = x;
// 		this.y = y;
// 		this.vx = vx;
// 		this.vy = vy;
// 		this.raio = raio;	
// 		this.color = cr;
// }

// function addAA(){
// 	var raio = 10;
// 	var x = Math.random() * (innerWidth - radius * 2) + raio;
// 	var vx = 5 * (Math.random() - 0.5);
// 	var y = Math.random() * (innerHeight - raio * 2) + raio;
// 	var vy = 5 * (Math.random() - 0.5);
//     var cr = 0;
// 	arrayAA.push(new Circle(x, y, dx, dy, raio, cr));
// }





