const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
           type: String,
           unique: true,
           required: true;
           trim: true; 
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
                ref: 'Thought'
            },
        ],
    
        buddies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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

userSchema.virtual('buddyCount')
    .get(function () {
        return this.buddies.length;
    }); 

const User = model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;