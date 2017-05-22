/* eslint-disable */
import { getFive, uniqueArray } from "../src/scripts/app";

describe("app", () => {
  describe("getFive", () => {
    it("should return 5", () => {
      expect(getFive()).to.equal(5);
    });
  });

  describe("uniqueArray", () => {
    it("should return an array", () => {
      expect(uniqueArray([1, 1, 2, 2, 3, 3])).to.be.an("array");
    });
    it("should return an array with unique elements", () => {
      expect(uniqueArray([1, 1, 2, 2, 3, 3])).to.eql([1, 2, 3]);
    });
  });
});
