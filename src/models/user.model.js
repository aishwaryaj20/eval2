const {Schema , model} = require("mongoose")
const bcrypt = require('bcryptjs');
const userSchema = new Schema ({

    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
   moviename:{type:String, required: true},
   roles:{type:String, required: true},
},
{
    versionKey: false,
    timestamps: true


});

const movieSchema = new Schema ({

    email: {type: String, required: true, unique: true},
  //  password: {type:String, required: true},
    moviename:{type:String, required: true},
    roles:{type:String, required: true},
},
{
    versionKey: false,
    timestamps: true


});

userSchema.pre("save", function (next) {


    if(!this.isModified("password")) return next();

  
        const hash= bcrypt.hashSync
        (this.password , 10) 
            // Store hash in your password DB.

            this.password = hash
            return next();
        });



        userSchema.methods.checkpassword = function (password)
        {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, this.password, function(err, same) {

                    if(err) return reject(err);

                    return resolve(same)
            })
           
            
            });
        }
        movieSchema.pre("save", function (next) {


    if(!this.isModified("password")) return next();

  
        const hash= bcrypt.hashSync
        (this.password , 10) 
            // Store hash in your password DB.

            this.password = hash
            return next();
        });



        movieSchema.methods.checkpassword = function (password)
        {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, this.password, function(err, same) {

                    if(err) return reject(err);

                    return resolve(same)
            })
           
            
            });
        }


  
module.exports= model("user", userSchema)
module.exports= model("movie", movieSchema)