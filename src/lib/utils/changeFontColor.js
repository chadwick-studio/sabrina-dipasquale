// @ts-nocheck
let fontColor = "fff";

function handleImageLoad(image, callback) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let colorSum = 0;

  for (let x = 0; x < data.length; x += 4) {
    const r = data[x];
    const g = data[x + 1];
    const b = data[x + 2];

    const avg = Math.floor((r + g + b) / 3);
    colorSum += avg;
  }

  const brightness = Math.floor(colorSum / (image.width * image.height));
  callback(brightness);
  image.removeEventListener("load", () => handleImageLoad(image, callback));
}

function getImageBrightness(imageSrc, callback) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imageSrc;
  image.style.display = "none";
  document.body.appendChild(image);

  if (!image.complete) {
    image.addEventListener("load", () => handleImageLoad(image, callback));
  }
}

export const changeFontColor = (node, nodeSrc) => {
  const updateFontColor = () => {
    getImageBrightness(node.src, (brightness) => {
      console.log("brightness", brightness);
      fontColor = brightness > 225 / 2 ? "#000" : "#fff";
    });
    node.dispatchEvent(
      new CustomEvent("changeBrightness", {
        detail: fontColor,
      }),
    );
  };

  updateFontColor();

  return {
    update() {
      updateFontColor();
    },
  };
};
