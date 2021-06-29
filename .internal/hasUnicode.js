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
// fe0e fe0f https://www.unicode.org/charts/PDF/UFE00.pdf
const rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
// ZWJ https://www.unicode.org/charts/PDF/U2000.pdf   ZERO WIDTH JOINER
const rsZWJ = '\\u200d'

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
const reHasUnicode = RegExp(`[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`)

/**
 * Checks if `string` contains Unicode symbols.
 * 字符串是否包含unicode编码
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string)
}

export default hasUnicode
