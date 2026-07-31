
export default {
    name: "jakeayy-code",
    type: "dark",
    colors: {
        "editor.background": "#3a3a3a", // surface
        "editor.foreground": "#e6e6e6"  // fg
    },
    tokenColors: [
        { settings: { foreground: "#e6e6e6" } }, // fg
        { scope: ["comment"], settings: { foreground: "#8a8a8a", fontStyle: "italic" } }, // faint
        { scope: ["string", "string.quoted", "string.template"], settings: { foreground: "#cccccc" } }, // accent-soft
        { scope: ["constant.numeric", "constant.language", "constant.character", "constant.other"], settings: { foreground: "#f4f4f4", fontStyle: "bold" } }, // accent
        { scope: ["keyword.control", "storage.type", "storage.modifier"], settings: { foreground: "#e6e6e6", fontStyle: "bold" } },
        { scope: ["keyword.operator"], settings: { foreground: "#b0b0b0" } }, // muted
        { scope: ["entity.name.function", "support.function"], settings: { foreground: "#e6e6e6", fontStyle: "bold" } },
        { scope: ["entity.name.tag", "entity.name.type", "entity.name.class", "support.class", "support.type"], settings: { foreground: "#b0b0b0" } }, // muted
        { scope: ["variable", "variable.parameter", "variable.other"], settings: { foreground: "#e6e6e6" } },
        { scope: ["punctuation", "meta.brace"], settings: { foreground: "#b0b0b0" } }, // muted
        { scope: ["invalid"], settings: { foreground: "#f4f4f4", fontStyle: "bold underline" } } // accent
    ]
};
