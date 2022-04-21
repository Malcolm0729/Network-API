const { Schema, Types, model } = require("mongoose");

const UsersSchema = new Schema(
    {
        username: {
           type: String,
           unique: true,
           required: true,
           trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (valid) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valid);
                },
                message: (props) => `${props.value} => The email address is not valid.`
            },
        },
        share: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            },
        ],
    
        buddies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }   
);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }); 

const User = model('Users', UsersSchema);

const handleError = (err) => console.error(err);

module.exports = Users;