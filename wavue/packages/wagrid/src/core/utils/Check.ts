/** null, empty, type 검사 관련 유틸 */
export const isNull = (value: any): boolean =>
    value === null || value === undefined;

export const isNotNull = (value: any): boolean =>
    !isNull(value);

export const isEmpty = (value: any): boolean =>
    value === null || value === undefined || String(value).trim() === "";

export const isNotEmpty = (value: any): boolean =>
    !isEmpty(value);

export const isNullOr = <T>(a: T | null | undefined, b: T): T =>
    isNull(a) ? b : a;
