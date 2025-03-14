/*
 * Explanation about how does it work.
 * https://stackoverflow.com/a/65333050/17080734
 * */
export type RecursiveKeyOf<TObj extends object> = {
    // Create an object type from `TObj`, where all the individual
    // properties are mapped to a string type if the value is not an object
    // or union of string model containing the current and descendant
    // possibilities when it's an object type.
    // Does this for every property in `TObj` that is a string or number
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
        TObj[TKey],
        `${TKey}`
    >;
}[keyof TObj & (string | number)]; // for every string or number property name // Now flatten the object's property model to a final union type

// This type does the same as `RecursiveKeyOf`, but since
// we're handling nested properties at this point, it creates
// the strings for property access and index access
type RecursiveKeyOfInner<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
        TObj[TKey],
        `['${TKey}']` | `.${TKey}`
    >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> =
// If the value is an array then ignore it, providing back
// only the passed in text
    TValue extends any[]
        ? Text
        : // If the value is an object...
        TValue extends object
            ? // Then...
            // 1. Return the current property name as a string
            | Text
            // 2. Return any nested property text concatenated to this text
            | `${Text}${RecursiveKeyOfInner<TValue>}`
            : // Else, only return the current text as a string
            Text;