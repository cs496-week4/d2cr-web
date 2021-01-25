export function getRequestData(searchKeyword, rateFilter, sorter, sorterDir) {
    return {
      search: searchKeyword,
      rateFilter,
      sorter,
      sorterDir,
    };
}

export function removeFirstSlash(str) {
  console.log(str.substring(1, str.length));
  return (str.substring(1, str.length));
}

export const rating = [<div></div>, <div>❤</div>, <div>❤❤</div>, <div>❤❤❤</div>, <div>❤❤❤❤</div>, <div>❤❤❤❤❤</div>];
