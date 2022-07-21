export const capitalize = (str) =>
  str
    .split(" ")
    .map((str) => `${str[0].toUpperCase()}${str.substring(1)}`)
    .join(" ");

    export const calculateDateDifference = (d1, d2) => {
      d1 = new Date(d1)
      d2 = new Date(d2)
      const timeDiff = Math.abs(d2.getTime() - d1.getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
      return diffDays
    }