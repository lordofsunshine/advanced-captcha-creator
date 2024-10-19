(function() {
    const captchaContainer = document.getElementById('customCaptcha');
    if (!captchaContainer) return;

    const config = JSON.parse(atob(captchaContainer.dataset.config));

    const captchaWrapper = document.createElement('div');
    captchaWrapper.className = 'captcha-wrapper';
    captchaContainer.appendChild(captchaWrapper);

    const captchaDisplay = document.createElement('div');
    captchaDisplay.className = 'captcha-display';
    captchaWrapper.appendChild(captchaDisplay);

    const captchaInput = document.createElement('input');
    captchaInput.type = 'text';
    captchaInput.placeholder = 'Enter CAPTCHA';
    captchaWrapper.appendChild(captchaInput);

    const validateButton = document.createElement('button');
    validateButton.textContent = 'Validate';
    captchaWrapper.appendChild(validateButton);

    const validationResult = document.createElement('div');
    validationResult.className = 'validation-result';
    captchaWrapper.appendChild(validationResult);

    let currentCaptcha = '';

    const imageAPI = {
        animals: [
            { src: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg', name: 'Cat' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1200px-Labrador_Retriever_portrait.jpg', name: 'Dog' },
            { src: 'https://www.elephantvoices.org/images/stories/basics/field_mr_nick_500w2.jpg', name: 'Elephant' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/1200px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', name: 'Lion' },
        ],
        objects: [
            { src: 'https://images.pickawood.com/gfx/conf/tables/new/berlin-et-kernbuche-natur-geoelt-swiss-legn.jpg', name: 'Table' },
            { src: 'https://www.ikea.com/us/en/images/products/nordviken-chair-antique-stain__0832454_pe777681_s5.jpg', name: 'Chair' },
            { src: 'https://cdn.britannica.com/88/212888-050-6795342C/study-lamp-electrical-cord.jpg', name: 'Lamp' },
            { src: 'https://walrus-assets.s3.amazonaws.com/img/Cyca_Books_1800.jpg', name: 'Book' },
        ],
        nature: [
            { src: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg', name: 'Tree' },
            { src: 'https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg', name: 'Flower' },
            { src: 'https://plus.unsplash.com/premium_photo-1672115680958-54438df0ab82?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW5zfGVufDB8fDB8fHww', name: 'Mountain' },
            { src: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJ8ZW58MHx8MHx8fDA%3D', name: 'River' },
        ]
    };

    const words = [
        'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
        'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry'
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
        const audioUrl = `https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${word}`;
        return { audio: audioUrl, word: word };
    }

    function drawCaptcha(text, canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = config.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fontSize = text.length > 6 ? 30 : 36;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = config.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < config.noise * 20; i++) {
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }

        for (let i = 0; i < config.distortion; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
            ctx.stroke();
        }

        for (let i = 0; i < text.length; i++) {
            const x = (i + 1) * (canvas.width / (text.length + 1));
            const y = canvas.height / 2 + Math.sin(i * 0.5) * (5 + parseInt(config.distortion));
            const rotation = (Math.random() - 0.5) * 0.4 * (parseInt(config.distortion) / 5);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
    }

    function generateCaptcha() {
        captchaDisplay.innerHTML = '';
        captchaInput.value = '';
        validationResult.textContent = '';

        switch (config.type) {
            case 'text':
                currentCaptcha = generateTextCaptcha(parseInt(config.length));
                const textCanvas = document.createElement('canvas');
                textCanvas.width = 200;
                textCanvas.height = 50;
                drawCaptcha(currentCaptcha, textCanvas);
                captchaDisplay.appendChild(textCanvas);
                break;
            case 'math':
                const mathCaptcha = generateMathCaptcha(config.difficulty);
                currentCaptcha = mathCaptcha.result;
                const mathCanvas = document.createElement('canvas');
                mathCanvas.width = 200;
                mathCanvas.height = 50;
                drawCaptcha(mathCaptcha.expression, mathCanvas);
                captchaDisplay.appendChild(mathCanvas);
                break;
            case 'image':
                const imageCaptchaData = generateImageCaptcha(config.category);
                currentCaptcha = imageCaptchaData.correct.name;
                const imageGrid = document.createElement('div');
                imageGrid.style.display = 'grid';
                imageGrid.style.gridTemplateColumns = 'repeat(2, 0.2fr)';
                imageGrid.style.gap = '10px';
                imageCaptchaData.images.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img.src;
                    imgElement.alt = img.name;
                    imgElement.style.width = '120px';
                    imgElement.style.height = 'auto';
                    imgElement.style.cursor = 'pointer';
                    imgElement.onclick = () => {
                        captchaInput.value = img.name;
                    };
                    imageGrid.appendChild(imgElement);
                });
                captchaDisplay.appendChild(imageGrid);
                const instruction = document.createElement('p');
                instruction.textContent = `Select the image of a ${currentCaptcha}`;
                captchaDisplay.appendChild(instruction);
                break;
            case 'audio':
                const audioCaptchaData = generateAudioCaptcha();
                currentCaptcha = audioCaptchaData.word;
                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = audioCaptchaData.audio;
                captchaDisplay.appendChild(audioElement);
                const audioInstruction = document.createElement('p');
                audioInstruction.textContent = 'Enter the word you hear';
                captchaDisplay.appendChild(audioInstruction);
                break;
        }
    }

    function validateCaptcha() {
        const isValid = captchaInput.value === currentCaptcha;
        validationResult.textContent = isValid ? 'CAPTCHA is correct!' : 'CAPTCHA is incorrect. Try again.';
        validationResult.style.color = isValid ? '#4CAF50' : '#F44336';
        if (!isValid) {
            generateCaptcha();
        }
    }

    validateButton.addEventListener('click', validateCaptcha);

    generateCaptcha();
})();
