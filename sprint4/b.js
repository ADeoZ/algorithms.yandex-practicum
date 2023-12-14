/**
 * Гоша написал программу, которая сравнивает строки исключительно по их хешам.
 * Если хеш равен, то и строки равны. Тимофей увидел это безобразие
 * и поручил вам сломать программу Гоши, чтобы остальным неповадно было.
 * В этой задаче вам надо будет лишь найти две различные строки,
 * которые для заданной хеш-функции будут давать одинаковое значение.
 */

const getPolynomialHash = (base, mod, string) => {
  let sum = 0;
  let q = 1;
  for (let i = 1; i <= string.length; i++) {
    sum = (sum + string[string.length - i].charCodeAt() * q) % mod;
    q = (q * base) % mod;
  }
  return sum;
};

const generateString = (length) => {
  const abc = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  let string = "";
  for (let i = 0; i < length; i++) {
    string += abc[Math.floor(Math.random() * abc.length)];
  }
  return string;
};

const getEqualStringByHash = () => {
  const hashes = new Map();

  while (true) {
    const string = generateString(31);
    const hash = getPolynomialHash(1000, 123987123, string);
    if (hashes.has(hash)) {
      const string2 = hashes.get(hash);
      if (string !== string2) {
        console.log(string);
        console.log(string2);
        return;
      }
    } else {
      hashes.set(hash, string);
    }
  }
};

getEqualStringByHash();
