import { Prisma } from '@prisma/client';

export const changeRelationTable = (id?: string | null) => {
  if (id) {
    return {
      connect: {
        id,
      },
    };
  } else if (id === null) {
    return {
      disconnect: true,
    };
  } else {
    return undefined;
  }
};

export const setPrismaObject = (valid: any, structure: object) => {
  return valid ? structure : undefined;
};
export const changeInputJsonObject = (
  file?: any,
): Prisma.InputJsonValue | Prisma.NullTypes.JsonNull | undefined => {
  if (file) {
    return file as unknown as Prisma.InputJsonObject;
  } else if (file === null) {
    return Prisma.JsonNull;
  } else {
    return undefined;
  }
};

export function generateCode() {
  return Math.floor(Math.random() * (100000 - 999999 + 1) + 999999).toString();
}

export const sanitizeQueryIncludes = (include: object, list: string[]) => {
  const setInclude = {};

  list.forEach((key) => {
    if (include[key]) {
      setInclude[key] = include[key];
    }
  });

  return setInclude;
};

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
