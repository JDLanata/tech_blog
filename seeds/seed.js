const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models")

const seed = async () =>{
    const userData = await User.bulkCreate([
        {
            username:"joe",
            password:"password",
            email:"joe@joe.joe"
        },
        {
            username:"juan",
            password:"password",
            email:"juan@joe.joe"
        },
        {
            username:"steve",
            password:"password",
            email:"steve@joe.joe"
        },
    ],{
        individualHooks:true
    })
    const postData = await Post.bulkCreate([
        {
            title:"Joe's post",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus leo diam, ac lacinia leo mattis id. Duis et dolor iaculis, dictum quam tincidunt, dictum enim. Suspendisse non arcu neque. Mauris nec aliquam orci, eget imperdiet tellus.",
            UserId:1
        },
        {
            title:"Juan's post",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus leo diam, ac lacinia leo mattis id. Duis et dolor iaculis, dictum quam tincidunt, dictum enim. Suspendisse non arcu neque. Mauris nec aliquam orci, eget imperdiet tellus. In porta eros a enim sagittis, et pharetra augue malesuada. Mauris id commodo eros. Quisque eu justo a lacus consectetur ultrices eu viverra felis.",
            UserId:2
        },
        {
            title:"Steve's post",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus leo diam, ac lacinia leo mattis id. Duis et dolor iaculis, dictum quam tincidunt, dictum enim. Suspendisse non arcu neque. Mauris nec aliquam orci, eget imperdiet tellus. In porta eros a enim sagittis, et pharetra augue malesuada. Mauris id commodo eros. Quisque eu justo a lacus consectetur ultrices eu viverra felis.",
            UserId:3
        }
    ])
    const postComment = await Comment.bulkCreate([
        {
            words:"This is my comment and I like it",
            username:"steve",
            UserId:3,
            PostId:1
        },
        {
            words:"Comment",
            username:"joe",
            UserId:1,
            PostId:2
        },
        {
            words:"more comments",
            username:"juan",
            UserId:2,
            PostId:3
        }
        
    ])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})