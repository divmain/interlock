/* eslint-disable max-nested-callbacks,no-new */

import path from "path";

import _ from "lodash";

import Interlock from "../../lib/index.js";

const minimalValidConfig = {
  entry: { "./index.js": "bundle.js" },
  srcRoot: path.join(__dirname, "/../..")
};

describe("lib/index", () => {
  describe("constructor", function () {
    // TODO: Test for [] and undefined. _.merge ignores those values.
    it("throws an Error if not passed invalid options", function () {
      // Missing or empty config
      expect(() => { new Interlock(); }).to.throw(Error);
      expect(() => { new Interlock({}); }).to.throw(Error);

      // Invalid options.entry
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { entry: true })); })
        .to.throw(Error);
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { entry: 1 })); })
        .to.throw(Error);
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { entry: null })); })
        .to.throw(Error);
      expect(() => {
        var invalidConfig = _.merge({}, minimalValidConfig);
        delete invalidConfig.entry;
        new Interlock(invalidConfig);
      }).to.throw(Error);

      // Invalid options.srcRoot
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { srcRoot: true })); })
        .to.throw(Error);
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { srcRoot: 1 })); })
        .to.throw(Error);
      expect(() => { new Interlock(_.merge({}, minimalValidConfig, { srcRoot: null })); })
        .to.throw(Error);
      expect(() => {
        var invalidConfig = _.merge({}, minimalValidConfig);
        delete invalidConfig.srcRoot;
        new Interlock(invalidConfig);
      }).to.throw(Error);
    });

    it("fills in default values when not passed in", function () {
      var ilk = new Interlock(minimalValidConfig);

      expect(ilk.options).to.deep.equal({
        entry: { "./index.js": { dest: "bundle.js" }},
        split: {},
        srcRoot: path.join(__dirname, "/../.."),
        context: path.join(__dirname, "../.."),
        destRoot: path.join(__dirname, "../..", "dist"),
        extensions: [ ".js", ".jsx", ".es6" ],
        ns: "interlock",
        implicitBundleDest: "[setHash].js"
      });
    });

    it("allows overrides to the default config", function () {
      var ilk = new Interlock({
        entry: { "./index.js": "bundle.js" },
        srcRoot: path.join(__dirname, "/../.."),
        context: "custom context",
        destRoot: "custom destRoot",
        extensions: [".custom"],
        ns: "custom-namespace"
      });

      expect(ilk.options).to.deep.equal({
        entry: { "./index.js": { "dest": "bundle.js" } },
        split: {},
        srcRoot: "/Users/daleb/dev/me/interlock",
        context: "custom context",
        destRoot: "custom destRoot",
        extensions: [".custom"],
        ns: "custom-namespace",
        implicitBundleDest: "[setHash].js"
      });
    });
  });

  describe("build", function () {
    it("return a Promise");
    it("resolves to the compilation output");
  });
  describe("watch", function () {
    it("rebuilds on file change");
  });
  describe("_saveBundles", function () {
    it("saves output from compilation to destRoot");
    it("prefixes bundles with namespace");
  });
});