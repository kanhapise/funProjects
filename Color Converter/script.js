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

  // HSL to RGB AND HEX

  getHslToHexCode(arr) {
    const rgb = this.hslToRgb(arr);
    let alpha = null;
    if (rgb.length === 4) {
      alpha = Math.round(rgb[3] * 255).toString(16);
      rgb.pop();
    }

    const hexColor = rgb
      .map((item) => {
        const hex = item.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join("");

    return `#${hexColor}${alpha ? alpha : ""}`;
  }

  getHslToRgbCode(arr) {
    const rgb = this.hslToRgb(arr);
    let alpha = null;
    if (rgb.length === 4) alpha = rgb[rgb.length - 1];

    return `rgb${alpha ? "a" : ""}(${rgb[0]}, ${rgb[1]}, ${rgb[2]}${
      alpha ? `, ${alpha}` : ``
    })`;
  }

  hslToRgb(arr) {
    let h = arr[0];
    let s = arr[1];
    let l = arr[2];
    let a = null;
    if (arr.length === 4) {
      a = arr[arr.length - 1];
    }

    h /= 360;
    s /= 100;
    l /= 100;

    let r = null;
    let g = null;
    let b = null;

    if (s === 0) r = g = b = l;
    else {
      function hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    let res = [r, g, b].map((item) => Math.round(item * 255));

    if (a) res.push(a * 1);

    return res;
  }

}

const colorConatiner = document.getElementById("container");
const colorConvertor = new ColorConvertor(colorConatiner);
