const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const parse = (filePath) => {
  const ext = path.extname(filePath);
  console.log(ext);
};

parse('/home/fluxet/study/trash/before.json');