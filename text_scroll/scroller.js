const scroll = (text, screenWidth, speed) => {
  let position = screenWidth;
  const boldIndexStart = text.match(/(\[B\])/)?.index;
  const boldIndexEnd = text.match(/(\[\/B\])/)?.index;
  const underlineIndexStart = text.match(/(\[U\])/)?.index;
  const underlineIndexEnd = text.match(/(\[\/U\])/)?.index;
  const scrollText = document.getElementById("scroll-text");

  const interval = setInterval(() => {
    let string = text.slice(position - screenWidth, position);

    if (boldIndexStart && underlineIndexStart) {
      const textToBeBold = text.substring(boldIndexStart, boldIndexEnd + 4);
      const boldText = textToBeBold
        .replace(/(\[B\])/, "")
        .replace(/(\[\/B\])/, "");

      const newText = text.replace(textToBeBold, `<b>${boldText}</b>`);
      const textToBeUnderlined = newText.substring(
        underlineIndexStart,
        underlineIndexEnd + 4
      );
      const underlinedText = textToBeUnderlined
        .replace(/(\[U\])/, "")
        .replace(/(\[\/U\])/, "");

      const newNewText = newText.replace(
        textToBeUnderlined,
        `<u>${underlinedText}</u>`
      );

      let string = newNewText.slice(position - screenWidth, position);

      scrollText.innerHTML = string;
    } else if (boldIndexStart && boldIndexEnd) {
      const textToBeBold = text.substring(boldIndexStart, boldIndexEnd + 4);
      const boldText = textToBeBold
        .replace(/(\[B\])/, "")
        .replace(/(\[\/B\])/, "");

      const newText = text.replace(textToBeBold, `<b>${boldText}</b>`);
      let string = newText.slice(position - screenWidth, position);

      scrollText.innerHTML = string;
    } else if (underlineIndexStart && underlineIndexEnd) {
      const textToBeUnderlined = text.substring(
        underlineIndexStart,
        underlineIndexEnd + 4
      );
      const underlinedText = textToBeUnderlined
        .replace(/(\[U\])/, "")
        .replace(/(\[\/U\])/, "");

      const newText = text.replace(
        textToBeUnderlined,
        `<u>${underlinedText}</u>`
      );
      let string = newText.slice(position - screenWidth, position);

      scrollText.innerHTML = string;
    } else {
      scrollText.textContent = string;
    }
    position++;
    if (position > text.length + screenWidth) {
      position = screenWidth;
    }
  }, speed);

  const clear = (e) => {
    e.preventDefault();
    scrollText.innerHTML = "";
    clearInterval(interval);
  };

  const stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", clear);
};

const textInput = document.getElementById("textInput");
const start = (e) => {
  e.preventDefault();
  const text = document.getElementById("textInput").value;
  const screenwidth = Number(document.getElementById("screenWidthInput").value);
  const speed = Number(document.getElementById("speedInput").value);

  scroll(text, screenwidth, speed);
};

const startButton = document.getElementById("start");
startButton.addEventListener("click", start);
