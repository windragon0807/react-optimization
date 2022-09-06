import React from 'react'

import './index.css'

function zeroPad(value, len) {
  const str = '0000000000' + value.toString()
  return str.substring(str.length - len)
}

/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
function getParametersForUnsplash({width, height, quality, format}) {
  // unsplash에서 제공하는 이미지를 processing 할 수 있는 파라미터
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
}

/*
 * 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수
 * (Markdown으로 된 문자열의 특수문자를 제거하기 위함)
 * */
function removeSpecialCharacter(str) {
  {/* 🏷️ bottleneck 코드 최적화 */}
  /*
  const removeCharacters = ['#', '_', '*', '~', '&', ';', '!', '[', ']', '`', '>', '\n', '=', '-']
  let _str = str
  let i = 0,
    j = 0

  for (i = 0; i < removeCharacters.length; i++) {
    j = 0
    while (j < _str.length) {
      if (_str[j] === removeCharacters[i]) {
        _str = _str.substring(0, j).concat(_str.substring(j + 1))
        continue
      }
      j++
    }
  }
  */
  let _str = str.substring(0, 300);
  _str = _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\\n\=\-]/g, '');

  return _str
}

function Article(props) {
  const createdTime = new Date(props.createdTime)
  return (
    <div className={'Article'}>
      <div className={'Article__summary'}>
        <div className={'Article__summary__title'}>{props.title}</div>
        <div className={'Article__summary__desc'}>{removeSpecialCharacter(props.content)}</div>
        <div className={'Article__summary__etc'}>
          {createdTime.getFullYear() +
            '.' +
            zeroPad(createdTime.getMonth() + 1, 2) +
            '.' +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
      <div className={'Article__thumbnail'}>
        {/* 🏷️ 이미지 사이즈 최적화 */}
        {/* <img src={props.image + getParametersForUnsplash({width: 1200, height: 1200, quality: 80, format: 'jpg'})} alt="thumbnail" /> */}
        <img src={props.image + getParametersForUnsplash({width: 240, height: 240, quality: 80, format: 'jpg'})} alt="thumbnail" />
      </div>
    </div>
  )
}

export default Article
