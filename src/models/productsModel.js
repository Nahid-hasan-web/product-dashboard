const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },

    slug:{
        type:String,
        required:true,
        uniqe:true,
    },
    stock:{
        type:Number,
        required:true
    },
    mainImage:{
        type:String,
        required:true,
    },
    subImage:[
       { type:String}
    ],
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productCatagory',
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:['active' , 'pendin' , 'reject']
    },
    variyent:[
        {
            name:{
                type:String,
                enum:['color' , 'size'],
                lowercase:true
            },
            options:[
                {
                    color:{
                        type:String,
                    },
                    size:{
                        type:String
                    },
                    additionalPrice:{
                        type:String
                    },
                }
            ]
        }        
    ]
})


module.exports = mongoose.model('products' , productSchema)


