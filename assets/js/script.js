function generatePlaceholder(width, height, bgColor, textColor, text, textSize) {
    const canvas = document.getElementById("placeholder");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = `${textSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text || `${width}x${height}`, width / 2, height / 2);

    // Update image
    const img = document.getElementById("placeholderImg");
    img.src = canvas.toDataURL("image/png");

    // URL with short parameters
    const params = new URLSearchParams({
        w: width,
        h: height,
        bg: bgColor.replace('#', ''),
        fg: textColor.replace('#', ''),
        t: text,
        s: textSize
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const usageInput = document.getElementById("usageInput");
    usageInput.href = url;
    usageInput.textContent = url;
}

// Auto-generate from short URL parameters
window.addEventListener('DOMContentLoaded', () => {
    const widthInput = document.getElementById("widthInput");
    const heightInput = document.getElementById("heightInput");
    const textSizeInput = document.getElementById("textSizeInput");
    const bgInput = document.getElementById("bgInput");
    const fgInput = document.getElementById("fgInput");
    const textInput = document.getElementById("textInput");
    const generateBtn = document.getElementById("generateBtn");
    const copyButton = document.getElementById("copy");
    const urlParams = new URLSearchParams(window.location.search);
    const width = parseInt(urlParams.get('w')) || 400;
    const height = parseInt(urlParams.get('h')) || 247;
    const backgroundColor = urlParams.get('bg') ? `#${urlParams.get('bg')}` : '#eeeeee';
    const textColor = urlParams.get('fg') ? `#${urlParams.get('fg')}` : '#444444';
    const textSize = parseInt(urlParams.get('s')) || 30;
    const text = urlParams.get('t') || "placeholder";

    // Update input fields
    widthInput.value = width;
    heightInput.value = height;
    bgInput.value = backgroundColor;
    fgInput.value = textColor;
    textInput.value = text;
    textSizeInput.value = textSize;

    // Initial generation
    generatePlaceholder(width, height, backgroundColor, textColor, text, textSize);

    // Update color values display
    bgInput.addEventListener("input", () => {
        document.getElementById("bgValue").textContent = bgInput.value;
    });
    fgInput.addEventListener("input", () => {
        document.getElementById("fgValue").textContent = fgInput.value;
    });

    // Generate button action
    generateBtn.addEventListener("click", () => {
        generatePlaceholder(
            parseInt(widthInput.value),
            parseInt(heightInput.value),
            bgInput.value,
            fgInput.value,
            textInput.value,
            parseInt(textSizeInput.value)
        );
    });

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(usageInput.href);
        showToast("Copied URL!");
    } catch (err) {
        console.error("Failed to copy: ", err);
        showToast("Failed to copy URL");
    }
});

});
function showToast(message, duration = 2000) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}