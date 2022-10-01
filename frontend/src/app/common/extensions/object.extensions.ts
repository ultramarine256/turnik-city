export class ObjectExtensions {
  static clean(obj: any) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
        ObjectExtensions.clean(obj[key]);
      } // recurse
      else if (obj[key] == null) {
        delete obj[key];
      } // delete
    });
  }

  static getQueryParams(obj: any) {
    if (obj === undefined || obj === null) {
      return '';
    }
    return (
      '?' +
      Object.keys(obj)
        .map(key => key + '=' + obj[key])
        .join('&')
    );
  }

  static convertKeysToLowerCase(obj: any) {
    let output = {};
    for (let i in obj) {
      if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
        // @ts-ignore
        output[this.lowerFirstLetter(i)] = this.convertKeysToLowerCase(obj[i]);
      } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
        // @ts-ignore
        output[this.lowerFirstLetter(i)] = [];
        // @ts-ignore
        output[this.lowerFirstLetter(i)].push(this.convertKeysToLowerCase(obj[i][0]));
      } else {
        // @ts-ignore
        output[this.lowerFirstLetter(i)] = obj[i];
      }
    }
    return output;
  }

  static lowerFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
}
