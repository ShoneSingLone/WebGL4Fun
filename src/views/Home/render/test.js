const regExp = new RegExp(`^handle(.*)$`);
const res = "handleBlurhandleA".match(regExp);
const re2 = "hadsfsdndleBlurhandleA".match(regExp);
console.log('res',res&&res.length);
console.log('re2',re2&&re2.length);


