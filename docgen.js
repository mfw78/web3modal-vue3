"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util_1 = require("util");
var fs = require("fs");
var glob = (0, util_1.promisify)(require("glob"));
var vue_docgen_api_1 = require("vue-docgen-api");
var convertToKebabCase = function (str) {
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(function (x) { return x.toLowerCase(); })
        .join("-");
};
var listComponents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var files;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, glob("src/components/**/*.vue")];
            case 1:
                files = _a.sent();
                return [2 /*return*/, files];
        }
    });
}); };
/**
 * Parses the component tags
 * @param {import('vue-docgen-api').ComponentDoc} component
 */
var parseTag = function (component) {
    var tag = {};
    if (component.props) {
        tag.attributes = component.props.map(function (prop) { return convertToKebabCase(prop.name); });
    }
    tag.description = component.description || "";
    return tag;
};
/**
 * Parses the component tags
 * @param {String} componentTag
 * @param {import('vue-docgen-api').ComponentDoc} component
 */
var parseAttributes = function (componentTag, component) {
    var props = {};
    component.props.forEach(function (prop) {
        var propName = convertToKebabCase(prop.name);
        // eslint-disable-next-line no-multi-assign
        var propDoc = (props[componentTag + "/" + propName] = {});
        propDoc.description = prop.description || "";
        if (prop.type) {
            propDoc.type = prop.type.name;
        }
        if (prop.values) {
            propDoc.options = prop.values;
        }
    });
    return props;
};
var parseDocs = function (components) {
    var tags = {};
    var attributes = {};
    components.forEach(function (component) {
        var componentName = component.displayName;
        var componentTag = convertToKebabCase(componentName);
        tags[componentTag] = parseTag(component);
        if (component.props) {
            attributes = __assign(__assign({}, parseAttributes(componentTag, component)), attributes);
        }
    });
    return [tags, attributes];
};
var gen = function () { return __awaiter(void 0, void 0, void 0, function () {
    var components, componentDocsPromises, docs, _a, tags, attributes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, listComponents()];
            case 1:
                components = _b.sent();
                componentDocsPromises = components.map(function (c) { return (0, vue_docgen_api_1.parse)(c); });
                return [4 /*yield*/, Promise.all(componentDocsPromises)];
            case 2:
                docs = _b.sent();
                _a = parseDocs(docs), tags = _a[0], attributes = _a[1];
                fs.writeFileSync("vetur/tags.json", JSON.stringify(tags, null, 2));
                fs.writeFileSync("vetur/attributes.json", JSON.stringify(attributes, null, 2));
                return [2 /*return*/];
        }
    });
}); };
gen();
