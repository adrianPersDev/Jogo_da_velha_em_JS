let iconjogador01 = 'img/O.png';
let iconjogador02 = 'img/X.png';
const jogador01 = document.getElementsByClassName('jogador01');
const jogador02 = document.getElementsByClassName('jogador02');

const imgsJogador = [
    'img/O.png', 'img/X.png',
    'img/e.png', 'img/b.png',
    'img/c.png', 'img/f.png'
];

const imgsJogador01 = document.getElementsByClassName('imgs-jogador-01');
const imgsJogador02 = document.getElementsByClassName('imgs-jogador-02');

function imagemJogador() {

    for (j01 of jogador01) {
        j01.src = iconjogador01;
    }
    for (j02 of jogador02) {
        j02.src = iconjogador02;
    }

}

imagemJogador();

function mudarImgJogador(jogador, posicaoImg) {
    if (imgsJogador[posicaoImg] != iconjogador02 && imgsJogador[posicaoImg] != iconjogador01) {

        if (jogador == 1) {
            
            iconjogador01 = imgsJogador[posicaoImg];
            for (i1 of imgsJogador01) { i1.style.backgroundColor = 'transparent' }
            imgsJogador01[posicaoImg].style.backgroundColor = "rgba(255, 255, 255, 0.3)";

            for (i2 of imgsJogador02) {
                i2.style.opacity = '1';
                if (imgsJogador[posicaoImg].substring(4, 9) == i2.src.substring(i2.src.length - 5, i2.src.length)) {

                    i2.style.opacity = '0.3';
                }
            }

        } else {

            iconjogador02 = imgsJogador[posicaoImg];
            for (i2 of imgsJogador02) { i2.style.backgroundColor = 'transparent' }
            imgsJogador02[posicaoImg].style.backgroundColor = "rgba(255, 255, 255, 0.3)";

            for (i1 of imgsJogador01) {

                i1.style.opacity = '1';

                if (imgsJogador[posicaoImg].substring(4, 9) == i1.src.substring(i1.src.length - 5, i1.src.length)) {

                    i1.style.opacity = '0.3';
                }
            }
        }
    }

    imagemJogador();

}

const parmsCont = [0, 0];

function gallery(indice, direcao, qntElementos, qntEleDemo) {

    let limite = (qntElementos / qntEleDemo) - 1;
    let item01 = document.getElementById('item-01-0' + indice);

    if (direcao == "direita") {
        if (parmsCont[indice - 1] != limite) {

            parmsCont[indice - 1]++;
            item01.style.marginLeft = (-100 / qntElementos) * (qntEleDemo * parmsCont[indice - 1]) + "%";
            console.log((-100 / qntElementos) * (qntEleDemo * parmsCont[indice - 1]) + "%");
        }

    } else {

        if (parmsCont[indice - 1] != 0) {

            parmsCont[indice - 1]--;
            item01.style.marginLeft = (-100 / qntElementos) * (qntEleDemo * parmsCont[indice - 1]) + "%";
            console.log((-100 / qntElementos) * (qntEleDemo * parmsCont[indice - 1]) + "%");
        }
    }
}

const boxJogo = document.getElementById('jogo');
const menu = document.getElementById('menu');
const imgBtnMenu = document.getElementById('img-btn-menu');

function trocarCor() {

    const main = [...document.querySelectorAll('main, header')];

    setInterval(() => {

        let cor = document.getElementById('cores').value;

        main.map((element) => {

            element.style.background = `linear-gradient(270deg, white, ${cor})`;
        
        });

        menu.style.backgroundColor = cor;

    }, 50);
}

let contMenu = 0;
let largura;    

function moverMenu() {

    largura = window.innerWidth;

    if (contMenu == 0) {
        
        menu.style.marginLeft = '0%';
        imgBtnMenu.src = 'img/icon-seta-esquerda.png';
        contMenu++;

    } else {

        menu.style.marginLeft = (largura <= 480 ? '-80%' : '-30%');;
        imgBtnMenu.src = 'img/icon-menu.png';
        contMenu--;

    }

}

const boxs = document.getElementsByClassName('boxs');
const placar = document.getElementsByClassName('placar');
const demoJogador = document.getElementsByClassName('img-placar');
const boxLinha = document.getElementById('box-linha');

const vitorias = [
    [1, 2, 3], [1, 4, 7], [1, 5, 9],
    [2, 5, 8], [3, 6, 9], [3, 5, 7],
    [4, 5, 6], [7, 8, 9]
];

let jogadasX = [];
let jogadasO = [];
let jogador = 0;
let jAtivo, jInativo;
let arrayParm;

function jogar(numBox) {

    let imgJogada = document.createElement("img");

    if (jogador == 0) {

        jogadasO[jogadasO.length] = numBox;
        arrayParm = jogadasO;
        boxs[numBox - 1].style.backgroundColor = "rgb(200, 220, 255)";
        imgJogada.setAttribute('class', 'jogador01');

    } else {

        jogadasX[jogadasX.length] = numBox;
        arrayParm = jogadasX;
        boxs[numBox - 1].style.backgroundColor = "rgb(255, 200, 200)";
        imgJogada.setAttribute('class', 'jogador02');
    }

    boxs[numBox - 1].appendChild(imgJogada);
    boxs[numBox - 1].style.pointerEvents = 'none';
    imagemJogador();

    if (jogadasO.length >= 3 || jogadasX.length >= 3) {

        const combs = recombinar(arrayParm);
        
        for (v of vitorias) {
            for (c of combs) {

                if (v.join("") == c.sort().join("")) {
                
                    let linha = document.createElement('div');
                    linha.setAttribute('id', 'linha');
                    linha.setAttribute('class', `linha-${v.join('')}`);
                    boxLinha.appendChild(linha);
                    boxLinha.style.display = 'flex';
                    
                    setTimeout(() => {

                        let indice = (jogador ? 0 : 1);
                        demoJogador[indice].style.animationName = 'ganhou';

                        setTimeout(() => {

                            for (b of boxs) {

                                b.innerHTML = '';
                                b.style.backgroundColor = 'rgba(233, 233, 233, 0.5)';
                                b.style.pointerEvents = 'auto';
                            }

                            demoJogador[indice].style.animationName = 'none';
                            boxLinha.innerHTML = '';
                            boxLinha.style.display = 'none';

                        }, 1000);

                        placar[indice].innerHTML = Number(placar[indice].innerHTML) + 1;
                        jogadasX = [];
                        jogadasO = [];

                    }, 500); 
                    
                    break;
                }
            }
        }

        if (jogadasO.length >= 5 || jogadasX.length >= 5) {

            setTimeout(() => {

                for (b of boxs) {

                    b.innerHTML = '';
                    b.style.backgroundColor = 'rgb(233, 233, 233)';
                    b.style.pointerEvents = 'auto';

                }

                jogadasX = [];
                jogadasO = [];

            }, 500);
        }
    }

    if (jogador == 0) {
        jAtivo = 1;
        jInativo = 0;

        jogador++;
    } else {
        jAtivo = 0;
        jInativo = 1;
        jogador--;
    }

    setTimeout(() => {
        demoJogador[jAtivo].style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        demoJogador[jInativo].style.backgroundColor = 'transparent';
    })

}

function recombinar(nums) {
    let qntNum = nums.length;
    let combs;
    switch (qntNum) {

        case 3:

            combs = [nums.sort()];

            break;

        case 4:
            combs = [
                [nums[0], nums[1], nums[2]],
                [nums[0], nums[1], nums[3]],
                [nums[0], nums[2], nums[3]],
                [nums[1], nums[2], nums[3]]
            ];

            break;

        case 5:

            combs = [
                [nums[0], nums[1], nums[2]],
                [nums[0], nums[1], nums[3]],
                [nums[0], nums[1], nums[4]],
                [nums[0], nums[2], nums[3]],
                [nums[0], nums[2], nums[4]],
                [nums[0], nums[3], nums[4]],
                [nums[1], nums[2], nums[3]],
                [nums[1], nums[2], nums[4]],
                [nums[1], nums[3], nums[4]],
                [nums[2], nums[3], nums[4]]
            ];

            break;

        default:
            break;
    }

    return combs;

}
