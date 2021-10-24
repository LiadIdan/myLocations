type StringKeys<T> = KeysOfType<T, string>;

type KeysOfType<T, V> = keyof T & keyof { [P in keyof T as T[P] extends V ? P : never]: P };
