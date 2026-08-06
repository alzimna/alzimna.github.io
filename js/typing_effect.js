const typeWriter = document.getElementById('typewriter-text');
const texts = ['Actuarial Research Assistant',
                'Quantitative Risk Researcher',
                'Programming Enthusiast'];
let i=0;
const listener = e => {
    i = i < texts.length - 1 ? i + 1 : 0;
    typeWriter.innerHTML = texts[i];
};

typeWriter.innerHTML = texts[0];
typeWriter.style.setProperty('--characters', typeWriter.innerHTML.length);
typeWriter.addEventListener('animationiteration', listener, false);