const inputCardHolder = document.querySelector('#input-holder')
const inputCardNumber = document.querySelector('#input-number')
const inputCardData = document.querySelector('#input-data')
const inputCardCVC = document.querySelector('#input-cvc')
const mapCardHolder = document.querySelector('#map-holder')
const mapCardNumber = document.querySelector('#map-number')
const mapCardData = document.querySelector('#map-data')
const mapCardCVC = document.querySelector('#map-cvc')

inputCardHolder.addEventListener('input', function() {
    reTranslate(inputCardHolder, mapCardHolder, 'Jane Appleseed')
    return reTranslate
})
inputCardNumber.addEventListener('input', function() {
    let val = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '');
    val = val !== '' ? val.match(/.{1,4}/g).join` ` : ``;
    this.value = val;
    reTranslate(inputCardNumber, mapCardNumber, '0000 0000 0000 0000')
    return reTranslate
})
inputCardData.addEventListener('input', function() {
    let val = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '');
    val = val !== '' ? val.match(/.{1,2}/g).join`/` : ``;
    this.value = val;
    reTranslate(inputCardData, mapCardData, '00/00')
    return reTranslate
})
inputCardCVC.addEventListener('input', function() {
    reTranslate(inputCardCVC, mapCardCVC, '000')
    return reTranslate
})

function checkout(shape) {
    let success = true

    function returnError(input, error) {
        const inputContainer = input.parentNode
        const inputHandler = document.createElement('label')
        inputContainer.classList.add('unconfirmed')
        inputHandler.classList.add('error-handler')
        inputHandler.textContent = error
        inputContainer.append(inputHandler)
    }
    function dropError(input) {
        const inputContainer = input.parentNode
        if(inputContainer.classList.contains('unconfirmed')) {
            inputContainer.querySelector('.error-handler').remove()
            inputContainer.classList.remove('unconfirmed')
        }
    }

    const inputShapes = shape.querySelectorAll('input')
    for (const inputShape of inputShapes) {
        dropError(inputShape)
        if(inputShape.value == '' || inputShape.value == null) {
            returnError(inputShape, "Can't be blank")
            success = false
        }
        else if(inputShape.dataset.type == 'input-holder') {
            if(/[0-9]/.test(inputShape.value)) {
                returnError(inputShape, 'Wrong format, letters only')
                success = false
            }
        }
        else if(inputShape.dataset.type == 'input-number') {
            if(/[a-zа-яё]/i.test(inputShape.value)) {
                returnError(inputShape, 'Wrong format, numbers only')
                success = false
            }
            else if(inputShape.value.length < 19) {
                returnError(inputShape, "Can't be less than a valiable value (16)")
                success = false
            }
        }
        else if(inputShape.dataset.type == 'input-data') {
            if(/[a-zа-яё]/i.test(inputShape.value)) {
                returnError(inputShape, "Wrong format, numbers only")
                success = false
            }
            else if(inputShape.value.length < 5) {
                returnError(inputShape, "Can't be blank")
                success = false
            }
        }
        else if(inputShape.dataset.type == 'input-cvc') {
            if(/[a-zа-яё]/i.test(inputShape.value)) {
                returnError(inputShape, "Wrong format, numbers only")
                success = false
            }
            else if(inputShape.value.length < 3) {
                returnError(inputShape, "Can't be blank")
                success = false
            }
        }
    }

    return success
}

function reTranslate(input, map, placeholder) {
    if(input.value !== '') map.textContent = input.value
    else map.textContent = placeholder
}

function createSuccessedShape() {
    return `
    <form class="success-shape" id="success-shape" action="#">
        <img src="resource/icon-complete.svg" alt="Complete">
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button class="success-submit" id="success-submit" type="submit">Continue</button>
    </form>`
}

const shapeContainer = document.getElementById('shape-container')
const cardShape = document.getElementById('card-shape')

cardShape.addEventListener('submit', function(event) {
    if(checkout(this) == true) {
        shapeContainer.innerHTML = ''
        shapeContainer.insertAdjacentHTML('beforeend', createSuccessedShape())
        const successShape = document.getElementById('success-shape')
        successShape.addEventListener('submit', function() {
            shapeContainer.innerHTML = ''
            location.reload()
        })
    }
})