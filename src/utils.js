export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('localStorage does not supports');
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // localstorage does not supports
  }
}

export function findById(data = [], id) {
  if (Object.prototype.toString.call(id) === '[object Array]') {
    const result = [];

    id.forEach((idItem) => {
      const index = data.findIndex(dataItem => dataItem.id === idItem);
      if (index !== -1) {
        result.push(data[index]);
      }
    });

    return result.length ? result : undefined;
  } else {
    const index = data.findIndex(dataItem => dataItem.id === id);
    return data[index];
  }
}

export function isDateValid(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

export function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]';
}

export function dateRangesOverlap(dateStart1, dateEnd1, dateStart2, dateEnd2) {
  const start1 = +new Date(dateStart1);
  const end1 = +new Date(dateEnd1);
  const start2 = +new Date(dateStart2);
  const end2 = +new Date(dateEnd2);

  if ((start1 === start2) && (end1 === end2)) {
    return true;
  }
  return (start1 <= start2 && end1 > start2) || (start2 < start1 && end2 > start1);
}

const mustHaveFields = {
  rooms: ['name', 'seats', 'location', 'id'],
  schools: ['name', 'amount', 'location', 'id'],
  events: ['name', 'lecturer', 'dateStart', 'dateEnd', 'schools', 'room', 'id'],
};

export function clearFields(key, data) {
  const result = {};
  const fields = mustHaveFields[key];

  if (!fields) {
    console.log(`invalid key '${key}' passed to clearFields()`);
    return result;
  }

  mustHaveFields[key].forEach((key) => {
    if (typeof data[key] !== 'undefined') result[key] = data[key];
  });

  return result;
}

export function resolveResult(result) {
  return result.type === 'error' ? Promise.reject(result.errors) : Promise.resolve();
}