import Taro, { Component } from "@tarojs/taro";
import { View, Image, Textarea, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Comment from "@/components/Comment2/index";
import Group6 from "@/assets/Group6.png";
import topSign from "@/assets/topSign.png";

import bottomSign from "@/assets/bottomSign.png";
import Group2 from "@/assets/Group2.png";
import share from "@/assets/fx.png";
import { getResultData_postDiary } from "@/servers/servers";

import "./success.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor() {
    super();
    this.state = {
      commentText:''
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  async componentDidShow() {

  }

  onPostDiary(){
    getResultData_postDiary()
  }
  onHome(){
    Taro.reLaunch({ url: `/pages/index/index` });
  }
  onBlur(){

  }

  componentDidHide() {}

  toHome() {
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  render() {
    // const {num} = this.props;
    const {commentText} = this.state;
    return (
      <View>
        <NavBar text='' color='#ffffff' type='2' />
        <View class='toplife_modal_content'>
          <View class='toplife_modal_btn'>
            <View className='played'>
              <View className='head'>
                <View className='top' onClick={this.onClose}>
                  <Image src={Group6} className='Group6Img' />
                </View>
                <View className='body'>
                  <View>本次冥想分钟数</View>
                  <View className='num'>10</View>
                </View>
              </View>
              <Image className='iconImg topSign' src={topSign} />
              <Textarea placeholder='记录今天的冥想日记吧~' className='textArea' value={commentText}  onBlur={this.onBlur}  autoHeight />
              <Image className='iconImg bottomSign' src={bottomSign} />
              <Image class='Group2' src={Group2} onClick={this.onHome}></Image> 
              <Button className='btn'>
                <Image className='shareImg' src={share} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Index;
