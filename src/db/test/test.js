const {
  User,
  Blog
} = require('../models/index')

  !(async function () {

    // const req = await Blog.findAndCountAll({
    //   where:{
    //     userId: 3
    //   },
    //   include: {
    //     model: User,
    //     attributes: ['userName', 'nickName'],
        
    //   }
    // })

    // const req = await User.findAndCountAll({
    //   where: {id: 1},
    //   include: {
    //     model: Blog,
    //     attributes: ['content', 'title']
    //   }
    // })

    // User.update({
    //   nickName: '张飞'
    // },{
    //   where: {
    //     userName: 'zhangfei'
    //   }
    // })

    // Blog.destroy({
    //   where: {
    //     id: 1
    //   }
    // })
    User.destroy({
      where: {
        id: 1
      }
    })

    // const req = await Blog.findAndCountAll({
    //   where:{
    //     userId:1
    //   }
    // })

    // console.log('req:', req.count)
    // console.log('req:', req.rows[0].user.blogs.map(item => ({...item.dataValues, ...req.rows[0].user.dataValues})))
    
  }())