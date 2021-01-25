export type Result<E, T> = Ok<E, T> | Err<E, T>;

export class Ok<E, T> {
  public constructor(public readonly value: T) {}

  public isOk(): this is Ok<E, T> {
    return true;
  }

  public isErr(): this is Err<E, T> {
    return false;
  }
}

export class Err<E, T> {
  public constructor(public readonly error: E) {}

  public isOk(): this is Ok<E, T> {
    return false;
  }

  public isErr(): this is Err<E, T> {
    return true;
  }
}

/**
 * Construct a new Ok result value.
 */
export const ok = <E, T>(value: T): Ok<E, T> => new Ok(value);

/**
 * Construct a new Err result value.
 */
export const err = <E, T>(error: E): Err<E, T> => new Err(error);
