import medicalDataFields from "@/utils/helper/dataSets";
import Fuse from "fuse.js";

export const analyzeObjectList = (
  objList: object[],
): {
  objectCount: number;
  shortestObjectLength: number;
  longestObjectLength: number;
} => {
  let objectCount = 0;
  let longestObjectLength = 0;
  let shortestObjectLength = Infinity;
  let longestObjectIndex;
  let shortestObjectIndex;
  for (const key in objList) {
    if (objList.hasOwnProperty(key)) {
      objectCount++;
      const currentObject = objList[key];
      const currentObjectLength = Object.keys(currentObject).length;
      if (currentObjectLength > longestObjectLength) {
        longestObjectLength = currentObjectLength;
        longestObjectIndex = key;
      }
      if (currentObjectLength < shortestObjectLength) {
        shortestObjectLength = currentObjectLength;
        shortestObjectIndex = key;
      }
    }
  }
  return {
    objectCount,
    shortestObjectLength,
    longestObjectLength,
  };
  console.log(`Number of objects in the main list: ${objectCount}`);
  console.log(
    `Length of the longest object (index ${longestObjectIndex}): ${longestObjectLength}`,
  );
  console.log(
    `Length of the shortest object (index ${shortestObjectIndex}): ${shortestObjectLength}`,
  );
};

export const isInvalidString = (value: string): boolean => {
  return !/[a-zA-Z/]/.test(value);
};

export const isInvalidNumber = (value: string): boolean => {
 return !/^[+-]?\d+(\.\d+)?$/.test(value);
};

export const processCsvData = (csvData: object[]): object[] => {
  const fuse = new Fuse(medicalDataFields, {
    threshold: 0.5,
    keys: ["name"],
  });
  const processedData = csvData
    .map((row: any) => {
      const processedRow: any = {};
      Object.keys(row).forEach((columnName: string) => {
        const result = fuse.search(columnName);
        if (result.length > 0 && result[0].item) {
          const mainAttribute = result[0].item.name;
          const csvValue = row[columnName];
          const expectedAttribute = medicalDataFields.find(
            (attribute) => attribute.name === mainAttribute,
          );
          if (expectedAttribute) {
            const expectedDataType: any = expectedAttribute.dataType;
            if (typeof expectedDataType === "string") {
              if (
                (expectedDataType === "string" &&
                  typeof csvValue === "string" &&
                  csvValue.trim() !== "" &&
                  !isInvalidString(csvValue)) ||
                (expectedDataType === "number" && !isInvalidNumber(csvValue))
              ) {
                if (
                  expectedAttribute.allowedValues &&
                  !expectedAttribute.allowedValues(csvValue)
                ) {
                  return;
                }

                if (
                  expectedDataType === "number" &&
                  (typeof expectedAttribute.minValue === "number" ||
                    typeof expectedAttribute.maxValue === "number") &&
                  !isNaN(parseFloat(csvValue))
                ) {
                  const numericValue = parseFloat(csvValue);
                  if (
                    (isNaN(expectedAttribute.minValue!) ||
                      numericValue >= expectedAttribute.minValue!) &&
                    (isNaN(expectedAttribute.maxValue!) ||
                      numericValue <= expectedAttribute.maxValue!)
                  ) {
                    processedRow[mainAttribute] = numericValue;
                  }
                } else {
                  processedRow[mainAttribute] = csvValue;
                }
              }
            } else if (typeof expectedDataType === "function") {
              if (expectedDataType(csvValue)) {
                processedRow[mainAttribute] = csvValue;
              }
            }
          }
        }
      });
      return processedRow;
    })
    .filter((row) => Object.keys(row).length > 0);
  return processedData;
};

export const calculateColumnCounts = (
  rawObjects: object[],
  parsedObjects: object[],
): { name: string; rawColumns: number; parsedColumns: number }[] => {
  const result: { name: string; rawColumns: number; parsedColumns: number }[] =
    [];

  for (let i = 0; i < rawObjects.length && i < parsedObjects.length; i++) {
    const rawObject: any = rawObjects[i];
    const parsedObject: any = parsedObjects[i];

    // Initialize counters for rawColumns and parsedColumns
    let rawColumns = 0;
    let parsedColumns = 0;

    // Count attributes with non-empty string values
    for (const key in rawObject) {
      if (rawObject.hasOwnProperty(key) && rawObject[key] !== "") {
        rawColumns++;
      }
    }

    for (const key in parsedObject) {
      if (parsedObject.hasOwnProperty(key) && parsedObject[key] !== "") {
        parsedColumns++;
      }
    }

    // Add the result to the array
    result.push({ name: (i + 1).toString(), rawColumns, parsedColumns });
  }

  return result;
};

export const countAttributes = (
  obj: object[],
): { name: string; attributeCount: number }[] => {
  const result: { name: string; attributeCount: number }[] = [];

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const innerObject = obj[key];
      const attributeCount = Object.keys(innerObject).length;
      result.push({ name: key, attributeCount });
    }
  }

  return result;
};
