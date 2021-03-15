const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
function handleKeyUp(event) {
    if (event.keyCode == 32) { //32 é a tecla espaço
        if (!isJumping) {
            jump();
        }
        jump();
    }
}
function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 70);
        }
        else {
            //fazendo o dino subir
            position += 20;
            dino.style.bottom = position + 'px'; // definindo o deslocamento em px e atribuindo ao dino
        }
    }, 20); // a cada 20 milesimos de segundo o dino vai se deslocar 20
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random()*6000;
    cactus.classList.add('cactus'); //adicionando classe cactus para usar no css
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) { // se a posição for menor que a largura dele, saiu da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);  //se ele sair da tela é removido
        }
        else if(cactusPosition >0 && cactusPosition <60 && position <60){
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class= game-over>Fim de Jogo</h1> <button class = game-over-button onclick= document.location.reload(true) ><img src="retryicon.png" </button> ';
            
        }
        else {
            cactusPosition -= 10; //velocidade que o cactus vai se mover
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus,randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp); //