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

  convert(colorInputValue = null) {
    let value = colorInputValue ? colorInputValue : this.inputEl.value;

    if (value.trim()) {
      let colorSplit = this.findColorName(value);
      if (this.currentColor === "hsl") this.UpdateHexAndRgb(colorSplit);
      else if (this.currentColor === "hex")
        this.updateRgbAndHsl(colorSplit, value);
      else if (this.currentColor === "rgb") this.updateHexAndHsl(colorSplit);
      else alert("OOPS! Invalid Color");
    }
  }

  UpdateHexAndRgb(color, value) {
    this.hsl = value;
    this.hex = this.getHslToHexCode(color);
    this.rgb = this.getHslToRgbCode(color);
    this.updateDOM(this.hex, this.rgb);
    this.secondaryColor = "hsl";
  }

  updateRgbAndHsl(color, value) {
    this.hex = value;
    this.rgb = this.getHexToRgbCode(color);
    this.hsl = this.getHexToHslCode(color);
    this.updateDOM(this.rgb, this.hsl, this.hex);
    this.secondaryColor = "hex";
  }
  updateHexAndHsl(color, value) {
    this.rgb = value;
    this.hex = this.getRgbToHex(color);
    this.hsl = this.getRgbToHsl(color);
    this.updateDOM(this.hex, this.hsl);
    this.secondaryColor = "rgb";
  }

  updateDOM(c1, c2, hex) {
    this.color1.innerHTML = c1;
    this.color2.innerHTML = c2;
    if (hex && hex.length === 9) hex = hex.slice(0, 7);
    if (c1.length === 9) c1 = c1.slice(0, 7);
    this.colorInputEl.value = hex ? hex : c1;
  }

  updateColor(e) {
    const value = e.target.value;
    this.convert(value);
    this.inputEl.value = value;
  }
}

const colorConatiner = document.getElementById("container");
const colorConvertor = new ColorConvertor(colorConatiner);
