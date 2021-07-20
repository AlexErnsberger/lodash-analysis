import deburrLetter from './.internal/deburrLetter.js'

/** Used to match Latin Unicode letters (excluding mathematical operators). */
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g

/** Used to compose unicode character classes. */
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

/** Used to compose unicode capture groups. */
const rsCombo = `[${rsComboRange}]`

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
const reComboMark = RegExp(rsCombo, 'g')

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *  以Latin-1 Supplement和Latin Extended-A为标准把字符串转换为基本拉丁字母，并且删除特殊符号，只保留拉丁字母dd
 * 
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * deburr('déjà vu')
 * // => 'deja vu'
 */
function deburr(string) {
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '')
}

export default deburr
