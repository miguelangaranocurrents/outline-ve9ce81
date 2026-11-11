import type Model from "../base/Model";

// Keyed by the class constructor rather than its name, as class names are not
// guaranteed to be unique once the bundle has been minified.
const fields = new Map<unknown, (string | number | symbol)[]>();

/**
 * Returns the keys recorded as serializable fields on a model.
 *
 * @param target the model to inspect.
 * @returns the keys decorated with @Field.
 */
export const getFieldsForModel = <T extends Model>(target: T) =>
  getFieldsForModelClass(target.constructor);

/**
 * Returns the keys recorded as serializable fields on a model class.
 *
 * @param model the model class to inspect.
 * @returns the keys decorated with @Field.
 */
export function getFieldsForModelClass(model: { name: string }) {
  return fields.get(model) ?? [];
}

/**
 * A decorator that records this key as a serializable field on the model.
 * Properties decorated with @Field will be included in API requests by default.
 *
 * @param target the model the property is defined on.
 * @param propertyKey the key to record as a field.
 */
const Field = (target: Model, propertyKey: string | symbol) => {
  const model = target.constructor;
  fields.set(model, [...(fields.get(model) ?? []), propertyKey]);
};

export default Field;
