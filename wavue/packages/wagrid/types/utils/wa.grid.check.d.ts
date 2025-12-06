/** null, empty, type 검사 관련 유틸 */
export declare const isNull: (value: any) => boolean;
export declare const isNotNull: (value: any) => boolean;
export declare const isEmpty: (value: any) => boolean;
export declare const isNotEmpty: (value: any) => boolean;
export declare const isNullOr: <T>(a: T | null | undefined, b: T) => T;
