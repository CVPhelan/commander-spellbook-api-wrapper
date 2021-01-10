import ColorIdentity from "../../../src/models/color-identity";

describe("ColorIdentity", () => {
  it("has a colors attribute", () => {
    const ci = new ColorIdentity("w,r,b");

    expect(ci.colors).toEqual(["w", "b", "r"]);
  });

  it("sorts colors in WUBRG order", () => {
    const ci = new ColorIdentity("g,b,r,w,u");

    expect(ci.colors).toEqual(["w", "u", "b", "r", "g"]);
  });

  it("handles colorless in colors", () => {
    const ci = new ColorIdentity("c");

    expect(ci.colors).toEqual(["c"]);
  });

  it("handles passing an empty string as colorless in colors", () => {
    const ci = new ColorIdentity("");

    expect(ci.colors).toEqual(["c"]);
  });

  it("handles passing non-WUBRG colors", () => {
    const ci = new ColorIdentity("abcdefghijklmnopqrstuvwxyz");

    expect(ci.colors).toEqual(["w", "u", "b", "r", "g"]);
  });

  it("handles malformed color idenitity strings", async () => {
    const ci = new ColorIdentity("w,u,");

    expect(ci.colors).toEqual(["w", "u"]);
  });

  describe("numberOfColors", () => {
    it("returns the number of colors", () => {
      const ci = new ColorIdentity("wu");

      expect(ci.numberOfColors()).toBe(2);
    });

    it("returns 0 for colorless", () => {
      const ci = new ColorIdentity("c");

      expect(ci.numberOfColors()).toBe(0);
    });
  });

  describe("isWithin", () => {
    it("returns true when color identity is colorless", () => {
      const ci = new ColorIdentity("c");

      expect(ci.isWithin(["w"])).toBe(true);
    });

    it("returns false when colors greater than passed in color identity", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.isWithin(["w"])).toBe(false);
      expect(ci.isWithin(["w", "u"])).toBe(false);
      expect(ci.isWithin(["b", "u"])).toBe(false);
      expect(ci.isWithin(["w", "b"])).toBe(false);
    });

    it("returns true when colors are a subset of the color identity", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.isWithin(["w", "b", "u"])).toBe(true);
      expect(ci.isWithin(["w", "b", "u", "r"])).toBe(true);
      expect(ci.isWithin(["w", "b", "u", "g"])).toBe(true);
      expect(ci.isWithin(["w", "b", "u", "r", "g"])).toBe(true);
    });
  });

  describe("is", () => {
    it("returns false when colors length differs than color identity's length", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.is(["w"])).toBe(false);
      expect(ci.is(["w", "u"])).toBe(false);
      expect(ci.is(["w", "u", "b", "r"])).toBe(false);
      expect(ci.is(["w", "u", "b", "r", "g"])).toBe(false);
    });

    it("returns false when colors do not match exactly", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.is(["w", "u", "r"])).toBe(false);
      expect(ci.is(["g", "u", "w"])).toBe(false);
    });

    it("returns true when colors match exactly (regardless of order)", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.is(["w", "u", "b"])).toBe(true);
      expect(ci.is(["b", "u", "w"])).toBe(true);
      expect(ci.is(["u", "w", "b"])).toBe(true);
      expect(ci.is(["w", "b", "u"])).toBe(true);
    });
  });

  describe("includes", () => {
    it("returns true when colors are part of the color identity", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.includes(["w"])).toBe(true);
      expect(ci.includes(["w", "u"])).toBe(true);
      expect(ci.includes(["b", "u"])).toBe(true);
      expect(ci.includes(["w", "b"])).toBe(true);
      expect(ci.includes(["w", "b", "u"])).toBe(true);
    });

    it("returns false when colors are not included in identity", () => {
      const ci = new ColorIdentity("wub");

      expect(ci.includes(["r"])).toBe(false);
      expect(ci.includes(["g", "r"])).toBe(false);
      expect(ci.includes(["r", "u"])).toBe(false);
      expect(ci.includes(["w", "b", "u", "r", "g"])).toBe(false);
    });
  });

  describe("toString", () => {
    it("returns the original string", () => {
      const ci = new ColorIdentity("g,b,r,w,u");

      expect(ci.toString()).toEqual("g,b,r,w,u");
    });
  });
});
