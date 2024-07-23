export const projection = <T, K extends keyof any>
    (meta: { [P in K]: [keyof T, (val: any) => any] }) => {
    //принимает в качестве аргумента объект где p отдельный ключ из множества k
    //первым параметром  он принимает ключи типа T и функцию которая принимает любой тип и возвращает его

    const keys = Object.keys(meta) as K[];

    return (obj: T): { [P in K]: any } => {

        const hash = {} as { [P in K]: any }

        for (const key of keys) {
            const [name, fn] = meta[key];
            let val = obj[name];

            if (val != null && val !== '') {
                if (fn) val = fn(val);
                hash[key] = val;
            }
        }
        return hash;
    }
};