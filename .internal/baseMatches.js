import baseIsMatch from './baseIsMatch.js'
import getMatchData from './getMatchData.js'
import matchesStrictComparable from './matchesStrictComparable.js'

/**
 * The base implementation of `matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  const matchData = getMatchData(source)
  // 长度为1 并且 matchData[0] 可以通过 === 比较，即非NaN 非对象 函数
  // 直接比较并返回
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1])
  }
  // 排除传入比较对象的情况
  return (object) => object === source || baseIsMatch(object, source, matchData)
}

export default baseMatches
