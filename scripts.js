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

const defaultCode = `<div style="text-align: center; padding: 40px; font-family: 'Nunito', sans-serif;">
    <h2 style="color: #574840; margin-bottom: 10px; font-weight:400;">Welcome</h2>
    <p style="color:  #574840; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
        Thank you so much for joining today.<br>
        Start typing your code on the right to see the magic happen right here. </p>
   
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
    const frameDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@500;700&family=Fredoka:wght@400;500;600;700&family=Baloo+2:wght@400;500;600;700&family=DynaPuff:wght@400;500;600;700&family=Coiny&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap" rel="stylesheet">
        ${userCode}
    `);
    frameDoc.close();
}

function closeDrawers() {
    assetDrawer.style.display = 'none';
    fontDrawer.style.display = 'none';
    colorDrawer.style.display = 'none';
}

assetBtn.addEventListener('click', () => {
    const isOpen = assetDrawer.style.display === 'block';
    closeDrawers();
    assetDrawer.style.display = isOpen ? 'none' : 'block';
});

fontBtn.addEventListener('click', () => {
    const isOpen = fontDrawer.style.display === 'block';
    closeDrawers();
    fontDrawer.style.display = isOpen ? 'none' : 'block';
});

colorBtn.addEventListener('click', () => {
    const isOpen = colorDrawer.style.display === 'block';
    closeDrawers();
    colorDrawer.style.display = isOpen ? 'none' : 'block';
});

document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        const selectedColor = swatch.getAttribute('data-color');
        colorPreviewCircle.style.backgroundColor = selectedColor;
        navigator.clipboard.writeText(selectedColor);
        closeDrawers();
    });
});

document.querySelectorAll('.asset-item').forEach(item => {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(item.getAttribute('data-url'));
        const hint = item.querySelector('.copy-hint');
        if(hint) {
            hint.textContent = 'Copied! 🍓';
            setTimeout(() => { hint.textContent = 'Copy URL'; }, 1500);
        }
    });
});

document.querySelectorAll('.font-item').forEach(item => {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(item.getAttribute('data-code'));
        const codeSpan = item.querySelector('.font-code');
        const original = codeSpan.textContent;
        codeSpan.textContent = 'Copied! ✨';
        setTimeout(() => { codeSpan.textContent = original; }, 1500);
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
const duckSticker = document.querySelector('.duck-sticker');
const speechBubble = document.getElementById('duckSpeechBubble');
const duckText = document.getElementById('duckText');

function duckSaysStuff(event) {
    event.stopPropagation();
    speechBubble.style.display = 'block';
    duckText.textContent = duckTips[tipIndex];
    tipIndex = (tipIndex + 1) % duckTips.length;
}

document.addEventListener('click', (event) => {
    if (!duckSticker.contains(event.target)) {
        speechBubble.style.display = 'none';
    }
});

const themes = ['theme-mocha', 'theme-lavender', 'theme-periwinkle'];

const themeToggleBtn = document.getElementById('themeToggleBtn');

// Load saved theme or default to mocha
const currentTheme = localStorage.getItem('portfolio_theme') || 'theme-mocha';
document.body.className = currentTheme;

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let activeTheme = themes.find(t => document.body.classList.contains(t)) || 'theme-mocha';
        let nextIndex = (themes.indexOf(activeTheme) + 1) % themes.length;
        let nextTheme = themes[nextIndex];

        // Swap classes
        document.body.className = nextTheme;
        
        // Save persistence
        localStorage.setItem('portfolio_theme', nextTheme);
    });
}