import Taro, { Component } from "@tarojs/taro";
import { View, Image} from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import classNames from "classnames";
import NavBar from "@/components/Navbar/index";
import { getResultData_MyBadge } from "@/servers/servers";



import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  state ={
    badgeList:[]
  }
  componentWillMount() {}

  componentDidMount() {
  }

  componentWillUnmount() {}

  async componentDidShow() {
    const data = await getResultData_MyBadge();
    this.setState({badgeList: data.data})
  }

  onHome(e) {
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  onDiary(e){
    e.stopPropagation()
    Taro.navigateTo({ url: `/pages/Diary/index` });
  }
  render() {
    const { badgeList } = this.state;
    const needLength = 9 - badgeList.length;
    const needList = Array.from({length: needLength}, (_, i) => ({
      id: `${i+1}`,
      picture: `@/assets/badges${i}.png`
    }))
    const list = [badgeList, needList];
    const ImageList =list.map((element, index)=>{
      const badgeImg = classNames({
        badge: true,
        centerStyle: index === 0,
        leftStyle: index !== 0 && index%2 === 0,
        rightStyle: index !== 0 && index%2 !== 0,
      })

      return (
        <Image key={element.picture} src={`'@/assets/badges${index}.png'`} className={badgeImg}></Image>
      )
    })

    return (
      <>
        <NavBar text='徽章' color='#8CC9BD' type='2' />
        <View className='body flex column j-between'>
        <View className='badgeDiv'>
          {ImageList}
        </View>
        </View>
      </>
    );
  }
}
export default Index;
