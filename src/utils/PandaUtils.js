/**
 * convert array to json
 * @param {Array} array
 * @param {String} field
 */
export const convertArrayToJson = (array, field) => {
  let result = {};
  for (let item of array) {
    let keys = item[field].split("/");
    keys.pop();
    if (!keys.length) keys = [".."];
    setInObject(result, keys, item);
  }
  return result;
};

/**
 * get name from path name
 * @param {String} pathName
 */
export const getNameFromPathName = (pathName) => {
  let result = /([^/]+)$/.exec(pathName);
  if (result.length) {
    return result[0].replace(/.mp4/gim, "").replace(/_/gim, " ");
  } else {
    return "";
  }
};

/**
 * making time duration from militime
 * @param {Number} time
 */
export const makeTimeDuration = (time) => {
  if (typeof time !== Number) time = Number(time);
  const formatNumber = (number) => {
    let result = number.toString();
    return result.length === 2 ? result : `0${result}`;
  };
  let date = new Date(time);
  return `${formatNumber(date.getHours())}:${formatNumber(
    date.getMinutes()
  )}:${formatNumber(date.getSeconds())}`;
};

/**
 * makeListData
 * @param {Object} data
 */
export const makeListData = (data) => {
  let result = [];
  let keys = Object.keys(data).sort();
  for (let key of keys) {
    if (key !== "child") {
      let object = { title: key };
      if (!Array.isArray(data[key])) {
        object.child = [];
        let childKeys = Object.keys(data[key]).sort();
        childKeys.sort();
        for (let childKey of childKeys) {
          object.child.push({
            title: childKey,
            link: [key, childKey],
          });
        }
      } else {
        object.link = [key];
      }
      result.push(object);
    }
  }
  return result.sort();
};

/**
 * get data in object
 * @param {Object} object
 * @param {Array} keys
 * @param {Number} length
 */
export const getInObject = (object, keys, length = 0) => {
  if (keys.length === length + 1) {
    return object[keys[length]];
  } else {
    return getInObject(object[keys[length]], keys, length + 1);
  }
};

/**
 * set data in object
 * @param {Object} object
 * @param {Array} keys
 * @param {*} value
 * @param {Number} length
 */
export const setInObject = (object, keys, value, length = 0) => {
  let key = keys[length];
  // if (!key) return;
  if (!object[key]) {
    object[key] = {
      child: [],
    };
  }
  if (keys.length === length + 1) {
    object[key].child.push(value);
  } else {
    setInObject(object[key], keys, value, length + 1);
  }
};

/**
 * convert byte value to mb value
 * @param {Number} bytes
 */
export const convertByteToMB = (bytes) => {
  return (bytes / 8 / 1024 / 1024).toFixed(2);
};

/**
 * get sub string from first
 * @param {String} str
 * @param {Number} length
 */
export const getSubStringFromFirst = (str, length = 30) => {
  if (str.length < length) {
    return str;
  } else {
    return `${str.substring(0, length)}...`;
  }
};

/**
 * Compare two array
 * @param {Array} array
 * @param {Array} compare
 */
export const compareArray = (array, compare) => {
  return JSON.stringify(array) === JSON.stringify(compare);
};

export const getOverlaySetting = (type) => {
  const overlay = {
    start: "now+0",
    end: "now+150",
    position: {
      x: 0.1,
      y: 0.1,
      z: 2,
    },
    style: {
      font: "Verdana",
      size: 30,
      style: "bold",
      color: "#000000",
    },
    transitionIn: {
      type: "fade",
      speed: 1,
    },
    type: "overlay",
  };

  switch (type) {
    case "news-bar":
      return {
        ...overlay,
        text: "Add new bar",
        transitionIn: {
          type: "ticker",
          speed: 2,
        },
        transitionOut: {
          type: "ticker",
          speed: 2,
        },
        type: "news-bar",
      };
    case "clock":
      return {
        ...overlay,
        clock: "HH:mm",
      };
    case "add-image":
      return {
        ...overlay,
        image: "tmp/logo.png",
      };
    default:
      return {
        ...overlay,
        text: "Please enter your text here",
      };
  }
};

export const getTodayDate = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let year = d.getFullYear();
  let mon = month[d.getMonth()];
  let date = d.getDate();
  let dateString = mon + " " + date + ", " + year;
  return Date.parse(dateString);
};
