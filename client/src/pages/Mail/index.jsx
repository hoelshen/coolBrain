import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import NavBar from "@/components/Navbar/index";
import Comment from '@/components/Comment/index';


import { getResultData_getDiary } from '@/servers/servers'

import "./index.less";

@inject("userStore")
@observer
class Index extends Component {
  constructor(){
    super();
    this.state = {
      commentList:[]
    }
  }
  componentWillMount() {}

  componentDidMount() {

  }

  componentWillUnmount() {}

  static options = {
    addGlobalClass: true
  };

  async componentDidShow() {
    const comment = await getResultData_getDiary({location: 'public'}) //评论
    if(JSON.stringify(comment.data) !== '{}'){
      this.setState({commentList: comment.data.objects})
    }
  }

  componentDidHide() {}


  toHome() {
    Taro.navigateTo({ url: `/pages/index/index` });
  }
  render() {
    const { commentList } = this.state;
    let CommentList;
    if(commentList.length>0){
        CommentList = commentList.map((comment) =>{
        const time = (comment.created_at).split(' ');
        comment.time = time[0]
          return(
            <Comment 
            taroKey={String(comment.id)} 
            avatarUrl={comment.owner.avatar}
            nickName={comment.owner.name}
            created_at={comment.time} text={comment.text} />
          )
      })
    }
    return (
      <View>
        <NavBar text='' color='#ffffff' type='2' />
        <View className='head'>
          <Text className='name'>正念冥想评论区</Text>
          {CommentList}
        </View>
      </View>
    );
  }
}
export default Index;
