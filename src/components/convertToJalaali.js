import { toJalaali, toGregorian } from 'jalaali-js';

const convertToJalaali = ( gregorianDate ) => {
    const [year, month, day] = gregorianDate.split('-').map(Number);
    const jalali = toJalaali(year, month, day);
    const jalaliDate = `${jalali.jy}-${jalali.jm}-${jalali.jd}`;
    return jalaliDate
}

export default convertToJalaali