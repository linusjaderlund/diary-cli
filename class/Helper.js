class Helper {
  static isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

  static isDashedDateString = (str) =>
    typeof str !== 'string' ? false : /^\d{4}-\d{2}-\d{2}$/.test(str);

  static isFirstPartOfUUID = (str) => (typeof str !== 'string' ? false : /[a-z0-9]{8}/.test(str));

  static generateUniqueKey = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  static firstPartOfUUID = (uuid) => uuid.substring(0, uuid.indexOf('-'));

  static zero = (number) => (number < 10 ? `0${number}` : number);

  static getDateString = (ms) => {
    const now = ms ? new Date(ms) : new Date();
    const year = Helper.zero(now.getFullYear());
    const month = Helper.zero(now.getMonth() + 1);
    const date = Helper.zero(now.getDate());

    return `${year}${month}${date}`;
  };

  static getTimeString = (ms) => {
    const now = ms ? new Date(ms) : new Date();
    const hours = Helper.zero(now.getHours());
    const minutes = Helper.zero(now.getMinutes());

    return `${hours}:${minutes}`;
  };

  static getReadableDateString = (ms) => {
    const date = Helper.getDateString(ms);
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
  };
}

module.exports = Helper;
