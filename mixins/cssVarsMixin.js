import _camelCase from "lodash.camelcase";
import _isPlainObject from "lodash.isplainobject";

/**
 * Permet d'interagir avec les variables CSS
 */
export default {
  data() {
    return {
      cssVars: {},
    };
  },
  methods: {
    /**
     * Bind une liste de variables CSS à l'instance Vue (data)
     * Voir #bindCssVar()
     *
     * @public
     * @param {array} cssVars Un tableau de String ou d'Object ({name, alias})
     */
    bindCssVars(cssVars) {
      for(const cssVar of cssVars) {
        if (typeof cssVar === "string") {
          this.bindCssVar(cssVar);
        } else if (_isPlainObject(cssVar)) {
          this.bindCssVar(cssVar.name, cssVar.alias);
        } else {
          console.warn("Trying to bind a cssVar that is not String nor Object (cssVarsMixin)");
        }
      }
    },
    /**
     * Bind une variable CSS à l'instance Vue (data)
     * La variable est accessible par son alias (si défini)
     * ou par son nom en camelCase, dans l'attribut "cssVars"
     *
     * @public
     * @param {string} cssVarName
     * @param {string} alias
     */
    bindCssVar(cssVarName, alias = null) {
      if (cssVarName.indexOf("--") !== 0) {
        throw new Error(`The CSS var name must start with "--" (${cssVarName})`);
      }

      const jsVarName = alias || _camelCase(cssVarName);
      const value = this.getCssVar(cssVarName);

      this.$set(this.cssVars, jsVarName, value);
      this.$watch(`cssVars.${jsVarName}`, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          this.setCssVar(cssVarName, newVal);
        }
      });
    },
    /**
     * Accède à la valeur d'une variable CSS
     *
     * @public
     * @param {string} cssVarName
     * @returns {string}
     */
    getCssVar(cssVarName) {
      if (cssVarName.indexOf("--") !== 0) {
        throw new Error(`The CSS var name must start with "--" (${cssVarName})`);
      }

      return getComputedStyle(this.$el)
        .getPropertyValue(cssVarName)
        .trim();
    },
    /**
     * Modifie la valeur d'une variable CSS
     *
     * @public
     * @param {string} cssVarName
     * @param {string|number} value
     */
    setCssVar(cssVarName, value) {
      if (cssVarName.indexOf("--") !== 0) {
        throw new Error(`The CSS var name must start with "--" (${cssVarName})`);
      }

      this.$el.style.setProperty(cssVarName, value);
    },
  },
};
