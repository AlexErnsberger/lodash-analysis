/** Used to compose unicode character classes. */
// 星芒层
const rsAstralRange = '\\ud800-\\udfff'
// https://www.unicode.org/charts/PDF/U0300.pdf
const rsComboMarksRange = '\\u0300-\\u036f'
// https://www.unicode.org/charts/PDF/UFE20.pdf
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
// https://www.unicode.org/charts/PDF/U20D0.pdf
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
// https://www.unicode.org/charts/PDF/U1AB0.pdf
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
// https://www.unicode.org/charts/PDF/U1DC0.pdf
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange

// https://www.unicode.org/charts/PDF/U2700.pdf
const rsDingbatRange = '\\u2700-\\u27bf'
// a-z 223-246 248-255
const rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff'
// 172 177 215 x  247 +
const rsMathOpRange = '\\xac\\xb1\\xd7\\xf7'
// 0-48 58-64 91-96 124-191
const rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf'
// https://www.unicode.org/charts/PDF/U2000.pdf
const rsPunctuationRange = '\\u2000-\\u206f'
// \t \n \r \f 11 160 
// feff https://www.unicode.org/charts/PDF/UFE70.pdf
// 1680 https://www.unicode.org/charts/PDF/U1680.pdf
// 180e https://www.unicode.org/charts/PDF/U1800.pdf
// 2000-200a 2028 2029 202f 205f https://www.unicode.org/charts/PDF/U2000.pdf
// 3000 https://www.unicode.org/charts/PDF/U3000.pdf
const rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'
// A-Z 192-214 216-222
const rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde'
// fe0e fe0f https://www.unicode.org/charts/PDF/UFE00.pdf
const rsVarRange = '\\ufe0e\\ufe0f'
const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange

/** Used to compose unicode capture groups. */
// 匹配apostrophe（撇号）' https://www.unicode.org/charts/PDF/U2000.pdf
const rsApos = "['\u2019]"
// 匹配 运算符 非char字符 各种标点符 各种空格 
const rsBreak = `[${rsBreakRange}]`
// 见上述网址
const rsCombo = `[${rsComboRange}]`
// 数字
const rsDigit = '\\d'
// 见上述网址
const rsDingbat = `[${rsDingbatRange}]`
// 小写字母
const rsLower = `[${rsLowerRange}]`
// 匹配各种其他字符
const rsMisc = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`
// 组合 由d83c + 
// 位于 ud800-udfff 的一个元素 d83c 和DC00-DFFF的组合
// fitz emoji
const rsFitz = '\\ud83c[\\udffb-\\udfff]'
// 修饰符
const rsModifier = `(?:${rsCombo}|${rsFitz})`
// 非星芒层
const rsNonAstral = `[^${rsAstralRange}]`
// 国家地图
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
// 大写字母
const rsUpper = `[${rsUpperRange}]`
// ZWJ https://www.unicode.org/charts/PDF/U2000.pdf   ZERO WIDTH JOINER
const rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
const rsMiscLower = `(?:${rsLower}|${rsMisc})`
const rsMiscUpper = `(?:${rsUpper}|${rsMisc})`
const rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`
const rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`
const reOptMod = `${rsModifier}?`
const rsOptVar = `[${rsVarRange}]?`
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])'
const rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])'
const rsSeq = rsOptVar + reOptMod + rsOptJoin
const rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`

const reUnicodeWords = RegExp([
  `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, '$'].join('|')})`,
  `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, '$'].join('|')})`,
  `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
  `${rsUpper}+${rsOptContrUpper}`,
  rsOrdUpper,
  rsOrdLower,
  `${rsDigit}+`,
  rsEmoji
].join('|'), 'g')

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWords)
}

export default unicodeWords
