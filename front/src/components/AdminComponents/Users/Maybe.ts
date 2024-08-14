/**

 * Интерфейс для Just.

 * @template T

 */

interface Just<T> {

    isNothing: () => false;

    isJust: () => true;

    map: <U>(f: (value: T) => U) => Maybe<U>;

    getOrElse: () => T;

    filter: (f: (value: T) => boolean) => Maybe<T>;

    chain: <U>(f: (value: T) => Maybe<U>) => Maybe<U>;

    toString: () => string;

    value: () => T;

}



/**
 
 * Интерфейс для Nothing.
 
 */

interface Nothing {

    isNothing: () => true;

    isJust: () => false;

    map: () => Nothing;

    getOrElse: <U>(other: U) => U;

    filter: () => Nothing;

    chain: () => Nothing;

    toString: () => string;

    value: () => never;

}



/**
 
 * Объединенный тип для Maybe.
 
 * @template T
 
 */

type Maybe<T> = Just<T> | Nothing;



/**
 
 * Монада Maybe предоставляет способ работы с необязательными значениями.
 
 * Определяет два конструктора: Just и Nothing, и утилитную функцию fromNullable.
 
 * @example
 
 * const Just = Maybe.Just;
 
 * const Nothing = Maybe.Nothing;
 
 * const fromNullable = Maybe.fromNullable;
 
 * const value = fromNullable(null).map(x => x + 1).getOrElse(0); // 0
 
 * @example
 
 * const Just = Maybe.Just;
 
 * const Nothing = Maybe.Nothing;
 
 * const fromNullable = Maybe.fromNullable;
 
 * const value = fromNullable(5).map(x => x + 1).getOrElse(0); // 6
 
 */

const Maybe = (() => {

    /**
  
     * Представляет значение, которое существует (не null или undefined).
  
     * @template T
  
     * @param {T} value - Значение для обертки.
  
     * @returns {Just<T>} Объект Just с различными методами.
  
     */

    const Just = <T>(value: T): Just<T> => ({

        isNothing: () => false,

        isJust: () => true,

        map: <U>(f: (value: T) => U): Maybe<U> => fromNullable(f(value)),

        getOrElse: () => value,

        filter: (f: (value: T) => boolean): Maybe<T> => fromNullable(f(value) ? value : null),

        chain: <U>(f: (value: T) => Maybe<U>): Maybe<U> => f(value),

        toString: () => `Maybe.Just(${value})`,

        value: () => value,

    });



    /**
  
     * Представляет значение, которое отсутствует (null или undefined).
  
     * @returns {Nothing} Объект Nothing с различными методами.
  
     */

    const Nothing = (): Nothing => ({

        isNothing: () => true,

        isJust: () => false,

        map: () => Nothing(),

        getOrElse: (other) => other,

        filter: () => Nothing(),

        chain: () => Nothing(),

        toString: () => 'Maybe.Nothing()',

        value: () => { throw new TypeError("Can't extract the value of a Nothing"); },

    });



    /**
  
     * Создает экземпляр Just, если значение не равно null и не undefined, иначе Nothing.
  
     * @template T
  
     * @param {T | null | undefined} a - Значение для проверки.
  
     * @returns {Maybe<T>} Экземпляр Just или Nothing.
  
     */

    const fromNullable = <T>(a: T | null | undefined): Maybe<T> => (a !== null && a !== undefined ? Just(a) : Nothing());



    return {

        Just,

        Nothing,

        fromNullable

    };

})();



export { Maybe };



