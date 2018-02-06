let postData = require('../../../data//posts-data.js');

Page({
    data:{
    },
    onShareAppMessage(res){
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/page/user?id=123',
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
    },
    onLoad(options){
        let postId = options.id,
            postDataArr = postData.postData[postId],
            postsCollected = wx.getStorageSync('posts_collect');

        this.data.currentPostId = postId;

        this.setData({
            ...postDataArr
        });

        if (postsCollected[postId]){
            console.log(postsCollected[postId]);
            this.setData({
                collected: postsCollected[postId]
            });
        }else{
            wx.setStorageSync('posts_collect', {
                ...postsCollected,
                [postId]: false
            });
        }
    },
    onCollectionTap(event){
        const { currentPostId } = this.data,
              postsCollected    = wx.getStorageSync('posts_collect'),
              postCollected     = postsCollected[currentPostId];
              
        this.setData({
            collected: !postCollected
        });

        wx.setStorageSync('posts_collect', {
            ...postsCollected,
            [currentPostId]: !postCollected
        });

        wx.showToast({
            title: !postCollected ? '收藏成功' : '取消成功',
            icon: 'success',
            duration: 2000
        });

        // wx.showModal({
        //     title: '收藏',
        //     content: '是否收藏文章',
        //      success: function(res) {
        //       if (res.confirm) {
        //       } else if (res.cancel) {
        //       }
        //     }
        // });
    },
    onShareTap(){
        const itemList = ['分享到微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'];

        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function(res) {
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '哎，现在无法实现分享功能，不知道什么时候支持'
                });
            },
            fail: function(res) {
              // 用户点击了取消会走到fail函数中  
              console.log(res.errMsg);
            }
        });


    }
});