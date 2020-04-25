// create by tiennv597-2020/04/25

// REFERENCE UNICODE TABLES: 
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// http://www.tamasoft.co.jp/en/general-info/unicode.html
//
// TEST EDITOR:
// http://www.gethifi.com/tools/regex
//
// UNICODE RANGE : DESCRIPTION
// 
// 3000-303F : punctuation
// 3040-309F : hiragana
// 30A0-30FF : katakana
// FF00-FFEF : Full-width roman + half-width katakana
// 4E00-9FAF : Common and uncommon kanji
// 
// Non-Japanese punctuation/formatting characters commonly used in Japanese text
// 2605-2606 : Stars
// 2190-2195 : Arrows
// u203B     : Weird asterisk thing
function JapaneseRegex() {
    return {
        detection: function (data) {

            var regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
            var input = data;
            if (regex.test(input)) {

                return true; //Japanese characters found
            }
            else {

                return false; //No Japanese characters
            }

        }
    }
}
module.exports = JapaneseRegex;