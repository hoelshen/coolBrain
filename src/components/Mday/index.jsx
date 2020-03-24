import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import PropTypes from 'prop-types';


function formatName() {
  const val = Taro.$dayjs().hour();
  console.log(' jin')
  let value
  if (7 < val && val <= 11) {
      value = "早上好"
  }
  if (11 < val && val <= 13) {
      value = "中午好"
  }
  if (13 < val && val <= 17) {
      value = "下午好"
  }
  if ((17 < val && val < 19)) {
      value = "傍晚好"
  }
  if (19 <= val && val <= 23) {
      value = "晚上好"
  }
  if (0 < val && val <= 5) {
      value = "深夜好"
  }
  return value;
}
//defaultProps

function tell (){
  console.log('tell')
}

const MDAY = props => {
  const {name, time} = props
  console.log('name, time: ', name, time);

  function tell(){
    console.log('tell')
    console.log('tell')
  }
  return (
    <View>
      <Text>{formatName()}</Text>
      <Text>{name}</Text>
    </View>
  )
}

MDAY.propTypes = {
  name: PropTypes.string
};


export default MDAY
