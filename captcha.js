document.addEventListener('DOMContentLoaded', function() {
    const captchaImage = document.getElementById('captchaImage');
    const imageCaptcha = document.getElementById('imageCaptcha');
    const audioCaptcha = document.getElementById('audioCaptcha');
    const audioCaptchaText = document.getElementById('audioCaptchaText');
    const captchaType = document.getElementById('captchaType');
    const captchaLength = document.getElementById('captchaLength');
    const mathDifficulty = document.getElementById('mathDifficulty');
    const imageCategory = document.getElementById('imageCategory');
    const backgroundColor = document.getElementById('backgroundColor');
    const textColor = document.getElementById('textColor');
    const distortionLevel = document.getElementById('distortionLevel');
    const noiseLevel = document.getElementById('noiseLevel');
    const captchaInput = document.getElementById('captchaInput');
    const validateButton = document.getElementById('validateCaptcha');
    const validationResult = document.getElementById('validationResult');
    const embedCode = document.getElementById('embedCode');

    const textOptions = document.getElementById('textOptions');
    const mathOptions = document.getElementById('mathOptions');
    const imageOptions = document.getElementById('imageOptions');
    const visualOptions = document.getElementById('visualOptions');

    let currentCaptcha = '';

    const imageAPI = {
        animals: [
            { src: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg', name: 'Cat' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg', name: 'Dog' },
            { src: 'https://www.elephantvoices.org/images/stories/basics/field_mr_nick_500w2.jpg', name: 'Elephant' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/1200px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', name: 'Lion' },
            { src: 'https://www.thesafaricollection.com/wp-content/uploads/2022/07/The-Safari-Collection-Hey-You-Giraffe-Manor-1.jpg', name: 'Giraffe' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg/640px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg', name: 'Penguin' }
        ],
        objects: [
            { src: 'https://images.pickawood.com/gfx/conf/tables/new/berlin-et-kernbuche-natur-geoelt-swiss-legn.jpg', name: 'Table' },
            { src: 'https://www.ikea.com/us/en/images/products/nordviken-chair-antique-stain__0832454_pe777681_s5.jpg', name: 'Chair' },
            { src: 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg', name: 'Lamp' },
            { src: 'https://walrus-assets.s3.amazonaws.com/img/Cyca_Books_1800.jpg', name: 'Book' },
            { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D', name: 'Phone' },
            { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS229b-bqsOAh_RmrqGytEyF1RQMmX6O5VHoA&s', name: 'Clock' }
        ],
        nature: [
            { src: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg', name: 'Tree' },
            { src: 'https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg', name: 'Flower' },
            { src: 'https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww', name: 'Mountain' },
            { src: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJ8ZW58MHx8MHx8fDA%3D', name: 'River' },
            { src: 'https://www.andrewshoemaker.com/images/640/halcyon-maui-beach-sunset.jpg', name: 'Beach' },
            { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fHww', name: 'Forest' }
        ]
    };

    const words = [
        'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
        'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry',
        'strawberry', 'tangerine', 'ugli fruit', 'vanilla', 'watermelon', 'xigua', 'yuzu', 'zucchini',
        'apricot', 'blackberry', 'coconut', 'dragonfruit', 'eggplant', 'feijoa', 'guava', 'huckleberry'
    ];

    function generateTextCaptcha(length) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
        return Array(length).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    function generateMathCaptcha(difficulty) {
        let num1, num2, operator;
        switch (difficulty) {
            case 'easy':
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                operator = '+';
                break;
            case 'medium':
                num1 = Math.floor(Math.random() * 50);
                num2 = Math.floor(Math.random() * 50);
                operator = Math.random() < 0.5 ? '+' : '-';
                break;
            case 'hard':
                num1 = Math.floor(Math.random() * 100);
                num2 = Math.floor(Math.random() * 100);
                operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
                break;
        }
        const expression = `${num1} ${operator} ${num2}`;
        return { expression, result: eval(expression).toString() };
    }

    function generateImageCaptcha(category) {
        const images = imageAPI[category];
        const selectedImages = images.sort(() => 0.5 - Math.random()).slice(0, 4);
        const correctImage = selectedImages[Math.floor(Math.random() * selectedImages.length)];
        return { images: selectedImages, correct: correctImage };
    }

    function generateAudioCaptcha() {
        const word = words[Math.floor(Math.random() * words.length)];
        const audioUrl = `https://api.voicerss.org/?key=cb9799a27ba744358dda960047155940&hl=en-us&src=${word}`;
        return { audio: audioUrl, word: word };
    }

    function drawCaptcha(text) {
        const ctx = captchaImage.getContext('2d');
        ctx.clearRect(0, 0, captchaImage.width, captchaImage.height);
        ctx.fillStyle = backgroundColor.value;
        ctx.fillRect(0, 0, captchaImage.width, captchaImage.height);

        const fontSize = text.length > 6 ? 30 : 36;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = textColor.value;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < noiseLevel.value * 20; i++) {
            ctx.fillRect(Math.random() * captchaImage.width, Math.random() * captchaImage.height, 2, 2);
        }

        for (let i = 0; i < distortionLevel.value; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * captchaImage.width, Math.random() * captchaImage.height);
            ctx.lineTo(Math.random() * captchaImage.width, Math.random() * captchaImage.height);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
            ctx.stroke();
        }

        for (let i = 0; i < text.length; i++) {
            const x = (i + 1) * (captchaImage.width / (text.length + 1));
            const y = captchaImage.height / 2 + Math.sin(i * 0.5) * (5 + parseInt(distortionLevel.value));
            const rotation = (Math.random() - 0.5) * 0.4 * (parseInt(distortionLevel.value) / 5);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
    }

    function generateCaptcha() {
        captchaImage.style.display = 'none';
        imageCaptcha.style.display = 'none';
        audioCaptcha.style.display = 'none';
        audioCaptchaText.style.display = 'none';

        imageCaptcha.innerHTML = '';
        audioCaptcha.src = '';
        audioCaptchaText.textContent = '';

        switch (captchaType.value) {
            case 'text':
                currentCaptcha = generateTextCaptcha(parseInt(captchaLength.value));
                captchaImage.style.display = 'block';
                drawCaptcha(currentCaptcha);
                break;
            case 'math':
                const mathCaptcha = generateMathCaptcha(mathDifficulty.value);
                currentCaptcha = mathCaptcha.result;
                captchaImage.style.display = 'block';
                drawCaptcha(mathCaptcha.expression);
                break;
            case 'image':
                const imageCaptchaData = generateImageCaptcha(imageCategory.value);
                currentCaptcha = imageCaptchaData.correct.name;
                imageCaptcha.style.display = 'grid';
                imageCaptchaData.images.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img.src;
                    imgElement.alt = img.name;
                    imgElement.onclick = () => {
                        captchaInput.value = img.name;
                    };
                    imageCaptcha.appendChild(imgElement);
                });
                audioCaptchaText.style.display = 'block';
                audioCaptchaText.textContent = `Select the image of a ${currentCaptcha}`;
                break;
            case 'audio':
                const audioCaptchaData = generateAudioCaptcha();
                currentCaptcha = audioCaptchaData.word;
                audioCaptcha.style.display = 'block';
                audioCaptcha.src = audioCaptchaData.audio;
                audioCaptchaText.style.display = 'block';
                audioCaptchaText.textContent = 'Enter the word you hear';
                break;
        }

        captchaInput.value = '';
        validationResult.textContent = '';
    }

    function validateCaptcha() {
        const isValid = captchaInput.value === currentCaptcha;
        validationResult.textContent = isValid ? 'CAPTCHA is correct!' : 'CAPTCHA is incorrect. Try again.';
        validationResult.style.color = isValid ? '#4CAF50' : '#F44336';
        if (!isValid) {
            generateCaptcha();
        }
    }

    function updateEmbedCode() {
        const currentUrl = window.location.href.split('/').slice(0, -1).join('/');
        const embedData = {
            type: captchaType.value,
            length: captchaLength.value,
            difficulty: mathDifficulty.value,

            category: imageCategory.value,
            background: backgroundColor.value,
            textColor: textColor.value,
            distortion: distortionLevel.value,
            noise: noiseLevel.value
        };

        const embedDataString = btoa(JSON.stringify(embedData));

        embedCode.value = `<div id="customCaptcha" data-config="${embedDataString}"></div>
<script src="${currentUrl}/embed.js"></script>`;
    }

    captchaType.addEventListener('change', () => {
        textOptions.style.display = captchaType.value === 'text' ? 'block' : 'none';
        mathOptions.style.display = captchaType.value === 'math' ? 'block' : 'none';
        imageOptions.style.display = captchaType.value === 'image' ? 'block' : 'none';
        visualOptions.style.display = ['text', 'math'].includes(captchaType.value) ? 'block' : 'none';
        generateCaptcha();
        updateEmbedCode();
    });

    captchaLength.addEventListener('change', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    mathDifficulty.addEventListener('change', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    imageCategory.addEventListener('change', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    backgroundColor.addEventListener('input', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    textColor.addEventListener('input', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    distortionLevel.addEventListener('input', () => {
        generateCaptcha();
        updateEmbedCode();
    });
    noiseLevel.addEventListener('input', () => {
        generateCaptcha();
        updateEmbedCode();
    });

    validateButton.addEventListener('click', validateCaptcha);

    generateCaptcha();
    updateEmbedCode();
});