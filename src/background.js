/* eslint-env browser */

const body = document.querySelector("body");
const images = ["0.jpg", "1.jpg", "2.jpg"];

// 이미지 랜덤으로 불러오기
const choseImage = images[Math.floor(Math.random() * images.length)];
// Console.log(choseImage);

const bgImage = document.createElement("img");
// Console.log(bgImage);

bgImage.src = `../image/${choseImage}`;
// Console.log(bgImage);
bgImage.classList.add("bgImage");
document.body.append(bgImage);
body.prepend(bgImage);
