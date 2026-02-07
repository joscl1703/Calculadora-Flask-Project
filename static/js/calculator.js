//Definiendo la pantalla y sus propiedades básicas
const screen = document.querySelector('#operation')
screen.style.fontSize = '4em'
// Function para modificar la operación en pantalla

function changeScreen(value, reset = false) {
    const validatorRegex = new RegExp(/([^0-9+-.*\/])+/m)
    if (!validatorRegex.test(screen.innerText) || reset) {
        screen.innerText = value
    }
}
// Obteniendo los números y añadiéndole funciones para cambiar la pantalla
const numberButtons = document.querySelectorAll('.numbers')
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        changeScreen(screen.innerText + numberButton.innerText)
    })
})
// Funcionalidad para eliminar todo en la pantalla
document.querySelector('#eliminar').addEventListener('click', () => {
    changeScreen('', true)
})
// Funcionalidad para eliminar elementos de la pantalla
document.querySelector('#regresar').addEventListener('click', () => {
    const updated = screen.innerText.split('')
    updated.pop()
    changeScreen(updated.join(''))
})
// Funcionalidad para añadir operaciones básicas a la pantalla
document.querySelectorAll('.operaciones').forEach((operationType) => {
    const validator = new RegExp(/^(-?\d+(?:.\d+)?)$/m)
    operationType.addEventListener('click', () => {
        if (validator.test(screen.innerText)) {
            changeScreen(screen.innerText + operationType.innerText)
        }
        else if(new RegExp(/^(-?\d+(?:.\d+)?)([\+\-\*\/])$/m).test(screen.innerText) && operationType.innerText == '-') {
            changeScreen(screen.innerText + operationType.innerText)
        }
    })
})
document.querySelector('#igual').addEventListener('click', () => {
    const matcher = new RegExp(/^((-?\d+(?:.\d+)?)([\+\-\*\/])(-?\d+(?:.\d+)?))$/m)
    const result = matcher.exec(screen.innerText)
    if (result) {
        console.log(result)
        const operation = result[3]
        let url = ''
        switch (operation) {
            case '+':
                url = '/calculator/sum'
                break;
            case '-':
                url = '/calculator/rest'
                break;
            case '*':
                url = '/calculator/multiply'
                break;
            case '/':
                url = '/calculator/split'
                break;
        }
        const params = new URLSearchParams()
        params.append('a', result[2])
        params.append('b', result[4])
        window.location.href = `${url}?${params.toString()}`
    }
})