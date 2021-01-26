/* eslint-disable max-classes-per-file */

export type Result<E, T> = Ok<E, T> | Err<E, T>;

export class Ok<E, T> {
  public constructor(public readonly value: T) {}

  public isOk = (): this is Ok<E, T> => true;

  public isErr = (): this is Err<E, T> => false;

  public okOrDefault = (): T => this.value;
}

export class Err<E, T> {
  public constructor(
    public readonly error: E,
    private readonly defaultValue: T,
  ) {}

  public isOk = (): this is Ok<E, T> => false;

  public isErr = (): this is Err<E, T> => true;

  public okOrDefault = (): T => this.defaultValue;
}

/**
 * Construct a new Ok result value.
 */
export const ok = <E, T>(value: T): Ok<E, T> => new Ok(value);

/**
 * Construct a new Err result value.
 */
export const err = <E, T>(error: E, defaultValue: T): Err<E, T> =>
  new Err(error, defaultValue);
