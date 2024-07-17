class ColorConvertor {
  constructor(element) {
    this.colorConatiner =
      element instanceof Element ? element : document.querySelector(element);

    this.inputEl = this.colorConatiner.querySelector("#userColorInput");
    this.color1 = this.colorConatiner.querySelector(".card1 span");
    this.color2 = this.colorConatiner.querySelector(".card2 span");
    this.convertBtn = this.colorConatiner.querySelector(".cta-btn button");
    this.colorInputEl = this.colorConatiner.querySelector("#colorInput");

    this.currentColor = null;
    this.hsl = null;
    this.rgb = null;
    this.hex = null;

    this.convertBtn.addEventListener("click", (e) => {
      this.convert();
    });

    this.colorInputEl.addEventListener("input", this.updateColor.bind(this));

    this.convert();

    const copyBtns = [...this.colorConatiner.querySelectorAll(".card  button")];

    copyBtns.forEach((btn) => btn.addEventListener("click", this.copyColor));
  }

  findColorName(value) {
    const colorRegex = {
      hsl: /hsla?\(([0-9]*\s?),\s?([0-9]*)%\s?,\s?([0-9]*)%\s?,?\s?([0-9]\.?[0-9]*)?\)/,
      hex: /#([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})?/,
      rgb: /rgba?\(([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)?\s?,?\s?([0-9]\.?[0-9]*)?\)/,
    };

    for (const color in colorRegex)
      if (value.match(colorRegex[color])) {
        let finalValue = value.match(colorRegex[color]);
        this.currentColor = color;
        return finalValue.filter((item) => item && item !== value);
      }
  }

 
}

const colorConatiner = document.getElementById("container");
const colorConvertor = new ColorConvertor(colorConatiner);
