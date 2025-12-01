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
  ctx.font = `${Math.floor(width/10)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text || `${width}x${height}`, width/2, height/2);

  // Update image
  const img = document.getElementById("placeholderImg");
  img.src = canvas.toDataURL("image/png");

  // Full URL for static site
  const fullURL = `${window.location.origin}/?width=${width}&height=${height}&bg=${bgColor.replace('#','')}&fg=${textColor.replace('#','')}&text=${encodeURIComponent(text)}`;
  document.getElementById("usageInput").value = fullURL;
}

// Example placeholder
generatePlaceholder(400, 247, "#eeeeee", "#444444", "Hello");

// Copy button functionality
document.getElementById("copyBtn").addEventListener("click", () => {
  const input = document.getElementById("usageInput");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied: " + input.value);
});