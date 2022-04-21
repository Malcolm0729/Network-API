// requires for mongoose
const { Schema, Types, model } = require("mongoose");

// date format getter
const dateFormat = (date) => {
    return date.toLocaleString()
};

// Create a new reactions subschema for thoughts 
const reactionSchema = new Schema(
    {
        // id for each reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            // sets the default value to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        // main content for each reaction
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // username for reaction user
        username: {
            type: String,
            required: true,
        },
        // using dateFormat getter to set date of reaction
        createdAt: {
            type: Date,
            default: Date.now,
            // getter calling the dateFormat function above
            get: dateFormat,
        },
    },
    {
        toJSON: {
            // allows getters
            getters: true,
        },
        id: false,
    }   
);

// Create a new instance of thoughtSchema
const thoughtSchema = new Schema(
    {
        // main thought content
        thoughtText : {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // using dateFormat getter to set date of reaction
        createdAt: {
            type: Date,
            default: Date.now,
            // getter calling the dateFormat function above
            get: dateFormat,
        },
        // username for thought user
        username: {
            type: String,
            required: true,
        },
        // array to store reactions in thoughts
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            // allows below virtual
            virtuals: true,
            // allows getter functions
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    }); 

// Using mongoose.model() to compile a model based on the schema
const Thought = model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;