const codeBox = document.getElementById('codeBox');
const outputFrame = document.getElementById('outputFrame');
const lineNumbers = document.getElementById('lineNumbers');
const textMeasurementMirror = document.getElementById('textMeasurementMirror');

const assetBtn = document.getElementById('assetBtn');
const assetDrawer = document.getElementById('assetDrawer');

const fontBtn = document.getElementById('fontBtn');
const fontDrawer = document.getElementById('fontDrawer');

const colorBtn = document.getElementById('colorBtn');
const colorDrawer = document.getElementById('colorDrawer');
const colorPreviewCircle = document.getElementById('colorPreviewCircle');

const snippetBtn = document.getElementById('snippetBtn');
const snippetDrawer = document.getElementById('snippetDrawer');


const defaultCode = `<div style="text-align: center; padding: 40px; font-family: 'Nunito', sans-serif;">

    <h2 style="color: #574840; margin-bottom: 10px; font-weight: 400;">
        Welcome
    </h2>

    <p style="color: #574840; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
        Thank you so much for joining today.<br>
        Start typing your code on the right to see the magic happen right here.
    </p>

</div>`;


codeBox.value = defaultCode;


function updateLineNumbers() {

    const text = codeBox.value;

    textMeasurementMirror.textContent = text + '\n';

    const lineHeight = 19.5;
    const totalHeight = textMeasurementMirror.clientHeight;
    const linesCount = Math.max(1, Math.round(totalHeight / lineHeight));

    let numbersStr = '';

    for (let i = 1; i <= linesCount; i++) {
        numbersStr += i + '<br>';
    }

    lineNumbers.innerHTML = numbersStr;

}


function updatePreview() {

    const userCode = codeBox.value;

    const frameDoc =
        outputFrame.contentDocument ||
        outputFrame.contentWindow.document;

    frameDoc.open();

    frameDoc.write(`
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@500;700&family=Fredoka:wght@400;500;600;700&family=Baloo+2:wght@400;500;600;700&family=DynaPuff:wght@400;500;600;700&family=Coiny&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap" rel="stylesheet">

        ${userCode}
    `);

    frameDoc.close();

}


function closeDrawers() {

    if (assetDrawer) assetDrawer.style.display = 'none';
    if (fontDrawer) fontDrawer.style.display = 'none';
    if (colorDrawer) colorDrawer.style.display = 'none';
    if (snippetDrawer) snippetDrawer.style.display = 'none';

}


function switchSnippetTab(tabName) {

    const htmlTabBtn = document.getElementById('htmlTabBtn');
    const cssTabBtn = document.getElementById('cssTabBtn');
    const recipeTabBtn = document.getElementById('recipeTabBtn');

    const htmlContent = document.getElementById('htmlSnippetContent');
    const cssContent = document.getElementById('cssSnippetContent');
    const recipeContent = document.getElementById('recipeSnippetContent');


    if (htmlContent) htmlContent.style.display = 'none';
    if (cssContent) cssContent.style.display = 'none';
    if (recipeContent) recipeContent.style.display = 'none';


    if (htmlTabBtn) htmlTabBtn.classList.remove('active');
    if (cssTabBtn) cssTabBtn.classList.remove('active');
    if (recipeTabBtn) recipeTabBtn.classList.remove('active');


    if (tabName === 'html') {

        if (htmlContent) {
            htmlContent.style.display = 'flex';
        }

        if (htmlTabBtn) {
            htmlTabBtn.classList.add('active');
        }

    } else if (tabName === 'css') {

        if (cssContent) {
            cssContent.style.display = 'flex';
        }

        if (cssTabBtn) {
            cssTabBtn.classList.add('active');
        }

    } else if (tabName === 'recipes') {

        if (recipeContent) {
            recipeContent.style.display = 'flex';
        }

        if (recipeTabBtn) {
            recipeTabBtn.classList.add('active');
        }

    }

}


if (assetBtn && assetDrawer) {

    assetBtn.addEventListener('click', () => {

        const isOpen = assetDrawer.style.display === 'block';

        closeDrawers();

        assetDrawer.style.display = isOpen ? 'none' : 'block';

    });

}


if (fontBtn && fontDrawer) {

    fontBtn.addEventListener('click', () => {

        const isOpen = fontDrawer.style.display === 'block';

        closeDrawers();

        fontDrawer.style.display = isOpen ? 'none' : 'block';

    });

}


if (colorBtn && colorDrawer) {

    colorBtn.addEventListener('click', () => {

        const isOpen = colorDrawer.style.display === 'block';

        closeDrawers();

        colorDrawer.style.display = isOpen ? 'none' : 'block';

    });

}


if (snippetBtn && snippetDrawer) {

    snippetBtn.addEventListener('click', () => {

        const isOpen = snippetDrawer.style.display === 'block';

        closeDrawers();

        snippetDrawer.style.display = isOpen ? 'none' : 'block';

        if (!isOpen) {
            switchSnippetTab('html');
        }

    });

}


document.querySelectorAll('.snippet-item').forEach(item => {

    item.addEventListener('click', () => {

        const snippetCode = item
            .getAttribute('data-snippet')
            .replace(/\\n/g, '\n');


        const startPos = codeBox.selectionStart;
        const endPos = codeBox.selectionEnd;
        const textVal = codeBox.value;


        codeBox.value =
            textVal.substring(0, startPos) +
            snippetCode +
            textVal.substring(endPos, textVal.length);


        codeBox.selectionStart =
            codeBox.selectionEnd =
            startPos + snippetCode.length;


        codeBox.focus();

        updatePreview();
        updateLineNumbers();


        const codeSpan = item.querySelector('.font-code');

        if (codeSpan) {

            const original = codeSpan.textContent;

            codeSpan.textContent = 'Inserted! ✨';

            setTimeout(() => {
                codeSpan.textContent = original;
            }, 1500);

        }

    });

});


document.querySelectorAll('.color-swatch').forEach(swatch => {

    swatch.addEventListener('click', () => {

        const selectedColor =
            swatch.getAttribute('data-color');


        navigator.clipboard.writeText(selectedColor);


        colorBtn.innerHTML = `
            <span
                id="colorPreviewCircle"
                class="color-preview-circle"
                style="background-color: ${selectedColor};">
            </span>
            Copied! ✨
        `;


        setTimeout(() => {

            colorBtn.innerHTML = `
                <span
                    id="colorPreviewCircle"
                    class="color-preview-circle"
                    style="background-color: ${selectedColor};">
                </span>

                <span id="colorCodeText">
                    ${selectedColor}
                </span>
            `;

            closeDrawers();

        }, 1200);

    });

});


document.querySelectorAll('.asset-item').forEach(item => {

    item.addEventListener('click', () => {

        navigator.clipboard.writeText(
            item.getAttribute('data-url')
        );


        const hint = item.querySelector('.copy-hint');


        if (hint) {

            hint.textContent = 'Copied! 🍓';

            setTimeout(() => {
                hint.textContent = 'Copy URL';
            }, 1500);

        }

    });

});


document.querySelectorAll('.font-item:not(.snippet-item)').forEach(item => {

    item.addEventListener('click', () => {

        navigator.clipboard.writeText(
            item.getAttribute('data-code')
        );


        const codeSpan = item.querySelector('.font-code');


        if (codeSpan) {

            const original = codeSpan.textContent;

            codeSpan.textContent = 'Copied! ✨';

            setTimeout(() => {
                codeSpan.textContent = original;
            }, 1500);

        }

    });

});


codeBox.addEventListener('input', () => {

    updatePreview();
    updateLineNumbers();

});


codeBox.addEventListener('scroll', () => {

    lineNumbers.scrollTop = codeBox.scrollTop;

});


updatePreview();
updateLineNumbers();


const duckTips = [

    "HTML is like the skeleton of your webpage! It adds the text, images, and structure.",

    "CSS is the outfit! It handles colors, cute fonts, spacing, and styling."

];


let tipIndex = 0;

const duckSticker =
    document.querySelector('.duck-sticker');

const speechBubble =
    document.getElementById('duckSpeechBubble');

const duckText =
    document.getElementById('duckText');


function duckSaysStuff(event) {

    event.stopPropagation();

    if (!speechBubble || !duckText) return;

    speechBubble.style.display = 'block';

    duckText.textContent = duckTips[tipIndex];

    tipIndex =
        (tipIndex + 1) % duckTips.length;

}


document.addEventListener('click', event => {

    if (
        duckSticker &&
        speechBubble &&
        !duckSticker.contains(event.target)
    ) {
        speechBubble.style.display = 'none';
    }

});


const themes = [
    'theme-mocha',
    'theme-lavender',
    'theme-periwinkle'
];


const themeToggleBtn =
    document.getElementById('themeToggleBtn');


const currentTheme =
    localStorage.getItem('portfolio_theme') ||
    'theme-mocha';


document.body.className = currentTheme;


if (themeToggleBtn) {

    themeToggleBtn.addEventListener('click', () => {

        const activeTheme =
            themes.find(theme =>
                document.body.classList.contains(theme)
            ) || 'theme-mocha';


        const nextIndex =
            (themes.indexOf(activeTheme) + 1) %
            themes.length;


        const nextTheme =
            themes[nextIndex];


        document.body.className = nextTheme;

        localStorage.setItem(
            'portfolio_theme',
            nextTheme
        );

    });

}