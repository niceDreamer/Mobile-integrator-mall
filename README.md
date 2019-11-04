# 移动积分商城

**示列**
![商城首页](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/1_gaitubao_379x673.png)
![商品分类](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/2_gaitubao_379x673.png)
![购物车](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/3_gaitubao_379x673.png)
![填写订单](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/4_gaitubao_379x673.png)
![商品详情](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/5_gaitubao_379x673.png)
![商品规格](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/6_gaitubao_379x673.png)
![商品列表](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/7_gaitubao_379x673.png)
![话费充值](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/8_gaitubao_379x673.png)
![虚拟商品](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/9_gaitubao_379x673.png)
![个人中心](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/10_gaitubao_379x673.png)
![订单列表](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/11_gaitubao_379x673.png)
![订单详情](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/12_gaitubao_379x673.png)
![收货地址](https://github.com/Jack-Nicholas/Mobile-integrator-mall/blob/master/public/ExampleImage/13_gaitubao_379x673.png)

## 商城有哪些功能？

* 登陆
* 注册
* 首页
* 商品分类
* 购物车
* 商品列表-排序-条件搜索
* 话费，流量充值
* 油卡充值
* 虚拟商品-列表-详情-购买
* 个人中心-退出-登陆
* 商品详情
* 加入购物车，立即购买
* 填写订单
* 收银台支付
* 订单列表-详情
* 积分钱包-充值-充值记录
* 地址管理-修改-删除
* 等等

## 技术点？

* 主要用vue + vuex + vue-router + axios + vant写的
* 第三方插件：better-scroll，js-cookie
* 组件：骨架屏，头部菜单(判断显示标题还是搜索框)，请求loading，两套通用活动页模板，包括vant提供的一些常用组件
* 主要业务流程跟电商一样只是依附于平台进行积分支付，首页进来通过二级域名配置参数调用不同平台商品信息

## 有问题反馈

*在空闲时间写了一个移动H5积分商城，写的比较粗糙，也在持续更新；有问题的地方欢迎指出，希望你能喜欢，点个星星，谢谢各位。
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(liyujie_jack@163.com)
* QQ: 79983104(有验证，请备注)

## 大概流程

    [========]

    ```flow
    st=>start: 用户登陆
    op=>operation: 登陆操作
    cond=>condition: 登陆成功 Yes or No?
    e=>operation: 首页(商品分类,商品列表,购物车,话费/流量充值,油卡充值,虚拟商品)
    list=>operation: 商品列表
    info=>operation: 商品详情
    liji=>operation: 立即购买
    cartcond=>condition: 登陆成功 Yes or No?
    cart=>operation: 购物车
    pay=>operation: 实物商品购买
    paytcond=>condition: 购买成功 Yes or No?
    order=>operation: 商品订单(已完成，待付款)
    vir=>operation: 虚拟商品
    virtcond=>condition: 虚拟商品 Yes or No?
    virpay=>operation: 虚拟商品购买

    st->op->cond
    cond(yes)->e->list->info->cart->cartcond
    cond(no)->op
    info->virtcond
    virtcond(yes)->virpay->paytcond
    virtcond(no)->cart
    cartcond(yes)->pay->paytcond
    cartcond(no)->op
    paytcond(yes)->order
    paytcond(no)->order
    ```

    [========]
