const isEqualObject = (obj1 = {}, obj2 = {}) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  if (keysObj1.length !== keysObj2.length) {
    return false;
  }

  return keysObj2.every((key) => {
    return obj1[key] === obj2[key];
  });
};

export default isEqualObject;
