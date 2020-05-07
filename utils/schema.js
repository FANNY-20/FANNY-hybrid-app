import * as Schemas from "@/schemas";
import _forOwn from "lodash.forown";

/**
 * Lance une validation et récupère la valeur du schema validé
 *
 * @param data
 * @param {string} schemaName
 * @param {boolean} throwOnError
 * @param {boolean} allowPartial Autorise la validation de schémas partiels
 * @throws error
 * @returns {{isValid: boolean, value: *}}
 */
export const validateSchema = (data, schemaName, throwOnError = true, allowPartial = true) => {
  const result = Schemas[schemaName].validate(data, {
    allowUnknown: allowPartial,
  });

  if (result.error) {
    const error = new Error(`Schema validation (${schemaName}) has failed for the following reason: ${result.error.message}`);

    if (throwOnError) {
      throw error;
    }

    console.error(error.message);
  }

  return {
    isValid: !result.error,
    value: result.value,
  };
};

function generateEmptyShellFromDescribedSchema(describedSchema) {
  let emptyShell;

  if (Array.isArray(describedSchema.valids) && describedSchema.valids.length > 0) {
    return describedSchema.valids[0];
  }

  switch (describedSchema.type) {
    case "string":
      emptyShell = String()
        .valueOf();
      break;
    case "number":
      emptyShell = Number()
        .valueOf();
      break;
    case "boolean":
      emptyShell = Boolean()
        .valueOf();
      break;
    case "object":
      emptyShell = Object()
        .valueOf();

      if (Object.prototype.hasOwnProperty.call(describedSchema, "children")) {
        _forOwn(describedSchema.children, (childValue, childKey) => {
          emptyShell[childKey] = generateEmptyShellFromDescribedSchema(childValue);
        });
      }

      break;
    case "array":
      emptyShell = Array()
        .valueOf();
      break;
    case "function":
      emptyShell = Function()
        .valueOf();
      break;
    case "symbol":
      emptyShell = Symbol()
        .valueOf();
      break;
    default:
      emptyShell = null;
      break;
  }

  return emptyShell;
}

/**
 * Génère une instance concrète basée sur un schema, avec des valeurs par défault
 *
 * @param {string} schemaName
 * @returns {*}
 */
export const generateEmptyShellFromSchema = (schemaName) => {
  const describedSchema = Schemas[schemaName].describe();

  return generateEmptyShellFromDescribedSchema(describedSchema);
};
