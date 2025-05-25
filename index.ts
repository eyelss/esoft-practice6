//---------------------------------------------------------------------------------
//Разминка
// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  // Добавьте свойство email типа string
  email: string;
}

// Определите интерфейс для активности пользователя
interface Activity {
  userId: number;
  activity: string;
  // Добавьте свойство timestamp типа Date
  timestamp: Date;
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData(url: string): Promise<JSON> {
  return await fetch(url);
  // Реализуйте получение данных с использованием fetch и возвращение их в формате json
}

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>; // Заполните тип
type ReadonlyActivity = Readonly<User>; // Заполните тип

//Типизируйте функцию. userId - число
function getUserActivities(userId: number): Promise<JSON> {
  return fetchData(`/api/activities/${userId}`);
}
// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>// Заполните тип

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };
// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type Permissions<T> = T extends AdminPermissions ? AdminPermissions : BasicPermissions; 


///ЧАСТЬ 2.

// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number;// Заполните тип

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  // Реализуйте вывод сообщения в консоль
  console.log(message);
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  // Бросьте исключение с errorMsg
  throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  // Верните результат проверки типа
  return typeof value === 'string';
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  // Бросьте исключение, если значение не является числом
  if (typeof value !== 'number') {
    throwError('Wrong type');
  }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
  // Реализуйте логику проверки и обработки значения
  if (isString(value)) {
    console.log('Value is string!');
  }

  assertIsNumber(value);
  console.log('Value is number!');
}

// Type Alias и Union
type StringOrNumber = string | number;


//сделайте  Type Guard для определения, является ли значение строкой
function isString(value): value is string {
}

// создайте asserts function на число.
function assertIsNumber(value: any): asserts value is number {
  
}

// Использование Type Guard и Asserts
function processValue(value: StringOrNumber) {
  if (isString(value)) {
    console.log(`String value: ${value.toUpperCase()}`);
  } else {
    assertIsNumber(value);
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}

//---------------------------------------------------------------------------------



//---------------------------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface Response<T> {
  data: T;
  status: number;
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): Response<T> {
  // Реализуйте создание и возврат объекта Response
  return {
    data,
    status,
  };
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 2, 3], 200);// Заполните вызов функции

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const userResponse = createResponse({
  id: 0,
  name: 'name',
  email: 'email',
  age: 50,
} as User, 500)// Заполните вызов функции
//---------------------------------------------------------------------------------

  
//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля 
type Car = {
  company: string;
  model: string;
  year: number;
};

// Определите тип данных для описания велосипеда
type Bike = {
  company: string;
  type: 'road' | 'mountain';
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle): vehicle is Car {
  return typeof vehicle === 'object' &&
    typeof vehicle.company === 'string' &&
    typeof vehicle.model === 'string' &&
    typeof vehicle.year === 'number';
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.make} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.make} ${vehicle.type}`);
  }
}
//---------------------------------------------------------------------------------
  


//---------------------------------------------------------------------------------  
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>;// Заполните тип

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>// Заполните тип

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee) {
  // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
  console.log(`[${employee.id ?? '*'}] ${employee.name ?? 'unnamed'}<${employee.email ?? '*'}>${employee.department !== undefined ? ' at '+employee.department : ''}`);
}
//---------------------------------------------------------------------------------




//---------------------------------------------------------------------------------  
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User['id']// Заполните тип

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof 
type UserFieldsToBoolean = {
  [Key in keyof User]: boolean; 
}

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<TKey extends keyof User>(key: TKey) {
  // Верните тип ключа
  switch (key) {
    case 'name':
    case 'email':
      return 'string';
    default:
      return 'number';
  }
}

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType('age');
const nameType = getUserFieldType('name');
//---------------------------------------------------------------------------------






//---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

// Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
  id: number;
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
];
const user = findById(users, 1);
//---------------------------------------------------------------------------------






//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface User {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T, K extends keyof T>(items: T[], key: K, value: T[K]): T | undefined {
  return items.find(item => item[key] === value);
}

// реализация для поиска по нескольким ключам (для пустого объекта вернет первый элемент):
function findInArrayByKeys<T, K extends keyof T>(items: T[], obj: { [key in K]: T[key] }): T | undefined {
  return items.find(item => {
    for (const key in obj) {
      if (item[key] !== obj[key]) {
        return false;
      }
    }
    return true;
  })
}

// Данные для тестирования функции
const users: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 }
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 }
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" }
];

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArrayByKeys(users, { name: 'Alice' });
// 2. Найдите продукт с ценой 500.
const foundProduct = findInArrayByKeys(products, { price: 500 });
// 3. Найдите книгу по автору "Another One".
const foundBook = findInArrayByKeys(books, { author: 'Another One' });
//---------------------------------------------------------------------------------






//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(items: T[], transform: (v:T)=>U, filter:(v:U)=>boolean): U[] {
  return items
    .map(transform)
    .filter(filter);
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 }
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
// !Изменится сигнатура функции: придется передавать callback сравнения соседних элементов коллекции:
function mapAndFilterAndSort<T, U>(items: T[], transform: (v:T)=>U, filter:(v:U)=>boolean, sort:(a:U,b:U)=>number): U[] {
  return items
    .map(transform)
    .filter(filter)
    .sort(sort);
}
// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.
// !На обобщенныетипы T и U не распространяются никакие ограничения, 
// !соответственно могут быть полностью разными и могут иметь общие характеристики.

//---------------------------------------------------------------------------------




//---------------------------------------------------------------------------------
// Задание 9:
// Реализовать DeepReadonly<T>
// Задача:
// Создать тип, который делает все поля объекта (включая вложенные) доступными только для чтения (readonly).

// Что нужно сделать:

// Обработать объекты рекурсивно.

// Учесть массивы и другие структуры данных.

// Не трогать примитивы (string, number, boolean).
// Подсказки:
// Используйте условные типы (extends, infer) для сложных проверок.
// Для рекурсии ограничивайте глубину (иначе TypeScript может зависнуть):
// Мы делали нечто похожее в рамках задачи по Partial типу. Подумайте теперь как сделать свой readonly, еще и глубокий.


//Прмер:
type User = {
  name: string;
  address: {
    city: string;
    street: string;
  };
  hobbies: string[];
};

type Down<N extends number> =
  N extends 7 ? 6 :
  N extends 6 ? 5 :
  N extends 5 ? 4 :
  N extends 4 ? 3 :
  N extends 3 ? 2 :
  N extends 2 ? 1 :
  N extends 1 ? 0 : never

type DeepReadonly<T, Depth extends number = 7> = Depth extends 0 ? T : {
  readonly [K in keyof T]: T[K] extends Object ? DeepReadonly<T[K], Down<Depth>> : T[K]
}

type DeepReadonlyUser = DeepReadonly<User>;
/* Результат:
{
  readonly name: string;
  readonly address: {
    readonly city: string;
    readonly street: string;
  };
  readonly hobbies: readonly string[];
}
*/
//---------------------------------------------------------------------------------







//---------------------------------------------------------------------------------
//Задание 10:

// Написать тип для преобразования методов класса в Promise-версии
// Задача:
// Создать тип Promisify<T>, который преобразует все методы класса так, чтобы они возвращали Promise.

// Что нужно сделать:

// Определить, какие свойства класса являются методами.

// Заменить возвращаемый тип каждого метода на Promise<...>.

// Не трогать поля (не методы).

// Пример:

// class UserService {
//   getUser(id: number): User { ... }
//   saveUser(user: User): void { ... }
//   version: string = "1.0";
// }

// type AsyncUserService = Promisify<UserService>;
// /* Результат:
// {
//   getUser(id: number): Promise<User>;
//   saveUser(user: User): Promise<void>;
//   version: string;
// }
// */

type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer Ret ? (...args: any) => Promise<Ret> : T[K];
};


//---------------------------------------------------------------------------------
//Задание 11:

// Условие задачи
// Реализуйте тип Awaited<T>, который:
// Раскрывает тип значения, обёрнутого в Promise (аналогично встроенному Awaited в TypeScript 4.5+).
// Обрабатывает вложенные Promise (например, Promise<Promise<string>> → string).

// Не раскрывает другие типы (например, Array<Promise<string>> остаётся Array<Promise<string>>).
// Подсказки: почитайте про infer, extends и conditional types

type Awaited<T> = T extends Promise<infer Inner> ? Awaited<Inner> : T;

// Пример использования:
type Example1 = Awaited<Promise<string>>;         // string
type Example2 = Awaited<Promise<Promise<number>>>; // number
type Example3 = Awaited<boolean>;                // boolean (не Promise)
type Example4 = Awaited<Array<Promise<string>>>; // Array<Promise<string>> (без изменений)


// Дополнительные задания
// Усложнённая версия: Реализуйте Awaited, который также раскрывает Promise внутри массивов:

type AwaitedDeep<T> = 
    T extends Promise<infer Inner>[] ? AwaitedDeep<Inner[]> : 
    T extends Promise<infer Inner> ? AwaitedDeep<Inner> : 
    T;

type Example = AwaitedDeep<Array<Promise<string>>>; // Array<string>
// Подсказка: Используйте { [K in keyof T]: Awaited<T[K]> }.
// Обработка null/undefined: Добавьте проверку, чтобы Awaited<Promise<null>> возвращал null, а не never.

//Задание 12:
// Создать тип для валидации формы с динамическими полями
// Задача:
// Создать тип Validator<T>, который описывает правила валидации для каждого поля формы:

// Поле может быть обязательным (required).

// Могут быть кастомные проверки (например, minLength, isEmail).

// Что нужно сделать:

// Для каждого поля объекта создать набор правил валидации.

// Поддержать обязательные и необязательные поля.

// Учесть вложенные объекты (если нужно).

// Пример:  
type UserForm = {
  name: string;
  age?: number;
  address: {
    city: string;
  };
};

type StringValidatorType = {
  isEmail?: boolean;
  isPassword?: boolean; 
  minLength?: number;
  maxLength?: number;
}

type NumberValidatorType = {
  isPositive?: boolean;
  isFloat?: boolean;
}

type Validator<T> = {
  [K in keyof T]: T[K] extends object ? Validator<T[K]> : 
    { required: undefined extends T[K] ? false : true } & 
    (string extends T[K] ? StringValidatorType : 
    (number extends T[K] ? NumberValidatorType : 
    {}));
}

type UserValidator = Validator<UserForm>;

/* Результат:
{
  name: { required: true; minLength?: number };
  age?: { required: false; isPositive?: boolean };
  address: {
    city: { required: true };
  };
}
*/


// Подсказки:
// Используйте Partial<T> для необязательных полей.

// Для рекурсивной обработки вложенных объектов: T[K] extends object ? Validator<T[K]> : ....

// Базовый интерфейс правил:
interface ValidationRules {
  required?: boolean;
  minLength?: number;
  isEmail?: boolean;
  // ... другие правила
}