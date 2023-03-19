const cleanStrings = require("./clipboard");

const messyStrings = [
  "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog.",
  "[CTRL+V]the tall oak tree towers over the lush green meadow.",
  "the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V].",
  "[CTRL+V]the tall oak tree towers over the lush green meadow.",
  "a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass.",
  "the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright.",
  "[CTRL+X]a fluffy white cloud drifts [CTRL+V][CTRL+C] across the sky, [CTRL+V]",
];

describe("Clipboard Actions", () => {
  describe("when [CTRL+C] and [CTR+V]", () => {
    it("copies all strings before [CTRL+C] and paste at first occurance of [CTR+V]", () => {
      const res = cleanStrings(
        "the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog."
      );
      expect(res).toEqual("the big red fox jumps over the big red lazy dog.");
    });
  });

  describe("when [CTR+V] is before [CTRL+C]", () => {
    it("does not paste, but removes the [CTR+V] command", () => {
      const res = cleanStrings(
        "[CTRL+V]the tall oak tree towers over the lush green meadow."
      );
      expect(res).toEqual(
        "the tall oak tree towers over the lush green meadow."
      );
    });
  });

  describe("when [CTRL+X] and [CTR+V]", () => {
    it("cuts all strings before [CTRL+X] and paste at first occurance of [CTR+V]", () => {
      const res = cleanStrings(
        "the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright."
      );
      expect(res).toEqual(
        "Twinkling in the dark, the shimmering star shines bright."
      );
    });
  });

  describe("All other strings", () => {
    it("[CTRL+V]the tall oak tree towers over the lush green meadow.", () => {
      const res = cleanStrings(
        "[CTRL+V]the tall oak tree towers over the lush green meadow."
      );
      expect(res).toEqual(
        "the tall oak tree towers over the lush green meadow."
      );
    });

    it("the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V].", () => {
      const res = cleanStrings(
        "the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V]."
      );
      expect(res).toEqual(
        "the sun shines down on the sun shines down the busy the sun shines down on the sun shines down."
      );
    });

    it("a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass.", () => {
      const res = cleanStrings(
        "a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass."
      );
      expect(res).toEqual(
        "a majestic lion searches for a majestic lion in the tall grass."
      );
    });

    it("[CTRL+X]a fluffy white cloud drifts [CTRL+V][CTRL+C] across the sky, [CTRL+V]", () => {
      const res = cleanStrings(
        "[CTRL+X]a fluffy white cloud drifts [CTRL+V][CTRL+C] across the sky, [CTRL+V]"
      );
      expect(res).toEqual(
        "a fluffy white cloud drifts  across the sky, a fluffy white cloud drifts "
      );
    });
  });
});
