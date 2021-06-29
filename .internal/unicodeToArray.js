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
const rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsAstral = `[${rsAstralRange}]`
const rsCombo = `[${rsComboRange}]`
// fitz emoji
const rsFitz = '\\ud83c[\\udffb-\\udfff]'
// 修饰符
const rsModifier = `(?:${rsCombo}|${rsFitz})`
// 非星芒层
const rsNonAstral = `[^${rsAstralRange}]`
// 国家旗帜
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
// High Surrogate Area https://www.unicode.org/charts/PDF/UD800.pdf
// Low Surrogate Area https://www.unicode.org/charts/PDF/UDC00.pdf
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
// ZWJ https://www.unicode.org/charts/PDF/U2000.pdf   ZERO WIDTH JOINER
const rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
// 生成匹配正则
const reOptMod = `${rsModifier}?`
const rsOptVar = `[${rsVarRange}]?`
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsSeq = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`
const rsSymbol = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || []
}

export default unicodeToArray
