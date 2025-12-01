function generatePlaceholder(width, height, bgColor, textColor, text) {
    const canvas = document.getElementById("placeholder");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = `${Math.floor(width / 10)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text || `${width}x${height}`, width / 2, height / 2);

    // Update image
    const img = document.getElementById("placeholderImg");
    img.src = canvas.toDataURL("image/png");

    // URL with parameters
    const params = new URLSearchParams({
        width, 
        height, 
        backgroundColor: bgColor.replace('#',''), 
        textColor: textColor.replace('#',''), 
        text
    });
    document.getElementById("usageInput").value = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}



// Auto-generate from URL parameters
window.addEventListener('DOMContentLoaded', () => {

  // Generate from input fields
document.getElementById("generateBtn").addEventListener("click", () => {
    const width = parseInt(document.getElementById("widthInput").value) || 400;
    const height = parseInt(document.getElementById("heightInput").value) || 247;
    const bgColor = document.getElementById("bgInput").value || "#eeeeee";
    const textColor = document.getElementById("fgInput").value || "#444444";
    const text = document.getElementById("textInput").value || "placeholder";

    generatePlaceholder(width, height, bgColor, textColor, text);
});

// Copy URL
document.getElementById("copyBtn").addEventListener("click", () => {
    const input = document.getElementById("usageInput");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied: " + input.value);
});

    const urlParams = new URLSearchParams(window.location.search);
    const width = parseInt(urlParams.get('width')) || 400;
    const height = parseInt(urlParams.get('height')) || 247;
    const backgroundColor = urlParams.get('backgroundColor') ? `#${urlParams.get('backgroundColor')}` : '#eeeeee';
    const textColor = urlParams.get('textColor') ? `#${urlParams.get('textColor')}` : '#444444';
    const text = urlParams.get('text') || "placeholder";

    // Update input fields with URL values
    document.getElementById("widthInput").value = width;
    document.getElementById("heightInput").value = height;
    document.getElementById("bgInput").value = backgroundColor;
    document.getElementById("fgInput").value = textColor;
    document.getElementById("textInput").value = text;

    generatePlaceholder(width, height, backgroundColor, textColor, text);
});