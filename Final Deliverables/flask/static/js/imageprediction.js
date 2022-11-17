const uploadButton = document.getElementsByClassName('upload__btn')[0];
const imageFile = document.getElementById('imagefile');
const image = document.getElementsByClassName('upload__img')[0];
const submitButton = document.getElementsByClassName('submit__btn')[0];
const form = document.getElementsByClassName('upload')[0];

uploadButton.addEventListener('click', () => {
    imageFile.click();
});

imageFile.addEventListener('change', () => {
    submitButton.style.visibility = 'visible';
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        image.src = reader.result;
    })
    reader.readAsDataURL(imageFile.files[0]);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitButton.style.visibility = 'hidden';
    const formData = new FormData();
    formData.append('file', (imageFile.files[0]));

    fetch('/predict', {
        method: 'POST',
        body: formData,
        // headers: {'Content-type':'multipart/form-data'}
    })
    .then(res => res.json())
    .then(data => {
        console.log(data[0]);
        document.getElementsByClassName('table-output')[0].innerHTML = 
        `<div class="table-container table ingredient">
        <div class="table__header">
            Food classified is:
            
            <div class="table__name">${data[0].name.toUpperCase()}</div>
        </div>

    <div class="ingredient__label">
        Sugar (in g): <span class="ingredient__value">${data[0].sugar_g}</span>
    </div>

    <div class="ingredient__label">
        Fiber (in g): <span class="ingredient__value">${data[0].fiber_g}</span>
    </div>

    <div class="ingredient__label">
        Serving Size (in g): <span class="ingredient__value">${data[0].serving_size_g}</span>
    </div>

    <div class="ingredient__label">
        Sodium (in mg): <span class="ingredient__value">${data[0].sodium_mg}</span>
    </div>

    <div class="ingredient__label">
        Potassium (in mg): <span class="ingredient__value">${data[0].potassium_mg}</span>
    </div>

    <div class="ingredient__label">
        Fat Saturated (in g): <span class="ingredient__value">${data[0].fat_saturated_g}</span>
    </div>

    <div class="ingredient__label">
        Fat Total (in g): <span class="ingredient__value">${data[0].fat_total_g}</span>
    </div>

    <div class="ingredient__label">
        Calories (in g): <span class="ingredient__value">${data[0].calories}</span>
    </div>

    <div class="ingredient__label">
        Cholestrol (in mg): <span class="ingredient__value">${data[0].cholesterol_mg}</span>
    </div>

    <div class="ingredient__label">
        Protein (in g): <span class="ingredient__value">${data[0].protein_g}</span>
    </div>

    <div class="ingredient__label">
        Carbohydrates (in g): <span class="ingredient__value">${data[0].carbohydrates_total_g}</span>
    </div>
    </div>`
    })
});