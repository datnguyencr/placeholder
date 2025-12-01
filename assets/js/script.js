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
      backgroundColor: bgColor.replace('#', ''),
      textColor: textColor.replace('#', ''),
      text
   });
   var url=`${window.location.origin}${window.location.pathname}?${params.toString()}`;
   document.getElementById("usageInput").href  = url;
      document.getElementById("usageInput").textContent   = url;
}


// Auto-generate from URL parameters
window.addEventListener('DOMContentLoaded', () => {
   const widthInput = document.getElementById("widthInput");
   const heightInput = document.getElementById("heightInput");
   const bgInput = document.getElementById("bgInput");
   const fgInput = document.getElementById("fgInput");
   const textInput = document.getElementById("textInput");
   const usageInput = document.getElementById("usageInput");

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


   bgInput.addEventListener("input", () => {
      document.getElementById("bgValue").innerHTML = bgInput.value;
   });
   fgInput.addEventListener("input", () => {
      document.getElementById("fgValue").innerHTML = fgInput.value;
   });

});