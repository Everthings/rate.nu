const round = (num) => Math.round(num * 10) / 10;

const averageData = (JSONs, fields) => {
  const average = {};
  fields.forEach((field) => {
    average[field] = round(
      JSONs.reduce((acc, currValue) => acc + currValue[field], 0) / JSONs.length
    );
  });
  return average;
};

export { averageData };
