import Taro, { Component } from "@tarojs/taro";
import { View, Image, Textarea,Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Group6 from "@/assets/Group6.png";
import topSign from "@/assets/topSign.png";
import Mood from "@/components/Mood/index";

import bottomSign from "@/assets/bottomSign.png";
import Group2 from "@/assets/Group2.png";
import share from "@/assets/fx.png";
import { getResultData_postsDiary,getResultData_postComment } from "@/servers/servers";

import "./success.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor() {
    super();
    this.state = {
      isDuration: '',
      commentText:'',
      showComment: false,
      isShow: true
    };
  }
  componentWillMount() {}

  componentDidMount() {
    const  {  duration  } = this.$router.params;
    this.setState({
      isDuration: parseInt(Number(duration) / 60)
    });
  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  async componentDidShow() {

  }

  onPostDiary(){
    const {showComment, commentText } =  this.state
    const { id } = this.props.userStore
    if(showComment){
      getResultData_postComment(commentText)
    }
    getResultData_postsDiary({'owner': id ,'text': commentText})
  }
  onHome(){
    Taro.reLaunch({ url: `/pages/index/index` });
  }
  handleChange(e){
    console.log('e: ', e.detail.value);
    this.setState({commentText: e.detail.value});
  }

  onCheck(){
    this.setState({showComment: !this.state.showComment})
  }
  componentDidHide() {}

  toHome() {
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  render() {
    const {isDuration, showComment,commentText , isShow} = this.state;
    console.log('duration: ', isDuration);
    const ModalComProps = {
      isShow: this.state.isShow,
      onCancelCallback: ()=>{     
        Taro.setStorage({
          key: "isShow",
          data: false
        }); 
        this.setState({isShow: false})
      }
    }
    return (
      <View>
        <NavBar text='' color='#8CC9BD' type='' />
        <View class='modal_content'>
          <View class='modal_btn'>
            <View className='played'>
              <View className='head ' style='background-size: 100% 100%;'>
                <View className='top' onClick={this.onClose}>
                  <Image src={Group6} className='Group6Img' />
                </View>
                <View className='body'>
                  <View>本次冥想分钟数</View>
                  <View className='num'>{isDuration}</View>
                </View>
              </View>
              <Image className='iconImg topSign' src={topSign} />
              <View className='AreaDiv'>
              <Textarea placeholder='记录今天的冥想日记吧~' className='textArea'  value={commentText}  onInput={this.handleChange.bind(this)}  autoFocus  autoHeight />
              <View className={showComment ? 'cheShareView': 'shareView'} onClick={this.onCheck}> 
              </View>  
              <Text className='shareText'>
                分享到评论区
              </Text>  
              <View  className='shareBtn' onClick={this.onPostDiary}>
                记录
              </View>
              </View>
              <Image className='iconImg bottomSign' src={bottomSign} />
              <View className='foot'>
                <Image class='Group2' src={Group2} onClick={this.onHome}></Image> 
                <Button className='shareBtn'>
                  <Image className='shareImg' src={share} />
                </Button>
              </View>
            </View>
          </View>
        </View>
        <Mood  isShow={isShow} isDuration={isDuration} {...ModalComProps} />
      </View>
    );
  }
}
export default Index;
