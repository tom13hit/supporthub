const quantidade = 50;

for (let i = 0; i < quantidade; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    // Tamanho aleatório
    const size = Math.random() * 5 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Posição inicial
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";

    // Cor aleatória
    const colors = [
        "#60a5fa",
        "#8b5cf6",
        "#ffffff"
    ];

    particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    particle.style.boxShadow =
        `0 0 ${size * 4}px ${particle.style.background}`;

    // Velocidade
    const speed = Math.random() * 1 + 0.3;

    function animate(){

        let top = parseFloat(particle.style.top);

        top -= speed;

        if(top < -20){

            top = window.innerHeight + 20;

            particle.style.left =
                Math.random() * window.innerWidth + "px";

        }

        particle.style.top = top + "px";

        requestAnimationFrame(animate);

    }

    animate();

    document.body.appendChild(particle);

}
window.addEventListener("resize", ()=>{

    location.reload();

});