        const width = 400;
        const height = 247;
        const bgColor = "#eeeeee";
        const fgColor = "#444444";
        const textSize = 30;
        const text = "placeholder";


        function generatePlaceholder(width, height, bgColor, textColor, text, textSize) {
            const canvas = document.getElementById("placeholder");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = textColor;
            ctx.font = `${textSize}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text || `${width}x${height}`, width / 2, height / 2);

            const img = document.getElementById("placeholderImg");
            img.src = canvas.toDataURL("image/png");

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
            if (usageInput) {
                usageInput.href = url;
                usageInput.textContent = url;
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const hasParams = urlParams.has('w') || urlParams.has('h') || urlParams.has('bg') || urlParams.has('fg') || urlParams.has('t') || urlParams.has('s');
            var editor = document.getElementById('editor');
            if (hasParams) {
                // Generate image and show only the image
                const width = parseInt(urlParams.get('w')) || 400;
                const height = parseInt(urlParams.get('h')) || 247;
                const bgColor = urlParams.get('bg') ? `#${urlParams.get('bg')}` : '#eeeeee';
                const fgColor = urlParams.get('fg') ? `#${urlParams.get('fg')}` : '#444444';
                const text = urlParams.get('t') || "placeholder";
                const textSize = parseInt(urlParams.get('s')) || 30;

                const canvas = document.getElementById("placeholder");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = fgColor;
                ctx.font = `${textSize}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, width / 2, height / 2);

                const dataURL = canvas.toDataURL("image/png");
                // Replace page with just the image
                document.body.innerHTML = `<img src="${dataURL}" alt="Placeholder Image" />`;
                editor.style.display = 'block';
            } else {
                // Show editor interface
                const widthInput = document.getElementById("widthInput");
                const heightInput = document.getElementById("heightInput");
                const textSizeInput = document.getElementById("textSizeInput");
                const bgInput = document.getElementById("bgInput");
                const fgInput = document.getElementById("fgInput");
                const textInput = document.getElementById("textInput");
                const generateBtn = document.getElementById("generateBtn");
                const copyButton = document.getElementById("copy");
                const usageInput = document.getElementById("usageInput");



                widthInput.value = width;
                heightInput.value = height;
                bgInput.value = bgColor;
                fgInput.value = fgColor;
                textInput.value = text;
                textSizeInput.value = textSize;

                generatePlaceholder(width, height, bgColor, fgColor, text, textSize);

                bgInput.addEventListener("input", () => document.getElementById("bgValue").textContent = bgInput.value);
                fgInput.addEventListener("input", () => document.getElementById("fgValue").textContent = fgInput.value);

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
            }
        });

        function showToast(message, duration = 2000) {
            const toast = document.getElementById("toast");
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), duration);
        }