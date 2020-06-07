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
    badgeList:[],
    isShow: false,
    img: '',
    type: 'local'
  }

  
  componentWillMount() {}

  componentDidMount() {
  }

  componentWillUnmount() {}
  static config = {
    disableScroll: true
  };
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

  onEnlarge(e, type){
    console.log('e: ', e, this);
    this.setState({isShow: true, img: e, type})
  }
  onCloseEnable(){
    this.setState({isShow: false, img: ''})
  }
  render() {
    const { badgeList, isShow,img, type } = this.state;
    const len = badgeList.length - 1;
    const ImageList = badgeList.map((element, index)=>{
      console.log('index: ', index);
      const badgeImg = classNames({
        badge: true,
        centerStyle: index === 0,
        leftStyle: index !== 0 && index%2 === 0,
        rightStyle: index !== 0 && index%2 !== 0,
      })

      return (
        <View className='ImgDiv flex center'>
          <Image key={element.picture} src={element.picture} className={badgeImg} onClick={this.onEnlarge.bind(this, element.picture, 'online')}></Image>
        </View>  
      )
    })

    const badgeArr = [1, 2, 3, 4, 5, 6, 7, 8].slice(-(8-len), 8)
    const needBadge = badgeArr.map((item, index)=>{
      console.log('index: ', index);
      const badgeImg = classNames({
        badge: true,
        leftStyle:  index%2 !== 0,
        rightStyle: index%2 === 0,
      })
      return (
        <View className='flex center'>
        <Image key={item} src={require(`@/assets/badges${item}.png`)} className={badgeImg} onClick={this.onEnlarge.bind(this, item, 'local')}></Image>
      </View> 
      )
    })

    return (
      <View>
        <NavBar text='我的徽章' color='#fff' type='2' />
        <View className='body'>
          <View className='badgeDiv flex column j-start'
            style='background-size: 100% 100%;'
          >
            {ImageList}
            {needBadge}
          </View>
        </View>
        {
          isShow && 
          <View class='toplife_modal' onTouchMove={this.preventTouchMove}>
            <View class='toplife_modal_content'>
                {
                  type =='local' ?
                  <Image src={require(`@/assets/badges${img}.png`)} className='badge' onClick={this.onCloseEnable}></Image>
                   :
                  <Image src={img} className='badge' onClick={this.onCloseEnable}></Image>
                }
            </View>
          </View>
        }
      </View>
    );
  }
}
export default Index;
